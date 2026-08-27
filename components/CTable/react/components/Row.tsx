/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-09 17:31:36
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import type { Row, RowProviderRenderOptions } from '../../core';
import { useTable } from '../hooks';
import { isFn } from '../../shared';
import { usePrefix } from '../../react';

export const RowContext = createContext<Row>(null as unknown as Row);

export const _RowProvider: React.FC<{ index: number }> = ({ children, index }) => {
  const table = useTable();
  const prefix = usePrefix();
  const row = table.rows[index];
  if (!row) {
    return null;
  }
  const options: RowProviderRenderOptions = { table, row, prefix };
  const childrenNode = isFn(children) ? children(options) : children;

  return <RowContext.Provider value={row}>{childrenNode}</RowContext.Provider>;
};

export const RowProvider: React.FC<{ index: number }> = observer(_RowProvider);

export const RowProviderWithoutObserver = _RowProvider;
