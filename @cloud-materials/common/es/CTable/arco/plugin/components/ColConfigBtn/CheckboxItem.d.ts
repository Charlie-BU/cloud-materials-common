import type { FC } from 'react';
import React from 'react';
import type { CheckboxProps } from '@arco-design/web-react';
interface Props extends CheckboxProps {
    name: string;
    value: boolean;
    tooltip?: React.ReactNode;
    onChange: (checked: boolean) => void;
}
export declare const CheckboxItem: FC<Props>;
export {};
