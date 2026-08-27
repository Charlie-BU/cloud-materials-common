/// <reference types="react" />
import type { CModalHooksProps } from './interface';
export declare const useCModal: (props: CModalHooksProps) => readonly [Omit<Omit<import("../_factory/maskableComponent/hooks/useFooter").UseFooterProps & {
    componentName: string;
    footerDivider?: boolean | undefined;
    scrollMaxHeight?: number | "none" | undefined;
    visible?: number | boolean | undefined;
    mask?: boolean | undefined;
    contentTop?: import("../_factory/maskableComponent").AlertContentType;
    contentBottom?: import("../_factory/maskableComponent").AlertContentType;
    confirmLoading?: boolean | undefined;
    contentClassName?: string | undefined;
    confirmOnOk?: false | import("@arco-design/web-react").PopconfirmProps | undefined;
    onOk?: ((...args: unknown[]) => any) | undefined;
    onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    style?: import("react").CSSProperties | undefined;
    afterClose?: ((() => void) & (() => void)) | undefined;
    children?: any;
    footer?: ((string | number | boolean | {} | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | import("react").ReactPortal | ((cancelButtonNode: import("react").ReactNode, okButtonNode: import("react").ReactNode) => import("react").ReactNode)) & (string | number | boolean | {} | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | import("react").ReactPortal | ((cancelButtonNode: import("react").ReactNode, okButtonNode: import("react").ReactNode) => import("react").ReactNode))) | null | undefined;
    okText?: import("react").ReactNode;
    cancelText?: import("react").ReactNode;
    okButtonProps?: Partial<{
        htmlType?: "submit" | "button" | "reset" | undefined;
    } & import("@arco-design/web-react/es/Button/interface").BaseButtonProps & Omit<import("react").ButtonHTMLAttributes<any>, "type" | "className" | "onClick"> & {
        href: string;
        target?: string | undefined;
        anchorProps?: import("react").HTMLProps<HTMLAnchorElement> | undefined;
    } & Omit<import("react").AnchorHTMLAttributes<any>, "type" | "className" | "onClick">> | undefined;
    cancelButtonProps?: Partial<{
        htmlType?: "submit" | "button" | "reset" | undefined;
    } & import("@arco-design/web-react/es/Button/interface").BaseButtonProps & Omit<import("react").ButtonHTMLAttributes<any>, "type" | "className" | "onClick"> & {
        href: string;
        target?: string | undefined;
        anchorProps?: import("react").HTMLProps<HTMLAnchorElement> | undefined;
    } & Omit<import("react").AnchorHTMLAttributes<any>, "type" | "className" | "onClick">> | undefined;
    hideCancel?: boolean | undefined;
    className?: string | string[] | undefined;
    title?: import("react").ReactNode;
    prefixCls?: string | undefined;
    getPopupContainer?: (() => Element) | undefined;
    focusLock?: boolean | undefined;
    unmountOnExit?: boolean | undefined;
    autoFocus?: boolean | undefined;
    closable?: boolean | undefined;
    closeIcon?: import("react").ReactNode;
    wrapClassName?: string | string[] | undefined;
    maskStyle?: import("react").CSSProperties | undefined;
    escToExit?: boolean | undefined;
    maskClosable?: boolean | undefined;
    mountOnEnter?: boolean | undefined;
    afterOpen?: (() => void) | undefined;
    getChildrenPopupContainer?: ((node: HTMLElement) => Element) | undefined;
    simple?: boolean | undefined;
    onConfirm?: ((e?: MouseEvent | undefined) => void | Promise<any>) | undefined;
    alignCenter?: boolean | undefined;
    wrapStyle?: import("react").CSSProperties | undefined;
    modalRender?: ((modalNode: import("react").ReactNode) => import("react").ReactNode) | undefined;
    preventCloseSelectors?: string[] | undefined;
} & import("../_factory/maskableComponent").BaseHooksProps, "componentName">, "onCancel" | "confirmOnOk" | "preventCloseSelectors"> & {
    readonly onOk: (...args: unknown[]) => Promise<void> | undefined;
    readonly onCancel: (...args: any[]) => void;
    readonly visible: boolean;
    readonly confirmLoading: boolean;
    readonly footer: ((cancelButtonNode: import("react").ReactNode, okButtonNode: import("react").ReactNode) => any) | null;
}, {
    setVisible: (visible: number | boolean) => void;
}];
