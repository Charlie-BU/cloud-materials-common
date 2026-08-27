/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-11-04 17:46:41
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import type { Table } from '../models';
import { createEffectHook } from '../shared';
import type { FetcherOptions, R } from '../types';
import { LifeCycleTypes } from '../types';

const createFetcherEffect = (type: LifeCycleTypes) => {
  return createEffectHook(type, (table: Table, payload: { fetcherOptions: FetcherOptions; error: Error }) => {
    return (callback: (options: { table: Table; fetcherOptions: FetcherOptions; error: Error }) => void) => {
      batch(() => {
        callback({ table, ...payload });
      });
    };
  });
};

type FetcherEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(
  cb: (options: {
    table: Table<DataType, GlobalScopeType>;
    fetcherOptions: FetcherOptions<DataType, GlobalScopeType>;
    error: Error;
  }) => void,
) => void;

export const onFetchStart: FetcherEffectCallback = createFetcherEffect(LifeCycleTypes.ON_FETCH_START);

export const onFetchEnd: FetcherEffectCallback = createFetcherEffect(LifeCycleTypes.ON_FETCH_END);

export const onFetchError: FetcherEffectCallback = createFetcherEffect(LifeCycleTypes.ON_FETCH_ERROR);
