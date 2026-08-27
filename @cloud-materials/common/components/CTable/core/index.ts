/*
 * @Author: youjingyu
 * @Date: 2021-09-14 17:16:09
 * @LastEditTime: 2021-10-17 11:02:09
 * @LastEditors: youjingyu
 * @Description:
 */
import type { TableConfig } from './models';
import { Table } from './models';

export * from './models';
export * from './plugin';
export * from './effects';
export * from './types';
export * from './shared';

export const createTable = <T extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(
  tableConfig: TableConfig<T, GlobalScopeType>,
) => {
  return new Table<T, GlobalScopeType>(tableConfig);
};
