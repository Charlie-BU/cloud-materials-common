/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-12 16:17:04
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import type { Column, FilterDropdownProviderRenderProps } from '../../core';
import { useTable } from '../hooks';
import { isFn } from '../../shared';

export const FilterDropdownContext = createContext<Column>(null as unknown as Column);

export const FilterDropdownProvider: React.FC<{ dataIndex: string }> = observer(({ children, dataIndex }) => {
  const table = useTable();
  const column = table.getColumnByDataIndex(dataIndex);
  const options: FilterDropdownProviderRenderProps = { table, column };
  const childrenNode = isFn(children) ? children(options) : children;

  return <FilterDropdownContext.Provider value={column}>{childrenNode}</FilterDropdownContext.Provider>;
});
