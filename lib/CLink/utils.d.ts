import type { CSSProperties, ReactNode } from 'react';
import type { CLinkProps } from './interface';
import type { CLocale } from '../locales/default';
export declare const getCLinkStyle: (size: Required<CLinkProps>['size'], style?: CSSProperties) => CSSProperties | undefined;
export declare const getInnerLinkSetting: (locale: CLocale) => Record<Required<CLinkProps>['type'], {
    icon: ReactNode;
    label: string;
} | undefined>;
