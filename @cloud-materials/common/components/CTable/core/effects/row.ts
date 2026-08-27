/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-11-04 17:46:28
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import type { Table, Row } from '../models';
import { createEffectHook } from '../shared';
import type { R } from '../types';
import { LifeCycleTypes } from '../types';

const createRowEffect = (type: LifeCycleTypes) => {
  return createEffectHook(type, (table: Table, payload: { row: Row }) => {
    return (callback: (options: { table: Table; row: Row }) => void) => {
      batch(() => {
        callback({ table, ...payload });
      });
    };
  });
};

type RowEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(
  cb: (options: { table: Table<DataType, GlobalScopeType>; row: Row<DataType> }) => void,
) => void;

export const onRowInit: RowEffectCallback = createRowEffect(LifeCycleTypes.ON_ROW_INIT);

export const onRowSelect: RowEffectCallback = createRowEffect(LifeCycleTypes.ON_ROW_SELECT);
