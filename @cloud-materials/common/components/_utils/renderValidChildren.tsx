import type { ReactNode, CSSProperties, Attributes } from 'react';
import React from 'react';

/**
 * 拷贝子节点，添加props后返回新的节点
 * @param children
 * @param customeStyle
 * @returns
 */
export function renderValidChildren<P extends { style?: CSSProperties }>(
  children: ReactNode,
  props?: Partial<P> & Attributes,
) {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const style = {
        ...(child.props?.style || {}),
        ...props?.style,
      };
      const p = {
        ...child.props,
        style,
      };
      return React.cloneElement(child, p);
    }
    return child;
  });
}
