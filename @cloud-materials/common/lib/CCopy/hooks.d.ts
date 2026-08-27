import React from 'react';
import type { CCopyHooksProps } from './interface';
export declare const useCCopy: (props: CCopyHooksProps) => readonly [{
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
        content: React.ReactNode;
        onVisibleChange: (visible: boolean) => void;
    };
    message?: undefined;
    success?: undefined;
    fail?: undefined;
}, {
    handleCopy: (e: React.MouseEvent) => void;
    clearResult: () => void;
}];
