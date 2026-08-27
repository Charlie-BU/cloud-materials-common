import type { ReactNode } from 'react';
import React from 'react';
import type { LinkProps, PopoverProps } from '@arco-design/web-react';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
interface CArrayRemove {
    className?: string;
    /**
     * // 按钮的类型，支持单icon , 单text，和icon 和文案的组合
     */
    type?: 'icon' | 'text' | 'both';
    /**
     * 最小的数量
     */
    min?: number;
    /**
     * popover 的属性，优先级高于内置变量
     */
    popoverProps?: PopoverProps;
    /**
     * @deprecated 废弃，后续通过自定义删除按钮实现样式自定义
     * type 为 text & both 的时候生效
     */
    addButtonProps?: LinkProps;
    /**
     * 是否禁用，和 addButtonProps.disabled 功能一致
     */
    disabled?: boolean;
    /**
     * 删除的文案
     * type 为 text & both 的时候生效
     */
    text?: ReactNode;
    /**
     * @default '至少添加x个'
     * 自定义popover文案
     * 支持模板字符串如 '至少添加${count}个'
     * 支持自定义渲染 @param currentCount 当前已添加的个数
     */
    popoverInfo?: string | ((currentCount: number) => ReactNode);
    /**
     * 点击删除的回调，这里可以做埋点等需求
     * @param index 删除的行数 index
     * @returns void
     */
    onClick?: (index: number) => void;
}
declare const CArrayRemove: React.MemoExoticComponent<import("@formily/react").ReactFC<CArrayRemove>>;
export default CArrayRemove;
