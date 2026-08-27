import type { ReactNode } from 'react';
import React from 'react';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export interface SectionProps {
    title: ReactNode;
    /** 是否开启折叠功能 */
    enableCollapse?: boolean;
    /** 当前折叠模块是否展开，仅开启折叠功能后生效 */
    isExpand?: boolean;
    className?: string;
    style?: React.CSSProperties;
    extra?: ReactNode;
}
declare const Section: React.FC<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & SectionProps>;
export declare const CFormSection: React.ForwardRefExoticComponent<Partial<Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & SectionProps & {
    children?: ReactNode;
}> & React.RefAttributes<unknown>>;
export default Section;
