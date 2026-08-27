import type { JSXElementConstructor, ComponentProps } from 'react';
import type { DropdownProps } from '@arco-design/web-react';

export type BasicDropdownProps = Omit<DropdownProps, 'droplist'>;

/**
 * @title CStatusDropdownProps
 */
export interface CDropdownProps<T extends JSXElementConstructor<any>, ValueKey extends keyof ComponentProps<T>>
  extends BasicDropdownProps {
  /** 下拉组件 */
  component: T;
  /** 定义展示用的label key */
  labelKey?: keyof ComponentProps<T>;
  /** 定义value key */
  valueKey?: ValueKey;
  /** 定义下拉列表的参数 */
  options?: ComponentProps<T>[];
  /** 默认value */
  defaultValue?: ComponentProps<T>[ValueKey];
  /** 可控value */
  value?: ComponentProps<T>[ValueKey];
  /** 状态改变时回调函数 */
  onChange?: (value?: ComponentProps<T>[ValueKey]) => void;
}
