/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:02:25
 * @LastEditTime: 2021-10-22 19:01:53
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { memo } from 'react';
import { observer } from '@formily/react';
import { RowProvider, RowProviderWithoutObserver, renderDecorator } from '../../../react';
import type { RowProviderRenderOptions, RowRenderProps, Row } from '../../../core';
import { isFn } from '../../../shared';
import { getRowDataCy } from '../../utils';
import { isEqual } from 'lodash-es';
import cls from 'classnames';

const renderRow = (options: RowProviderRenderOptions, className: string, children: React.ReactNode) => {
  const { table, row, prefix } = options;
  const { Component, defaultComponentProps } = table.plugin.getComponent(row.componentType, {
    scope: 'row',
    logError: false,
  });
  const { dataCy, dataCyIdx } = getRowDataCy(row, prefix);
  // 为了在 Table Row hover 时, 内置组件的编辑icon、复制icon能够显示出来，需要加个class
  const trPrefix = `${prefix}-row`;
  if (!Component) {
    return (
      <tr data-testid={dataCy} data-cy={dataCy} data-cy-idx={dataCyIdx} className={cls(className, trPrefix)}>
        {children}
      </tr>
    );
  }
  let componentProps = row.componentProps;
  const modelProps: RowRenderProps = { ...options };
  if (isFn(componentProps)) {
    componentProps = componentProps(modelProps);
  }
  return (
    // 在自定义行中，不能确定业务方是否用了 tr，在 tr 外面套一层元素感觉不太合适
    // 因此将 dataCy、dataCyIdx 传给业务方， 业务方自己打桩
    <Component {...defaultComponentProps} {...componentProps} {...modelProps} dataCy={dataCy} dataCyIdx={dataCyIdx}>
      {children}
    </Component>
  );
};

export const TableRowMemo: React.FC<{ index: number; className: string; record: Row }> = memo(
  ({ children, index, className }) => {
    return (
      <RowProviderWithoutObserver index={index}>
        {(options: RowProviderRenderOptions) => {
          return renderDecorator(options.table, renderRow(options, className, children), {
            scope: 'row',
            decoratorType: options.row.decoratorType,
            decoratorProps: options.row.decoratorProps,
            renderOptions: options,
          });
        }}
      </RowProviderWithoutObserver>
    );
  },
  (prev, next) => {
    // TableRow 重新渲染的条件
    // 1. row data 改变
    // 2. isEditing 改变
    // 3. isExpanded 改变
    // 4. isSelected 改变
    // 5. selectable 改变
    // 6. expandable 改变
    const isSelectedEq = prev.record.isSelected === next.record.isSelected;
    const isSelectableEq = prev.record.selectable === next.record.selectable;
    const isEditingEq = prev.record.isEditing === next.record.isEditing;
    const isExpandedEq = prev.record.isExpanded === next.record.isExpanded;
    const isExpandableEq = prev.record.expandable === next.record.expandable;
    const valueEq = isEqual(prev.record.data, next.record.data);

    return valueEq && isSelectedEq && isSelectableEq && isEditingEq && isExpandedEq && isExpandableEq;
  },
);

export const TableRow: React.FC<{ index: number; className: string; record: any }> = observer(
  ({ children, index, className }) => {
    return (
      <RowProvider index={index}>
        {(options: RowProviderRenderOptions) => {
          return renderDecorator(options.table, renderRow(options, className, children), {
            scope: 'row',
            decoratorType: options.row.decoratorType,
            decoratorProps: options.row.decoratorProps,
            renderOptions: options,
          });
        }}
      </RowProvider>
    );
  },
);
