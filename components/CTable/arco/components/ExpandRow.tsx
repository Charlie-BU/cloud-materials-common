/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-22 19:01:40
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
// import { observer } from '@formily/react';
import { ExpandRowProvider, renderDecorator } from '../../react';
import type { ExpandRowProviderRenderProps, ExpandRowRenderProps } from '../../core';
import { isFn } from '../../shared';

const renderExpandRow = (options: ExpandRowProviderRenderProps) => {
  const { table, row } = options;
  const { Component, defaultComponentProps } = table.plugin.getComponent(row.expandRowComponentType, {
    scope: 'expandRow',
  });
  if (!Component) {
    return null;
  }
  let componentProps = row.expandRowComponentProps;
  const modelProps: ExpandRowRenderProps = { ...options };
  if (isFn(componentProps)) {
    componentProps = componentProps(modelProps);
  }
  return <Component {...defaultComponentProps} {...componentProps} {...modelProps} />;
};

// 暂时去掉 observer，因为该组件没有访问响应式属性
export const ExpandRow: React.FC<{
  record: { key: string };
}> = ({ record }) => {
  return (
    <ExpandRowProvider rowKey={record.key}>
      {(options: ExpandRowProviderRenderProps) => {
        return renderDecorator(options.table, renderExpandRow(options), {
          scope: 'expandRow',
          decoratorType: options.row.expandRowDecoratorType,
          decoratorProps: options.row.expandRowDecoratorProps,
          renderOptions: options,
        });
      }}
    </ExpandRowProvider>
  );
};
