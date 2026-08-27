import React from 'react';
import type { PopoverProps } from '@arco-design/web-react';
/**
 * @title CCodeBlockHooksProps
 */
export interface CDownloadHooksProps {
    /** 下载内容 */
    value: string;
    /** 下载文件名称 格式为 文件名.后缀 */
    fileName: string;
    /** 复制成功后的提示内容 */
    successMessage?: React.ReactNode;
    /** 复制失败后的提示内容 */
    failMessage?: React.ReactNode;
    /** arcoPopover 属性透传 */
    arcoPopoverProps?: PopoverProps;
    /** tooltip显示文字 */
    tooltip?: string;
}
export declare const useDownload: (props: CDownloadHooksProps) => readonly [{
    message: {} | null;
    success: boolean;
    fail: boolean;
    arcoPopoverProps: {
        style?: React.CSSProperties | undefined;
        className?: string | string[] | undefined;
        title?: React.ReactNode | (() => React.ReactNode);
        disabled?: boolean | undefined;
        color?: string | undefined;
        prefixCls?: string | undefined;
        getPopupContainer?: ((node: HTMLElement) => Element) | undefined;
        unmountOnExit?: boolean | undefined;
        defaultPopupVisible?: boolean | undefined;
        popupVisible: boolean;
        trigger?: "contextMenu" | "hover" | "click" | "focus" | ("contextMenu" | "hover" | "click" | "focus")[] | undefined;
        triggerProps?: Partial<import("@arco-design/web-react").TriggerProps> | undefined;
        position?: "left" | "right" | "bottom" | "top" | "br" | "rt" | "tr" | "bl" | "tl" | "lt" | "lb" | "rb" | undefined;
        escToClose?: boolean | undefined;
        popupHoverStay?: boolean | undefined;
        blurToHide?: boolean | undefined;
        childrenPrefix?: string | undefined;
        content: JSX.Element;
        onVisibleChange: (visible: boolean) => void;
    };
} | {
    arcoPopoverProps: {
        style?: React.CSSProperties | undefined;
        className?: string | string[] | undefined;
        title?: React.ReactNode | (() => React.ReactNode);
        disabled?: boolean | undefined;
        color?: string | undefined;
        prefixCls?: string | undefined;
        getPopupContainer?: ((node: HTMLElement) => Element) | undefined;
        unmountOnExit?: boolean | undefined;
        defaultPopupVisible?: boolean | undefined;
        popupVisible: boolean;
        trigger?: "contextMenu" | "hover" | "click" | "focus" | ("contextMenu" | "hover" | "click" | "focus")[] | undefined;
        triggerProps?: Partial<import("@arco-design/web-react").TriggerProps> | undefined;
        position?: "left" | "right" | "bottom" | "top" | "br" | "rt" | "tr" | "bl" | "tl" | "lt" | "lb" | "rb" | undefined;
        escToClose?: boolean | undefined;
        popupHoverStay?: boolean | undefined;
        blurToHide?: boolean | undefined;
        childrenPrefix?: string | undefined;
        content: string;
        onVisibleChange: (visible: boolean) => void;
    };
    message?: undefined;
    success?: undefined;
    fail?: undefined;
}, {
    downloadFile: () => void;
    clearResult: () => void;
}];
