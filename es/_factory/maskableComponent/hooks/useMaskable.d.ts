/// <reference types="react" />
import type { BaseHooksProps } from '../interface';
import type { UseFooterProps } from './useFooter';
export declare const useBaseMaskable: <T = unknown>({ componentName, ...props }: UseFooterProps & T & BaseHooksProps) => readonly [Omit<Omit<UseFooterProps & T & BaseHooksProps, "componentName">, "onCancel" | "confirmOnOk" | "preventCloseSelectors"> & {
    readonly onOk: (...args: unknown[]) => Promise<void> | undefined;
    readonly onCancel: (...args: any[]) => void;
    readonly visible: boolean;
    readonly confirmLoading: boolean;
    readonly footer: ((cancelButtonNode: import("react").ReactNode, okButtonNode: import("react").ReactNode) => any) | null;
}, {
    setVisible: (visible: number | boolean) => void;
}];
