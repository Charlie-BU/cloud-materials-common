import type { ValueWithRowKey } from '../types';
/**
 * 从数据中删除 rowKey
 */
export declare const removeRowKey: (value: ValueWithRowKey) => Pick<ValueWithRowKey, string>;
