import type { TableConfig } from './models';
import { Table } from './models';
export * from './models';
export * from './plugin';
export * from './effects';
export * from './types';
export * from './shared';
export declare const createTable: <T extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(tableConfig: TableConfig<T, GlobalScopeType>) => Table<T, GlobalScopeType>;
