/*
 * @Author: youjingyu
 * @Date: 2021-09-14 21:17:09
 * @LastEditTime: 2021-10-09 17:33:24
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { Tag as ArcoTag, Popover } from '@arco-design/web-react';
import type { CellComponentRenderProps } from '../../../../core';
import { prefixCls as classScope } from '../../../constants';

export interface TagProps {
  /** tag列表 */
  tags?: string[] | React.ReactNode[];
  /** 指定超过某个数量收起tag，默认为3 */
  maxTagNum?: number;
  /** tag列表容器样式，一般不需要自定义 */
  tagsContainerStyle?: React.CSSProperties;
  /** tag样式，一般不需要自定义 */
  tagStyle?: React.CSSProperties;
}

const DEFAULT_MAX_TAG_NUM = 3;

const prefixCls = `${classScope}-cell-tags`;
export const Tag: React.FC<CellComponentRenderProps & TagProps> = props => {
  // 没有tags展示-
  if (!props.tags || !Array.isArray(props.tags)) return <div>-</div>;
  const { maxTagNum = DEFAULT_MAX_TAG_NUM, tags = [], tagsContainerStyle, tagStyle } = props;
  const totalNum = tags.length;

  const renderTip = () => (
    <Popover
      className={`${prefixCls}-tip-hover`}
      content={tags.map((tag, idx) => (
        <div className={`${prefixCls}-tip-tag`} key={idx}>
          <span>{tag}</span>
        </div>
      ))}
    >
      <ArcoTag className={`${prefixCls}-tip`}>{totalNum}</ArcoTag>
    </Popover>
  );
  return (
    <div className={prefixCls} style={tagsContainerStyle}>
      {tags.slice(0, maxTagNum).map((tag, idx) => (
        <ArcoTag key={idx} style={tagStyle}>
          {tag}
        </ArcoTag>
      ))}
      {totalNum > maxTagNum && renderTip()}
    </div>
  );
};
