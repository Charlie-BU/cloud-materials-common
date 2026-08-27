/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-06 17:31:09
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import type { Table } from '../../core';

export const TableContext = createContext<Table>(null as unknown as Table);

export type TableProviderProps = {
  table: Table;
};

export const TableProvider: React.FC<TableProviderProps> = props => {
  return <TableContext.Provider value={props.table}>{props.children}</TableContext.Provider>;
};
