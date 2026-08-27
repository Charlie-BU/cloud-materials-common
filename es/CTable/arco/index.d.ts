import React from 'react';
import type { TableModel, TableProps, InnerTableProps } from './types';
export declare const InnerTable: React.FC<InnerTableProps<any>>;
export declare const _Table: React.ForwardRefRenderFunction<TableModel<any>, TableProps<any>>;
export declare const Table: React.ForwardRefExoticComponent<TableProps<any, any> & React.RefAttributes<TableModel<any, any>>> & {
    getConfig: <DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(config: import("./types").TableConfig<DataItemType, GlobalScopeType>) => import("./types").TableConfig<DataItemType, GlobalScopeType>;
    defineConfig: <DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(config: import("./types").TableConfig<DataItemType, GlobalScopeType>) => import("./types").TableConfig<DataItemType, GlobalScopeType>;
    defineColumn: <DataItemType_1 extends Record<string, any> = any, GlobalScopeType_1 extends Record<string, any> = any>(columnConfig: import("./types").ColumnConfig<DataItemType_1, GlobalScopeType_1>) => import("./types").ColumnConfig<DataItemType_1, GlobalScopeType_1>;
    defineColumns: <DataItemType_2 extends Record<string, any> = any, GlobalScopeType_2 extends Record<string, any> = any>(columns: import("./types/common").AllowEmpty<import("./types").ColumnConfig<DataItemType_2, GlobalScopeType_2>>[]) => import("./types/common").AllowEmpty<import("./types").ColumnConfig<DataItemType_2, GlobalScopeType_2>>[];
    defineToolbar: <DataItemType_3 extends Record<string, any> = any, GlobalScopeType_3 extends Record<string, any> = any>(toolbarConfig: import("./types").ToolbarConfig<DataItemType_3, GlobalScopeType_3>) => import("./types").ToolbarConfig<DataItemType_3, GlobalScopeType_3>;
    getTextWidth: (text?: string | undefined, font?: string | undefined) => number;
    changeToolbarValues: import("lodash-es").DebouncedFunc<(table: TableModel<any, any>, values: Record<string, any>) => void>;
    changeToolbarValuesPure: (table: TableModel<any, any>, values: Record<string, any>) => void;
    createPolling: (options: import("./types").PollingOptions) => {
        start: () => void;
        stop: () => void;
        options: Partial<import("./types").PollingOptions> & import("./types").PollingOptions;
    };
    formatter: import("./types").BuiltInFormatterFn;
    helper: {
        getUrlQuery: (parseOptions?: import("qs").IParseOptions | undefined) => {
            [x: string]: any;
        };
        setUrlQuery: (params: {
            [x: string]: any;
        }, options?: {
            merge?: boolean | undefined;
            stringifyOptions?: import("qs").IStringifyOptions | undefined;
            method?: "pushState" | "replaceState" | undefined;
            newState?: {
                [x: string]: any;
            } | ((oldState: {
                [x: string]: any;
            }) => {
                [x: string]: any;
            }) | undefined;
            genNewUrl?: ((newUrl: string, newParams: {
                [x: string]: any;
            }, newQuery: string) => string) | undefined;
        } | undefined) => {
            url: string;
            newParams: {
                [x: string]: any;
            };
            newQuery: string;
            state: any;
        };
    };
    effects: {
        onTableSelectRow: <DataType extends import("../core").R = any, GlobalScopeType_4 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType, GlobalScopeType_4>;
        }) => void) => void;
        onTableUpdateDataStart: <DataType_1 extends import("../core").R = any, GlobalScopeType_5 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_1, GlobalScopeType_5>;
            isFullUpdate: boolean;
        }) => void) => void;
        onTableUpdateDataEnd: <DataType_2 extends import("../core").R = any, GlobalScopeType_6 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_2, GlobalScopeType_6>;
            isFullUpdate: boolean;
            type: import("../core").FetchTypes;
        }) => void) => void;
        onTableUpdateRowEnd: <DataType extends import("../core").R = any, GlobalScopeType_4 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType, GlobalScopeType_4>;
        }) => void) => void;
        onTablePageChangeStart: <DataType extends import("../core").R = any, GlobalScopeType_4 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType, GlobalScopeType_4>;
        }) => void) => void;
        onTablePageChangeEnd: <DataType extends import("../core").R = any, GlobalScopeType_4 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType, GlobalScopeType_4>;
        }) => void) => void;
        onSortValueChange: <DataType extends import("../core").R = any, GlobalScopeType_4 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType, GlobalScopeType_4>;
        }) => void) => void;
        onColumnFilterValueChange: <DataType extends import("../core").R = any, GlobalScopeType_4 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType, GlobalScopeType_4>;
        }) => void) => void;
        onRowInit: <DataType_3 extends import("../core").R = any, GlobalScopeType_7 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_3, GlobalScopeType_7>;
            row: import("../core").Row<DataType_3>;
        }) => void) => void;
        onRowSelect: <DataType_3 extends import("../core").R = any, GlobalScopeType_7 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_3, GlobalScopeType_7>;
            row: import("../core").Row<DataType_3>;
        }) => void) => void;
        onToolbarValueChange: <DataType_4 extends import("../core").R = any, GlobalScopeType_8 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_4, GlobalScopeType_8>;
            toolbar: import("../core").Toolbar<DataType_4>;
        }) => void) => void;
        onFetchStart: <DataType_5 extends import("../core").R = any, GlobalScopeType_9 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_5, GlobalScopeType_9>;
            fetcherOptions: import("../core").FetcherOptions<DataType_5, GlobalScopeType_9>;
            error: Error;
        }) => void) => void;
        onFetchEnd: <DataType_5 extends import("../core").R = any, GlobalScopeType_9 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_5, GlobalScopeType_9>;
            fetcherOptions: import("../core").FetcherOptions<DataType_5, GlobalScopeType_9>;
            error: Error;
        }) => void) => void;
        onFetchError: <DataType_5 extends import("../core").R = any, GlobalScopeType_9 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_5, GlobalScopeType_9>;
            fetcherOptions: import("../core").FetcherOptions<DataType_5, GlobalScopeType_9>;
            error: Error;
        }) => void) => void;
        onColumnInit: <DataType_6 extends import("../core").R = any, GlobalScopeType_10 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_6, GlobalScopeType_10>;
            column: import("../core").Column<DataType_6>;
        }) => void) => void;
        onColumnVisibleChange: <DataType_6 extends import("../core").R = any, GlobalScopeType_10 extends import("../core").R = any>(cb: (options: {
            table: import("../core").Table<DataType_6, GlobalScopeType_10>;
            column: import("../core").Column<DataType_6>;
        }) => void) => void;
    };
    ExportDataModal: React.ForwardRefExoticComponent<{
        table: import("../core").Table<any, any>;
        options: Omit<import("..").ExportDataBtnProps, "tooltip">;
    } & React.RefAttributes<import("./types").ExportDataModalRef>>;
};
