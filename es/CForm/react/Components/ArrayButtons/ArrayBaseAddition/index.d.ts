import type { ReactNode } from 'react';
import React from 'react';
import type { CAddButtonProps } from '../../../../../CAddButton/interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export interface CArrayBaseAddition {
    /**
     * 展示的文案
     */
    title?: ReactNode;
    /**
     * push 新增到最后
     * unshift 新增到最前面
     */
    method?: 'push' | 'unshift';
    /**
     * 新增 item 的默认值
     */
    defaultValue?: any;
    /**
     * 最大值
     */
    max?: number;
    /**
     * 是否展示辅助提示文案
     * @default true
     */
    showSubInfo?: boolean;
    /**
     * @default '还可添加 X 个'
     * 自定义的辅助文案
     * 支持模板字符串如 '还可添加${count}个'
     * 支持自定义渲染 @param currentCount 当前已添加的个数
     */
    subInfo?: string | ((currentCount: number) => ReactNode);
    /**
     * CAddButton的props
     */
    addButtonProps?: Partial<CAddButtonProps>;
    onClick?: () => void;
}
declare const ArrayBaseAddition: React.FC<CArrayBaseAddition>;
export default ArrayBaseAddition;
