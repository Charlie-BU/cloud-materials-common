/// <reference types="react" />
import type { CFormStepHeader, CFormBaseConfig, CFormStep, CFormHeader } from '../../../interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
declare const HeaderRender: ({ isStep, formStep, callHeader, unMountCFormSecondCheck, }: {
    isStep: boolean;
    formStep: CFormStep;
    callHeader: CFormStepHeader | CFormHeader<any, any>;
    unMountCFormSecondCheck: CFormBaseConfig['unMountCFormSecondCheck'];
}) => JSX.Element | null;
export default HeaderRender;
