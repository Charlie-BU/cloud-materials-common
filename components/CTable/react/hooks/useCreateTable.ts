/*
 * @Author: youjingyu
 * @Date: 2021-10-20 11:24:16
 * @LastEditTime: 2021-11-28 13:45:06
 * @LastEditors: youjingyu
 * @Description:
 */
import { useMemo } from 'react';
import type { TableConfig } from '../../core';
import { createTable } from '../../core';

export const useCreateTable = <T extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(
  tableConfig: TableConfig<T, GlobalScopeType>,
) => {
  const table = useMemo(() => createTable<T, GlobalScopeType>(tableConfig), []);
  return table;
};
