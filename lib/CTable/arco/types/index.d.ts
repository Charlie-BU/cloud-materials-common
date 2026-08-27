import type { TableColumnProps as ArcoTableColumnProps, TableProps as ArcoTableProps, PaginationProps } from '@arco-design/web-react';
import type { CSSProperties, FC, ReactNode } from 'react';
import type { Column as ColumnCoreModel, AutoWidth as CoreAutoWidth, ColumnConfig as CoreColumnConfig, Filter as CoreFilter, Formatter as CoreFormatter, Resize as CoreResize, RowSelection as CoreRowSelection, Sorter as CoreSorter, Summary as CoreSummary, TableConfig as CoreTableConfig, FilterDropdownRenderProps, Row, Table as TableCoreModel } from '../../core';
import type { ToolbarConfig } from './Toolbar';
import type { AllowEmpty } from './common';
import type { CResultProps } from '../../../CLoading/interface';
import type { CellComponentConfig } from './BuiltInComponent';
import type { UrlQuerySyncOptions } from './UrlQuerySync';
export * from './Toolbar';
export * from './UrlQuerySync';
type R = Record<string, any>;
export declare enum LoadMoreType {
    scrollLoadMore = "scrollLoadMore",
    clickLoadMore = "clickLoadMore"
}
export interface TableModel<DataItemType extends R, GlobalScopeType extends R = any> extends TableCoreModel<DataItemType, GlobalScopeType> {
    config: TableConfig<DataItemType, GlobalScopeType>;
}
export interface ColumnModel<DataItemType extends R> extends ColumnCoreModel<DataItemType> {
    config: ColumnConfig<DataItemType> & {
        dataIndex: string;
    };
}
type RowSectionTypes = 'radio' | 'checkbox';
interface RowSection<DataItemType extends R> extends Omit<CoreRowSelection<DataItemType>, 'component' | 'componentProps' | 'decorator' | 'decoratorProps'> {
    type?: RowSectionTypes;
}
type FilterTypes = 'select' | 'range' | 'searchInput';
interface Filter<DataItemType extends R, GlobalScopeType extends R = any> extends CoreFilter<DataItemType, GlobalScopeType> {
    type?: FilterTypes;
    component?: FC<FilterDropdownRenderProps<DataItemType, GlobalScopeType> & {
        dropdownOptions?: Parameters<NonNullable<ArcoTableColumnProps['filterDropdown']>>[0];
    }>;
}
type FormatterTypes = 'int' | 'float' | 'money' | 'timestamp' | 'time' | 'utcTime' | 'fallbackText';
interface Formatter<DataItemType extends R, GlobalScopeType extends R = any> extends CoreFormatter<DataItemType, GlobalScopeType> {
    type?: FormatterTypes;
}
type SorterTypes = 'default';
interface Sorter extends CoreSorter {
    type?: SorterTypes;
}
type SummaryTypes = 'sum';
interface Summary<DataItemType extends R, GlobalScopeType extends R = any> extends CoreSummary<DataItemType, GlobalScopeType> {
    type?: SummaryTypes;
}
type AutoWidthTypes = 'default';
interface AutoWidth<DataItemType extends R, GlobalScopeType extends R = any> extends CoreAutoWidth<DataItemType, GlobalScopeType> {
    type?: AutoWidthTypes;
}
type ResizeTypes = 'default';
interface Resize extends CoreResize {
    type?: ResizeTypes;
}
interface BaseColumnConfig<DataItemType extends R, GlobalScopeType extends R = any> extends CoreColumnConfig<DataItemType> {
    title: ReactNode;
    tooltip?: ReactNode;
    /**
     * 支持数字右对齐标题（排除 icon 部分的宽度）
     * 当前只支持配置为 right，如果有其它诉求请使用 arcoColumnProps.align
     */
    alignType?: 'right';
    arcoColumnProps?: Partial<ArcoTableColumnProps<Row<DataItemType>>> | ((options: {
        table: TableModel<DataItemType, GlobalScopeType>;
        column: ColumnModel<DataItemType>;
        originalProps: ArcoTableColumnProps<DataItemType>;
    }) => Partial<ArcoTableColumnProps<Row<DataItemType>>>);
    filter?: FilterTypes | Filter<DataItemType, GlobalScopeType>;
    formatter?: FormatterTypes | Formatter<DataItemType, GlobalScopeType> | Formatter<DataItemType, GlobalScopeType>['formatterFn'];
    sorter?: SorterTypes | Sorter | Sorter['sorterFn'];
    summary?: SummaryTypes | Summary<DataItemType, GlobalScopeType>;
    autoWidth?: AutoWidthTypes | AutoWidth<DataItemType, GlobalScopeType>;
    resize?: ResizeTypes | Resize;
    /**
     * render 的参数和 arco 的 render 配置相同，参数和行为都一致
     */
    render?: ArcoTableColumnProps<DataItemType>['render'];
}
export type ColumnConfig<DataItemType extends R, GlobalScopeType extends R = any> = Omit<BaseColumnConfig<DataItemType, GlobalScopeType>, 'component' | 'componentProps'> & CellComponentConfig<DataItemType, GlobalScopeType>;
export type PollingOptions = {
    pollingInterval: number;
    /**
     * 是否手动开启轮询
     * @defaultValue false
     */
    manual?: boolean;
    /**
     * table 内部依赖的 ahooks 的 useRequest 会立即触发轮训请求，从而导致初始化时触发两次请求
     * 可以用该配置控制是否在第一次请求成功后再开启轮询，默认为 false
     * @defaultValue false
     */
    startPoolingAfterInitData?: boolean;
    /**
     * 轮询时是否展示 loading
     * @defaultValue false
     */
    showLoading?: boolean;
    /**
     * 轮询时是否清空已选择的行
     * @defaultValue false
     */
    resetSelectedRows?: boolean;
    /**
     * 是否在 document.visibilityState 变化时自动停止和启动轮询
     * @defaultValue true
     */
    autoStopAndStartOnVisibilityChange?: boolean;
    /**
     * 连续几次请求失败之后停止轮询
     */
    errorCountBeforeStoppingPolling?: number;
};
export type Polling = {
    start: () => void;
    stop: () => void;
    options: PollingOptions;
};
export interface TableConfig<DataItemType extends R, GlobalScopeType extends R = any> extends CoreTableConfig<DataItemType, GlobalScopeType> {
    pagination?: boolean | PaginationProps;
    columns?: AllowEmpty<ColumnConfig<DataItemType, GlobalScopeType>>[];
    globalColumnConfig?: Partial<ColumnConfig<DataItemType, GlobalScopeType>>;
    arcoTableProps?: Partial<ArcoTableProps> | ((table: TableModel<DataItemType, GlobalScopeType>, originalProps: ArcoTableProps) => Partial<ArcoTableProps>);
    toolbar?: ToolbarConfig<DataItemType, GlobalScopeType>;
    rowSelection?: RowSectionTypes | RowSection<DataItemType>;
    /**
     * 滚动加载容器的高度
     */
    loadMoreContainerHeight?: number;
    /**
     * 自定义无数据时候的展示内容，可以返回
     * 1. CResult 组件的 props，覆盖原配置
     * 2. 完全自定义的 ReactNode
     */
    noDataElement?: (options: {
        table: TableModel<DataItemType, GlobalScopeType>;
    }) => CResultProps | ReactNode;
    /**
     * 是否始终展示分页器。CTable 默认会在数据小于 10 条时隐藏分页器，若配置了 alwaysShowPagination: true，会始终展示分页器
     * @defaultValue false
     */
    alwaysShowPagination?: boolean;
    /** 轮询实例. 包含启动/停止轮询方法 */
    polling?: Polling;
    /**
     * 将 table status 和 url query 同步，可选的 status 包括 pageSize, currentPage, columnFilterValues, sorterValues, toolbarValues
     */
    syncWithUrlQuery?: UrlQuerySyncOptions;
    extraConfig?: {
        /**
         * 触发滚动加载方式，分为【滚动】触发、点击【加载更多】触发，默认为滚动触发
         */
        loadMoreType?: keyof typeof LoadMoreType;
        hidePaginationTotal?: number;
        /** 申明希望受控的配置 */
        controlledConfig?: {
            'column.title'?: boolean;
        };
        /** 支持自适应的进行滚动, 保证整个表格的底部与容器的底部一致 */
        autoFixBottomScroll?: boolean;
        useArcoPagination?: boolean;
        /** 左下角的全选按钮，支持跨页全选 */
        bottomLeftCheckAllCrossPage?: boolean;
        /**
         * Table 是否会轮询查询数据
         *
         * 注意:
         *
         * 1. 该配置不是开启轮询, 只是为了告知 Table 需要适配轮询下存在的问题.
         * 问题包括: 每次轮询、导致 Table 刷新时，会打断用户对 filter 的操作
         *
         * 2. 轮询模式下不支持设置 column 中 filter 的 filter.defaultValue
         *
         * @deprecated 如果 config 中传递了 polling 则不需要再传该配置
         */
        isPolling?: boolean;
        /**
         * 是否在 TableEditor 中使用 Table. ps: 该配置仅在 TableEditor 中使用, 一般用户不需要配置
         *
         * TableEditor 需要 Table 做一些适配, 包括:
         *
         * 1. 冻结 config, 让 Table 始终使用第一次接收到的 config
         *
         * 2. data 受控时, 触发 setData 时不 reset
         */
        isInTableEditor?: boolean;
        /**
         * 是否对 table 的行进行 memo 处理，一般用于优化 table 的全局状态变化后，整个 table 都重新渲染的问题
         * 比如：如果不做 memo，当用户选择一行时，整个 table 都会 rerender（arco 的默认行为）
         */
        useMemoTableRow?: boolean;
        /**
         * 是否对 table 的 cell 进行 memo 处理，一般用于优化 table 的全局状态变化后，整个 table 都重新渲染的问题
         * 比如：如果不做 memo，当用户选择一行时，整个 table 都会 rerender（arco 的默认行为）
         */
        useMemoTableCell?: boolean;
        /**
         * 取消选择按钮，select模式下可一键取消所有已选项
         */
        bottomLeftShowClearSelect?: boolean;
        /**
         * 格式化已选中条数
         */
        formatSelectedCount?: ({ count, table, }: {
            count: number;
            table: TableModel<DataItemType, GlobalScopeType>;
        }) => React.ReactNode;
    };
    /**
     * 是否开启竞态解决
     */
    enableRaceCondition?: boolean;
}
export interface InnerTableProps<DataItemType extends R> {
    table: TableModel<DataItemType>;
    style?: CSSProperties;
    className?: string;
    autoFixBottomScroll?: boolean;
    /**用于强制更新组件 */
    forceUpdateFlag?: any;
}
export interface TableProps<DataItemType extends R, GlobalScopeType extends R = any> {
    config?: TableConfig<DataItemType, GlobalScopeType>;
    table?: TableModel<DataItemType, GlobalScopeType>;
    autoInit?: boolean;
    style?: CSSProperties;
    className?: string;
}
export interface BuiltInFormatterFn {
    fallbackText: (value: ReactNode) => ReactNode;
    timestamp: (value: string | number | Date) => string;
    utcTime: (value: string | number) => string | number;
    time: (value: string | number) => string | number;
    money: (value: number | string | undefined | null) => string | number;
    float: (value: number | string | undefined | null) => string | number;
    int: (value: number | string | undefined | null) => string | number;
}
export interface CTableGlobalProps {
    extraConfig?: {
        controlledConfig?: Exclude<TableConfig<Record<string, unknown>>['extraConfig'], undefined>['controlledConfig'];
    };
    enableRaceCondition?: boolean;
}
