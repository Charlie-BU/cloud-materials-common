import type { FormPathPattern, GeneralField } from '@formily/core';
import { has, isFunction, isPlainObject, merge } from 'lodash-es';
import type React from 'react';
import { GLOBAL_PREFIX } from '../../_utils/classNamePrefixFactory';
import type { CFieldConfig, CForm, CallableType } from '../interface';

export const runCallable = <ReturnType>(
  props: CallableType<ReturnType> | undefined,
  form: CForm,
  parentField: any,
): ReturnType | undefined => {
  if (isFunction(props)) {
    return props(form, parentField);
  }
  return props;
};

export const updateFieldProps = <U>(
  props: string,
  formilyField: GeneralField,
  callableFunc: CallableType<any>,
  value?: U,
) => {
  // 只有当在field配置中设置的属性是响应式函数时，才需要用该函数的运行结果去同步更新formily的field实例的值。
  // 也即当使用helper的reactive与在field的config配置中使用响应式函数设置同一属性的值时，以响应式函数的值为准。
  if (isFunction(callableFunc) && formilyField) {
    // @ts-ignore
    formilyField[props] = value;
  }
};

// 将field的address转为唯一标识，用于检索表单的dom
export const getFormFieldId = (address: FormPathPattern) => {
  const formatAddress = address.toString().replace(/[[.]/g, '_').replace(/\]/g, '');
  return `___c-form-identifies-${formatAddress}`;
};

export const getPile = (component: React.FunctionComponent, path: FormPathPattern) => {
  if (!component || !path) return undefined;

  switch (component.displayName) {
    case 'FormItem': {
      const pile = `${GLOBAL_PREFIX}-form-item-${path.toString()}`;
      return {
        'data-cy': pile,
        'data-testid': pile,
      };
    }
    default:
      return {};
  }
};

/**
 * 合并多个fields
 */
export const mergeFields = (...restField: (CFieldConfig | string[])[]) => {
  if (restField.length <= 1) {
    return restField[0] as CFieldConfig;
  }

  const deepMergeKeys = Array.isArray(restField[restField.length - 1]) ? (restField.pop() as string[]) : null;

  return (restField as CFieldConfig[]).reduce<CFieldConfig>((prev, current) => {
    const mergedField = { ...prev, ...current };

    if (deepMergeKeys) {
      return deepMergeKeys.reduce(
        (prevMergeField, fieldKey: keyof CFieldConfig) =>
          // 下个对象属性存在才继续合并
          has(current, fieldKey) && isPlainObject(current[fieldKey])
            ? {
                ...prevMergeField,
                [fieldKey]: merge({}, prev[fieldKey], current[fieldKey]),
              }
            : prevMergeField,
        mergedField,
      );
    }

    return mergedField;
  }, {} as CFieldConfig);
};

const FORM_EVENT_NAME = 'CFormCustomEvent';
export enum FormEventSource {
  FormInit = 'FormInit',
  HelperInit = 'HelperInit',
}

/**
 * * 派发Form事件，提供外部消费
 */
export const notifyFormCustomEvent = (options: { source: FormEventSource; payload: Record<string, any> }) => {
  const { source, payload } = options;
  const customEvent = new CustomEvent(FORM_EVENT_NAME, { detail: { source, payload } });
  window.dispatchEvent(customEvent);
};
