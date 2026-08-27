import React from 'react';
import type { MergedNumConfig, ValueType } from '../interface';
interface NumNodeProps {
    numConfigState: MergedNumConfig;
    handleOnChange: (newConfig: Partial<ValueType>) => void;
}
export declare const NumNode: React.FC<NumNodeProps>;
export {};
