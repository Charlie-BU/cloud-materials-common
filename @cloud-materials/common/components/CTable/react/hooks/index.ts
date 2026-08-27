/*
 * @Author: youjingyu
 * @Date: 2021-10-06 17:30:05
 * @LastEditTime: 2021-10-29 12:00:17
 * @LastEditors: youjingyu
 * @Description:
 */
import { useContext } from 'react';
// import { TableContext, RowContext, CellContext, ToolbarContext, ToolbarItemContext } from '../components';
import { TableContext, RowContext, CellContext, ToolbarContext } from '../components';
import type { Table, Row } from '../../core';

export * from './useAttach';
export * from './useCreateTable';
export * from './usePrefix';

export const useTable: <
  DataItemType extends Record<string, any> = any,
  GlobalScopeType extends Record<string, any> = any,
>() => Table<DataItemType, GlobalScopeType> = () => useContext(TableContext);

export const useRow: <DataItemType extends Record<string, any> = any>() => Row<DataItemType> = () =>
  useContext(RowContext);

export const useCell = () => useContext(CellContext);

export const useToolbar = () => useContext(ToolbarContext);

// export const useToolbarItem = () => useContext(ToolbarItemContext);
