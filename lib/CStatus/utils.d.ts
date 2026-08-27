import type { CSSProperties } from 'react';
import type { CStatusConfig, CStatusProps } from './interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare function getStyle(props: CStatusProps & {
    statusMap: Record<string, CStatusConfig>;
}): CSSProperties;
