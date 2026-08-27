import type { Table, Row } from '../../core';
export * from './useAttach';
export * from './useCreateTable';
export * from './usePrefix';
export declare const useTable: <DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>() => Table<DataItemType, GlobalScopeType>;
export declare const useRow: <DataItemType extends Record<string, any> = any>() => Row<DataItemType>;
export declare const useCell: () => import("../../core").Cell;
export declare const useToolbar: () => import("../../core").Toolbar<any>;
