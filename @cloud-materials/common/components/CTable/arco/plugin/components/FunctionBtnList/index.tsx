/*
 * @Author: youjingyu
 * @Date: 2021-10-18 10:33:49
 * @LastEditTime: 2021-10-18 15:55:20
 * @LastEditors: youjingyu
 * @Description:
 */
import type { FC } from 'react';
import React from 'react';
import OperationMenu from '../../../../../COperationMenu';
import type { Operation } from '../../../../../COperationMenu/interface';
import type { ToolbarItemRenderProps, JSXComponent } from '../../../../core';
import { isFn } from '../../../../shared';
import type { ColConfigBtnProps } from '../ColConfigBtn';
import type { ExportDataBtnProps } from '../ExportDataBtn';
import type { RefreshBtnProps } from '../RefreshBtn';
import { usePrefix } from '../../../../react';

type ToConfigUnionType<T extends Record<string, any>, K extends keyof T = keyof T> = K extends keyof T
  ? {
      component: K | FC<ToolbarItemRenderProps>;
      componentProps?: T[K];
    }
  : never;

type ComponentPropMap = {
  ColConfigBtn: ColConfigBtnProps;
  ExportDataBtn: ExportDataBtnProps;
  RefreshBtn: RefreshBtnProps;
};

export type FunctionBtnConfigItem = ToConfigUnionType<ComponentPropMap> & {
  visible?: boolean | ((options: ToolbarItemRenderProps) => boolean);
};

export interface FunctionBtnListProps {
  btnList: FunctionBtnConfigItem[];
}

export const FunctionBtnList: FC<ToolbarItemRenderProps & FunctionBtnListProps> = ({
  btnList = [],
  ...toolBarItemProps
}) => {
  const prefixCls = usePrefix('comp-func-btn');
  const opList: Operation[] = btnList
    .filter(item => {
      if (item.visible === undefined) {
        return true;
      }
      return isFn(item.visible) ? item.visible(toolBarItemProps) : item.visible;
    })
    .map((item, index) => {
      const { componentProps, component } = item;
      const { Component, defaultComponentProps } = toolBarItemProps.table.plugin.getComponent(
        component as JSXComponent,
        {
          scope: 'toolbarItem',
        },
      );
      return {
        name: `${index}`,
        render: () =>
          Component ? <Component {...defaultComponentProps} {...componentProps} {...toolBarItemProps} /> : null,
      };
    });
  return (
    <div className={prefixCls}>
      <OperationMenu displayNum={10} spaceSize={12} operations={opList} />
    </div>
  );
};
