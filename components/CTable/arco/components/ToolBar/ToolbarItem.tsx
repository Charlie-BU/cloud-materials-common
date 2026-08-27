import React from 'react';
import { observer } from '@formily/react';
import { useTable, usePrefix } from '../../../react';
import type { ToolbarItemRenderProps } from '../../../core';
import type { ToolbarItemConfig } from '../../types';
import { isFn } from '../../../shared';
import { useTableEditor } from '../../../../CTableEditor/view/hooks';
import { omitCamelProps } from '../../../react/shared';
import { ToolbarComponentsEnum } from '../../types/BuiltInComponent';

export const ToolbarItem: React.FC<{
  config: ToolbarItemConfig;
  onChange: (toolbarItemName: string, value: any, shouldSearch: boolean) => void;
  /**
   * 这里需要 observer，在 toolbar.filterValues 改变时触发 rerender，进而触发业务方配置的 toolbar item component rerender
   * 因为业务方组件可能只消费了传入的 value、change（见下面的 modelProps），无法收集到依赖，因此只能依靠 ToolbarItem 的 rerender 来触发其重新渲染，从而展示最新的 value
   **/
}> = observer(({ config, onChange }) => {
  const table = useTable();
  const tableEditor = useTableEditor();
  const prefixCls = usePrefix('toolbar');
  let contentNode: React.ReactNode;
  const configComponent = config.component as any;
  // 现在还这样写，是为了兼容老的代码，处理 component 可能是字符串的情况
  const { Component, defaultComponentProps } = table.plugin.getComponent(configComponent, {
    scope: 'toolbarItem',
  });
  if (Component) {
    // 现在还这样写，是为了兼容老的代码，新组件不支持传 componentProps 了
    let componentProps = (config as any).componentProps;
    const modelProps: ToolbarItemRenderProps = {
      table,
      tableEditor,
      toolbar: table.toolbar!,
      onChange(val) {
        // 配置了 ToolbarItem 的 name 时，才 onChange 出去
        // 也就是 ToolbarItem 不配置 name，外部就无法获取到某个其 value
        if (config.name) {
          onChange(config.name, val, config.filterOnChange !== false);
        }
      },
      value: table.toolbar?.filterValues[config.name || ''],
    };
    if (isFn(componentProps)) {
      componentProps = componentProps(modelProps);
    }

    /**
     * 2023-10-17 更新，内置组件的 props 中的 modelProps，移除 rowData, cellData, tableEditor
     * 原因是有些内置组件，比如 CStatus，会把 props 透传给下面的 dom 元素，而 dom 元素不能接受 cellData, tableEditor 这样的驼峰命名的 props，导致控制台报警告
     * 不能全部移除的原因是: RefreshBtn 等组件会消费 props 中的 table 等领域模型，不能影响存量代码
     */
    const omittedModelProps = configComponent in ToolbarComponentsEnum ? omitCamelProps(modelProps) : modelProps;

    contentNode = <Component {...defaultComponentProps} {...componentProps} {...omittedModelProps} />;
  }

  return <div className={`${prefixCls}-item`}>{contentNode}</div>;
});
