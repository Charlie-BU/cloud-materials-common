/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-22 19:01:35
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { memo } from 'react';
import { observer } from '@formily/react';
import { fallbackText } from '../../utils';
import { CellProvider, renderDecorator, usePrefix } from '../../react';
import type { CellProviderRenderOptions, CellComponentRenderProps } from '../../core';
import { isFn, formatCellData } from '../../shared';
import { getCellDataCy, getAlignRightWidth } from '../utils';
import type { ColumnModel } from '../types';
import { CellComponentsEnum } from '../types/BuiltInComponent';
import { omitCamelProps } from '../../react/shared';

const CellComponent: React.FC<{ options: CellProviderRenderOptions; arcoCellSpanClassname: string }> = observer(
  ({ options, arcoCellSpanClassname }) => {
    // 三种配置单元格自定义渲染的情况，以下是使用的优先级
    // 1. render，和 arco render 参数、行为均一致，优先级最高
    // 2. cell.component，对应 columnConfig 中的 component，可以使用组件 props 中提供的完整的领域模型信息
    // 3. cell.componentType，对应 columnConfig 中的 cellComponent。这种情况主要是为了兼容老代码
    const prefix = usePrefix();
    const { table, cell } = options;
    const column = options.column as ColumnModel<any>;

    let componentConf = table.plugin.getComponent(cell.component, {
      // 不兼容老代码的 cell.componentType
      // let componentConf = table.plugin.getComponent(cell.component || cell.componentType, {
      scope: 'cell',
    });
    if (!componentConf.Component) {
      // 默认用 Text 组件渲染 cell
      componentConf = table.plugin.getComponent('Text', { scope: 'cell' });
    }
    const { Component, defaultComponentProps } = componentConf;
    const content = formatCellData({
      cellData: cell.data,
      table,
      column,
      cell,
    });
    let componentProps = cell.componentProps;
    // 不兼容老代码的 cellComponentProps
    // let componentProps = cell.componentProps || cell.cellComponentProps;
    const modelProps: CellComponentRenderProps = { ...options, content, cellData: cell.data };
    if (isFn(componentProps)) {
      componentProps = componentProps(modelProps);
    }
    const { dataCy, dataCyIdx } = getCellDataCy(cell, prefix);
    /*
    将 component 当成组件使用存在的问题：
    1. 如果组件返回 undefined，会导致 react 崩溃
    2. 如果用 ErrorBoundary 包裹该组件，在组件崩溃后，无法 rerender，导致用户数据更新后，cell 没有更新
    3. 通过给 ErrorBoundary 加 key 的方式，可以实现 rerender，但要在发生错误时，更新 key，过于复杂

    将 component 当成函数调用存在的问题：
    1. react 不会创建新的节点，component 组件作用域（如 hooks、更新粒度等）属于调用 component 的组件
    2. 在我们的场景下，我们用 CellComponent 包裹用户的组件，相当于用户的组件作用域属于 CellComponent，
       就算将 component 当成函数调用，component 也可以使用 react 的所有特性
    3. 因为用户都是被 antd 和 arco 教育过的，并且考虑到老代码迁移过来的惯性，保持和 arco 的调用方式一致，出问题的概率更小

    因此我们选择：以函数调用的方式使用 component ，从而和 arco 的行为保持一致，避免用户迁移到新 table 后出现线上问题
  */
    let cellContent: React.ReactNode;
    if (column.config.render) {
      cellContent = column.config.render(cell.data, cell.row.data, cell.row.index);
    } else if (isFn(Component)) {
      cellContent = (Component as any)({
        ...defaultComponentProps,
        /**
         * 注意这里的 props 覆盖顺序：使用业务方传入的组件 componentProps 覆盖 modelProps（包含领域模型相关属性）
         * 因为 modelProps 和组件 componentProps 可能冲突，如：
         * {
         *    component: 'CEllipsis',
         *    componentProps: { content: 'xx' }
         * }
         * 上面传给 CEllipsis 的 content 会被 modelProps.content 覆盖。
         *
         * 决策逻辑：
         * modelProps 主要是包含 table、cell、column 等 props，这些 props 不太可能冲突
         * 而且冲突了，会立即出现异常，能够在 dev 时发现（TODO：给出警告？）
         * 而可能冲突的 content 属性，应该以组件的 props 为准，因此将 componentProps 写在 modelProps 后面，优先用 componentProps
         *
         * 2023-10-17 更新，内置组件的 props 中的 modelProps，移除 rowData, cellData, tableEditor
         * 原因是有些内置组件，比如 CStatus，会把 props 透传给下面的 dom 元素，而 dom 元素不能接受 cellData, tableEditor 这样的驼峰命名的 props，导致控制台报警告
         * 不能全部移除的原因是: Number, Text 组件会消费 props 中的 cell 和 content，不能影响存量代码
         */
        ...(cell.component in CellComponentsEnum ? omitCamelProps(modelProps) : modelProps),
        ...componentProps,
      });
    } else if ((Component as any).type) {
      // 如果 component 是 formily observer 包裹后的结果
      // 这里获取到的 Component 是一个组件（暂时通过 type 属性来识别），不能通过函数的方式来调用
      const Comp = Component as unknown as React.FC<any>;
      // 同理，注意 props 覆盖顺序：使用业务方传入的组件 componentProps 覆盖 modelProps
      cellContent = <Comp {...defaultComponentProps} {...modelProps} {...componentProps} />;
    } else if ((Component as any)?.$$typeof.toString() === 'Symbol(react.forward_ref)') {
      // 组件使用了forwardRef
      /**
       * 2024-2-18：修复使用forwardRef组件无法渲染问题，如CAsyncSwitch
       * 同时modelProps与isFn(Component)中逻辑保持一致
       * 备注：这里的代码没有((Component as any).type)合并的原因：自定义组件modelProps如果忽略了，可能存在breaking change
       */
      const Comp = Component as unknown as React.FC<any>;
      cellContent = (
        <Comp
          {...defaultComponentProps}
          {...(cell.component in CellComponentsEnum ? omitCamelProps(modelProps) : modelProps)}
          {...componentProps}
        />
      );
    } else {
      console.error('render or valid component configuration not found');
    }
    return (
      // arco 的 cell 渲染结果是用一个 <span className="arco-table-cell-wrap-value">text</span> 包裹 text 内容
      // 这里和 arco 保持一致
      <span
        className={arcoCellSpanClassname}
        data-testid={dataCy}
        data-cy={dataCy}
        data-cy-idx={dataCyIdx}
        style={{ marginRight: column.config.alignType === 'right' ? getAlignRightWidth(column) : undefined }}
      >
        {fallbackText(cellContent)}
      </span>
    );
  },
);

export const TableCell: React.FC<{
  column: { title: string; dataIndex: string; key: string };
  className: string;
  rowData: any;
}> = observer(({ column, className }) => {
  return (
    <CellProvider dataIndex={column.dataIndex}>
      {(options: CellProviderRenderOptions) => {
        return renderDecorator(options.table, <CellComponent options={options} arcoCellSpanClassname={className} />, {
          scope: 'cell',
          decoratorType: options.cell.decoratorType,
          decoratorProps: options.cell.decoratorProps,
          renderOptions: options,
        });
      }}
    </CellProvider>
  );
});

export const TableCellMemo: React.FC<{
  column: { title: string; dataIndex: string; key: string };
  className: string;
  rowData: any;
}> = memo(TableCell, (prev, next) => {
  /**
   * arco 渲染 cell 组件时，主要传入了如下的几个属性：
   * column、className、rowData
   * 以及 onHandleSave、onClick、onMouseOver 等，这几个不认为是状态，不参与 memo 的属性比较
   *
   * memo cell 的目的是，避免 table 的全局状态改变时，导致所有的 cell 都重新渲染
   *
   * 1. column：table 整体 rerender 时，一定会传入新的 column（包括 column 配置中的函数也是新的），因此如果 column 参与对比，基本就没有了 memo 的意义
   * 经过核对 table 的 column 配置 api，cell 基本不会受控于 column 的配置，因此不对比 column 的变化
   * TODO 未来可以挑选一些 cell 依赖的 column 配置进行对比
   *
   * 2. rowData：实际上 cell 只会消费 row.data
   * row.data 变化时，可以依赖 observer 来触发 cell 的 render（业务访问的其他 row 属性也可以通过 observer 触发 rerender），
   * 因此可以不对比 row.data 的变化
   *
   * 总结：只对 className 做对比，大概率 cell 也能正常渲染（还需要实际场景多验证）
   * 其实 className 应该大概率也不怎么变
   */
  return prev.className === next.className;
});
