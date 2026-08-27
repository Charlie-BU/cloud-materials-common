import React from 'react';

import classNames from 'classnames';

import { getChildrenString } from '../../_utils/reactChildren';
import type { CTagsProps } from '../interface';
import { TagsCopy } from './Copy';
import CCollapse from '../../CCollapse';
import { useCConfigContext } from '../../CConfigProvider';
import CTag from '..';

/**
 * @description 标签组
 */
const CTags = (props: CTagsProps) => {
  const { children, maxShowCount, className, data, cCollapseProps, style, copyable, renderItem, ...restProps } = props;

  const { useCssPrefix } = useCConfigContext();
  const cssPrefixTags = useCssPrefix('tags');

  const copyContent = children
    ? children.map(child => getChildrenString(child))
    : data?.map(tag => (typeof tag === 'string' ? tag : `${tag.prefix}:${tag.value}`));

  const _collapseProps = {
    ...cCollapseProps,
    style,
    className: classNames(cssPrefixTags``, className),
    mode: copyable || cCollapseProps?.extraRender ? 'popover' : cCollapseProps?.mode,
    extraRender: cCollapseProps?.extraRender ?? (() => <TagsCopy copyable={copyable} content={copyContent || ''} />),
  };

  // 渲染子元素
  if (children) {
    return (
      <CCollapse<React.ReactNode>
        {..._collapseProps}
        data={children}
        showCount={maxShowCount}
        itemRender={item => item}
      />
    );
  }

  // 渲染数据源
  return (
    <CCollapse<any>
      {..._collapseProps}
      data={data as any[]}
      showCount={maxShowCount}
      itemRender={
        renderItem ??
        ((tag, index) => {
          const isStringTag = typeof tag === 'string';
          return (
            <CTag key={index} prefix={isStringTag ? undefined : tag.prefix} {...restProps}>
              {isStringTag ? tag : tag.value}
            </CTag>
          );
        })
      }
    />
  );
};

CTags.displayName = 'CTags';

export default CTags;
