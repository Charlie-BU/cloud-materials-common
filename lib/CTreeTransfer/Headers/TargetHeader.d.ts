import React from 'react';
interface Props {
    extraAction?: React.ReactNode;
    totalChosenCount?: number;
    placeholder?: string;
    onClear: () => void;
    onSearchChange: (searchStr: string, type: 'target') => void;
    title?: React.ReactNode;
}
export declare const TargetHeader: React.FC<Props>;
export {};
