/// <reference types="react" />
import type { UseValidateProps } from './useValidate';
export interface UseEditProps<T = string> {
    value: T;
    initEditable?: boolean;
    rules?: UseValidateProps['rules'];
    stopAtFirstError?: boolean;
}
export declare function useEdit<T = string>({ value, initEditable, rules, stopAtFirstError, }: UseEditProps<T>): readonly [{
    submitting: boolean;
    editing: boolean;
    editValue: T;
    valid: boolean;
    errors: import("../CPopoverVerify/interface").RuleFeedback[];
}, {
    startEditing: () => void;
    setEditValue: import("react").Dispatch<import("react").SetStateAction<T>>;
    handleSubmit: (onSubmit: (value: T) => void) => Promise<undefined>;
    handleCancel: (onCancel?: () => void) => void;
}];
