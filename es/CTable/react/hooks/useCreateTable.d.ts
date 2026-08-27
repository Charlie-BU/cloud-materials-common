import type { TableConfig } from '../../core';
export declare const useCreateTable: <T extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(tableConfig: TableConfig<T, GlobalScopeType>) => import("../../core").Table<T, GlobalScopeType>;
