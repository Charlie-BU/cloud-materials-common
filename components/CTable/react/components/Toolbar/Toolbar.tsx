/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-13 17:37:54
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import type { Toolbar, ToolbarProviderRenderProps } from '../../../core';
import { useTable } from '../../hooks';
import { isFn } from '../../../shared';

export const ToolbarContext = createContext<Toolbar>(null as unknown as Toolbar);

export const ToolbarProvider: React.FC = observer(({ children }) => {
  const table = useTable();
  const toolbar = table.toolbar!;
  const options: ToolbarProviderRenderProps = { table, toolbar };
  const childrenNode = isFn(children) ? children(options) : children;

  return <ToolbarContext.Provider value={toolbar}>{childrenNode}</ToolbarContext.Provider>;
});
