import type { PopconfirmProps, ButtonProps, InputProps, TextAreaProps, PopoverProps } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';
import type { CCopyProps } from '../CCopy/interface';
import type { CEllipsisProps } from '../CEllipsis/interface';
import type { UseEditProps } from '../hooks';
/**
 * @title CPopupEditProps
 */
export interface CPopupEditProps {
    /**
     * 透传给组件根节点的内联样式
     */
    style?: CSSProperties;
    /**
     * 挂到组件根节点的样式名
     */
    className?: string | string[];
    /**
     * @zh 输入框初始值
     */
    defaultValue: string;
    /**
     * @zh 自定义展示的文本
     * @defaultValue — defaultValue 的值
     */
    displayContent?: ReactNode;
    /**
     *  自定义编辑图标标签
     */
    displayEditIcon?: ReactNode;
    /**
     * @zh 弹出框标题, 不写则表示无标题
     */
    title?: string;
    /**
     * @zh 输入框的类型
     * @defaultValue — input
     */
    type?: 'textArea' | 'input';
    /**
     * @zh 触发方式。优先级高于在 arcoPopconfirmProps 设置的 trigger
     * @defaultValue — click
     */
    trigger?: PopconfirmProps['trigger'];
    /**
     * @zh 输入框能够输入的最大字数
     */
    maxLength?: number;
    /**
     * @zh 自定义超出最大字数显示时的错误提示； 默认提示为：已超出字符数最大限制
     */
    maxLengthErrorMsg?: string;
    /**
     * @zh 输入框的校验规则
     */
    rules?: UseEditProps['rules'];
    /**
     * @zh 窗口出现的位置。优先级高于在 arcoPopconfirmProps 设置的 position
     */
    position?: PopconfirmProps['position'];
    /**
     * @zh 气泡宽度
     */
    width?: string | number;
    /**
     * @zh 输入框提示文字
     * @defaultValue — 请输入
     */
    placeholder?: string;
    /**
     * @zh 确定按钮的参数；可接受 Button 组件的所有参数。优先级高于在 arcoPopconfirmProps 设置的 okButtonProps
     */
    okButtonProps?: ButtonProps;
    /**
     * @zh 取消按钮的参数；可接受 Button 组件的所有参数。优先级高于在 arcoPopconfirmProps 设置的 cancelButtonProps
     */
    cancelButtonProps?: ButtonProps;
    /**
     * @zh 是否显示 copy 图标
     * @defaultValue — false
     */
    showCopy?: boolean;
    /**
     *  CCopy 组件Props。 优先级高级在 cEllipsisProps 设置的 cCopyProps
     */
    cCopyProps?: CCopyProps;
    /**
     *  CEllipsisProps 组件 Props（除了 content, children）
     */
    cEllipsisProps?: Omit<CEllipsisProps, 'children' | 'content'>;
    /**
     * 是否显示编辑按钮。如果设置成 false 则只有 hover 时才显示
     * @defaultValue — true
     */
    showEdit?: boolean;
    /**
     * 透传 arcoInputProps
     */
    arcoInputProps?: InputProps;
    /**
     * 透传 arcoTextareaProps
     */
    arcoTextareaProps?: TextAreaProps;
    /**
     * 透传 arcoPopconfirmProps
     */
    arcoPopconfirmProps?: PopconfirmProps;
    /**
     * 透传 arcoPopoverProps
     */
    arcoPopoverProps?: PopoverProps;
    /**
     * @zh 后缀
     */
    suffix?: React.ReactNode;
    /**
     * @zh 没有数据的时候显示的元素
     */
    emptyNode?: ReactNode;
    /**
     * @zh 编辑功能是否禁用（编辑图标是否禁用）
     */
    disabled?: boolean;
    /**
     * @zh 点击确认按钮时执行的函数
     */
    onOk?: (newValue: string) => void | Promise<void>;
    /**
     * @zh 点击取消按钮时执行的函数
     */
    onCancel?: () => void;
}
