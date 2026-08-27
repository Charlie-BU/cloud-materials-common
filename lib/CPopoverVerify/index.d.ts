/// <reference types="react" />
import type { CPopoverVerifyProps } from './interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const testId: {
    container: string;
    popover: string;
};
declare const CPopoverVerify: {
    (props: CPopoverVerifyProps): JSX.Element;
    displayName: string;
};
export default CPopoverVerify;
