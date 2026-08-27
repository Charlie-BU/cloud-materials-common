import React from 'react';
import { Tag as ArcoTag } from '@arco-design/web-react';
import classNames from 'classnames';

import { useCConfigContext } from '../../CConfigProvider';
import CEllipsis from '../../CEllipsis';
import { MAX_WIDTH, TEST_ID } from '../constant';
import type { CTagProps } from '../interface';
import { getTagStyle, isArcoColor } from '../util';

/**
 * @description 渲染标签
 */
export const TagItem = (props: Omit<CTagProps, 'prefix'>) => {
  const {
    cEllipsisProps,
    children,
    className,
    color,
    maxWidth = MAX_WIDTH,
    size = 'medium',
    shape = 'default',
    style,
    type = 'default',
    ...restProps
  } = props;

  const { useCssPrefix } = useCConfigContext();
  const cssPrefixTag = useCssPrefix('tag');

  return (
    <ArcoTag
      {...restProps}
      color={isArcoColor(color) ? color : undefined}
      className={classNames(
        cssPrefixTag``,
        cssPrefixTag`${size}`,
        cssPrefixTag`type-${type}`,
        cssPrefixTag`shape-${shape}`,
        !color && shape === 'mark' && cssPrefixTag`default-mark`,
        className,
      )}
      style={{ ...getTagStyle(color, type, shape), ...style, maxWidth }}
      data-testid={TEST_ID.tag}
    >
      <CEllipsis showCopy={false} {...cEllipsisProps}>
        <>{children}</>
      </CEllipsis>
    </ArcoTag>
  );
};
