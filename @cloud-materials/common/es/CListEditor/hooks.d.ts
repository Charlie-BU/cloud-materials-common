import type React from 'react';
import type { ReactNode } from 'react';
import type { CListEditorHooksProps, Value, ItemControl, CListEditorRules } from './interface';
import type { CPopoverVerifyRule } from '../CPopoverVerify/interface';
export declare const useCListEditor: (_props: CListEditorHooksProps) => readonly [{
    addProps: {
        disableAdd: boolean;
        disableAddTip: React.ReactNode;
        addBtnSuffix: string;
    };
    listValue: Value[];
    itemsControl: ItemControl[];
}, {
    readonly addItem: () => void;
    readonly removeItem: (index: number) => void;
    readonly changeListValue: (path: string, val: any) => void;
    readonly resetListValue: (length: number) => void;
    readonly handleEditingDisableVerify: () => void;
    readonly repeatValidator: (label: string, index: number) => (value: any, callback: (error?: React.ReactNode) => void) => void;
    readonly requireValidator: (label: string) => {
        required: boolean;
        message: string;
    };
    readonly changeRuleValidator: (index: number, rules?: CListEditorRules[]) => CPopoverVerifyRule[];
}];
