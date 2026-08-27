/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-14 16:55:28
 * @LastEditTime: 2021-10-24 16:50:00
 * @LastEditors: youjingyu
 * @Description:
 */
import { define, observable, action } from '@formily/reactive';
import type { ComponentConfig, ToolbarComponentConfig, R } from '../../types';
import { LifeCycleTypes } from '../../types';
// import { ToolbarItem, ToolbarItemConfig } from './ToolbarItem';
import type { Table } from '../Table';
// import { setComputedComponent, formatComponentConfig, setComponentProps } from '../../shared';

// export interface ToolbarConfig<T extends { FormConfig?: any; FormField?: any } = {}> {
export interface ToolbarConfig<T extends R = any, GlobalScopeType extends R = any> {
  component?: ToolbarComponentConfig<T, GlobalScopeType>;
  // componentProps?: ComponentProps;
  decorator?: ComponentConfig;
  // decoratorProps?: ComponentProps;
  initialValues?: Record<string, any>;
}

export class Toolbar<Form = any> {
  loading = false;
  initialized = false;
  mounted = false;
  unmounted = false;
  // config: ToolbarConfig;

  // componentType?: JSXComponent;
  // componentProps?: ComponentProps;
  // decoratorType?: JSXComponent;
  // decoratorProps?: ComponentProps;

  // items: ToolbarItem[] = [];
  table: Table<any>;
  form!: Form;
  filterValues: Record<string, any> = {};

  constructor(table: Table<any>) {
    this.table = table;
    // this.config = config;
    this.initDataFromConfig();
    this.makeObservable();
    this.onInit();
  }

  get config() {
    return this.table.config.toolbar;
  }

  get component() {
    return this.config?.component;
  }

  get decorator() {
    return this.config?.decorator;
  }
  // get component() {
  //   return [this.config?.component, this.componentProps];
  // }
  // set component(value: ComponentConfig) {
  //   setComputedComponent(this, 'component', value);
  // }
  // get decorator() {
  //   return [this.decoratorType, this.decoratorProps];
  // }
  // set decorator(value: ComponentConfig) {
  //   setComputedComponent(this, 'decorator', value);
  // }

  private initDataFromConfig() {
    const { config } = this;
    // 支持配置 toolbar 的初始值
    if (config?.initialValues) {
      this.filterValues = config?.initialValues;
    }
    // this.component = formatComponentConfig(config.component, config.componentProps);
    // this.decorator = formatComponentConfig(config.decorator, config.decoratorProps);
  }

  private makeObservable() {
    const privateAction = {
      // setComponentConfig: action,
    };

    define(this, {
      // config: observable.computed,
      loading: observable,

      // componentType: observable,
      // componentProps: observable,
      // decoratorType: observable,
      // decoratorProps: observable,
      // items: observable,
      filterValues: observable,
      // component: observable.computed,
      // decorator: observable.computed,

      // createItem: action,
      setLoading: action,
      setFilterValues: action,

      // setComponent: action,
      // setComponentProps: action,
      // setDecorator: action,
      // setDecoratorProps: action,

      ...privateAction,
    });
  }

  private onInit() {
    this.initialized = true;
    this.table.notify(LifeCycleTypes.ON_TOOLBAR_INIT, { toolbar: this });
  }

  onMount() {
    this.mounted = true;
    this.unmounted = false;
    this.table.notify(LifeCycleTypes.ON_TOOLBAR_MOUNT, { toolbar: this });
  }

  onUnmount() {
    this.mounted = false;
    this.unmounted = true;
    this.table.notify(LifeCycleTypes.ON_TOOLBAR_UNMOUNT, { toolbar: this });
  }

  // ToolbarItem 领域模型没定，这个逻辑暂时留空
  // createItem(itemConfig: ToolbarItemConfig) {
  // if (itemConfig.name === undefined) {
  //   itemConfig.name = this.items.length.toString();
  // }
  // const toolbarItem = new ToolbarItem(itemConfig);
  // this.items.push(toolbarItem);
  // return toolbarItem;
  // return {};
  // }

  // setComponent(component: JSXComponent, props?: ComponentProps) {
  //   this.component = component;
  //   setComponentProps(this, 'component', props);
  // }
  // setComponentProps(props: ComponentProps) {
  //   setComponentProps(this, 'component', props);
  // }
  // setDecorator(component: JSXComponent, props?: ComponentProps) {
  //   this.decorator = component;
  //   setComponentProps(this, 'decorator', props);
  // }
  // setDecoratorProps(props: ComponentProps) {
  //   setComponentProps(this, 'decorator', props);
  // }

  setFormInstance(form: Form) {
    this.form = form;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  // getItemByName(name: string) {
  //   return this.items.find(item => item.name === name);
  // }

  setFilterValues(filerValues: Record<string, any>, options: { merge?: boolean } = {}) {
    if (options.merge) {
      this.filterValues = {
        ...this.filterValues,
        ...filerValues,
      };
    } else {
      this.filterValues = filerValues;
    }
    this.table.notify(LifeCycleTypes.ON_TOOLBAR_VALUE_CHANGE, { toolbar: this });
  }

  filter(filerValues?: Record<string, any>) {
    if (filerValues) {
      this.setFilterValues(filerValues);
    }
    this.table.toolbarFilter();
  }
}
