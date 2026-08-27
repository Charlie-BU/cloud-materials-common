import React from 'react';
import type { BaseProps } from '../interface';
export interface UseFooterProps extends BaseProps {
    componentName: string;
}
export declare const useFooter: ({ visible, onOk, onCancel, confirmOnOk, footer, hideCancel, componentName, }: UseFooterProps) => readonly [{
    readonly onOk: (...args: unknown[]) => Promise<void> | undefined;
    readonly onCancel: (...args: any[]) => void;
    readonly visible: boolean;
    readonly confirmLoading: boolean;
    readonly footer: ((cancelButtonNode: React.ReactNode, okButtonNode: React.ReactNode) => any) | null;
}, {
    readonly setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}];
