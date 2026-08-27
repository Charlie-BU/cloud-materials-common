import React from 'react';
import type { CAddButtonProps } from './interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const testId: {
    container: string;
    popover: string;
    dropdown: string;
    button: string;
    addIcon: string;
    text: string;
    dropdownIcon: string;
};
declare const CAddButton: React.FC<CAddButtonProps>;
export default CAddButton;
