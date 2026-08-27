import { omit } from 'lodash-es';
import { ROW_KEY } from '../constants';
import type { ValueWithRowKey } from '../types';

/**
 * 从数据中删除 rowKey
 */
export const removeRowKey = (value: ValueWithRowKey) => {
  return omit(value, ROW_KEY);
};
