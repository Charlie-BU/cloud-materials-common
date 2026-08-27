/*
 * @Author: youjingyu
 * @Date: 2021-10-06 10:54:23
 * @LastEditTime: 2021-10-20 11:28:05
 * @LastEditors: youjingyu
 * @Description:
 */
import type { Column, FetchTypes, Row, Toolbar } from '..';
import type { FetcherOptions } from './index';

export type EffectCallbackPayload = {
  column?: Column;
  row?: Row;
  toolbar?: Toolbar;
  fetcherOptions?: FetcherOptions;
  error?: Error;
  isFullUpdate?: boolean;
  type?: FetchTypes;
};
// Todo 类型根据事件类型自动推导
export type EffectCallback = (options: EffectCallbackPayload) => void;

export enum LifeCycleTypes {
  ON_TABLE_INIT_CONFIG = 'onTableInitConfig',
  ON_TABLE_INIT = 'onTableInit',
  ON_TABLE_INIT_COLUMN = 'onTableInitColumn',
  ON_TABLE_SELECT_ROW = 'onTableSelectRow',
  ON_TABLE_UPDATE_DATA_START = 'onTableUpdateDataStart',
  ON_TABLE_UPDATE_DATA_END = 'onTableUpdateDataEnd',
  ON_TABLE_UPDATE_ROW_END = 'onTableUpdateRowEnd',
  ON_TABLE_PAGE_CHANGE_START = 'onTablePageChangeStart',
  ON_TABLE_PAGE_CHANGE_END = 'onTablePageChangeEnd',

  ON_SORT_VALUE_CHANGE = 'onSortValueChange',

  ON_TOOLBAR_INIT = 'onToolbarInit',
  ON_TOOLBAR_MOUNT = 'onToolbarMount',
  ON_TOOLBAR_UNMOUNT = 'onToolbarUnmount',
  ON_TOOLBAR_VALUE_CHANGE = 'onToolbarValueChange',

  ON_FETCH_START = 'onFetchStart',
  ON_FETCH_END = 'onFetchEnd',
  ON_FETCH_ERROR = 'onFetchError',

  ON_COLUMN_INIT = 'onColumnInit',
  ON_COLUMN_VISIBLE_CHANGE = 'onColumnVisibleChange',
  ON_COLUMN_FILTER_VALUE_CHANGE = 'onColumnFilterValueChange',

  ON_ROW_INIT = 'onRowInit',
  ON_ROW_SELECT = 'onRowSelect',
}
