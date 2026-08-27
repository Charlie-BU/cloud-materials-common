import type { ReactNode, CSSProperties, Attributes } from 'react';
/**
 * 拷贝子节点，添加props后返回新的节点
 * @param children
 * @param customeStyle
 * @returns
 */
export declare function renderValidChildren<P extends {
    style?: CSSProperties;
}>(children: ReactNode, props?: Partial<P> & Attributes): {}[] | null | undefined;
