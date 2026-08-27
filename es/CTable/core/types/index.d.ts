import type { Table, Column, Row, Cell } from '..';
import type { TaskPriority } from '../../arco/plugin/raceConditionResolver';
import type { ExpandRowComponentConfig, ExpandRowComponentPropsConfig, RowSelectionComponentConfig, RowSelectionComponentPropsConfig, FilterDropdownComponentConfig, FilterDropdownComponentPropsConfig, ComponentConfig, ComponentProps, R } from './component';
export * from './lifeCycle';
export * from './component';
export type BaseOptions<T extends R = any, GlobalScopeType extends R = any> = {
    table: Table<T, GlobalScopeType>;
};
export type FilterValue = any;
export type FilterValues = {
    [dataIndex: string]: FilterValue;
};
export type SorterValue = 'ascend' | 'descend';
export type SorterDirections = SorterValue[];
export type SorterValues = {
    [dataIndex: string]: SorterValue;
};
export type RowKeyConfig<DataItemType> = keyof DataItemType | ((record: DataItemType, index: number) => string);
export type FetcherResponse<T extends R = any, GlobalScopeType extends R = any> = {
    total?: number;
    data: T[];
    globalScope?: GlobalScopeType;
    noMore?: boolean;
};
export declare enum TableMode {
    LOCAL = "local",
    REMOTE = "remote",
    LOAD_MORE = "loadMore"
}
export type TableModeType = 'local' | 'remote' | 'loadMore';
export declare enum FetchTypes {
    INIT = "init",
    CHANGE_PAGE = "changePage",
    REFRESH = "refresh",
    SORT = "sort",
    FILTER = "filter",
    LOAD_MORE = "loadMore"
}
export declare enum StatusChangeReason {
    INIT = "init",
    CHANGE_PAGE = "changePage",
    REFRESH = "refresh",
    SORT = "sort",
    FILTER = "filter",
    LOAD_MORE = "loadMore"
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
    expandable?: (options: {
        table: Table<T, GlobalScopeType>;
        row: Row<T>;
        rowData: T;
    }) => boolean;
    unmountWhenParentTableRefresh?: boolean;
    component?: ExpandRowComponentConfig<T, GlobalScopeType>;
    componentProps?: ExpandRowComponentPropsConfig<T, GlobalScopeType>;
    decorator?: ComponentConfig;
    decoratorProps?: ComponentProps;
};
export type Summary<T extends R = any, GlobalScopeType extends R = any> = {
    type?: string;
    computedFn?: (options: {
        rows: Row<T>[];
        column: Column<T>;
    } & BaseOptions<T, GlobalScopeType>) => any;
};
export type FormatterFn<T extends R = any, GlobalScopeType extends R = any> = (options: {
    cellData: any;
    cell?: Cell;
    row?: Row<T>;
    rowData?: T;
    column: Column<T>;
} & BaseOptions<T, GlobalScopeType>) => any;
export type Formatter<T extends R = any, GlobalScopeType extends R = any> = {
    type?: string;
    formatterFn?: FormatterFn<T, GlobalScopeType>;
    formatterMapping?: R;
};
export type SorterFn = (sorterValue: SorterDirections[number], a: any, b: any) => number;
export type Sorter = {
    type?: string;
    directions?: SorterDirections;
    sorterFn?: SorterFn;
    defaultValue?: SorterValue;
    multiple?: boolean;
};
export type FilterFn<T extends R = any, GlobalScopeType extends R = any> = (options: {
    filterValue: FilterValue;
    filterValues: FilterValues;
    cellData: any;
    rowData: T;
    column: Column<T>;
} & BaseOptions<T, GlobalScopeType>) => boolean;
export type FilterDataSourceItem = {
    text: any;
    value: any;
    label?: any;
};
export type Filter<T extends R = any, GlobalScopeType extends R = any> = {
    type?: string;
    defaultValue?: FilterValue;
    multiple?: boolean;
    dataSource?: 'auto' | FilterDataSourceItem[] | ((options: {
        table: Table<T, GlobalScopeType>;
        column: Column<T>;
    }) => FilterDataSourceItem[]);
    component?: FilterDropdownComponentConfig<T, GlobalScopeType>;
    componentProps?: FilterDropdownComponentPropsConfig<T, GlobalScopeType>;
    decorator?: ComponentConfig;
    decoratorProps?: ComponentProps;
    icon?: ComponentConfig;
    iconProps?: ComponentProps;
    filterFn?: FilterFn<T>;
    hide?: boolean;
};
export type RowSelection<T extends R = any, GlobalScopeType extends R = any> = {
    type?: string;
    preserveCrossPageKeys?: boolean;
    multiple?: boolean;
    selectable?: (options: {
        table: Table<T, GlobalScopeType>;
        row?: Row<T>;
        rowData: T;
    }) => boolean;
    component?: RowSelectionComponentConfig<T>;
    componentProps?: RowSelectionComponentPropsConfig<T>;
    decorator?: ComponentConfig;
    decoratorProps?: ComponentProps;
};
export type AutoWidth<T extends R = any, GlobalScopeType extends R = any> = {
    type?: string;
    getCellWidth?: (options: {
        row?: Row<T>;
        rowData?: T;
        column: Column<T>;
        cell?: Cell;
        cellData: any;
        content: any;
    } & BaseOptions<T, GlobalScopeType>) => number;
    getHeaderCellWidth?: (options: {
        column: Column<T>;
    } & BaseOptions<T, GlobalScopeType>) => number;
    maxWidth?: number;
    minWidth?: number;
    blankWidth?: number;
};
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
