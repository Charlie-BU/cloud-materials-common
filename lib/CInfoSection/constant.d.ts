/// <reference types="react" />
import CEllipsis from '../CEllipsis';
import type { CInlineEditProps } from '../CInlineEdit/interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const DEFAULT_COLUMN = 2;
export declare const testId: {
    container: string;
    title: string;
    item: string;
};
export declare const builtInMap: {
    CEllipsis: typeof CEllipsis;
    CInlineEdit: import("react").FC<CInlineEditProps<any>>;
    CCopy: import("react").FC<import("..").CCopyProps>;
    Word: import("react").FC<import("./Word").WordProps>;
};
export declare const labelWidthMap: {
    normal: number;
    small: number;
};
