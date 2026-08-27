import type { PopoverProps } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';
/**
 * @title CAgreementLinkProps
 */
export interface CAgreementLinkProps {
    /** 协议名称 */
    linkDesc: string;
    /** 协议链接 */
    linkUrl?: string;
    /** 协议提示 */
    linkToolTip?: ReactNode;
    /** 协议提示的气泡框配置 */
    arcoPopoverProps?: PopoverProps;
}
/**
 * @title CAgreementProps
 */
export interface CAgreementProps {
    /**
     * @zh 是否是校验错误状态。在表单中使用时需要与和表单字段的错误状态同步。
     */
    validateStatusError?: boolean;
    /**
     * @zh 是否已确认协议，受控模式使用
     */
    value?: boolean;
    /**
     * @zh onChange
     */
    onChange?: (v: boolean) => void;
    /**
     * @zh 前缀
     * @defaultValue 我已阅读并同意
     */
    prefix?: ReactNode;
    /**
     * @zh 错误提示语
     * @defaultValue 请阅读相关协议，并勾选同意。
     */
    errorToolTip?: string;
    /**
     * @zh 协议，可通过数组形式传入多条协议
     */
    link?: CAgreementLinkProps | CAgreementLinkProps[];
    /**
     * @zh 场景 标识使用场景，包括card或normal，两种场景字号有差异。
     * @defaultValue 'normal'
     */
    scene?: 'card' | 'normal';
    style?: CSSProperties;
    className?: string | string[];
}
