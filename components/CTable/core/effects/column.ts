/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-11-04 17:46:33
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import type { Table, Column } from '../models';
import { createEffectHook } from '../shared';
import type { R } from '../types';
import { LifeCycleTypes } from '../types';

const createColumnEffect = (type: LifeCycleTypes) => {
  return createEffectHook(type, (table: Table, payload: { column: Column }) => {
    return (callback: (options: { table: Table; column: Column }) => void) => {
      batch(() => {
        callback({ table, ...payload });
      });
    };
  });
};

type ColumnEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(
  cb: (options: { table: Table<DataType, GlobalScopeType>; column: Column<DataType> }) => void,
) => void;

export const onColumnInit: ColumnEffectCallback = createColumnEffect(LifeCycleTypes.ON_COLUMN_INIT);

export const onColumnVisibleChange: ColumnEffectCallback = createColumnEffect(LifeCycleTypes.ON_COLUMN_VISIBLE_CHANGE);
