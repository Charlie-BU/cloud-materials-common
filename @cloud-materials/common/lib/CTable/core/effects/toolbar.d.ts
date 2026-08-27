import type { Table, Toolbar } from '../models';
import type { R } from '../types';
type ToolbarEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(cb: (options: {
    table: Table<DataType, GlobalScopeType>;
    toolbar: Toolbar<DataType>;
}) => void) => void;
export declare const onToolbarInit: ToolbarEffectCallback;
export declare const onToolbarMount: ToolbarEffectCallback;
export declare const onToolbarUnmount: ToolbarEffectCallback;
export declare const onToolbarValueChange: ToolbarEffectCallback;
export {};
