import type React from 'react';
import type { PopoverProps, DropdownProps } from '@arco-design/web-react';
import type { HTMLProps } from 'react';
/**
 * 添加按钮类型
 * primary：基本/首要样式，包括蓝色的icon和文案
 * secondary: 次要样式，黑色文案和icon
 * dash：虚线边框，文案居中，Button宽度随父组件宽度变化而变化
 * */
export type CAddButtonType = 'primary' | 'secondary' | 'dashed';
/**
 * @title CAddButtonProps
 */
export interface CAddButtonProps extends Omit<HTMLProps<HTMLDivElement>, 'className'> {
    /** 可通过type设置AddButton样式，实现样式的快速配置*/
    type: CAddButtonType;
    onClick?: () => void;
    /** 传入按钮文案, 不传时只展示Icon*/
    text?: React.ReactNode;
    showEnableAddTips?: boolean;
    /** 支持添加按钮后的 自定义文案tips*/
    customTips?: React.ReactNode;
    enableAddCount?: number;
    disabled?: boolean;
    /** popover展示的内容 优先级高于透传arcoPopoverProps的content属性*/
    popoverContent?: React.ReactNode;
    /** 透传给 arco popover 的props */
    arcoPopoverProps?: PopoverProps;
    /** 下拉框的展示内容 优先级高于透传arcoDropdownProps的droplist属性*/
    dropdownList?: React.ReactNode;
    /** 透传给 arco dropdown 的props */
    arcoDropdownProps?: DropdownProps;
    /** 组件样式 */
    style?: React.CSSProperties;
    /** 组件类名 */
    className?: string | string[];
    /**
     * 按钮原生的 html type 类型, 默认值button
     * @default button
     * */
    htmlType?: 'button' | 'submit' | 'reset';
}
