/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-24 20:17:31
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import type { Row, RowSelectionProviderRenderProps } from '../../core';
import { useTable } from '../hooks';
import { isFn } from '../../shared';

export const RowSelectionContext = createContext<Row>(null as unknown as Row);

export const RowSelectionProvider: React.FC<{ rowKey: string }> = observer(({ children, rowKey }) => {
  const table = useTable();
  const row = table.getRowByRowKey(rowKey);
  if (!row) {
    return null;
  }
  const options: RowSelectionProviderRenderProps = { table, row, rowData: row.data };
  const childrenNode = isFn(children) ? children(options) : children;

  return <RowSelectionContext.Provider value={row}>{childrenNode}</RowSelectionContext.Provider>;
});
