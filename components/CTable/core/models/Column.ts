/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-13 21:14:57
 * @LastEditTime: 2021-12-14 20:34:23
 * @LastEditors: youjingyu
 * @Description:
 */
import { define, observable, action } from '@formily/reactive';
import type { Table } from './Table';
import type {
  Sorter,
  Filter,
  Formatter,
  // JSXComponent,
  ComponentProps,
  Summary,
  ComponentConfig,
  ElementType,
  // CellComponentConfig,
  // CellComponentPropsConfig,
  FilterValue,
  FilterDataSourceItem,
  SorterValue,
  // AllowEmpty,
  AutoWidth,
  Resize,
} from '../types';
import { LifeCycleTypes } from '../types';
// import { setComputedComponent, setComponentProps, formatComponentConfig } from '../shared';
import { getCellData, isFn } from '../../shared';

export interface ColumnConfig<DataItem extends Record<string, any> = any> {
  title: any;
  dataIndex?: string;
  width?: number | string;
  visible?: boolean;
  /**彻底隐藏该列，且不会出现在自定义列中 */
  hidden?: boolean;
  fixed?: 'left' | 'right';
  formatter?: string | Formatter<DataItem> | Formatter<DataItem>['formatterFn'];
  sorter?: string | Sorter | Sorter['sorterFn'];
  filter?: string | Filter<DataItem>;
  summary?: string | Summary<DataItem>;
  autoWidth?: string | AutoWidth<DataItem>;
  resize?: string | Resize;
  // todo
  // children?: AllowEmpty<ColumnConfig<DataItem>>[];
  // /**
  //  * @deprecated Use arcoColumnProps instead.
  //  */
  // libColumnComponentProps?: Record<string, any>;
  // /**
  //  * @deprecated Use component instead.
  //  */
  // cellComponent?: CellComponentConfig<DataItem>;
  // /**
  //  * @deprecated
  //  */
  // cellComponentProps?: CellComponentPropsConfig<DataItem>;
  component?: ElementType;
  componentProps?: Record<string, any>;
  cellDecorator?: ComponentConfig;
  cellDecoratorProps?: ComponentProps;
  // 支持注册基于 column 的插件
  type?: string;
}

export type ColumnConfigWithDataIndex<DataItem extends Record<string, any> = any> = ColumnConfig<DataItem> & {
  dataIndex: string;
};

// 可以配置为 string 的 Column 配置，在 merge globalColumnConfig 时，需要特殊处理，否则配置为 string 时，string 会把对象直接覆盖
export const CanBeStringColumnConfig = ['formatter', 'sorter', 'filter', 'summary', 'autoWidth'];

export class Column<DataItem extends Record<string, any> = any> {
  initialized = false;
  title!: string;
  width?: number | string;
  visible = true;
  hidden = false;
  dataIndex: string;
  // libColumnComponentProps?: ComponentProps;

  // filterComponentType?: JSXComponent;
  // filterComponentProps?: ComponentProps;
  // filterDecoratorType?: JSXComponent;
  // filterDecoratorProps?: ComponentProps;
  // filterIconComponentType?: JSXComponent;
  // filterIconComponentProps?: ComponentProps;

  filterVisible = false;
  filterValue?: FilterValue;
  sorterValue?: SorterValue;

  children?: Column<DataItem>[];
  // config: ColumnConfig & { dataIndex: string };
  table: Table<DataItem>;

  constructor(table: Table<DataItem>, config: ColumnConfigWithDataIndex) {
    this.table = table;
    this.dataIndex = config.dataIndex;
    this.initDataFromConfig();
    this.makeObservable();
    this.onInit();
  }

  // column 的 config 改为读取最新的 table.config
  get config(): ColumnConfigWithDataIndex {
    // 1. 在 column 没有配 dataIndex 的时候的补全方式: 使用该 column 在 columns 数组中的索引
    // 2. 暂时不支持 columns 数组的顺序、元素个数受控，即如果 columns 中的元素或元素顺序改变，不会生效。
    //    所以一定能根据 dataIndex 在 table.config.columns 中找到当前 column 实例的最新配置
    // const rawColumnConfig = this.table.config.columns?.find((c, index) => {
    //   if (c) {
    //     this.fixDataIndex(c, index);
    //     return c.dataIndex === this.dataIndex;
    //   }
    //   return false;
    // }) as ColumnConfig;
    // // 原来 Table 生成 Column 实例所用的 config 要经过处理，这里同样要处理
    // return this.fixColumnConfig(rawColumnConfig);
    return this.table.config.columns?.find(c => c && c.dataIndex === this.dataIndex) as ColumnConfigWithDataIndex;
  }

  get filter() {
    return this.table.plugin.getFilter(this.config.filter);
  }

  get filterComponentType() {
    return this.filter.component;
  }

  get filterComponentProps() {
    return this.filter.componentProps;
  }

  get filterDecoratorType() {
    return this.filter.decorator;
  }

  get filterDecoratorProps() {
    return this.filter.decoratorProps;
  }

  get filterIconComponentType() {
    return this.filter.icon;
  }

  get filterIconComponentProps() {
    return this.filter.iconProps;
  }

  get show() {
    return this.visible && !this.hidden;
  }

  // 注释: 以下实例属性和 filter 相关，而 filter 暂时不改为受控属性，所以以下写法保留
  // get filterComponent() {
  //   return [this.filterComponentType, this.filterComponentProps];
  // }
  // set filterComponent(value: ComponentConfig) {
  //   setComputedComponent(this, 'filterComponent', value);
  // }
  // get filterDecorator() {
  //   return [this.filterDecoratorType, this.filterDecoratorProps];
  // }
  // set filterDecorator(value: ComponentConfig) {
  //   setComputedComponent(this, 'filterDecorator', value);
  // }
  // get filterIconComponent() {
  //   return [this.filterIconComponentType, this.filterIconComponentProps];
  // }
  // set filterIconComponent(value: ComponentConfig) {
  //   setComputedComponent(this, 'filterIconComponent', value);
  // }

  get filterDataSource(): FilterDataSourceItem[] | undefined {
    const dataSource = this.filter.dataSource;
    // 直接不兼容 dataSource 老写法
    // const dataSource = this.filterComponentProps?.dataSource || this.filter.dataSource;
    if (dataSource === 'auto') {
      const uniqueValues = Array.from(
        new Set(this.table.initTotalData.map(item => getCellData(item, this.config.dataIndex))),
      );
      const { formatterFn, formatterMapping } = this.table.plugin.getFormatter(this.config.formatter);
      return uniqueValues.map(value => {
        let text = value;
        if (formatterMapping) {
          text = formatterMapping[text];
        }
        if (formatterFn) {
          text = formatterFn({
            cellData: text,
            column: this,
            table: this.table,
          });
        }
        return {
          value,
          text,
        };
      });
    } else if (isFn(dataSource)) {
      return dataSource({ table: this.table, column: this });
    }
    return dataSource;
  }

  private initDataFromConfig() {
    const { config } = this;
    this.title = config.title;
    this.width = config.width;
    if (config.visible !== undefined) {
      this.visible = config.visible;
    }
    if (config.hidden !== undefined) {
      this.hidden = config.hidden;
    }
    const filter = this.table.plugin.getFilter(this.config.filter);
    if (filter.defaultValue) {
      this.filterValue = filter.defaultValue;
    }
    const { defaultValue: defaultSorterValue } = this.table.plugin.getSorter(this.config.sorter);
    if (defaultSorterValue) {
      this.sorterValue = defaultSorterValue;
    }
    // this.libColumnComponentProps = config.libColumnComponentProps;
    // this.filterComponent = formatComponentConfig(filter.component, filter.componentProps);
    // this.filterDecorator = formatComponentConfig(filter.decorator, filter.decoratorProps);
    // this.filterIconComponent = formatComponentConfig(filter.icon, filter.iconProps);
  }

  private makeObservable() {
    const privateAction = {
      setComponentConfig: action,
    };

    define(this, {
      title: observable,
      width: observable,
      visible: observable,
      hidden: observable,

      show: observable.computed,
      // libColumnComponentProps: observable,

      // filterComponentType: observable,
      // filterComponentProps: observable,
      // filterDecoratorType: observable,
      // filterDecoratorProps: observable,
      // filterIconComponentType: observable,
      // filterIconComponentProps: observable,

      filterValue: observable,
      sorterValue: observable,
      filterVisible: observable,

      // filterComponent: observable.computed,
      // filterDecorator: observable.computed,
      // filterIconComponent: observable.computed,
      filterDataSource: observable.computed,

      setVisible: action,
      setHidden: action,
      setFilterValue: action,
      setSorterValue: action,
      setFilterVisible: action,
      setWidth: action,
      setTitle: action,

      // setFilterComponent: action,
      // setFilterComponentProps: action,
      // setFilterDecorator: action,
      // setFilterDecoratorProps: action,
      // setFilterIconComponent: action,
      // setFilterIconComponentProps: action,

      ...privateAction,
    });
  }

  private onInit() {
    this.initialized = true;
    this.table.notify(LifeCycleTypes.ON_COLUMN_INIT, { column: this });
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.table.notify(LifeCycleTypes.ON_COLUMN_VISIBLE_CHANGE, { column: this });
  }

  setHidden(hidden: boolean) {
    this.hidden = hidden;
  }

  setFilterValue(value: FilterValue) {
    this.filterValue = value;
  }

  setSorterValue(value: SorterValue) {
    this.sorterValue = value;
  }

  setFilterVisible(visible: boolean) {
    this.filterVisible = visible;
  }

  setWidth(width: number | string) {
    this.width = width;
  }

  setTitle(title: string) {
    this.title = title;
  }

  // 注释: 暂不暴露以下实例方法给使用者，即以下实例属性不支持通过 Table 的 api 修改

  // setFilterComponent(component: JSXComponent, props?: ComponentProps) {
  //   this.filterComponent = component;
  //   setComponentProps(this, 'filterComponent', props);
  // }
  // setFilterComponentProps(props: ComponentProps) {
  //   setComponentProps(this, 'filterComponent', props);
  // }
  // setFilterDecorator(component: JSXComponent, props?: ComponentProps) {
  //   this.filterDecorator = component;
  //   setComponentProps(this, 'filterDecorator', props);
  // }
  // setFilterDecoratorProps(props: ComponentProps) {
  //   setComponentProps(this, 'filterDecorator', props);
  // }
  // setFilterIconComponent(component: JSXComponent, props?: ComponentProps) {
  //   this.filterComponent = component;
  //   setComponentProps(this, 'filterIconComponent', props);
  // }
  // setFilterIconComponentProps(props: ComponentProps) {
  //   setComponentProps(this, 'filterIconComponent', props);
  // }
}
