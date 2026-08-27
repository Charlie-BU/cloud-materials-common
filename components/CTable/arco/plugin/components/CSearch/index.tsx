import React from 'react';
import { observer } from '@formily/react';
import type { ToolbarItemRenderProps } from '../../../../core';
import { omitToolbarItemRenderProps } from '../../../../react';
import { default as CSearchOuter } from '../../../../../CSearch';
import type {
  CSearchProps,
  CSimpleSearchProps,
  CCascaderSearchProps,
  CCombineSearchProps,
} from '../../../../../CSearch/interface';

export const CSearch: React.FC<ToolbarItemRenderProps & CSearchProps> = observer(props => {
  const { onChange, value } = props;

  return (
    // debounceOptions 配置为 null 时，可以去除 CSearch 的 debounce 逻辑
    <CSearchOuter {...omitToolbarItemRenderProps(props)} value={value} onChange={onChange} debounceOptions={null} />
  );
});

export const CSimpleSearch: React.FC<ToolbarItemRenderProps & CSimpleSearchProps> = observer(props => {
  const { onChange, value } = props;

  return (
    <CSearchOuter.CSimpleSearch
      {...omitToolbarItemRenderProps(props)}
      value={value}
      onChange={onChange}
      debounceOptions={null}
    />
  );
});

export const CCascaderSearch: React.FC<ToolbarItemRenderProps & CCascaderSearchProps> = observer(props => {
  const { onChange, value } = props;

  return (
    <CSearchOuter.CCascaderSearch
      {...omitToolbarItemRenderProps(props)}
      value={value}
      onChange={onChange}
      debounceOptions={null}
    />
  );
});

export const CCombineSearch: React.FC<ToolbarItemRenderProps & CCombineSearchProps> = observer(props => {
  const { onChange, value } = props;

  return <CSearchOuter.CCombineSearch {...omitToolbarItemRenderProps(props)} value={value} onChange={onChange} />;
});
