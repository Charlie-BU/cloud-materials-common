/*
 * @Author: youjingyu
 * @Date: 2021-09-14 10:46:43
 * @LastEditTime: 2021-12-15 11:57:49
 * @LastEditors: youjingyu
 * @Description:
 */
import type { Table, Column, Row, Cell } from '..';
import type { TaskPriority } from '../../arco/plugin/raceConditionResolver';
import type {
  ExpandRowComponentConfig,
  ExpandRowComponentPropsConfig,
  RowSelectionComponentConfig,
  RowSelectionComponentPropsConfig,
  FilterDropdownComponentConfig,
  FilterDropdownComponentPropsConfig,
  ComponentConfig,
  ComponentProps,
  R,
} from './component';

export * from './lifeCycle';
export * from './component';

export type BaseOptions<T extends R = any, GlobalScopeType extends R = any> = {
  table: Table<T, GlobalScopeType>;
};

export type FilterValue = any;
export type FilterValues = { [dataIndex: string]: FilterValue };
export type SorterValue = 'ascend' | 'descend';
export type SorterDirections = SorterValue[];
export type SorterValues = { [dataIndex: string]: SorterValue };

export type RowKeyConfig<DataItemType> = keyof DataItemType | ((record: DataItemType, index: number) => string);

export type FetcherResponse<T extends R = any, GlobalScopeType extends R = any> = {
  total?: number;
  data: T[];
  globalScope?: GlobalScopeType;
  // 在 load more 模式下，返回是否还有更多数据
  noMore?: boolean;
};

export enum TableMode {
  LOCAL = 'local',
  REMOTE = 'remote',
  LOAD_MORE = 'loadMore',
}

export type TableModeType = 'local' | 'remote' | 'loadMore';

export enum FetchTypes {
  INIT = 'init',
  CHANGE_PAGE = 'changePage',
  REFRESH = 'refresh',
  SORT = 'sort',
  FILTER = 'filter',
  LOAD_MORE = 'loadMore',
}

// 现阶段只有数据请求会导致 table 状态改变
// 由于 ts 无法将 enum 赋值为另一个变量，这里重复写了一遍 FetchTypes 的内容
export enum StatusChangeReason {
  INIT = 'init',
  CHANGE_PAGE = 'changePage',
  REFRESH = 'refresh',
  SORT = 'sort',
  FILTER = 'filter',
  LOAD_MORE = 'loadMore',
}

export type FetcherOptions<T extends R = any, GlobalScopeType extends R = any> = {
  table: Table<T, GlobalScopeType>;
  type: FetchTypes;
  pageSize: number;
  currentPage: number;
  offset: number;
  filterValues?: FilterValues;
  sorterValues?: SorterValues;
  showLoading?: boolean;
  taskPriority?: TaskPriority;
  isPooling?: boolean;
};

export type ExpandRow<T extends R = any, GlobalScopeType extends R = any> = {
  type?: string;
  collapseOthers?: boolean;
  expandable?: (options: { table: Table<T, GlobalScopeType>; row: Row<T>; rowData: T }) => boolean;
  unmountWhenParentTableRefresh?: boolean;
  component?: ExpandRowComponentConfig<T, GlobalScopeType>;
  componentProps?: ExpandRowComponentPropsConfig<T, GlobalScopeType>;
  decorator?: ComponentConfig;
  decoratorProps?: ComponentProps;
};

export type Summary<T extends R = any, GlobalScopeType extends R = any> = {
  type?: string;
  computedFn?: (
    options: {
      rows: Row<T>[];
      column: Column<T>;
    } & BaseOptions<T, GlobalScopeType>,
  ) => any;
};

export type FormatterFn<T extends R = any, GlobalScopeType extends R = any> = (
  options: {
    cellData: any;
    cell?: Cell;
    row?: Row<T>;
    rowData?: T;
    column: Column<T>;
  } & BaseOptions<T, GlobalScopeType>,
) => any;
export type Formatter<T extends R = any, GlobalScopeType extends R = any> = {
  // 内置 int 的格式化
  type?: string;
  // Todo 支持模板字符串
  formatterFn?: FormatterFn<T, GlobalScopeType>;
  // 支持定义数据映射，优先级低于 formatterFn
  formatterMapping?: R;
};

export type SorterFn = (sorterValue: SorterDirections[number], a: any, b: any) => number;
export type Sorter = {
  type?: string;
  directions?: SorterDirections;
  sorterFn?: SorterFn;
  defaultValue?: SorterValue;
  // 是否支持多列叠加排序，arco 现在还不支持
  multiple?: boolean;
};

export type FilterFn<T extends R = any, GlobalScopeType extends R = any> = (
  options: {
    filterValue: FilterValue;
    filterValues: FilterValues;
    cellData: any;
    // 因为过滤动作是基于所有数据的，而只有渲染了的数据才有 Row 的实例
    // 因此这里没有传递 Row 的实例，只传递 rowData
    rowData: T;
    column: Column<T>;
  } & BaseOptions<T, GlobalScopeType>,
) => boolean;
export type FilterDataSourceItem = {
  text: any;
  value: any;
  label?: any;
};
export type Filter<T extends R = any, GlobalScopeType extends R = any> = {
  type?: string;
  defaultValue?: FilterValue;
  multiple?: boolean;
  dataSource?:
    | 'auto'
    | FilterDataSourceItem[]
    | ((options: { table: Table<T, GlobalScopeType>; column: Column<T> }) => FilterDataSourceItem[]);
  component?: FilterDropdownComponentConfig<T, GlobalScopeType>;
  componentProps?: FilterDropdownComponentPropsConfig<T, GlobalScopeType>;
  // componentProps?: FilterDropdownComponentPropsConfig & {
  //   /**
  //    * @deprecated Use Filter.multiple instead.
  //    */
  //   multiple?: boolean;
  //   /**
  //    * @deprecated Use Filter.dataSource instead.
  //    */
  //   dataSource?:
  //     | 'auto'
  //     | FilterDataSourceItem[]
  //     | ((options: { table: Table<T>; column: Column<T> }) => FilterDataSourceItem[]);
  // };
  decorator?: ComponentConfig;
  decoratorProps?: ComponentProps;
  icon?: ComponentConfig;
  iconProps?: ComponentProps;
  filterFn?: FilterFn<T>;
  // 主要用于，通过 toolbar 联动触发列本身的过滤时，不希望展示列本身的过滤 icon
  hide?: boolean;
};

export type RowSelection<T extends R = any, GlobalScopeType extends R = any> = {
  type?: string;
  preserveCrossPageKeys?: boolean;
  multiple?: boolean;
  // 在 selectRowAll 支持跨页时，会计算未渲染的 row 的 selectable，此时 row 并不存在
  selectable?: (options: { table: Table<T, GlobalScopeType>; row?: Row<T>; rowData: T }) => boolean;
  component?: RowSelectionComponentConfig<T>;
  componentProps?: RowSelectionComponentPropsConfig<T>;
  decorator?: ComponentConfig;
  decoratorProps?: ComponentProps;
};

export type AutoWidth<T extends R = any, GlobalScopeType extends R = any> = {
  type?: string;
  getCellWidth?: (
    options: {
      row?: Row<T>;
      rowData?: T;
      column: Column<T>;
      cell?: Cell;
      cellData: any;
      content: any;
    } & BaseOptions<T, GlobalScopeType>,
  ) => number;
  getHeaderCellWidth?: (
    options: {
      column: Column<T>;
    } & BaseOptions<T, GlobalScopeType>,
  ) => number;
  maxWidth?: number;
  minWidth?: number;
  // 单元格的空白部分占的宽度，如 padding
  blankWidth?: number;
};

// 拖拽列配置
export type Resize = {
  type?: string;
  maxWidth?: number;
  minWidth?: number;
};

export type ToolbarPosition = 'left' | 'right';

export type AnyFunction = (...args: any[]) => any;

export type AllowEmpty<T> = false | undefined | T;

export type TableInitStatus = {
  pageSize?: number;
  currentPage?: number;
  columnFilterValues?: FilterValues;
  sorterValues?: SorterValues;
  toolbarValues?: Record<string, any>;
  activeRowKey?: string;
};
