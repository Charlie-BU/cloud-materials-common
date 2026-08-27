/// <reference types="react" />
import type { CFormBaseConfig, CFormFooter, CFormStep, CFormStepFooter } from '../../../interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
declare const FooterRender: ({ isStep, formStep, callFooter, onSubmit, unMountCFormSecondCheck, }: {
    isStep: boolean;
    formStep: CFormStep;
    callFooter: CFormFooter<any, any> | CFormStepFooter<any, any>;
    onSubmit: CFormBaseConfig['onSubmit'];
    unMountCFormSecondCheck: CFormBaseConfig['unMountCFormSecondCheck'];
}) => JSX.Element | null;
export default FooterRender;
