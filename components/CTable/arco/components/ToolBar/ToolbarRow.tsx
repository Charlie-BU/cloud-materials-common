/*
 * @Author: youjingyu
 * @Date: 2021-10-13 11:31:05
 * @LastEditTime: 2021-10-29 15:53:56
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import cls from 'classnames';
import { ToolbarItemGroup } from './ToolbarItemGroup';
import type { ToolbarRowConfig } from '../../types';
import { usePrefix } from '../../../react';

export const ToolbarRow: React.FC<{
  config: ToolbarRowConfig<any>;
  onChange: (toolbarItemName: string, value: any, shouldSearch: boolean) => void;
}> = ({ config, onChange }) => {
  const prefixCls = usePrefix('toolbar');
  let onlyClass;
  if (config.left && !config.right) {
    onlyClass = `${prefixCls}-row-only-left`;
  } else if (config.right && !config.left) {
    onlyClass = `${prefixCls}-row-only-right`;
  }
  return (
    <div className={cls(`${prefixCls}-row`, onlyClass)}>
      {config.left && (
        <div className={`${prefixCls}-row-left`}>
          <ToolbarItemGroup toolbarItems={config.left} onChange={onChange} />
        </div>
      )}
      {config.right && (
        <div className={`${prefixCls}-row-right`}>
          <ToolbarItemGroup toolbarItems={config.right} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
