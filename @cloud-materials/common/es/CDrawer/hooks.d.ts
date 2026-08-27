/// <reference types="react" />
import type { CDrawerHooksProps } from './interface';
export declare const useCDrawer: (props: CDrawerHooksProps) => readonly [Omit<Omit<import("../_factory/maskableComponent/hooks/useFooter").UseFooterProps & CDrawerHooksProps & import("../_factory/maskableComponent").BaseHooksProps, "componentName">, "onCancel" | "confirmOnOk" | "preventCloseSelectors"> & {
    readonly onOk: (...args: unknown[]) => Promise<void> | undefined;
    readonly onCancel: (...args: any[]) => void;
    readonly visible: boolean;
    readonly confirmLoading: boolean;
    readonly footer: ((cancelButtonNode: import("react").ReactNode, okButtonNode: import("react").ReactNode) => any) | null;
}, {
    setVisible: (visible: number | boolean) => void;
}];
