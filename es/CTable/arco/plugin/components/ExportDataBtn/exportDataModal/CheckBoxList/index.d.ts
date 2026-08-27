import React from 'react';
interface Props {
    value?: string[];
    items: {
        title: string;
        key: string;
    }[];
    disabledKeys?: string[];
    prefixCls: string;
    onChange?: (keys: string[]) => void;
}
export declare const CheckBoxList: React.FC<Props>;
export {};
