import type { ReactNode } from 'react';
import React from 'react';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export interface GroupProps {
    title: ReactNode;
}
export declare const CGroup: React.ForwardRefExoticComponent<Partial<React.HTMLAttributes<HTMLDivElement> & GroupProps & {
    children?: ReactNode;
}> & React.RefAttributes<unknown>>;
export default CGroup;
