import React from 'react';
import type { TableConfig } from '../../CTable';
import { onTableSelectRow, TableMode } from '../../CTable';
// import { getColumns, getPagination, getTableBaseConfig, mode } from '.';
import { RightHeader } from '../components/Header';
import type { CTableTransferProps } from '../interface';
import { DEFAULT_KEY } from '../constant';
import { getColumns } from './getColumns';
import { getPagination } from './getPagination';
import { getTableBaseConfig } from './getTableBaseConfig';
import { mode } from './tools';
import type { CLocale } from '../../locales/default';

interface TargetTableProps {
  cTransferProps: CTableTransferProps;
  onTargetTableSelectRow: () => void;
  onClear: () => void;
  locale: CLocale;
}

/**
 * @description 右侧Table配置
 *
 * @param {TargetTableProps} { cTransferProps, onTargetTableSelectRow, onClear }
 * @return {*}
 */
const TargetTable = ({ cTransferProps, onTargetTableSelectRow, onClear, locale }: TargetTableProps) => {
  const { CTableProps } = cTransferProps;
  const { targetColumns } = getColumns(cTransferProps);
  const baseConfig = getTableBaseConfig({ ...cTransferProps }, locale);
  const { retain, simple } = mode({ ...cTransferProps });

  const sourceCTableProps = CTableProps ? CTableProps[0] || {} : {};
  const rightCTableProps = CTableProps ? CTableProps[1] || {} : {};
  const [_, pagination] = getPagination({ ...cTransferProps });

  const config: TableConfig<any> = {
    rowKey: sourceCTableProps.rowKey || DEFAULT_KEY,
    ...rightCTableProps,
    pagination: pagination,
    mode: TableMode.LOCAL,
    columns: targetColumns,
    extraConfig: {
      ...rightCTableProps.extraConfig,
      ...baseConfig.extraConfig,
    },
    arcoTableProps: {
      showHeader: rightCTableProps.columns?.length ? true : false,
      ...baseConfig.arcoTableProps,
      ...rightCTableProps.arcoTableProps,
    },
    toolbar: {
      ...baseConfig.toolbar,
      ...rightCTableProps.toolbar,
      left: [
        {
          component: () => <RightHeader onClear={onClear} cTransferProps={cTransferProps} />,
        },
      ],
    },
    effects({ table }) {
      onTableSelectRow(() => {
        // table 中的行被选择或者取消选择
        onTargetTableSelectRow();
      });
      if (baseConfig.effects) {
        baseConfig.effects({ table });
      }
      if (rightCTableProps.effects) {
        rightCTableProps.effects({ table });
      }
    },
  };

  if (!retain && !simple) {
    // 数据留存和简单模式不需要展示全选框
    config.rowSelection = 'checkbox';
  }
  //分页
  if (pagination) {
    config.toolbar!.bottomLeft = [
      {
        component: () => null,
      },
    ];
  }

  return config;
};
export default TargetTable;
