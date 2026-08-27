/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-09 18:15:51
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import type { Row, ExpandRowProviderRenderProps } from '../../core';
import { useTable } from '../hooks';
import { isFn } from '../../shared';

export const ExpandRowContext = createContext<Row>(null as unknown as Row);

export const ExpandRowProvider: React.FC<{ rowKey: string }> = observer(({ children, rowKey }) => {
  const table = useTable();
  const row = table.getRowByRowKey(rowKey);
  // 在某一行展开后，又进行表格的过滤，会有 rerender 动作，此时父行可能已经不能存在了，此时直接返回 null
  if (!row) {
    return null;
  }
  const options: ExpandRowProviderRenderProps = { table, row, rowData: row.data };
  const childrenNode = isFn(children) ? children(options) : children;

  return <ExpandRowContext.Provider value={row}>{childrenNode}</ExpandRowContext.Provider>;
});
