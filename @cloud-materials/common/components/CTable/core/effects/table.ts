/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:01
 * @LastEditTime: 2021-11-04 17:46:50
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import type { Table } from '../models';
import { createEffectHook } from '../shared';
import type { FetchTypes, R } from '../types';
import { LifeCycleTypes } from '../types';

type TableEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(
  cb: (options: { table: Table<DataType, GlobalScopeType> }) => void,
) => void;

const createTableEffect = <Payload = Record<string, any>, DataType extends R = any>(type: LifeCycleTypes) => {
  return createEffectHook(type, (table: Table<DataType>, payload?: Payload) => {
    return (callback: (options: { table: Table<DataType> } & Payload) => void) => {
      batch(() => {
        // @ts-ignore
        callback({ table, ...payload });
      });
    };
  });
};

export const onTableInitConfig: TableEffectCallback = createTableEffect(LifeCycleTypes.ON_TABLE_INIT_CONFIG);

export const onTableInit: TableEffectCallback = createTableEffect(LifeCycleTypes.ON_TABLE_INIT);

export const onTableInitColumn: TableEffectCallback = createTableEffect(LifeCycleTypes.ON_TABLE_INIT_COLUMN);

export const onTableSelectRow: TableEffectCallback = createTableEffect(LifeCycleTypes.ON_TABLE_SELECT_ROW);

export const onTableUpdateDataStart: <DataType extends R = any, GlobalScopeType extends R = any>(
  cb: (options: { table: Table<DataType, GlobalScopeType>; isFullUpdate: boolean }) => void,
) => void = createTableEffect<{ isFullUpdate: boolean }>(LifeCycleTypes.ON_TABLE_UPDATE_DATA_START);

export const onTableUpdateDataEnd: <DataType extends R = any, GlobalScopeType extends R = any>(
  cb: (options: { table: Table<DataType, GlobalScopeType>; isFullUpdate: boolean; type: FetchTypes }) => void,
) => void = createTableEffect<{ isFullUpdate: boolean; type: FetchTypes }>(LifeCycleTypes.ON_TABLE_UPDATE_DATA_END);

export const onTableUpdateRowEnd: TableEffectCallback = createTableEffect(LifeCycleTypes.ON_TABLE_UPDATE_ROW_END);

export const onTablePageChangeStart: TableEffectCallback = createTableEffect(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_START);

export const onTablePageChangeEnd: TableEffectCallback = createTableEffect(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_END);

export const onSortValueChange: TableEffectCallback = createTableEffect(LifeCycleTypes.ON_SORT_VALUE_CHANGE);

export const onColumnFilterValueChange: TableEffectCallback = createTableEffect(
  LifeCycleTypes.ON_COLUMN_FILTER_VALUE_CHANGE,
);
