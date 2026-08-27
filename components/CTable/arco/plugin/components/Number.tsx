import React from 'react';
import type { CellComponentRenderProps } from '../../../core';
import { toLocaleString } from '../../utils';

export interface NumberProps {
  customContent: string;
}

export const Number: React.FC<CellComponentRenderProps & NumberProps> = props => {
  let content = props.customContent;
  if (content === undefined) {
    // 如果没有配置  customContent，也没有配置 formatter，默认通过 toLocaleString 转换
    content = props.cell.column.config.formatter ? props.content : toLocaleString(props.content);
  }
  return <div style={{ textAlign: 'right' }}>{content}</div>;
};
