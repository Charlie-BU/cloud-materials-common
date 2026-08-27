import React from 'react';
import type { CFeeCalculatorProps, HandleDataParams, HandleDataRes } from '../../../../CFeeCalculator/interface';
import type { CForm as CFormType } from '../../../interface';
export type FeeCalculatorProps = Omit<CFeeCalculatorProps, 'handleData' | 'deps' | 'formValues'> & {
    /**
     * @zh 依赖的表单字段集合，当依赖的表单字段发生变化时，会触发重新计算
     */
    fieldIndex?: string[];
    /**
     * @zh 数据获取
     */
    handleData?: (params: HandleDataParams, form: CFormType) => HandleDataRes | Promise<HandleDataRes>;
};
export declare const FORM_CALCULATOR_KEY = "FORM_CALCULATOR_KEY";
export declare const FeeCalculatorForm: React.FC<FeeCalculatorProps>;
export default FeeCalculatorForm;
