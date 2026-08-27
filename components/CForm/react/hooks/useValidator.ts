import type { CFieldProps } from '../../interface';
import type { FieldValidator } from '@formily/core';
import { isArray } from 'lodash-es';
import type { IValidatorRules, ValidatorFunctionResponse } from '@formily/validator';
import { useCConfigContext } from '../../../CConfigProvider';
import { safeRace } from '@byted-c/storage.utils.safe-race';

export const useValidator = (props: CFieldProps): FieldValidator | undefined => {
  const { rules: originRules } = props;
  const { cComponentConfig } = useCConfigContext();
  const enableRaceCondition = cComponentConfig?.CForm?.enableRaceCondition;

  const rules = isArray(originRules) ? originRules : [originRules];
  const validators = rules?.map(rule => {
    const triggerType = rule?.validateTrigger === 'onChange' ? 'onInput' : rule?.validateTrigger;

    let customFunctionValitator = {} as { validator: IValidatorRules['validator'] };
    if (rule?.validator) {
      customFunctionValitator = {
        validator: safeRace(
          (value, _, ctx) => {
            const { form, field } = ctx;
            return new Promise<ValidatorFunctionResponse>(resolve => {
              const cb = (result: ValidatorFunctionResponse) => {
                // 当字段不应该校验而触发了校验，直接resolve掉
                if (field.pattern !== 'editable' || field.display !== 'visible') {
                  resolve('');
                }
                resolve(result);
              };
              const validatorResult = rule?.validator?.({ value, form, field, callback: cb });

              if (validatorResult instanceof Promise) {
                validatorResult.finally(() => {
                  resolve('');
                });
              } else {
                resolve('');
              }
            });
          },
          { enabled: enableRaceCondition },
        ),
      };
    }

    const v: FieldValidator = {
      ...rule,
      triggerType,
      ...customFunctionValitator,
    };
    return v;
  });

  if (!originRules) return;

  return validators;
};
