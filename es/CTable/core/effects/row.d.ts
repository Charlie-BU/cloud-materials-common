import type { Table, Row } from '../models';
import type { R } from '../types';
type RowEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(cb: (options: {
    table: Table<DataType, GlobalScopeType>;
    row: Row<DataType>;
}) => void) => void;
export declare const onRowInit: RowEffectCallback;
export declare const onRowSelect: RowEffectCallback;
export {};
