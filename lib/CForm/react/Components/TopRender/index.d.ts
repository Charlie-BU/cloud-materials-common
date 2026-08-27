/// <reference types="react" />
import type { CFormStepTop, CFormStep, CFormTop } from '../../../interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
declare const TopRender: ({ isStep, formStep, callTop, }: {
    isStep: boolean;
    formStep: CFormStep;
    callTop: CFormStepTop<any, any> | CFormTop<any, any>;
}) => JSX.Element | null;
export default TopRender;
