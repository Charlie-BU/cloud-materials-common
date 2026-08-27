import type { LinkProps, PopoverProps } from '@arco-design/web-react';
import type { ReactNode } from 'react';

/**
 * @title CLinkProps
 */
export interface CLinkProps extends Omit<LinkProps, 'icon'> {
  /**
   * @zh 链接字体大小，default 13px, small 12px，也可自定义number大小
   * @default default
   */
  size?: 'default' | 'small' | number;
  /**
   * @zh 固定搭配，help-doc:帮助文档 example:示例 file:文件
   * @default default
   */
  type?: 'default' | 'help-doc' | 'example' | 'file';
  /**
   * @zh popover的content，传入arcoPopoverProps包含content将覆盖
   * @default
   */
  popoverContent?: PopoverProps['content'];
  /**
   * @zh 传入popover配置，展示popover
   * @default
   */
  arcoPopoverProps?: PopoverProps;
  /**
   * @zh 链接前缀icon
   * @default
   */
  prefixIcon?: ReactNode | boolean;
  /**
   * @zh 链接后缀icon
   * @default
   */
  suffixIcon?: ReactNode | boolean;
}
