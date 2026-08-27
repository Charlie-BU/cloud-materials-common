import type { ReactElement } from 'react';
import React from 'react';
import type { CCombineSearchSelect } from '../interface';
import type { SelectHandle, SelectProps } from '@arco-design/web-react/es/Select/interface';
export interface MultipleSelectProps extends Pick<SelectProps, 'filterOption'> {
    options: CCombineSearchSelect['options'];
    value: any;
    onChange: (value: any) => void;
    searchWord?: string;
    popSelectRef?: React.MutableRefObject<SelectHandle | null>;
}
declare const MultipleSelect: (props: MultipleSelectProps) => ReactElement;
export default MultipleSelect;
