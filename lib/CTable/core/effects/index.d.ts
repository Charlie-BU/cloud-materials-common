export * from './table';
export * from './column';
export * from './row';
export * from './fetcher';
export * from './toolbar';
export declare const effects: {
    onTableSelectRow: <DataType extends import("..").R = any, GlobalScopeType extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType, GlobalScopeType>;
    }) => void) => void;
    onTableUpdateDataStart: <DataType_1 extends import("..").R = any, GlobalScopeType_1 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_1, GlobalScopeType_1>;
        isFullUpdate: boolean;
    }) => void) => void;
    onTableUpdateDataEnd: <DataType_2 extends import("..").R = any, GlobalScopeType_2 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_2, GlobalScopeType_2>;
        isFullUpdate: boolean;
        type: import("..").FetchTypes;
    }) => void) => void;
    onTableUpdateRowEnd: <DataType extends import("..").R = any, GlobalScopeType extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType, GlobalScopeType>;
    }) => void) => void;
    onTablePageChangeStart: <DataType extends import("..").R = any, GlobalScopeType extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType, GlobalScopeType>;
    }) => void) => void;
    onTablePageChangeEnd: <DataType extends import("..").R = any, GlobalScopeType extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType, GlobalScopeType>;
    }) => void) => void;
    onSortValueChange: <DataType extends import("..").R = any, GlobalScopeType extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType, GlobalScopeType>;
    }) => void) => void;
    onColumnFilterValueChange: <DataType extends import("..").R = any, GlobalScopeType extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType, GlobalScopeType>;
    }) => void) => void;
    onRowInit: <DataType_3 extends import("..").R = any, GlobalScopeType_3 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_3, GlobalScopeType_3>;
        row: import("..").Row<DataType_3>;
    }) => void) => void;
    onRowSelect: <DataType_3 extends import("..").R = any, GlobalScopeType_3 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_3, GlobalScopeType_3>;
        row: import("..").Row<DataType_3>;
    }) => void) => void;
    onToolbarValueChange: <DataType_4 extends import("..").R = any, GlobalScopeType_4 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_4, GlobalScopeType_4>;
        toolbar: import("..").Toolbar<DataType_4>;
    }) => void) => void;
    onFetchStart: <DataType_5 extends import("..").R = any, GlobalScopeType_5 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_5, GlobalScopeType_5>;
        fetcherOptions: import("..").FetcherOptions<DataType_5, GlobalScopeType_5>;
        error: Error;
    }) => void) => void;
    onFetchEnd: <DataType_5 extends import("..").R = any, GlobalScopeType_5 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_5, GlobalScopeType_5>;
        fetcherOptions: import("..").FetcherOptions<DataType_5, GlobalScopeType_5>;
        error: Error;
    }) => void) => void;
    onFetchError: <DataType_5 extends import("..").R = any, GlobalScopeType_5 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_5, GlobalScopeType_5>;
        fetcherOptions: import("..").FetcherOptions<DataType_5, GlobalScopeType_5>;
        error: Error;
    }) => void) => void;
    onColumnInit: <DataType_6 extends import("..").R = any, GlobalScopeType_6 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_6, GlobalScopeType_6>;
        column: import("..").Column<DataType_6>;
    }) => void) => void;
    onColumnVisibleChange: <DataType_6 extends import("..").R = any, GlobalScopeType_6 extends import("..").R = any>(cb: (options: {
        table: import("..").Table<DataType_6, GlobalScopeType_6>;
        column: import("..").Column<DataType_6>;
    }) => void) => void;
};
