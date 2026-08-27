/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-22 19:01:23
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { observer } from '@formily/react';
import type { TableColumnProps as ArcoTableColumnProps } from '@arco-design/web-react';
import { FilterDropdownProvider, renderDecorator } from '../../react';
import type { FilterDropdownProviderRenderProps, FilterDropdownRenderProps } from '../../core';
import { isFn } from '../../shared';

type ArcoFilterDropdownOptions = Parameters<NonNullable<ArcoTableColumnProps['filterDropdown']>>[0];

const renderFilterDropdown = (
  options: FilterDropdownProviderRenderProps,
  dropdownOptions: ArcoFilterDropdownOptions,
) => {
  const { table, column } = options;
  const { Component, defaultComponentProps } = table.plugin.getComponent(column.filterComponentType, {
    scope: 'filter',
  });
  if (!Component) {
    return null;
  }
  let componentProps = column.filterComponentProps;
  const modelProps: FilterDropdownRenderProps = { ...options };
  if (isFn(componentProps)) {
    componentProps = componentProps(modelProps);
  }
  return <Component {...defaultComponentProps} {...componentProps} {...modelProps} dropdownOptions={dropdownOptions} />;
};

export const FilterDropdown: React.FC<{
  dataIndex: string;
  dropdownOptions: ArcoFilterDropdownOptions;
}> = observer(({ dataIndex, dropdownOptions }) => {
  return (
    <FilterDropdownProvider dataIndex={dataIndex}>
      {(options: FilterDropdownProviderRenderProps) => {
        return renderDecorator(options.table, renderFilterDropdown(options, dropdownOptions), {
          scope: 'filter',
          decoratorType: options.column.filterDecoratorType,
          decoratorProps: options.column.filterDecoratorProps,
          renderOptions: options,
        });
      }}
    </FilterDropdownProvider>
  );
});
