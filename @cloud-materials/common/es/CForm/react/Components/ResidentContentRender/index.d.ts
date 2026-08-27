/// <reference types="react" />
import type { CFormStepResidentContent, CFormBaseConfig, CFormStep, CFormResidentContent } from '../../../interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
declare const ResidentContentRender: ({ isStep, formStep, residentContent, onSubmit, }: {
    isStep: boolean;
    formStep: CFormStep;
    residentContent: CFormStepResidentContent<any, any> | CFormResidentContent<any, any>;
    onSubmit: CFormBaseConfig['onSubmit'];
}) => JSX.Element | null;
export default ResidentContentRender;
