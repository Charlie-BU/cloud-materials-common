/// <reference types="react" />
import type { CCollapseProps } from './interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const testId: {
    container: string;
    operate: string;
};
declare const CCollapse: {
    <T extends unknown>(props: CCollapseProps<T>): JSX.Element;
    displayName: string;
};
export default CCollapse;
