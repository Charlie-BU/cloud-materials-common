import React from 'react';
import type { CheckedStatus } from '../interface';
interface Props {
    extraAction?: React.ReactNode;
    onCheckAll: (isChecked: boolean) => void;
    checkAllStatus: CheckedStatus;
    onSearchChange: (searchStr: string, type: 'source') => void;
    placeholder?: string;
    sourceHeaderCustomText?: {
        checkAllTitle?: string | ((searchStr: string) => string);
    };
}
export declare const SourceHeader: React.FC<Props>;
export {};
