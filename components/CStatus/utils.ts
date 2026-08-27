import type { CSSProperties } from 'react';
import type { CStatusConfig, CStatusProps, Type } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { BorderType } from './const';

export const cssPrefix = classNamePrefixFactory('status');

export function getStyle(props: CStatusProps & { statusMap: Record<string, CStatusConfig> }): CSSProperties {
  const {
    type = 'normal',
    status,
    statusName,
    tagColor,
    highlightColor,
    borderColor,
    style,
    color,
    statusMap,
    waitColor,
  } = props;
  const _status = status === 'wait' && waitColor === 'blue' ? 'loading' : status;
  const selectMap = statusName ? statusMap[statusName] : ({} as CStatusConfig);
  const typeStyle: Record<
    Type,
    {
      backgroundColor?: string;
      border?: string;
      color?: string;
    }
  > = {
    heavy: {
      backgroundColor: `var(--heavy-bg)`,
      border: `1px solid var(--disable-border)`,
      color: `var(--heavy-color)`,
    },
    tag: {
      backgroundColor: tagColor || selectMap?.tagColor || `var(--${_status}-tag-bg)`,
      border: `1px solid var(--${_status}-border)`,
      color: `var(--${_status}-ht-color)`,
    },
    border: {
      border: `1px solid var(--${_status}-border)`,
      color: `var(--${_status}-nbd-color)`,
    },
    highlight: {
      backgroundColor: highlightColor || selectMap?.highlightColor || `var(--${_status}-highlight-bg)`,
      color: `var(--${_status}-ht-color)`,
    },
    dot: {
      color: `var(--${_status}-nbd-color)`,
    },
    normal: {
      color: `var(--${_status}-nbd-color)`,
    },
  };

  const realStyle = typeStyle[type];

  if (BorderType.includes(type) && (borderColor || selectMap?.borderColor)) {
    realStyle.border = `1px solid ${borderColor || selectMap?.borderColor}`;
  }
  if (color || selectMap?.color) {
    realStyle.color = color || selectMap.color;
  }
  return {
    ...realStyle,
    ...style,
  };
}
