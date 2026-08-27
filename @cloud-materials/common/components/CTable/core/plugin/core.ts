/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-14 18:31:59
 * @LastEditTime: 2021-11-03 16:56:18
 * @LastEditors: youjingyu
 * @Description:
 */
import type {
  Sorter,
  Filter,
  Formatter,
  Summary,
  ExpandRow,
  RowSelection,
  AutoWidth,
  Resize,
  JSXComponent,
  ComponentProps,
  FetcherOptions,
  FetcherResponse,
} from '../types';
import type { Table } from '../models';
import { isStr, isFn } from '../../shared';
import { merge } from 'lodash-es';
import type { RaceConditionResolver } from '../../arco/plugin/raceConditionResolver';

export interface TablePlugin {
  apply: (table: Table) => void;
}

export type ComponentConf = {
  scope: string;
  name: string;
  component: JSXComponent;
  defaultComponentProps?: ComponentProps;
};

export type MixinOptions = {
  sorter?: Sorter[];
  filter?: Filter[];
  formatter?: Formatter[];
  summary?: Summary[];
  components?: ComponentConf[];
  expandRow?: ExpandRow[];
  rowSelection?: RowSelection[];
  autoWidth?: AutoWidth[];
  resize?: Resize[];
  raceConditionResolver?: RaceConditionResolver<FetcherOptions<any>, FetcherResponse<any>>;
};

const globalPlugin: [string, TablePlugin][] = [];
const globalComponents: { [scope: string]: { [name: string]: ComponentConf } } = {};
const globalComponentsByName: { [name: string]: ComponentConf } = {};

export class Plugin {
  sorter: { [key: string]: Sorter } = {};
  filter: { [key: string]: Filter } = {};
  formatter: { [key: string]: Formatter } = {};
  summary: { [key: string]: Summary } = {};
  components: { [scope: string]: { [name: string]: ComponentConf } } = {};
  expandRow: { [key: string]: ExpandRow } = {};
  rowSelection: { [key: string]: RowSelection } = {};
  autoWidth: { [key: string]: AutoWidth } = {};
  resize: { [key: string]: Resize } = {};
  raceConditionResolver!: RaceConditionResolver<FetcherOptions<any>, FetcherResponse<any>>;

  pluginMap: { [pluginName: string]: TablePlugin } = {};
  table: Table;

  constructor(table: Table) {
    this.table = table;
  }

  static globalUse(name: string, plugin: TablePlugin) {
    globalPlugin.push([name, plugin]);
  }

  static globalMixin(options: { components?: ComponentConf[] }) {
    if (options.components) {
      options.components.forEach(componentConf => {
        const { scope, name } = componentConf;
        globalComponents[scope] = globalComponents[scope] || {};
        globalComponents[scope][name] = componentConf;
        // 通过 component name 作为 key 保存组件，方便在没有传递 scope 时，直接通过 name 获取组件
        if (globalComponentsByName[name]) {
          console.error(`duplicate mixin component ${name} in plugin`);
        } else {
          globalComponentsByName[name] = componentConf;
        }
      });
    }
  }

  static getComponent(name: string, options: { scope?: string; logError?: boolean } = {}): ComponentConf | undefined {
    let componentConf: ComponentConf | undefined;
    if (options.scope) {
      componentConf = globalComponents[options.scope]?.[name];
    } else {
      componentConf = globalComponentsByName[name];
    }
    if (!componentConf) {
      if (options.logError !== false) {
        console.error(`cannot find component ${name} in table plugin`);
      }
      return;
    }
    return componentConf;
  }

  private assignTarget(target: { [key: string]: any }, sources: { type?: string }[] = []) {
    sources.forEach(item => {
      target[item.type!] = item;
    });
  }

  private getMergedPluginContent(source: { [key: string]: any }, incomingPlugin: { type?: string } | string = {}) {
    // 在获取 plugin 内容时，支持传递 type，或者传递 sorter、formatter 等配置，与 plugin 内对应 type 的内容进行合并
    if (isStr(incomingPlugin)) {
      return source[incomingPlugin] || {};
    }
    return merge({}, source[incomingPlugin.type!], incomingPlugin);
  }

  init() {
    globalPlugin.forEach(([pluginName, plugin]) => {
      this.table.plugin.use(pluginName, plugin);
    });
  }

  use(name: string, plugin: TablePlugin) {
    if (this.pluginMap[name]) {
      return;
    }
    this.pluginMap[name] = plugin;
    plugin.apply(this.table);
  }

  mixin(options: MixinOptions) {
    this.assignTarget(this.sorter, options.sorter);
    this.assignTarget(this.filter, options.filter);
    this.assignTarget(this.formatter, options.formatter);
    this.assignTarget(this.summary, options.summary);
    this.assignTarget(this.expandRow, options.expandRow);
    this.assignTarget(this.rowSelection, options.rowSelection);
    this.assignTarget(this.autoWidth, options.autoWidth);
    this.assignTarget(this.resize, options.resize);
    if (options.components) {
      options.components.forEach(componentConf => {
        const { scope, name } = componentConf;
        this.components[scope] = this.components[scope] || {};
        this.components[scope][name] = componentConf;
      });
    }
    if (options.raceConditionResolver) {
      this.raceConditionResolver = options.raceConditionResolver;
    }
  }

  getComponent(name: string | JSXComponent | undefined, options: { scope: string; logError?: boolean }) {
    if (!isStr(name)) {
      return { Component: name, defaultComponentProps: {} };
    }
    const componentConf = this.components[options.scope]?.[name] || Plugin.getComponent(name, options);
    if (!componentConf) {
      if (options.logError !== false) {
        console.error(`cannot find component ${name} in table plugin`);
      }
      return {};
    }
    return {
      Component: componentConf.component,
      defaultComponentProps: componentConf.defaultComponentProps,
    };
  }

  getFormatter(formatter?: string | Formatter | Formatter['formatterFn']): Formatter {
    if (isFn(formatter)) {
      return {
        formatterFn: formatter,
      };
    }
    return this.getMergedPluginContent(this.formatter, formatter);
  }

  getSorter(sorter?: string | Sorter | Sorter['sorterFn']): Sorter {
    sorter = isFn(sorter) ? { sorterFn: sorter } : sorter;
    const mergedPluginContent = this.getMergedPluginContent(this.sorter, sorter);

    // 为了解决用户只配置了 sorterFn 而没有配置 type: 'default' 导致 direction 不存在的问题（direction 配置在了 default 的插件中）
    // 如果入参有 sorter，但是 mergedPluginContent 中没有 directions 时用默认 directions 兜底
    if (sorter) {
      return {
        directions: ['ascend', 'descend'],
        ...mergedPluginContent,
      };
    }

    return mergedPluginContent;
  }

  getFilter(filter?: string | Filter): Filter {
    return this.getMergedPluginContent(this.filter, filter);
  }

  getSummary(summary?: string | Summary): Summary {
    return this.getMergedPluginContent(this.summary, summary);
  }

  getExpandRow(expandRow?: string | ExpandRow): ExpandRow {
    return this.getMergedPluginContent(this.expandRow, expandRow);
  }

  getRowSelection(rowSelection?: string | RowSelection): RowSelection {
    return this.getMergedPluginContent(this.rowSelection, rowSelection);
  }

  getAutoWidth(autoWidth?: string | AutoWidth): AutoWidth {
    return this.getMergedPluginContent(this.autoWidth, autoWidth);
  }

  getResize(resize: string | Resize): Resize {
    return this.getMergedPluginContent(this.resize, resize);
  }
  getRaceConditionResolver() {
    return this.raceConditionResolver;
  }
}
