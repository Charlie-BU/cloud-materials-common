/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-12 20:22:39
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import type { Cell, CellProviderRenderOptions } from '../../core';
import { useTable, useRow } from '../hooks';
import { isFn } from '../../shared';
import { useTableEditor } from '../../../CTableEditor';

export const CellContext = createContext<Cell>(null as unknown as Cell);

export const CellProvider: React.FC<{ dataIndex: string }> = observer(({ dataIndex, children }) => {
  const table = useTable();
  const row = useRow();
  const tableEditor = useTableEditor();
  const cell = row.getCellByDataIndex(dataIndex)!;
  const options: CellProviderRenderOptions = {
    table,
    tableEditor,
    column: cell.column,
    row,
    rowData: row.data,
    cell,
  };
  const childrenNode = isFn(children) ? children(options) : children;

  return <CellContext.Provider value={cell}>{childrenNode}</CellContext.Provider>;
});
