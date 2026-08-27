import React from 'react';
import type { CDrawerSelectProps } from './interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const drawerSelectTestId: {
    container: string;
    select: string;
};
declare const CDrawerSelect: React.ForwardRefExoticComponent<CDrawerSelectProps<any> & React.RefAttributes<HTMLDivElement>>;
export default CDrawerSelect;
