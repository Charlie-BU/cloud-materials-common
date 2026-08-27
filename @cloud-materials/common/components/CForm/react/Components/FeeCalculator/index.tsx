import React from 'react';
import { observer, useField, useForm } from '@formily/react';
import CFeeCalculator from '../../../../CFeeCalculator';
import type { CFeeCalculatorProps, HandleDataParams, HandleDataRes } from '../../../../CFeeCalculator/interface';
import { get } from 'lodash-es';
import type { CForm as CFormType, CField } from '../../../interface';

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

export const FORM_CALCULATOR_KEY = 'FORM_CALCULATOR_KEY';

export const FeeCalculatorForm: React.FC<FeeCalculatorProps> = observer((props: FeeCalculatorProps) => {
  const form = useForm() as CFormType;
  const field = useField() as CField;

  const { fieldIndex = [], ...rest } = props;
  const depValues: Record<string, any> = {};
  (fieldIndex ?? []).map(indexItem => {
    depValues[indexItem] = get(form.values, indexItem);
  });

  const processedHandleData = props.handleData
    ? async (params: HandleDataParams) => {
        return (await props.handleData?.(params, form)) as HandleDataRes | Promise<HandleDataRes>;
      }
    : undefined;

  return (
    <CFeeCalculator
      {...rest}
      // 依赖CFeeCalculator提供的formValues和deps触发价格重计算
      formValues={depValues}
      deps={fieldIndex}
      onPriceChange={priceInfo => {
        if (field) {
          field.data = field.data ?? {};
          field.data[FORM_CALCULATOR_KEY] = priceInfo;
        }
      }}
      handleData={processedHandleData}
    />
  );
});

export default FeeCalculatorForm;
