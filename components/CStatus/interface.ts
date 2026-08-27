import type { PopoverProps } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';
import type { StatusList, TypeList } from './const';

export type StatusType = (typeof StatusList)[number];

export type Type = (typeof TypeList)[number];

export type Size = 'default' | 'large';

export type WaitColor = 'grey' | 'blue';
/**
 * @title CStatusProps
 */
export interface CStatusProps {
  /** status的状态
   * @defaultValue usable
   */
  status?: StatusType;
  /** status类型
   * @defaultValue normal
   * */
  type?: Type;
  /** 资源描述 */
  text?: ReactNode;
  /** 自定义icon，优先级高于status内置icon */
  icon?: ReactNode;
  /** 自定义tag背景颜色，type=tag生效，优先级高于status内置颜色 */
  tagColor?: string;
  /** 自定义highlight背景颜色，type=highlight生效，优先级高于status内置颜色 */
  highlightColor?: string;
  /** 自定义颜色，优先级高于模式自定义颜色，高于status内置颜色 */
  color?: string;
  /** 自定义border颜色，type=heavy、border、tag生效，优先级高于模式自定义颜色和status内置颜色 */
  borderColor?: string;
  /** 状态名称，当使用了该字段status和text将不会生效 */
  statusName?: string;
  /** 使用statusName时会从该字典取状态配置，组件有内置字典状态 */
  statusMap?: Record<string, Omit<CStatusConfig, 'waitColor'>>;

  /** hover显示 */
  popoverContent?: ReactNode;
  arcoPopoverProps?: Partial<PopoverProps>;

  /** wait状态配色选择，默认灰色，优先级高于全局配置 */
  waitColor?: WaitColor;

  /** size status的尺寸，有large和default可选
   * @defaultValue default
   */
  size?: Size;

  /**
   * text 部分最大宽度，默认160，传入false，跟随父元素
   * @defaultValue 160
   */
  maxWidth?: number | false;

  style?: CSSProperties;
  className?: string | string[];
}

/**
 * @title CStatusConfig
 */
export interface CStatusConfig {
  /** status状态 */
  status: StatusType;
  /** 资源描述 */
  text: string;
  /** 传入自定义icon */
  icon?: ReactNode;
  /** 自定义tag背景颜色，type=tag生效，优先级高于status */
  tagColor?: string;
  /** 自定义highlight背景颜色，type=highlight生效，优先级高于status */
  highlightColor?: string;
  /** 自定义颜色，优先级高于模式自定义颜色，高于status */
  color?: string;
  /** 自定义border颜色，type=heavy、border、tag生效，优先级高于模式自定义颜色和status */
  borderColor?: string;
  /** 设置全局的 wait 配色，默认是灰色 */
  waitColor?: WaitColor;
}

export interface TextProps {
  /** hover显示 */
  popoverContent?: ReactNode;
  arcoPopoverProps?: Partial<PopoverProps>;
  text?: string | ReactNode;
  /** text的颜色，heavy模式color固定 */
  color?: string;
}
