import type { Table } from '../models';
import type { FetchTypes, R } from '../types';
type TableEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(cb: (options: {
    table: Table<DataType, GlobalScopeType>;
}) => void) => void;
export declare const onTableInitConfig: TableEffectCallback;
export declare const onTableInit: TableEffectCallback;
export declare const onTableInitColumn: TableEffectCallback;
export declare const onTableSelectRow: TableEffectCallback;
export declare const onTableUpdateDataStart: <DataType extends R = any, GlobalScopeType extends R = any>(cb: (options: {
    table: Table<DataType, GlobalScopeType>;
    isFullUpdate: boolean;
}) => void) => void;
export declare const onTableUpdateDataEnd: <DataType extends R = any, GlobalScopeType extends R = any>(cb: (options: {
    table: Table<DataType, GlobalScopeType>;
    isFullUpdate: boolean;
    type: FetchTypes;
}) => void) => void;
export declare const onTableUpdateRowEnd: TableEffectCallback;
export declare const onTablePageChangeStart: TableEffectCallback;
export declare const onTablePageChangeEnd: TableEffectCallback;
export declare const onSortValueChange: TableEffectCallback;
export declare const onColumnFilterValueChange: TableEffectCallback;
export {};
