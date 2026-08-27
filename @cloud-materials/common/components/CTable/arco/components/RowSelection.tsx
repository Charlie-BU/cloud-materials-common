/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-24 20:30:24
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { observer } from '@formily/react';
import { RowSelectionProvider, renderDecorator } from '../../react';
import type { RowSelectionProviderRenderProps, RowSelectionRenderProps } from '../../core';
import { isFn } from '../../shared';

const renderRowSelection = (options: RowSelectionProviderRenderProps) => {
  const { table, row } = options;
  const { Component, defaultComponentProps } = table.plugin.getComponent(row.rowSelectionComponentType, {
    scope: 'rowSelection',
  });
  if (!Component) {
    return null;
  }
  let componentProps = row.rowSelectionComponentProps;
  const modelProps: RowSelectionRenderProps = { ...options };
  if (isFn(componentProps)) {
    componentProps = componentProps(modelProps);
  }
  return <Component {...defaultComponentProps} {...componentProps} {...modelProps} />;
};

export const RowSelection: React.FC<{
  record: { key: string };
}> = observer(({ record }) => {
  return (
    <RowSelectionProvider rowKey={record.key}>
      {(options: RowSelectionProviderRenderProps) => {
        return renderDecorator(options.table, renderRowSelection(options), {
          scope: 'rowSelection',
          decoratorType: options.row.rowSelectionDecoratorType,
          decoratorProps: options.row.rowSelectionDecoratorProps,
        });
      }}
    </RowSelectionProvider>
  );
});
