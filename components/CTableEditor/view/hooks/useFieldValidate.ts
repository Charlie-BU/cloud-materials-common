import type { Field } from '@formily/core';
import { useField } from '@formily/react';
import type { MultiValidator } from '@formily/validator';
import { isArray } from 'lodash-es';
import { useEffect } from 'react';
import type { TableEditor as TableEditorModel } from '../../model/TableEditor';
import { useCConfigContext } from '../../../CConfigProvider';

/**
 * TableEditor 外层 Form validate 时，手动触发 TableEditor 内部 form 的 validate
 * @param tableEditor
 */
export const useFieldValidate = (tableEditor: TableEditorModel) => {
  // 这个 field 是 TableEditor 作为手控组件时，作为父组件的一个 Field
  // 受控组件不一定是包裹在外层 Form 中，即使外层组件是 Form，也不一定是 formily，可能是其他 Form 组件
  // 所以这个 field 可能是 undefined，要做容错处理
  const field = useField<Field>();
  const { locale } = useCConfigContext();
  useEffect(() => {
    if (!field) return;
    const prevValidator = field?.validator;
    const func = async () => {
      const result = await tableEditor.form?.validate()?.catch((e: any) => e);
      if (result && result.length > 0) {
        return locale.CTableEditor.validateError;
      }
      return;
    };

    const validate: any = {
      // 手动指定 type，此时 onChange 事件时，不会触发校验
      triggerType: 'manual',
      validator: func,
    };

    const validator: MultiValidator = [];
    if (isArray(prevValidator)) {
      validator.push(...prevValidator, validate);
    } else {
      validator.push(prevValidator);
      validator.push(validate);
    }
    field?.setValidator?.(validator);
  }, [field]);
};
