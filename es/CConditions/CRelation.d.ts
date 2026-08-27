import React from 'react';
import type { SelectProps } from '@arco-design/web-react';
import type { CRelationProps } from './interface';
type Option = Exclude<SelectProps['options'], undefined>[0];
type FixedTwoArray<T> = [T, T];
/**
 * 逻辑关系选择
 */
export declare function CRelation(props: CRelationProps): React.ReactElement;
export declare namespace CRelation {
    var displayName: string;
}
/** 逻辑关系切换卡片 */
export declare const Toggle: (props: {
    size?: "small" | "default" | undefined;
    disabled?: boolean | undefined;
    options: FixedTwoArray<string | number | {
        label: React.ReactNode;
        value: string | number;
        disabled?: boolean | undefined;
        extra?: any;
    }>;
    value?: string | number | undefined;
    onChange?: ((val: string | number) => void) | undefined;
}) => React.ReactElement;
export default CRelation;
