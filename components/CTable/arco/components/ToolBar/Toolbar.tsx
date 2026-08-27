/*
 * @Author: youjingyu
 * @Date: 2021-10-13 11:31:05
 * @LastEditTime: 2021-12-15 16:52:29
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { debounce } from 'lodash-es';
import type { ToolbarProviderRenderProps } from '../../../core';
import { ToolbarProvider, renderDecorator, useAttach, usePrefix } from '../../../react';
import { ToolbarRow } from './ToolbarRow';
import type { ToolbarConfig } from '../../types';

const formatConfig = (config: ToolbarConfig<any>) => {
  // 将直接配置的 left、right、bottomLeft 格式化为标准的格式
  if (config.left || config.right) {
    config.rows = [
      {
        left: config.left,
        right: config.right,
      },
    ];
  }
  // 暂不支持 bottomRows，想不到使用场景
  // if (config.bottomLeft) {
  //   config.bottomRows = [
  //     {
  //       left: config.bottomLeft,
  //     },
  //   ];
  // }
  return config;
};

const renderToolbar = ({ toolbar, prefixCls }: ToolbarProviderRenderProps & { prefixCls: string }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAttach(toolbar);
  const config = formatConfig(toolbar.config as ToolbarConfig) as ToolbarConfig<any>;

  const doSearch = debounce(() => {
    toolbar.filter();
  }, config.debounceDelay || 500);

  const onChange = (toolbarItemName: string, value: any, shouldSearch: boolean) => {
    toolbar.setFilterValues({ [toolbarItemName]: value }, { merge: true });
    // 支持单个 ToolbarItem 和整 toolbar 的 change 不触发搜索
    if (shouldSearch && config.filterOnChange !== false) {
      doSearch();
    }
  };

  const showRow = config.rows && config.rows?.length > 0;
  if (!showRow) {
    return null;
  }

  return (
    <div className={prefixCls}>
      {config.rows?.map((rowConfig, index) => {
        return <ToolbarRow key={index} config={rowConfig} onChange={onChange} />;
      })}
    </div>
  );
};

// 验证整个 toolbar 各个组件都没有主动包裹 observer，是否能够重新渲染（会渲染，整个 table 重新渲染时，toolbar 会带着渲染）
// TODO 支持 form 包装并考虑老代码的迁移成本
export const Toolbar: React.FC = () => {
  const prefixCls = usePrefix('toolbar');
  return (
    <ToolbarProvider>
      {(options: ToolbarProviderRenderProps) => {
        return renderDecorator(options.table, renderToolbar({ ...options, prefixCls }), {
          scope: 'toolbar',
          decoratorType: options.toolbar.decorator,
          // decoratorProps: options.toolbar.decoratorProps,
          renderOptions: options,
        });
      }}
    </ToolbarProvider>
  );
};
