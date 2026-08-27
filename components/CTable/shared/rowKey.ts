/*
 * @Author: youjingyu
 * @Date: 2021-12-15 11:50:28
 * @LastEditTime: 2021-12-15 14:52:06
 * @LastEditors: youjingyu
 * @Description:
 */
import { isFn } from './checkers';
import type { RowKeyConfig } from '../core';

export const genRowKey = (rowData: any, offsetIndexInAllData: number, rowKeyConfig?: RowKeyConfig<any>) => {
  if (!rowKeyConfig) {
    // 如果没有配置 row key，通过页码和 index 模拟一个
    return `${offsetIndexInAllData}`;
  }
  let rowKey: string;
  if (isFn(rowKeyConfig)) {
    rowKey = rowKeyConfig(rowData, offsetIndexInAllData);
  } else {
    rowKey = rowData?.[rowKeyConfig];
  }
  return rowKey?.toString?.() || '';
};
