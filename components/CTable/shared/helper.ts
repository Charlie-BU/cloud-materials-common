/*
 * @Author: youjingyu
 * @Date: 2021-11-28 11:18:56
 * @LastEditTime: 2021-11-28 11:33:39
 * @LastEditors: youjingyu
 * @Description:
 */
import { get, set } from 'lodash-es';
import type { Table, Cell, Column } from '../core';

// 支持 a.b.c 的形式的 dataIndex
export const getCellData = (rowData: any, dataIndex: string) => {
  return get(rowData, dataIndex);
};

// 支持 a.b.c 的形式的 dataIndex
export const setCellData = (rowData: any, dataIndex: string, value: any) => {
  set(rowData, dataIndex, value);
};

export const formatCellData = (options: {
  table: Table;
  column: Column;
  rowData?: any;
  // 在导出数据的场景，会调用 formatter 格式化数据，cell 不存在
  cell?: Cell;
  cellData: any;
}) => {
  const { cellData, table, column, cell, rowData } = options;
  const { formatterFn, formatterMapping } = table.plugin.getFormatter(column.config.formatter);
  let content = cellData;
  if (formatterMapping) {
    content = formatterMapping[content] || content;
  }
  // 支持在 formatterMapping 后再次执行 formatterFn
  if (formatterFn) {
    content = formatterFn({
      cellData,
      cell,
      row: cell?.row,
      rowData: cell?.row?.data || rowData,
      column,
      table,
    });
  }
  return content;
};
