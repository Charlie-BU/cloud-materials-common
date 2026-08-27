import type { Table, Column } from '../models';
import type { R } from '../types';
type ColumnEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(cb: (options: {
    table: Table<DataType, GlobalScopeType>;
    column: Column<DataType>;
}) => void) => void;
export declare const onColumnInit: ColumnEffectCallback;
export declare const onColumnVisibleChange: ColumnEffectCallback;
export {};
