import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { InputNumberProps, InputProps, PopoverProps, TextAreaProps, SelectProps } from '@arco-design/web-react';
import type { CPopoverVerifyProps } from '../CPopoverVerify/interface';
import type { CEllipsisProps } from '../CEllipsis/interface';
import type { DefineBuiltInBasicType } from '../_factory/builtInComponent';
import type { BuiltInCpnType } from './';
/**
 * @title CInlineEditProps
 * 全局配置参数
 */
export type CInlineEditGlobalConfig = Record<string, {
    emptyData?: string;
    /** 校验规则 */
    rules?: CPopoverVerifyProps['rules'];
}>;
/**
 * @title CInlineEditProps
 */
export interface CInlineEditProps<T = string> {
    /**
     * 展示值，并且会用作编辑模式下的初始值
     * @defaultValue T 默认是 string 类型
     * */
    value: T;
    /** 自定义渲染展示值 */
    renderFormat?: (value: T) => ReactNode;
    /** 内置表单渲染组件，支持 Input,InputNumber,Textarea,Select */
    field?: DefineBuiltInBasicType<BuiltInCpnType>;
    /** 当 value 为 falsy 时，展示该值 */
    emptyData?: string;
    /** 透传 CEllipsis 组件 */
    CEllipsisProps?: Partial<Omit<CEllipsisProps, 'children' | 'content'>>;
    /** 是否展示编辑按钮 */
    showEditIcon?: boolean;
    /** 自定义渲染组件 */
    children?: ReactElement | ((params: {
        value: T;
        onChange: (value: T) => void;
    }) => ReactElement);
    /** 业务类型 */
    bizType?: string;
    /** 操作按钮配置 */
    operationButton?: {
        btnType: 'icon' | 'text';
        submitText?: string;
        cancelText?: string;
    };
    /** 是否默认在编辑态 */
    initEditable?: boolean;
    /** 提交回调事件 */
    onSubmit: (value: T) => void;
    /** 取消回调事件 */
    onCancel?: () => void;
    /**
     * @deprecated 建议使用 field 属性代替
     * 表单组件类型
     */
    fieldType?: 'Input' | 'Textarea' | 'InputNumber' | 'Select';
    /**
     * @deprecated 建议使用 field 属性代替
     * 透传 Arco.Input
     */
    arcoInputProps?: Partial<InputProps>;
    /**
     * @deprecated 建议使用 field 属性代替
     * 透传 Arco.Textarea
     */
    arcoTextareaProps?: Partial<TextAreaProps>;
    /**
     * @deprecated 建议使用 field 属性代替
     * 透传 Arco.InputNumber
     */
    arcoInputNumberProps?: Partial<InputNumberProps>;
    /**
     * @deprecated 建议使用 field 属性代替
     * 透传 Arco.Select
     */
    arcoSelectProps?: Partial<SelectProps>;
    /** 透传 Arco.Popover */
    arcoPopoverProps?: Partial<PopoverProps>;
    /** Select 下的可选项 */
    options?: SelectProps['options'];
    /** 是否禁用 */
    disabled?: boolean;
    /** 禁用提示文案 */
    disabledTips?: string;
    /** 异步校验函数 */
    asyncValidator?: (value: T) => Promise<string> | void;
    /**
     * 是否在失去焦点时进行异步校验
     * @defaultValue false
     * */
    enableAsyncValidateWhenBlur?: boolean;
    /** 编辑 Icon 的提示文案 */
    editTips?: string;
    /** 校验规则 */
    rules?: CPopoverVerifyProps['rules'];
    style?: CSSProperties;
    className?: string | string[];
    /** EditIcon 之后的自定义 UI */
    suffix?: ReactNode;
}
