/*
 * @Author: youjingyu
 * @Date: 2021-10-24 15:38:30
 * @LastEditTime: 2021-11-02 20:01:25
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { ToolbarItem } from './ToolbarItem';
import type { ToolbarItemGroup as ToolbarItemGroupConfig } from '../../types';
import { usePrefix } from '../../../react';

export const ToolbarItemGroup: React.FC<{
  toolbarItems: ToolbarItemGroupConfig<any>;
  onChange: (toolbarItemName: string, value: any, shouldSearch: boolean) => void;
}> = ({ toolbarItems, onChange }) => {
  const prefixCls = usePrefix('toolbar');
  return (
    <div className={`${prefixCls}-item-group`}>
      {toolbarItems.map((itemConfig, index) => {
        // 在 toolbar 配置列表中，可能会通过表达式过滤某些 item
        // 为了方便使用，允许在表达式中返回 false 或者 undefined
        // 这里判断 config 是否存在
        return itemConfig && itemConfig.visible !== false ? (
          <ToolbarItem config={itemConfig} key={index} onChange={onChange} />
        ) : null;
      })}
    </div>
  );
};
