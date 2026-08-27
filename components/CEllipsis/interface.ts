import type { PopoverProps } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';
import type { CCopyProps } from '../CCopy/interface';

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

interface BaseProps {
  /** 渲染内容，使用该属性或者 children 即可 */
  content?: ReactNode;
  /** 渲染内容，使用该属性或者 content 即可  */
  children?: ReactNode;
  /** 文本的最大宽度，如果指定为 false, 则默认宽度跟随父元素 */
  maxWidth?: number | string | false;
  /** 是否展示 Popover, 当 auto 时，根据容器宽度计算结果而渲染 */
  showPopover?: boolean | 'auto';
  /** Popover 提示内容，不传值则使用 content|children */
  popoverContent?: ReactNode | ((isTextOverflow: boolean, content: string) => ReactNode);
  /** 透传 Arco.Popover */
  arcoPopoverProps?: Partial<PopoverProps>;
  /** Copy Icon 渲染位置 */
  copyPosition?: 'Container' | 'Popover';
  /** Copy 组件渲染时机 */
  showCopy?: boolean | 'hover';
  /** 透传 CCopy */
  cCopyProps?: CCopyProps;
  /** 添加后缀文字或者图标 */
  suffix?: ReactNode | (() => ReactNode);
  /** 点击 Ellipsis 文本信息回调事件 */
  onClick?: () => void;
  style?: CSSProperties;
  className?: string | string[];
  /**
   * 渲染为空时展示的默认文案
   * @default -
   */
  defaultText?: string;
}

/**
 * @title CEllipsisProps
 */
export type CEllipsisProps = RequireOnlyOne<BaseProps, 'content' | 'children'>;
