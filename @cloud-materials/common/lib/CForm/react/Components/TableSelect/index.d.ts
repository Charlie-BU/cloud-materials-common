import React from 'react';
import type { CTableSelectProps } from './interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const tableSelectTestId: {
    container: string;
    filter: string;
};
export declare const CTableSelect: React.ForwardRefExoticComponent<Partial<CTableSelectProps<any> & {
    children?: React.ReactNode;
}> & React.RefAttributes<unknown>>;
export default CTableSelect;
