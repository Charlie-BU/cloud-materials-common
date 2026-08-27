/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-10-20 11:28:36
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import type { Table, Toolbar } from '../models';
import { createEffectHook } from '../shared';
import type { R } from '../types';
import { LifeCycleTypes } from '../types';

const createToolbarEffect = (type: LifeCycleTypes) => {
  return createEffectHook(type, (table: Table, payload: { toolbar: Toolbar }) => {
    return (callback: (options: { table: Table; toolbar: Toolbar }) => void) => {
      batch(() => {
        callback({ table, ...payload });
      });
    };
  });
};

type ToolbarEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(
  cb: (options: { table: Table<DataType, GlobalScopeType>; toolbar: Toolbar<DataType> }) => void,
) => void;

export const onToolbarInit: ToolbarEffectCallback = createToolbarEffect(LifeCycleTypes.ON_TOOLBAR_INIT);

export const onToolbarMount: ToolbarEffectCallback = createToolbarEffect(LifeCycleTypes.ON_TOOLBAR_MOUNT);

export const onToolbarUnmount: ToolbarEffectCallback = createToolbarEffect(LifeCycleTypes.ON_TOOLBAR_UNMOUNT);

export const onToolbarValueChange: ToolbarEffectCallback = createToolbarEffect(LifeCycleTypes.ON_TOOLBAR_VALUE_CHANGE);
