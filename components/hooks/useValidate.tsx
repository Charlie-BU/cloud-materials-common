import { useState, useMemo, useEffect } from 'react';
import { formatRules } from '../CPopoverVerify/util';
import { useThrottleFn, useUpdateEffect } from 'ahooks';
import type { RuleFeedback } from '../CPopoverVerify/interface';
import type { FormItemProps, RulesProps } from '@arco-design/web-react/es/Form/interface';
import type { SchemaType } from 'b-validate';
import bv, { Schema } from 'b-validate';
import zhCN from 'b-validate/es/locale/zh-CN';
import { useCConfigContext } from '../CConfigProvider';

/**
 * @title UseValidateRule
 */
export interface UseValidateRule extends RulesProps {
  /**
   * @zh 关键字 用于错误信息和规则匹配，默认为索引
   * @defaultValue 索引
   */
  key?: string | number;
}

/**
 * @title  UseValidateProps
 */
export interface UseValidateProps {
  /**
   * @zh 待验证的值
   */
  value: any;
  /**
   * @zh 待验证的规则
   */
  rules: UseValidateRule[];
  /**
   * @zh 失败时，是否阻塞之后的规则校验
   * @defaultValue false
   */
  stopAtFirstError?: boolean;
  /**
   * @zh 规则改变时，是否主动触发重新校验
   * @defaultValue false
   */
  validateOnRulesChange?: boolean;
}

const FIELD = '__field__';

const WAIT_TIME = 100;

export const schemaValidate = (
  rules: UseValidateRule[],
  field: Required<FormItemProps>['field'],
  value: unknown,
  stopAtFirstError = false,
): Promise<{ warning: RuleFeedback[]; error: RuleFeedback[] }> => {
  let current = 0;

  return new Promise(resolve => {
    const warning: RuleFeedback[] = [],
      error: RuleFeedback[] = [];
    const validate = (rule: UseValidateRule) => {
      const next = (): void => {
        if (current < rules.length - 1) {
          current++;
          return validate(rules[current]);
        }

        return resolve({ error, warning });
      };

      if (!rule) {
        return next();
      }

      const _rule = { ...rule };
      if (!_rule.type && !_rule.validator) {
        _rule.type = 'string';
      }

      const schema = new Schema({ [field]: [_rule] } as SchemaType, {
        ignoreEmptyString: true,
      });

      schema.validate({ [field]: value }, (err: any) => {
        if (typeof rule.key !== 'undefined') {
          // 特殊情况，b-validate 在 value = '' ，minLength > 0 时，不会报错，
          // 由于 CPopoverVerify 规则展示的特殊性，这里需要强制报错
          if (!err && _rule?.minLength && _rule?.minLength > 0 && value === '') {
            error.push({ key: rule.key, message: _rule.message });
            if (stopAtFirstError) {
              return resolve({
                error,
                warning,
              });
            }
          }
          if (err) {
            if (rule.validateLevel === 'warning') {
              warning.push({ key: rule.key, message: err[field].message });
            } else {
              error.push({ key: rule.key, message: err[field].message });
              if (stopAtFirstError) {
                return resolve({
                  error,
                  warning,
                });
              }
            }
          }
        }
        return next();
      });
    };
    validate(rules[current]);
  });
};

export const useValidate = ({
  value,
  rules = [],
  stopAtFirstError,
  validateOnRulesChange,
}: UseValidateProps): { valid: boolean; errors: RuleFeedback[]; warnings: RuleFeedback[]; isInit: boolean } => {
  const [errors, setErrors] = useState<RuleFeedback[]>([]);
  const [warnings, setWarnings] = useState<RuleFeedback[]>([]);
  const [isInit, setIsInit] = useState(true);
  const { locale } = useCConfigContext();
  if (locale.locale === 'zh-CN') {
    bv.setGlobalConfig({
      validateMessages: zhCN as any,
    });
  }

  const _rules = useMemo(() => formatRules(rules), [rules]);

  const { run: checkValue } = useThrottleFn(
    async (value: unknown, rules: UseValidateRule[]) => {
      const { error, warning } = await schemaValidate(rules, FIELD, value, stopAtFirstError);
      setErrors(error);
      setWarnings(warning);
    },
    { wait: WAIT_TIME },
  );

  useUpdateEffect(() => {
    setIsInit(false);
  }, [value]);

  useEffect(() => {
    checkValue(value, _rules);
  }, [value, checkValue, stopAtFirstError]);

  useEffect(() => {
    if (validateOnRulesChange) {
      checkValue(value, _rules);
    }
  }, [_rules, validateOnRulesChange]);

  return { valid: errors.length === 0, errors, warnings, isInit };
};

export default useValidate;
