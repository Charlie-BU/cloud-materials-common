import type { CSSProperties, ReactNode } from 'react';
import type React from 'react';
import type { PopoverProps } from '@arco-design/web-react';

/**
 * @title CCollapseProps
 */

export interface CCollapseProps<T> {
  /**
   * @zh 节点样式
   */
  style?: CSSProperties;
  /**
   * @zh 节点类名
   */
  className?: string | string[];
  /**
   * @zh 渲染数据
   */
  data?: T[] | string;
  /**
   * @zh 外部控制是否展开
   * @defaultValue false
   */
  expanded?: boolean;
  /**
   * @zh 默认是否展开，popover 模式下不可用
   * @defaultValue false
   */
  defaultExpanded?: boolean;
  /**
   * @zh 展示形式
   * @defaultValue default
   */
  mode?: 'default' | 'popover';
  /**
   * @zh 展开收起时的回调
   */
  onExpandedChange?: (expanded: boolean) => void;
  /**
   * 默认展示行数
   * @defaultValue 3
   */
  showRows?: number;
  /**
   * @zh 默认展示数量，当 data 为数组时可用
   */
  showCount?: number;
  /**
   * @zh 展开后的最大展示行数，内容超过最大行数，出现滚动条，popover 模式表示 popover 内的最大行数
   */
  maxRows?: number;
  /**
   * @zh 单个列表项节点渲染函数，当 data 为数组时可用
   */
  itemRender?: (item: T, index: number, isInPopover?: boolean) => ReactNode;
  /**
   * @zh 数组每一项的唯一 key，默认使用 index 作为唯一 key
   */
  itemKey?: React.Key | ((item: T) => React.Key);
  /**
   * @zh popover 里增加额外操作，例如复制，，popover 模式使用
   */
  extraRender?: () => ReactNode;
  /**
   * @zh popover 后面增加额外操作，例如添加标签，popover 模式使用
   */
  suffixRender?: ReactNode;
  /**
   * @zh data 长度为 0 时显示的元素，默认显示为 -
   */
  emptyNode?: ReactNode;
  /**
   * @zh 展开收起样式
   */
  operateRender?: (expanded: boolean, unExpandedCount?: number) => ReactNode;
  /**
   * @zh 可以接收 Popover 组件除了 Content 以外的参数，参考https://arco.design/react/components/Popover#api
   */
  arcoPopoverProps?: Omit<PopoverProps, 'Content'>;
}
