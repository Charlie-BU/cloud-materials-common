import { isArray, uniqWith, xor } from 'lodash-es';
import type { CFieldConfig, CFormConfig, CFormStepConfig, CFormStepUnitConfig } from '../../interface';
import { Notification } from '@arco-design/web-react';

/**
 * 检查表单配置里是否有重复的path，有则进行提醒
 * @param config
 */
export const checkConfigRepeatedPath = (config?: CFormConfig | CFormStepConfig) => {
  const checkFields = (fields?: CFieldConfig[]): string | undefined => {
    if (fields && isArray(fields)) {
      const uniqFields = uniqWith(fields, (a, b) => a.name === b.name);
      if (uniqFields.length !== fields.length) {
        return xor(fields, uniqFields)[0]?.name.toString();
      }
      let repeatedPath: string | undefined;
      for (const field of fields) {
        const checkRes = checkFields(field.fields);
        if (checkRes) {
          repeatedPath = `${field.name}.${checkRes}`;
          break;
        }
      }
      return repeatedPath;
    }
  };
  const checkStep = (steps?: CFormStepUnitConfig[]): string | undefined => {
    if (steps && isArray(steps)) {
      let repeatedPath: string | undefined;
      for (const step of steps) {
        const checkRes = checkFields(step.fields);
        if (checkRes?.length) {
          repeatedPath = `${step.name}.${checkRes}`;
          break;
        }
      }
      return repeatedPath;
    }
  };
  const fields = (config as CFormConfig | undefined)?.fields;
  const checkFieldsRes = checkFields(fields);
  if (checkFieldsRes?.length) {
    Notification.error({
      title: 'CForm',
      content: `CForm中存在重复的字段路径：${checkFieldsRes}`,
      closable: false,
      duration: 0,
    });
  }
  const steps = (config as CFormStepConfig | undefined)?.steps;
  const checkStepRes = checkStep(steps);
  if (checkStepRes?.length) {
    Notification.error({
      title: 'CForm',
      content: `CForm中存在重复的字段路径：${checkStepRes}`,
      closable: false,
      duration: 0,
    });
  }
};
