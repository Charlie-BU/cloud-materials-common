import type { ColumnConfig, ColumnConfigWithDataIndex } from './Column';
import { Column } from './Column';
import { Row } from './Row';
import type { ToolbarConfig } from './Toolbar';
import { Toolbar } from './Toolbar';
import type { TableModeType, FetcherOptions, ExpandRow, FilterValues, SorterValues, FetcherResponse, RowSelection, EffectCallback, EffectCallbackPayload, ComponentProps, ComponentConfig, RowComponentConfig, RowComponentPropsConfig, AllowEmpty, RowKeyConfig, TableInitStatus } from '../types';
import { StatusChangeReason } from '../types';
import { Plugin } from '../plugin';
import { mitt } from './mitt';
import type { TaskPriority } from '../../arco/plugin/raceConditionResolver';
export declare const DefaultStartPageNumber = 1;
export interface TableConfig<DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any> {
    mode?: TableModeType;
    fetcher?: (options: FetcherOptions<DataItemType, GlobalScopeType>) => Promise<FetcherResponse<DataItemType, GlobalScopeType>>;
    data?: DataItemType[];
    rowKey?: RowKeyConfig<DataItemType>;
    pagination?: boolean | Record<string, any>;
    pageSize?: number;
    startPageNumber?: 0 | 1;
    width?: number;
    columns?: AllowEmpty<ColumnConfig<DataItemType>>[];
    globalColumnConfig?: Partial<ColumnConfig<DataItemType>>;
    globalScope?: GlobalScopeType;
    extraConfig?: Record<string, unknown>;
    beforeInit?: (options: {
        table: Table<DataItemType, GlobalScopeType>;
    }) => Promise<GlobalScopeType>;
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
    effects?: (options: {
        table: Table<DataItemType>;
    }) => void;
    getInitStatus?: (options: {
        table: Table<DataItemType>;
    }) => TableInitStatus;
    enableRaceCondition?: boolean;
}
export declare class Table<DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any> {
    status: {
        initialized: boolean;
        loading: boolean;
        loadMoreLoading?: boolean;
        noMore?: boolean;
        statusChangeReason?: StatusChangeReason;
        error?: Error;
    };
    initTotalData: DataItemType[];
    totalData: DataItemType[];
    pageSize: number;
    total: number;
    currentPage: number;
    startPageNumber: 0 | 1;
    width?: number;
    globalScope: GlobalScopeType;
    _innerConfig: TableConfig<DataItemType, GlobalScopeType>;
    columns: Column<DataItemType>[];
    columnMap: {
        [dataIndex: string]: Column<DataItemType>;
    };
    rows: Row<DataItemType>[];
    rowMap: {
        [rowKey: string]: Row<DataItemType>;
    };
    dataMap: {
        [rowKey: string]: DataItemType;
    };
    toolbar?: Toolbar;
    plugin: Plugin;
    mitt: ReturnType<typeof mitt>;
    cachedSelectedRowKeys: string[];
    initStatus?: TableInitStatus;
    constructor(config: TableConfig<DataItemType, GlobalScopeType>);
    /**处理 columns */
    private fixColumns;
    get config(): TableConfig<DataItemType>;
    set config(config: TableConfig<DataItemType>);
    get loading(): boolean;
    get componentType(): ComponentConfig<any> | undefined;
    get componentProps(): import("../types").R | undefined;
    get decoratorType(): ComponentConfig<any> | undefined;
    get decoratorProps(): import("../types").R | undefined;
    get sumRowData(): any;
    /** 列的过滤值 */
    get columnFilterValues(): FilterValues;
    set columnFilterValues(values: FilterValues);
    /** table.columnFilterValues 和 table.toolbar.filterValues 的合并 */
    get filterValues(): {
        [x: string]: any;
    };
    get sorterValues(): SorterValues;
    set sorterValues(values: SorterValues);
    get selectedRowKeys(): string[];
    get selectedRowData(): DataItemType[];
    get columnsAutoWidth(): Record<string, number> | undefined;
    private initDataFromConfig;
    private initTableStatus;
    private makeObservable;
    setWidth(width: number): void;
    on(type: string, callback: EffectCallback): void;
    removeEventListener(type: string, callback: EffectCallback): void;
    notify(type: string, payload?: EffectCallbackPayload): void;
    private runEffects;
    private onInitConfig;
    private onInitColumn;
    private onInit;
    shouldUseFetcher(): boolean;
    isRemoteMode(): boolean;
    isLoadMoreMode(): boolean;
    isLocalMode(): boolean;
    getColumnByDataIndex(dataIndex: string): Column<DataItemType>;
    getRowByRowKey(rowKey: string): Row<DataItemType> | undefined;
    private makeRows;
    private getOffsetIndexInAllData;
    private getCurrentPageData;
    private cacheData;
    private diffCachedRowKeySafe;
    private tryClearCachedRowKey;
    private toggleData;
    private toggleLoadMoreData;
    toggleLoading(options: {
        loading: boolean;
        showLoading?: boolean;
    }): void;
    private runBeforeInitHook;
    private fetchData;
    addColumn(c: ColumnConfigWithDataIndex): void;
    initData(options?: {
        data?: DataItemType[];
        globalScope?: GlobalScopeType;
    }): Promise<void>;
    setData(options: {
        totalData: DataItemType[];
        currentPage?: number;
        reset?: boolean;
        total?: number;
        isFullUpdate?: boolean;
    }): void;
    setGlobalScope(globalScope: GlobalScopeType): void;
    reset(): void;
    refresh(options?: {
        showLoading?: boolean;
        resetPageNumber?: boolean;
        resetSelectedRows?: boolean;
        taskPriority?: TaskPriority;
        isPooling?: boolean;
    }): Promise<void> | undefined;
    loadMoreData(): void;
    changePage(pageNumber: number, pageSize?: number): Promise<void> | undefined;
    private getFilterFns;
    private getSorterInfos;
    /** 使用当前的filter和sorter对传入的数据进行处理 */
    private filterAndSortData;
    private handleLocalData;
    sort(sorterValues: SorterValues): Promise<void> | undefined;
    filter(filterValues?: {
        [dataIndex: string]: any[];
    }): Promise<void> | undefined;
    toolbarFilter(): Promise<void> | undefined;
    expendRow(rowKey: string, isExpand: boolean): void;
    toggleColumns(options: {
        dataIndex: string[];
        show: boolean;
        toggleOthers?: boolean;
    }): void;
    private triggerSelectRowEvent;
    selectRow(rowKeys: string[], options?: {
        triggerSelectRowEvent?: boolean;
        overwrite?: boolean;
    }): void;
    /**
     * 针对行选择，获取所有可操作的 keys
     */
    getCanControlRowKeys(options?: {
        crossPage?: boolean;
    }): string[];
    /**
     * 获取行选中状态
     */
    getSelectedStatusInfo(options?: {
        crossPage?: boolean;
    }): {
        allSelected: boolean;
        noSelected: boolean;
        partialSelected: boolean;
        canControlRowKeys: string[];
    };
    selectRowAll(selected: boolean, options?: {
        triggerSelectRowEvent?: boolean;
        crossPage?: boolean;
    }): void;
    dragRow(): void;
    addRow(data: DataItemType, option?: {
        index?: number;
        /** 新增的数据是放在顶部还是底部 */
        position?: 'top' | 'bottom';
    }): void;
    addRows(dataList: {
        data: DataItemType;
        option?: {
            index?: number;
        };
    }[] | {
        data: DataItemType;
        option?: {
            index?: number;
        };
    }, options?: {
        /** 新增的数据是放在顶部还是底部 */
        position?: 'top' | 'bottom';
    }): void;
    deleteRow(rowKey: string | string[]): void;
    clearSelectedRow(): void;
    /** 当前页码是否在第一页 */
    isOnFirstPage(): boolean;
    getCurrentStatus(): TableInitStatus;
}
