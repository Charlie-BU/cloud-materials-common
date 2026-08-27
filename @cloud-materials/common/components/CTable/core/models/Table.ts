/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-13 20:58:58
 * @LastEditTime: 2021-12-15 14:56:06
 * @LastEditors: youjingyu
 * @Description:
 */
import { define, observable, action, batch, toJS } from '@formily/reactive';

import { merge, remove, isNumber, isInteger } from 'lodash-es';
import type { ColumnConfig, ColumnConfigWithDataIndex } from './Column';
import { Column, CanBeStringColumnConfig } from './Column';
import { Row } from './Row';
import type { ToolbarConfig } from './Toolbar';
import { Toolbar } from './Toolbar';
import { runEffects, runFetcher, getAutoWidth } from '../shared';

import type {
  TableModeType,
  FetcherOptions,
  ExpandRow,
  FilterValues,
  SorterValues,
  FetcherResponse,
  RowSelection,
  EffectCallback,
  EffectCallbackPayload,
  // JSXComponent,
  ComponentProps,
  ComponentConfig,
  SorterFn,
  SorterValue,
  RowComponentConfig,
  RowComponentPropsConfig,
  AllowEmpty,
  RowKeyConfig,
  TableInitStatus,
} from '../types';
import { TableMode, FetchTypes, LifeCycleTypes, StatusChangeReason } from '../types';
import { Plugin } from '../plugin';
import { mitt } from './mitt';
import { setCellData, getCellData, genRowKey, isStr } from '../../shared';
import type { TaskPriority } from '../../arco/plugin/raceConditionResolver';
import { isPromiseDiscardedError } from '@byted-c/storage.utils.safe-race';

export const DefaultStartPageNumber = 1;

export interface TableConfig<
  DataItemType extends Record<string, any> = any,
  GlobalScopeType extends Record<string, any> = any,
> {
  mode?: TableModeType;
  fetcher?: (
    options: FetcherOptions<DataItemType, GlobalScopeType>,
  ) => Promise<FetcherResponse<DataItemType, GlobalScopeType>>;
  data?: DataItemType[];
  rowKey?: RowKeyConfig<DataItemType>;
  pagination?: boolean | Record<string, any>;
  pageSize?: number;
  startPageNumber?: 0 | 1;
  width?: number;
  // 在完全自定义渲染 row 的场景，允许不传递 column
  columns?: AllowEmpty<ColumnConfig<DataItemType>>[];
  globalColumnConfig?: Partial<ColumnConfig<DataItemType>>;
  globalScope?: GlobalScopeType;
  // 领域模型不关心的配置，主要用于上层做自己的逻辑控制时的配置
  extraConfig?: Record<string, unknown>;
  beforeInit?: (options: { table: Table<DataItemType, GlobalScopeType> }) => Promise<GlobalScopeType>;
  // /**
  //  * @deprecated
  //  */
  // libTableComponentProps?:
  //   | Record<string, any>
  //   | ((table: Table<DataItemType>, originalProps: Record<string, any>) => Record<string, any>);

  component?: ComponentConfig;
  componentProps?: ComponentProps;
  decorator?: ComponentConfig;
  decoratorProps?: ComponentProps;
  rowComponent?: RowComponentConfig<DataItemType>;
  rowComponentProps?: RowComponentPropsConfig<DataItemType>;
  rowDecorator?: ComponentConfig;
  rowDecoratorProps?: ComponentProps;

  rowSelection?: string | RowSelection<DataItemType>;
  expandRow?: string | ExpandRow<DataItemType, GlobalScopeType>;
  toolbar?: ToolbarConfig;
  effects?: (options: { table: Table<DataItemType> }) => void;
  getInitStatus?: (options: { table: Table<DataItemType> }) => TableInitStatus;
  enableRaceCondition?: boolean;
}

// type TableConfigWithDataIndex<DataItemType extends Record<string, any> = any> = Omit<
//   TableConfig<DataItemType>,
//   'columns'
// > & {
//   columns: ColumnConfigWithDataIndex[] | undefined;
// };

// Todo table 生命周期、事件、钩子
export class Table<DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any> {
  status: {
    initialized: boolean;
    loading: boolean;
    loadMoreLoading?: boolean;
    // 在 load 模式下，判断是否还有更多数据
    noMore?: boolean;
    statusChangeReason?: StatusChangeReason;
    error?: Error;
  } = {
    initialized: false,
    loading: false,
    loadMoreLoading: false,
    noMore: false,
  };
  // initTotalData: 初始化时，传递的所有数据，相当于一个缓存，不会随着表格的操作而变化
  // totalData: 当前表格的所有数据，过滤、排序等操作，会基于 initTotalData 重新计算出 totalData
  // initTotalData、totalData 都不是响应式的，表格 UI 的响应式变化都来自 rows 的变化
  initTotalData: DataItemType[] = [];
  totalData: DataItemType[] = [];
  pageSize = 10;
  total = 0;
  currentPage!: number;
  startPageNumber!: 0 | 1;
  width?: number;
  // globalScope 设置默认值为空对象，保证业务方在 globalScope 赋值前能够访问
  globalScope: GlobalScopeType = {} as GlobalScopeType;
  // libTableComponentProps?:
  //   | Record<string, any>
  //   | ((table: Table<DataItemType>, originalProps: Record<string, any>) => Record<string, any>);

  // componentType?: JSXComponent;
  // componentProps?: ComponentProps;
  // decoratorType?: JSXComponent;
  // decoratorProps?: ComponentProps;

  // config: TableConfig<DataItemType>;
  _innerConfig!: TableConfig<DataItemType, GlobalScopeType>;
  columns: Column<DataItemType>[] = [];
  // 通过 dataIndex 保存 column。方便通过 dataIndex 查找 column
  columnMap: {
    [dataIndex: string]: Column<DataItemType>;
  } = {};
  rows: Row<DataItemType>[] = [];
  rowMap: { [rowKey: string]: Row<DataItemType> } = {};
  /* 缓存所有出现过的数据，包括初始化时设置的所有数据、loadMore 和分页模式下逐步加载的数据
   * 用于无论哪种情况下（包括没有渲染过的数据），都可以通过 selectedRowKeys 获取到对应的数据
   * 如果没有出现过的数据，则无法获取到，table 不保证能够获取到没有出现过的数据
   */
  dataMap: { [rowKey: string]: DataItemType } = {};
  toolbar?: Toolbar;
  plugin: Plugin;
  mitt: ReturnType<typeof mitt>;
  cachedSelectedRowKeys: string[] = [];
  initStatus?: TableInitStatus;

  constructor(config: TableConfig<DataItemType, GlobalScopeType>) {
    this.mitt = mitt();
    // plugin 暂时绑定在 table 实例级别，从而允许在在 plugin 中操作对应的 table
    this.plugin = new Plugin(this);
    this.plugin.init();
    this.runEffects(config);
    this.config = config;
    this.onInitConfig();

    this.config.columns?.forEach?.(c => {
      // 在 columns 配置列表中，可能会通过表达式过滤某些列
      // 为了方便使用，允许在表达式中返回 false 或者 undefined
      // 这里判断 c 是否存在
      if (c) {
        this.addColumn(c as ColumnConfigWithDataIndex);
      }
    });
    this.onInitColumn();

    this.initDataFromConfig();
    this.initTableStatus();
    this.makeObservable();
    this.onInit();
  }

  /**处理 columns */
  private fixColumns(config: TableConfig<DataItemType>): ColumnConfigWithDataIndex[] {
    let indexCount = 0;
    // 过滤掉无效 column 并使用空数组兜底
    const validColumns = (config.columns || []).filter(c => Boolean(c)) as ColumnConfig[];
    const fixedColumns = validColumns.map(c => {
      const newConfig = { ...c };
      // 如果用户没有传递 dataIndex, 使用自增的 indexCount 作为没有配 dataIndex 的替代
      const fixDataIndex = (config: ColumnConfig) => {
        if (config.dataIndex === undefined) {
          config.dataIndex = String(indexCount++);
        }
      };
      // 用户传递 string 类型的配置时，globalColumnConfig 和 ColumnConfig 无法 merge
      // string 会直接把对象覆盖，这里转为 { type: 'xxx' } 的形式
      const fixColumnConfig = (config: ColumnConfig) => {
        const copiedConfig = { ...config };
        (Object.keys(copiedConfig) as (keyof ColumnConfig)[]).forEach(key => {
          if (CanBeStringColumnConfig.includes(key) && isStr(copiedConfig[key])) {
            // 编译时的 ts 版本偏低，这里类型会报错，暂时忽略
            // @ts-ignore
            copiedConfig[key] = { type: copiedConfig[key] };
          }
        });
        return copiedConfig;
      };

      fixDataIndex(newConfig);

      // 暂时不考虑 column 包含 children 的情况
      // if (c.children) {
      //   column.children = [];
      //   c.children.forEach(child => {
      //     if (child) {
      //       fixDataIndex(child);
      //       this.columnMap[child.dataIndex!] = column;
      //       column.children!.push(new Column(this, child));
      //     }
      //   });
      // }

      return merge({}, fixColumnConfig(config.globalColumnConfig as ColumnConfig), fixColumnConfig(newConfig));
    });

    return fixedColumns as ColumnConfigWithDataIndex[];
  }

  get config() {
    return this._innerConfig;
  }

  // 把所有 config 的处理收敛在 Table 里，就不在 Column 或其他地方再去自己 format config
  set config(config: TableConfig<DataItemType>) {
    // table config 需要处理 columns
    this._innerConfig = {
      ...config,
      columns: this.fixColumns(config),
    };
  }

  get loading() {
    return this.status.loading;
  }

  // get component() {
  //   return [this.componentType, this.componentProps];
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

  get componentType() {
    return this.config.component;
  }

  get componentProps() {
    return this.config.componentProps;
  }

  get decoratorType() {
    return this.config.decorator;
  }

  get decoratorProps() {
    return this.config.decoratorProps;
  }

  get sumRowData() {
    const sumRowData: any = {};
    let hasSummary = false;
    this.columns.forEach(c => {
      const { computedFn } = this.plugin.getSummary(c.config.summary);
      if (computedFn) {
        hasSummary = true;
        setCellData(sumRowData, c.config.dataIndex, computedFn({ rows: this.rows, column: c, table: this }));
      }
    });
    return hasSummary ? sumRowData : undefined;
  }

  /** 列的过滤值 */
  get columnFilterValues() {
    return this.columns.reduce((filterValues, column) => {
      if (column.filterValue) {
        filterValues[column.config.dataIndex] = column.filterValue;
      }
      return filterValues;
    }, {} as FilterValues);
  }

  set columnFilterValues(values: FilterValues) {
    Object.keys(values).forEach(dataIndex => {
      this.getColumnByDataIndex(dataIndex)?.setFilterValue?.(values[dataIndex]);
    });
  }

  /** table.columnFilterValues 和 table.toolbar.filterValues 的合并 */
  get filterValues() {
    return {
      ...this.columnFilterValues,
      ...this.toolbar?.filterValues,
    };
  }

  get sorterValues() {
    return this.columns.reduce((sorterValues, column) => {
      if (column.sorterValue) {
        sorterValues[column.config.dataIndex] = column.sorterValue;
      }
      return sorterValues;
    }, {} as SorterValues);
  }

  set sorterValues(values: SorterValues) {
    Object.keys(values).forEach(dataIndex => {
      this.getColumnByDataIndex(dataIndex)?.setSorterValue?.(values[dataIndex]);
    });
  }

  get selectedRowKeys() {
    const rowSelection = this.plugin.getRowSelection(this.config.rowSelection);
    /* 本地模式或者明确声明了记住 selectedRowKey 的情况，返回缓存的 cachedSelectedRowKeys
     * 在 table 的数据刷更新后（刷新、过滤、排序、切页等），cachedSelectedRowKeys 中可能包含消失的数据
     * 1. 本地模式：在 table 数据更新后，通过 this.diffCachedRowKeySafe 去除不存在的数据的 key
     * 2. 远程模式 + 分页：无解。用户各种操作后，刷新数据，这时当前页消失了一部分数据，
     *    但当前页内没有的数据，不代表其它页没有，table 无法安全地 diff
     *    因此设置 preserveCrossPageKeys 为 true 时，在远程分页模式下，不保证 selectedRowKeys 返回的数据一定是当前存在的数据
     */
    if (rowSelection.preserveCrossPageKeys === true || this.isLocalMode()) {
      // map 转换一下，使 selectedRowKeys 为非 proxy 的数组，和原来的行为保持一致，避免历史代码报错
      return this.cachedSelectedRowKeys.map(key => key);
    }
    // 远程模式、loadMore 模式，通过当前展示的 row 计算出 selectedRowKey
    return this.rows.filter(row => row.isSelected).map(item => item.key);
  }

  get selectedRowData() {
    const data: DataItemType[] = [];
    this.selectedRowKeys.forEach(key => {
      if (this.dataMap[key] !== undefined) {
        // 2023-12-01 更新, dataMap 变为 shallow 后，会把里面的数据变为 Proxy
        data.push(toJS(this.dataMap[key]));
      }
    });
    return data;
  }

  get columnsAutoWidth(): Record<string, number> | undefined {
    return getAutoWidth(this);
  }

  private initDataFromConfig() {
    const { config } = this;
    this.startPageNumber = config.startPageNumber ?? DefaultStartPageNumber;
    this.width = config.width;
    this.currentPage = this.startPageNumber;
    if (config.pageSize !== undefined) {
      this.pageSize = config.pageSize;
    }
    // this.libTableComponentProps = config.libTableComponentProps;

    // this.component = formatComponentConfig(config.component, config.componentProps);
    // this.decorator = formatComponentConfig(config.decorator, config.decoratorProps);

    if (config.data || config.globalScope) {
      this.initData({
        data: config.data,
        globalScope: config.globalScope,
      });
    }
    if (config.toolbar) {
      this.toolbar = new Toolbar(this);
    }
  }

  private initTableStatus() {
    if (!this.config.getInitStatus) return;
    const tableInitStatus = this.config.getInitStatus({ table: this });
    if (!tableInitStatus) return;
    this.initStatus = tableInitStatus;
    // 需要对数据合法性做校验
    if (tableInitStatus.pageSize !== undefined) {
      // pageSize 只要是合法数字就行，兜底值 10
      this.pageSize =
        isInteger(tableInitStatus.pageSize) && tableInitStatus.pageSize > 0 ? tableInitStatus.pageSize : 10;
    }
    if (tableInitStatus.currentPage !== undefined) {
      // currentPage 只要是合法数字就行，兜底值 1
      this.currentPage =
        isInteger(tableInitStatus.currentPage) && tableInitStatus.currentPage > 0
          ? tableInitStatus.currentPage
          : this.startPageNumber;
    }
    if (tableInitStatus.columnFilterValues !== undefined) {
      // 错误的 dataIndex 不会有影响，但是没法感知 filterValue 是否是错误的
      this.columnFilterValues = tableInitStatus.columnFilterValues;
    }
    if (tableInitStatus.sorterValues !== undefined) {
      // 不用特殊处理
      // 1. sorterValues 会按照 dataIndex 赋值，所以错误的 dataIndex 不会有影响
      // 2. 错误的 sorterValue 也会被 arco 过滤掉
      this.sorterValues = tableInitStatus.sorterValues;
    }
    if (tableInitStatus.toolbarValues !== undefined) {
      // todo: 如果 toolbar item 因为错误的值而报错，应该怎么展示
      this.toolbar?.setFilterValues?.(tableInitStatus.toolbarValues);
    }
  }

  private makeObservable() {
    // ts 会认为 this 不存在 private 的属性
    // 因此单独处理 private 的 action
    const privateAction = {
      makeRows: action,
      fetchData: action,
      toggleData: action,
      toggleLoadMoreData: action,
      setComponentConfig: action,
    };
    define(this, {
      // Todo observable 默认代表 observable.deep
      // 验证 columns、rows 的劫持是否重复
      // 查看源码得知：对于非 object 类型，observable.ref 和 observable 没有区别
      status: observable,
      pageSize: observable,
      total: observable,
      width: observable,
      globalScope: observable,
      // libTableComponentProps: observable,

      // componentType: observable,
      // componentProps: observable,
      // decoratorType: observable,
      // decoratorProps: observable,

      columns: observable,
      initTotalData: observable.shallow,
      rows: observable.shallow,
      rowMap: observable.shallow,
      cachedSelectedRowKeys: observable,

      loading: observable.computed,
      // component: observable.computed,
      // decorator: observable.computed,
      sumRowData: observable.computed,
      filterValues: observable.computed,
      columnFilterValues: observable.computed,
      sorterValues: observable.computed,
      selectedRowKeys: observable.computed,
      selectedRowData: observable.computed,
      // 2023-11-20 更新，将 dataMap 变为 observable.shallow，修复 dataMap 改变了，但是 selectedRowData 没有重新计算的问题
      dataMap: observable.shallow,
      columnsAutoWidth: observable.computed,

      ...privateAction,

      // setComponent: action,
      // setComponentProps: action,
      // setDecorator: action,
      // setDecoratorProps: action,

      setData: action,
      toggleLoading: action,
      setGlobalScope: action,
      reset: action,
      initData: action,
      loadMoreData: action,
      addColumn: action,
      refresh: action,
      changePage: action,
      sort: action,
      filter: action,
      expendRow: action,
      toggleColumns: action,
      selectRow: action,
      selectRowAll: action,
      dragRow: action,
      deleteRow: action,
      addRow: action,
      addRows: action,
      setWidth: action,
      clearSelectedRow: action,
    });
  }

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

  setWidth(width: number) {
    this.width = width;
  }

  on(type: string, callback: EffectCallback) {
    this.mitt.on(type, callback);
  }

  removeEventListener(type: string, callback: EffectCallback) {
    this.mitt.off(type, callback);
  }

  notify(type: string, payload?: EffectCallbackPayload) {
    this.mitt.emit(type, payload);
  }

  private runEffects(config: TableConfig<DataItemType>) {
    if (!config.effects) {
      return;
    }
    const effects = runEffects(this, config.effects);
    effects.forEach(({ type, callback }) => {
      this.on(type, payload => {
        callback(this, payload);
      });
    });
  }

  // Todo 验证事件钩子是否需要定义为 batch/action 动作
  private onInitConfig() {
    this.notify(LifeCycleTypes.ON_TABLE_INIT_CONFIG);
  }

  private onInitColumn() {
    this.notify(LifeCycleTypes.ON_TABLE_INIT_COLUMN);
  }

  private onInit() {
    this.status.initialized = true;
    this.notify(LifeCycleTypes.ON_TABLE_INIT);
  }

  shouldUseFetcher() {
    return this.isRemoteMode() || this.isLoadMoreMode();
  }

  isRemoteMode() {
    const { mode } = this.config;
    if (this.config.fetcher && !mode) {
      // 如果配置了 fetcher，并且没有配置 mode，默认为 remote 模式
      return true;
    }
    return this.config.mode === TableMode.REMOTE;
  }

  isLoadMoreMode() {
    return this.config.mode === TableMode.LOAD_MORE;
  }

  isLocalMode() {
    return this.config.mode === TableMode.LOCAL;
  }

  getColumnByDataIndex(dataIndex: string) {
    return this.columnMap[dataIndex];
  }

  getRowByRowKey(rowKey: string): Row<DataItemType> | undefined {
    return this.rowMap[rowKey];
  }

  private makeRows(data: DataItemType[], options: { append?: boolean } = {}) {
    let expandedRowKey: string[] = [];
    // 在 load more 的模式下，是向表格中追加数据
    // 否则清空数据，再填充
    if (options.append !== true) {
      // 在刷新 table 的场景下，记录展开的行，用于恢复当前页展开行的展开状态
      expandedRowKey = this.rows.filter(item => item.isExpanded).map(item => item.key);
      this.rowMap = {};
      this.rows = [];
    }
    // TODO 如果不复制一遍数组，无法触发更新，验证原因
    this.rows = [...this.rows];

    data.forEach((item, index) => {
      const rowKey = genRowKey(item, this.getOffsetIndexInAllData(index), this.config.rowKey);
      const row = new Row({
        table: this,
        rowData: item,
        rowKey,
        expanded: expandedRowKey.includes(rowKey),
        pageNumber: this.currentPage,
        offsetIndexInAllData: this.getOffsetIndexInAllData(index),
      });
      if (this.rowMap[row.key]) {
        console.error(`duplicate rowKey '${row.key}', it may cause some functions to be unavailable`);
      }
      this.rowMap[row.key] = row;
      this.rows.push(row);
    });
    this.notify(LifeCycleTypes.ON_TABLE_UPDATE_ROW_END);
  }

  private getOffsetIndexInAllData(index: number, currentPage?: number) {
    const curPage = currentPage === undefined ? this.currentPage : currentPage;
    // 计算在所有数据中的 offset
    return this.pageSize * (curPage - this.startPageNumber) + index;
  }

  private getCurrentPageData() {
    const start = (this.currentPage - this.startPageNumber) * this.pageSize;
    return this.totalData?.slice?.(start, start + this.pageSize);
  }

  private cacheData(data: DataItemType[], currentPage?: number) {
    data.forEach((item, index) => {
      const rowKey = genRowKey(
        item,
        // 在 toggleData 中，data 是所有数据，因此使用 this.startPageNumber
        // 在 toggleLoadMoreData 中，data 是当前页数据，以 currentPage 为准
        this.getOffsetIndexInAllData(index, currentPage ?? this.startPageNumber),
        this.config.rowKey,
      );
      this.dataMap[rowKey] = item;
    });
  }

  private diffCachedRowKeySafe() {
    if (this.isLocalMode()) {
      // 在本地模式中，数据更新后，从 cachedSelectedRowKeys 中剔除不存在的 key
      const currentRowKeys = this.initTotalData.map((item, index) =>
        genRowKey(item, this.getOffsetIndexInAllData(index, this.startPageNumber), this.config.rowKey),
      );
      remove(this.cachedSelectedRowKeys, key => !currentRowKeys.includes(key));
    }
  }

  private tryClearCachedRowKey(action: FetchTypes) {
    const rowSelection = this.plugin.getRowSelection(this.config.rowSelection);
    /* 当前，远程模式默认情况下是从当前展示的 row 中获取选中的 key，不会返回跨页的 key
     * 如果用户在跨页操作时，发现 key 是保留的，但是最后又拿不到所有的 key 会觉得奇怪
     * 因此在切换分页时，清空 cachedSelectedRowKeys，不保留跨页的选中状态
     */
    if (this.isRemoteMode() && rowSelection.preserveCrossPageKeys !== true && action === FetchTypes.CHANGE_PAGE) {
      this.cachedSelectedRowKeys = [];
    }
  }

  private toggleData(options: {
    totalData?: DataItemType[];
    initTotalData?: DataItemType[];
    total?: number;
    currentPage?: number;
    globalScope?: GlobalScopeType;
    type?: FetchTypes;
    isFullUpdate?: boolean;
  }) {
    this.notify(LifeCycleTypes.ON_TABLE_UPDATE_DATA_START, { isFullUpdate: options.isFullUpdate ?? true });
    if (options.totalData) {
      this.totalData = options.totalData;
      this.total = this.totalData?.length;
    }
    if (options.initTotalData) {
      this.initTotalData = options.initTotalData;
    }
    if (options.total !== undefined) {
      this.total = options.total;
    }
    if (options.currentPage !== undefined) {
      this.currentPage = options.currentPage;
    }
    if (options.globalScope) {
      this.setGlobalScope(options.globalScope);
    }

    let currentData: DataItemType[];
    // 在远程模式或者没有的分页的情况，直接替换数据（loadMore 模式会单独用 toggleLoadMoreData，这里不考虑 loadMore）
    if (this.isRemoteMode() || this.config.pagination === false) {
      currentData = this.totalData;
    } else {
      currentData = this.getCurrentPageData();
    }
    if (options.initTotalData) {
      // 如果设置了所有数据，缓存到 dataMap 中
      this.cacheData(options.initTotalData, options.currentPage);
      this.diffCachedRowKeySafe();
    }
    if (currentData) {
      // 在生成新的 row 之前尝试清空 cachedRowKey
      // 否则在 onRowInit 事件中选中 row 后，会被清空，导致设置失效
      options.type && this.tryClearCachedRowKey(options.type);
      this.makeRows(currentData);
    }
    // 挪动原因：ON_TABLE_UPDATE_DATA_END钩子里取selectRowData为[]，原因是dataMap还未赋值，cacheData中对dataMap赋值
    this.notify(LifeCycleTypes.ON_TABLE_UPDATE_DATA_END, {
      isFullUpdate: options.isFullUpdate ?? true,
      type: options.type,
    });
  }

  // 在 load more 模式下的数据更新
  private toggleLoadMoreData(options: {
    data: DataItemType[];
    currentPage: number;
    globalScope?: GlobalScopeType;
    noMore?: boolean;
  }) {
    // 如果回到了第一页（比如在刷新的时候），直接覆盖数据
    const shouldClearData = options.currentPage === this.startPageNumber;
    if (shouldClearData) {
      this.totalData = options.data;
    } else {
      // 追加数据
      this.totalData.push(...options.data);
    }
    this.initTotalData = this.totalData;
    this.currentPage = options.currentPage;
    if (options.globalScope) {
      this.setGlobalScope(options.globalScope);
    }
    this.status.noMore = options.noMore;
    this.notify(LifeCycleTypes.ON_TABLE_UPDATE_DATA_END, { type: FetchTypes.LOAD_MORE });
    this.cacheData(options.data, this.currentPage);
    // loadMore 模式下，不通过分页参数来截取当前页数据，fetcher 返回什么数据，就追加什么数据
    // 因为在滚动加载模式下，后端可能返回的 pageSize 是不定的
    // this.makeRows(this.getCurrentPageData(), { append: !shouldClearData });
    this.makeRows(options.data, { append: !shouldClearData });
  }

  toggleLoading(options: { loading: boolean; showLoading?: boolean }) {
    if (options.showLoading === false) {
      return;
    }
    if (options.loading === true) {
      if (this.status.statusChangeReason === StatusChangeReason.LOAD_MORE) {
        this.status.loadMoreLoading = true;
      } else {
        this.status.loading = true;
      }
    } else {
      this.status.loading = false;
      this.status.loadMoreLoading = false;
    }
  }

  private async runBeforeInitHook() {
    if (!this.config.beforeInit) {
      return;
    }
    const globalScope = await this.config.beforeInit({ table: this });
    this.setGlobalScope(globalScope);
  }

  private async fetchData(options: Partial<FetcherOptions> & { type: FetchTypes }) {
    const currentPage = options.currentPage === undefined ? this.currentPage : options.currentPage;
    const mergedOptions: FetcherOptions = {
      table: this,
      pageSize: this.pageSize,
      offset: (currentPage - this.startPageNumber) * this.pageSize,
      ...options,
      currentPage,
      filterValues: this.filterValues,
      sorterValues: this.sorterValues,
    };
    this.status.statusChangeReason = mergedOptions.type as unknown as StatusChangeReason;
    this.toggleLoading({ loading: true, showLoading: options.showLoading });
    this.status.error = undefined;
    let res: FetcherResponse<DataItemType>;
    let fixedCurrentPage = currentPage; // 经过修正后的currentPage, 如果不需要修正，该值就和currentPage 一样

    try {
      if (mergedOptions.type === FetchTypes.INIT) {
        await this.runBeforeInitHook();
      }

      this.notify(LifeCycleTypes.ON_FETCH_START, { fetcherOptions: mergedOptions });
      // 获取解决静态问题实例
      const raceConditionResolve = this.plugin.getRaceConditionResolver();
      if (this.config.enableRaceCondition && this.config.fetcher) {
        /**
         * 2024-2-27：因为 useCreateTable中在每次重新渲染时config都被重新赋值，
         * 导致轮询的时候fetcher函数也被更新，所以这里每次都重新 setFetcher
         */
        raceConditionResolve.setFetcher(this.config.fetcher);
      }
      const { fetcherResp, pageNumber } = await runFetcher({
        fetcher: this.config.enableRaceCondition ? raceConditionResolve.wrapFetcher : this.config.fetcher,
        // 调用fetchData，除定时任务调用属于低优任务，其他任务处于高优
        fetcherOptions: mergedOptions,
        startPageNumber: this.startPageNumber,
        isLoadMore: this.isLoadMoreMode(),
      });
      res = fetcherResp;
      fixedCurrentPage = pageNumber;
      // 在请求成功后，再次将 error 状态置为空
      // 在请求频繁发起的场景（如搜索），在前面的请求还没 resolve 时，后面的请求动作已经同步地将 error 置为空了
      // 如果前面的请求报错了，status.error 就会被置为 error，这个时候没人来将 error 置为空了
      // 如果后面的请求返回的数据条数为 0，就会导致展示错误界面
      this.status.error = undefined;
    } catch (_error) {
      // 开启竞态有高优任务执行
      if (isPromiseDiscardedError(_error)) {
        return;
      }
      /**
       * 如果是取消请求的 error，直接返回，不让 table 的 loading 消失，否则界面可能会闪一下
       *
       * 这里有一个约定：某个请求被取消后，一定还有一个正常请求被发出去了，这个请求完成后会触发 table 的状态变化，否则可能一直处于 loading 状态
       *
       * 另外还存在一个问题：虽然 return 后不会隐藏 loading，但是 table 还是会继续 render
       * 在 table 初始化时，toolbar.bottomLeft 会先于正常数据出现，判断逻辑在 shouldHideBottomButton：CTable/arco/utils/controlPagination.tsx
       * 初步考虑接受该状态，避免判断逻辑过于复杂
       */
      if ((_error as any).__CANCEL__) {
        console.warn('table fetcher cancel error:', _error);
        return;
      }
      // 业务方可能没有监听 ON_FETCH_ERROR 事件，从而导致一些语法报错问题无法发现
      // 这里输出 error
      const error = _error as unknown as Error;
      console.error('table fetcher error: ', error);
      this.status.error = error;
      this.notify(LifeCycleTypes.ON_FETCH_ERROR, { fetcherOptions: mergedOptions, error });
      this.toggleLoading({ loading: false });
      return;
    }
    this.notify(LifeCycleTypes.ON_FETCH_END, { fetcherOptions: mergedOptions });
    batch(() => {
      if (this.isLoadMoreMode()) {
        this.toggleLoadMoreData({
          data: res.data || [],
          // load more 模式可能也有删除功能，但暂时不考虑删除情况。保持使用  mergedOptions.currentPage作为当前页码
          currentPage: mergedOptions.currentPage,
          globalScope: res.globalScope,
          noMore: res.noMore,
        });
      } else if (this.isLocalMode()) {
        this.toggleData({
          initTotalData: res.data || [],
          // 在本地模式下，每次点击刷新后要依然保持filter和sorter生效。所以要在数据分页前先对totalData做一个过滤和排序
          totalData: this.filterAndSortData(res.data || []),
          currentPage: fixedCurrentPage,
          globalScope: res.globalScope,
          type: mergedOptions.type,
        });
      } else {
        // remote mode
        this.toggleData({
          totalData: res.data || [],
          initTotalData: res.data || [],
          total: res.total,
          // fixedCurrentPage 可能是 mergedOptions.currentPage 超出页码范围后被修正的。需要使用fixedCurrentPage作为当前页码
          currentPage: fixedCurrentPage,
          globalScope: res.globalScope,
          type: mergedOptions.type,
        });
      }
      this.toggleLoading({ loading: false });
    });
  }

  // 对 column 做的处理包括:
  // 1. 如果没有 dataIndex，则使用
  addColumn(c: ColumnConfigWithDataIndex) {
    // 如果用户没有传递 dataIndex，用 column length 模拟
    // const fixDataIndex = (config: ColumnConfig) => {
    //   if (config.dataIndex === undefined) {
    //     config.dataIndex = this.columns.length.toString();
    //   }
    // };
    // 用户传递 string 类型的配置时，globalColumnConfig 和 ColumnConfig 无法 merge
    // string 会直接把对象覆盖，这里转为 { type: 'xxx' } 的形式
    // const fixColumnConfig = (config: ColumnConfig) => {
    //   const copiedConfig = { ...config };
    //   (Object.keys(copiedConfig) as (keyof ColumnConfig)[]).forEach(key => {
    //     if (CanBeStringColumnConfig.includes(key) && isStr(copiedConfig[key])) {
    //       // 编译时的 ts 版本偏低，这里类型会报错，暂时忽略
    //       // @ts-ignore
    //       copiedConfig[key] = { type: copiedConfig[key] };
    //     }
    //   });
    //   return copiedConfig;
    // };
    // fixDataIndex(c);
    // const column = new Column(
    //   this,
    //   merge({}, fixColumnConfig(this.config.globalColumnConfig as ColumnConfig), fixColumnConfig(c)),
    // );
    const column = new Column(this, c);
    // if (c.children) {
    //   column.children = [];
    //   c.children.forEach(child => {
    //     if (child) {
    //       fixDataIndex(child);
    //       this.columnMap[child.dataIndex!] = column;
    //       column.children!.push(new Column(this, child));
    //     }
    //   });
    // }
    if (this.columnMap[column.dataIndex]) {
      console.error(`duplicate dataIndex '${column.dataIndex}', it may cause some functions to be unavailable`);
    }
    this.columnMap[column.dataIndex] = column;
    this.columns.push(column);
  }

  async initData(options?: { data?: DataItemType[]; globalScope?: GlobalScopeType }) {
    if (options && (options.data || options.globalScope)) {
      this.toggleData({
        totalData: options.data,
        initTotalData: options.data,
        globalScope: options.globalScope,
      });
      return;
    }
    if (this.config.fetcher) {
      return this.fetchData({
        type: FetchTypes.INIT,
      });
    }
  }

  setData(options: {
    totalData: DataItemType[];
    currentPage?: number;
    reset?: boolean;
    total?: number;
    isFullUpdate?: boolean;
  }) {
    // 对 totalData 进行兜底，虽然 ts 类型上限制了必须传 totalData，但是业务也有传入了 undefined 的情况
    const totalData = options.totalData || [];
    batch(() => {
      // 在重新设置数据时，默认重置 table 状态
      if (options.reset !== false) {
        this.reset();
      }
      this.toggleData({
        // 重新设置数据后，也要保持数据的过滤效果
        totalData: this.filterAndSortData(totalData),
        initTotalData: totalData,
        currentPage: options.currentPage,
        total: options.total,
        isFullUpdate: options.isFullUpdate,
      });
    });
  }

  setGlobalScope(globalScope: GlobalScopeType) {
    this.globalScope = Object.assign(this.globalScope || {}, globalScope);
  }

  // 在本地模式下，如展示文件上传列表，可以清空 table 状态，然后重新上传文件
  reset() {
    this.currentPage = this.startPageNumber;
    // 以空数据执行一次排序和过滤
    this.sort({});
    this.filter({});
    // todo：是否清空 row 的状态，现阶段主要是在重新设置数据后
    // 希望清空当前的页码、排序、过滤等
    // column、row、cell 的状态过多，等以后有确定的诉求的时候，再考虑清除
  }

  // 业务在后台定时刷新 table 的时候，希望不出现 loading
  refresh(
    options: {
      showLoading?: boolean;
      resetPageNumber?: boolean;
      resetSelectedRows?: boolean;
      taskPriority?: TaskPriority;
      isPooling?: boolean;
    } = {},
  ) {
    // 如果配置了 resetSelectedRows，则刷新前清空已选的行
    if (options.resetSelectedRows) {
      this.clearSelectedRow();
    }
    // 在刷新的场景下，只要配置了 fetcher，就调用 fetcher
    // 本地模式下，也调用 fetcher，重置数据
    if (this.config.fetcher) {
      // 默认情况下，load more 模式、配置了 fetcher 的本地模式，刷新时，回到第一页
      // 远程模式，不回到第一页
      let pageNumber = this.isLocalMode() || this.isLoadMoreMode() ? this.startPageNumber : undefined;
      // 如果强制指定了 resetPageNumber，以参数为准
      if (options.resetPageNumber !== undefined) {
        pageNumber = options.resetPageNumber ? this.startPageNumber : undefined;
      }
      return this.fetchData({
        type: FetchTypes.REFRESH,
        currentPage: pageNumber,
        showLoading: options.showLoading,
        taskPriority: options.taskPriority,
        isPooling: options.isPooling,
      });
    }
    this.toggleData({
      currentPage: this.startPageNumber,
    });
  }

  loadMoreData() {
    this.fetchData({
      type: FetchTypes.LOAD_MORE,
      currentPage: this.currentPage + 1,
    });
  }

  changePage(pageNumber: number, pageSize?: number) {
    this.notify(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_START);
    if (pageSize !== undefined && this.pageSize !== pageSize) {
      this.pageSize = pageSize;
    }
    if (this.shouldUseFetcher()) {
      return this.fetchData({
        type: FetchTypes.CHANGE_PAGE,
        currentPage: pageNumber,
      }).then(() => {
        if (!this.status.error) {
          this.notify(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_END);
        }
      });
    }
    this.toggleData({
      currentPage: pageNumber,
      type: FetchTypes.CHANGE_PAGE,
    });
    this.notify(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_END);
  }

  // getFilterFns 获取的 filterFn 实际上只会在本地模式下会调用
  private getFilterFns() {
    const filterFns: ((rowData: DataItemType) => boolean)[] = [];
    // 获取所有过滤函数
    this.columns.forEach(c => {
      // 这里取 filterValue 的逻辑和远程模式保持一致，如果 toolbar.filterValues 的 key 如果和 column dataIndex 对得上，优先取 toolbar 中的值
      const filterValue = this.toolbar?.filterValues?.[c.config.dataIndex] || c.filterValue;
      if (filterValue) {
        const { filterFn } = this.plugin.getFilter(c.config.filter);
        if (filterFn) {
          filterFns.push((rowData: DataItemType) =>
            filterFn({
              filterValue,
              filterValues: this.filterValues,
              cellData: getCellData(rowData, c.config.dataIndex),
              rowData,
              column: c,
              table: this,
            }),
          );
        }
      }
    });
    return filterFns;
  }

  private getSorterInfos() {
    const sorterInfos: {
      dataIndex: string;
      sorterFn: SorterFn;
      sorterValue: SorterValue;
    }[] = [];
    this.columns.forEach(c => {
      if (c.sorterValue) {
        const { sorterFn } = this.plugin.getSorter(c.config?.sorter);
        if (sorterFn) {
          sorterInfos.push({
            dataIndex: c.config.dataIndex,
            sorterFn,
            sorterValue: c.sorterValue,
          });
        }
      }
    });
    return sorterInfos;
  }

  /** 使用当前的filter和sorter对传入的数据进行处理 */
  private filterAndSortData(data: DataItemType[]) {
    // （这里应该可以优化，从而不用执行重复的过滤和排序动作，但是复杂度比较高）
    const filterFns = this.getFilterFns();
    const sorterInfos = this.getSorterInfos();
    let resultData = [...data];
    if (filterFns.length > 0) {
      resultData = resultData.filter(rowData => filterFns.every(fn => fn(rowData)));
    }
    if (sorterInfos.length > 0) {
      // sort 操作是原地排序，避免影响原始数据
      resultData = [...resultData];
      // Todo 处理多列排序的优先级问题（是否可以在每一行执行多列的排序函数，取多个结果的且，从而不用循环多次数据）
      sorterInfos.forEach(({ dataIndex, sorterFn, sorterValue }) => {
        resultData = resultData.sort((a, b) => {
          return sorterFn(sorterValue, getCellData(a, dataIndex), getCellData(b, dataIndex));
        });
      });
    }
    return resultData;
  }

  // 用户可能操作排序、再操作过滤（或反之，或一直反复操作），各种操作的效果应该叠加
  // 远程模式下，用户的排序、过滤操作统一交给 fetcher 处理
  // 在本地模式下，统一交给 handleLocalData 处理
  private handleLocalData(options: { type: FetchTypes }) {
    // 不管用户如何操作，拿到当前的过滤内容和排序内容，执行一遍过滤和排序
    const totalData = this.filterAndSortData(this.initTotalData); // 每次filter和sorter改变都取原始数据作处理
    this.toggleData({
      totalData,
      // 排序、过滤后，都自动切换到第一页
      currentPage: this.startPageNumber,
      type: options.type,
    });
  }

  sort(sorterValues: SorterValues) {
    // 经验证，这里的操作是 batch 的
    this.columns.forEach(c => {
      c.setSorterValue(sorterValues[c.config.dataIndex]);
    });
    // 调用了 setSorterValue 就会改变值，所以调用后触发该 effect
    this.notify(LifeCycleTypes.ON_SORT_VALUE_CHANGE);
    if (this.shouldUseFetcher()) {
      return this.fetchData({
        type: FetchTypes.SORT,
        // 重新排序后，默认切换到第一页
        currentPage: this.startPageNumber,
      });
    }
    this.handleLocalData({ type: FetchTypes.SORT });
  }

  // 由于 arco 的 filter 事件不能拿到 column，只能拿到 dataIndex 对应的 filter value
  // 因此 filter 函数的参数暂时兼容 arco 的情况
  filter(filterValues: { [dataIndex: string]: any[] } = {}) {
    // 经验证，这里的操作是 batch 的
    this.columns.forEach(c => {
      c.setFilterValue(filterValues[c.config.dataIndex]);
    });
    // 调用了 setFilterValue 就会改变值，所以调用后触发该 effect
    this.notify(LifeCycleTypes.ON_COLUMN_FILTER_VALUE_CHANGE);
    if (this.shouldUseFetcher()) {
      return this.fetchData({
        type: FetchTypes.FILTER,
        // 触发搜索时，默认切换到第一页
        currentPage: this.startPageNumber,
      });
    }
    this.handleLocalData({ type: FetchTypes.FILTER });
  }

  toolbarFilter() {
    if (this.shouldUseFetcher()) {
      return this.fetchData({
        type: FetchTypes.FILTER,
        // 触发搜索时，默认切换到第一页
        currentPage: this.startPageNumber,
      });
    }
    this.handleLocalData({ type: FetchTypes.FILTER });
  }

  expendRow(rowKey: string, isExpand: boolean) {
    const { collapseOthers } = this.plugin.getExpandRow(this.config.expandRow);
    // collapseOthers 控制是否折叠其它行，默认不折叠
    if (collapseOthers === true) {
      this.rows.forEach(row => {
        if (row.isExpanded === true) {
          row.setExpand(false);
        }
      });
    }
    this.getRowByRowKey(rowKey)?.setExpand?.(isExpand);
  }

  toggleColumns(options: { dataIndex: string[]; show: boolean; toggleOthers?: boolean }) {
    this.columns.forEach(c => {
      if (options.dataIndex.includes(c.config.dataIndex)) {
        c.setVisible(options.show);
      } else if (options.toggleOthers) {
        c.setVisible(!options.show);
      }
    });
  }

  private triggerSelectRowEvent(originalSelectedRowKeys: string[]) {
    this.rows.forEach(row => {
      // 如果设置 key 导致了 row 的选中状态的变化
      if (originalSelectedRowKeys.includes(row.key) !== this.cachedSelectedRowKeys.includes(row.key)) {
        this.notify(LifeCycleTypes.ON_ROW_SELECT, { row });
      }
    });
    this.notify(LifeCycleTypes.ON_TABLE_SELECT_ROW);
  }

  selectRow(rowKeys: string[], options: { triggerSelectRowEvent?: boolean; overwrite?: boolean } = {}) {
    const originalSelectedRowKeys = [...this.cachedSelectedRowKeys];
    this.cachedSelectedRowKeys =
      // 默认会覆写选中过的行，相当于清空选中状态，再设置
      options.overwrite !== false ? rowKeys : Array.from(new Set([...originalSelectedRowKeys, ...rowKeys]));

    if (options.triggerSelectRowEvent === true) {
      this.triggerSelectRowEvent(originalSelectedRowKeys);
    }
  }

  /**
   * 针对行选择，获取所有可操作的 keys
   */
  getCanControlRowKeys(options?: { crossPage?: boolean }) {
    // 针对行选择的场景，获取所有可操作的 key
    let canControlRowKeys: string[] = [];
    // 本地模式下，才支持跨页全选
    if (this.isLocalMode() && options?.crossPage === true) {
      const rowSelection = this.plugin.getRowSelection(this.config.rowSelection);
      /**
       * 本地模式下，如果是跨页全选，需要选中所有数据
       * selectedRowKeys 需要通过 totalData 计算出来的，totalData 是经过用户搜索过滤后的数据，即全选是选中过滤后的全部数据
       * 如果配置了 selectable 来控制禁用状态，需要过滤会禁用的行
       */
      const totalData = rowSelection.selectable
        ? this.totalData.filter(item => {
            return rowSelection.selectable!({ table: this, rowData: item });
          })
        : this.totalData;
      canControlRowKeys = totalData.map((item, index) =>
        genRowKey(item, this.getOffsetIndexInAllData(index, this.startPageNumber), this.config.rowKey),
      );
    } else {
      // 如果是非跨页全选，就是根据当前页面的行来得到可操作的 key
      canControlRowKeys = this.rows.filter(item => item.selectable).map(item => item.key);
    }
    return canControlRowKeys;
  }
  /**
   * 获取行选中状态
   */
  getSelectedStatusInfo(options?: { crossPage?: boolean }) {
    const canControlRowKeys = this.getCanControlRowKeys({ crossPage: options?.crossPage });

    if (this.isLocalMode() && options?.crossPage === true) {
      // 如果支持跨页全选，选中态需要根据所有可操作的 key 来计算

      // 全选中：选中的行大于等于可以被选中的行数量，用大于等于而不是等于判断，是为了避免意外情况下 selectedRowKeys 长度大于 canControlRowKeys
      // 另外，canControlRowKeys.length 需要大于 0，避免在选中行为空的时候，allSelected 为 true
      const allSelected = this.selectedRowKeys.length >= canControlRowKeys.length && canControlRowKeys.length > 0;
      // 全不选中
      const noSelected = this.selectedRowKeys.length === 0;
      return {
        allSelected,
        noSelected,
        partialSelected: !allSelected && !noSelected,
        canControlRowKeys,
      };
    }

    // 如果不支持跨页全选，选中态是根据当前页展示的数据来计算的

    // 只检查非禁用选择的行，否则在全选后，checkbox 还是 partialSelected 状态，无法反选了
    const allCheckRows = this.rows.filter(item => item.selectable);
    // 全选中，判断 allCheckRows 大于 0，避免在选中行为空的时候，allSelected 为 true
    const allSelected = allCheckRows.every(item => item.isSelected) && allCheckRows.length > 0;
    // 全不选中
    const noSelected = allCheckRows.every(item => !item.isSelected);
    return {
      allSelected,
      noSelected,
      partialSelected: !allSelected && !noSelected,
      canControlRowKeys,
    };
  }

  selectRowAll(selected: boolean, options: { triggerSelectRowEvent?: boolean; crossPage?: boolean } = {}) {
    /**
     * canControlRowKeys 是当前能够操作的所有 key
     * 1. 如果是全选，就是将当前可操作的 key 保存到 cachedSelectedRowKeys
     * 2. 如果是取消全选，就是将当前可操作的 key 从 cachedSelectedRowKeys 中删除
     *  */
    const canControlRowKeys = this.getCanControlRowKeys({ crossPage: options.crossPage });
    // 排除禁用选择的行，获取当前能够操作的所有 rowKey
    if (selected === true) {
      // overwrite 配置为 false，是为了避免，禁用的并且是选中的行，不在 canControlRowKeys 中，导致选中状态被取消
      // 在业务方通过 api（setSelected、setSelectable）控制某些行后可能出现这种情况
      this.selectRow(canControlRowKeys, { triggerSelectRowEvent: options.triggerSelectRowEvent, overwrite: false });
      return;
    }

    // remove 会操作 cachedSelectedRowKeys 的索引，因此这里复制一遍
    const originalSelectedRowKeys = [...this.cachedSelectedRowKeys];
    remove(this.cachedSelectedRowKeys, key => canControlRowKeys.includes(key));
    if (options.triggerSelectRowEvent === true) {
      this.triggerSelectRowEvent(originalSelectedRowKeys);
    }
  }

  dragRow() {}

  // 2023-09-20 更新， addRow, deleteRow 都是用 table.setData，更标准，可以同时设置 total, initTotalData
  // 并且由于受控模式下 totalData 并不是真实数据，所以改为修改 initTotalData
  // 非受控模式下，totalData 和 initTotalData 相同，所以改为修改 initTotalData 也没问题
  addRow(
    data: DataItemType,
    option?: {
      index?: number;
      /** 新增的数据是放在顶部还是底部 */
      position?: 'top' | 'bottom';
    },
  ) {
    // TODO 考虑 loadmore 模式
    const position = option?.position ?? 'bottom';
    const newInitTotalData = [...this.initTotalData];

    if (option && isNumber(option?.index)) {
      newInitTotalData.splice(option.index, 0, data);
    } else {
      position === 'bottom' ? newInitTotalData.push(data) : newInitTotalData.unshift(data);
    }

    this.setData({
      reset: false,
      totalData: newInitTotalData,
      total: this.total + 1,
      isFullUpdate: false,
    });
  }

  addRows(
    dataList:
      | { data: DataItemType; option?: { index?: number } }[]
      | { data: DataItemType; option?: { index?: number } },
    options?: {
      /** 新增的数据是放在顶部还是底部 */
      position?: 'top' | 'bottom';
    },
  ) {
    const position = options?.position ?? 'bottom';
    const newInitTotalData = [...this.initTotalData];

    const _dataList = Array.isArray(dataList) ? dataList : [dataList];
    _dataList.forEach(({ data, option }) => {
      if (option && isNumber(option?.index)) {
        newInitTotalData.splice(option.index, 0, data);
      } else {
        // 新增在顶部还是底部
        position === 'bottom' ? newInitTotalData.push(data) : newInitTotalData.unshift(data);
      }
    });

    this.setData({
      reset: false,
      totalData: newInitTotalData,
      total: this.total + _dataList.length,
      isFullUpdate: false,
    });
  }

  deleteRow(rowKey: string | string[]) {
    // TODO 考虑本地模式和 loadmore 模式
    // 支持批量删除，不然循环删会重复调用 toggleData，不太合理
    const newInitTotalData = [...this.initTotalData];

    const rowKeyList = Array.isArray(rowKey) ? rowKey : [rowKey];
    const removedRows = remove(newInitTotalData, (item, index) => {
      const curRowKey = genRowKey(item, this.getOffsetIndexInAllData(index), this.config.rowKey);
      return rowKeyList.includes(curRowKey);
    });

    this.setData({
      reset: false,
      totalData: newInitTotalData,
      total: this.total - removedRows.length,
      isFullUpdate: false,
    });
  }
  // todo edit row、edit cell、edit table

  clearSelectedRow() {
    this.cachedSelectedRowKeys = [];
  }

  /** 当前页码是否在第一页 */
  isOnFirstPage() {
    return this.currentPage === this.startPageNumber;
  }

  getCurrentStatus() {
    // 返回 table 当前的状态，用于切换到其它页面又回来时，恢复其状态
    return {
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      columnFilterValues: this.columnFilterValues,
      sorterValues: this.sorterValues,
      toolbarValues: this.toolbar?.filterValues,
    } as TableInitStatus;
  }
}
