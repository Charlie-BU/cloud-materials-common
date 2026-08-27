/*
 * @Author: youjingyu
 * @Date: 2021-10-13 17:11:06
 * @LastEditTime: 2021-10-18 11:25:51
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import type { Table, JSXComponent, ComponentProps } from '../../core';
import { isFn } from '../../shared';

export const renderDecorator = (
  table: Table,
  children: React.ReactNode,
  options: {
    scope: string;
    decoratorType?: JSXComponent;
    decoratorProps?: ComponentProps;
    renderOptions?: any;
  },
) => {
  if (!options.decoratorType) {
    return <>{children}</>;
  }
  const { Component: Decorator, defaultComponentProps } = table.plugin.getComponent(options.decoratorType, {
    scope: options.scope,
  });
  if (!Decorator) {
    return <>{children}</>;
  }
  let decoratorProps = options.decoratorProps;
  if (isFn(decoratorProps)) {
    decoratorProps = decoratorProps(options.renderOptions || { table });
  }
  return React.createElement(
    Decorator as any,
    {
      ...defaultComponentProps,
      ...decoratorProps,
      table,
      style: {
        ...decoratorProps?.style,
      },
    },
    children,
  );
};
