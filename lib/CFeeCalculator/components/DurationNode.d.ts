import React from 'react';
import type { MergedDurationConfig, ValueType } from '../interface';
interface DurationNodeProps {
    durationConfigState: MergedDurationConfig;
    handleOnChange: (newConfig: Partial<ValueType>) => void;
}
export declare const DurationNode: React.FC<DurationNodeProps>;
export {};
