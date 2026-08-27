import type { FormPathPattern, GeneralField } from '@formily/core';
import { FormPath, isArrayField, onFieldReact, isDataField } from '@formily/core';
import { first, isArray, isObject } from 'lodash-es';
import { getGlobalContextConfig } from '../../CConfigProvider';
import { untracked } from '@formily/reactive';

/**
 * 获取父节点
 * @param field 当前节点
 * @returns 父节点 field
 */
export const getParentField = (field: GeneralField) => {
  const parentPath = field.path.pop();
  const parentField = field.query(parentPath).take();
  // 通过 Path 找不到父节点，说明 Name 为点语法，直接通过字段的 parentName 获取
  if (!parentField) {
    return field.parent;
  }
  return parentField;
};

/**
 * 获取兄弟节点
 * @param currentField 当前节点
 * @param brotherPath 兄弟节点的path
 * @returns 兄弟节点
 */
export const getBrotherField = (currentField: GeneralField, brotherPath: FormPathPattern) => {
  const parentField = getParentField(currentField);
  let brotherFieldPath = parentField?.path?.push(brotherPath);
  let brotherField = parentField?.query(brotherFieldPath)?.take?.();

  // 通过父节点查询不到
  // 说明存在 name 为 点语法的情况，此时直接通过 path 获取
  if (!brotherField) {
    brotherFieldPath = currentField.path.pop().push(brotherPath);
    brotherField = parentField?.query(brotherFieldPath)?.take?.();
  }

  if (!brotherField) {
    console.warn(`请检查 ${currentField.path.toString()} 是否有兄弟节点`);
  }

  return brotherField;
};

const findDuplicateIndices = (array: any[]) => {
  const map: any = {};
  const duplicates: any[] = [];
  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    if (!value) continue;
    if (map[value] !== undefined) {
      if (!duplicates.includes(map[value])) {
        duplicates.push(map[value]);
      }
      duplicates.push(i);
    } else {
      map[value] = i;
    }
  }
  return duplicates;
};

export const checkArrayDuplicates = (params: {
  arrayFieldName: FormPathPattern;
  itemName: FormPathPattern | FormPathPattern[];
  firstError?: boolean;
  message?: string | string[];
}) => {
  const { arrayFieldName, itemName, message, firstError = true } = params;

  const { locale, formatLocale } = getGlobalContextConfig();

  onFieldReact(arrayFieldName, (field, form) => {
    if (!isArrayField(field)) {
      console.warn(`请检查 ${arrayFieldName} 是否为数组字段`);
      return false;
    }
    if (!field.value || field?.value?.length <= 0) return;

    const subNames = isArray(itemName) ? itemName : itemName ? [itemName] : [];
    const subMessage = isArray(message) ? message : message ? [message] : [];

    // 数组值为对象，这时为对象数组
    const isObjectArray = isObject(first(field.value));

    let valuesMap: any = {};
    if (isObjectArray) {
      valuesMap = subNames.reduce((previousValue, currentValue) => {
        const key = currentValue.toString();
        previousValue[key] = field.value.flatMap(item => item?.[key]);
        return previousValue;
      }, {} as Record<string, any>);
    }

    const getDuplicateTag = (duplicateIndices: Array<number>) => {
      const duplicateTag = field.value.reduce((pre, _, index) => {
        if (duplicateIndices.includes(index)) {
          pre.push(true);
        } else {
          pre.push(false);
        }
        return pre;
      }, []);

      return duplicateTag;
    };

    const setErrors = (duplicateTag: Array<boolean>, errorMessage: string, name: string) => {
      untracked(() => {
        duplicateTag.forEach((duplicate: boolean, index: number) => {
          const query = form.query(`${field.path.toString()}${isObjectArray ? `.${index}` : ''}.*`);
          /**
           * 以下方法模糊匹配在 index > 0 时就匹配不到
           * 推测是 formily/path 的 bug ，暂时没看源码调试  @xuchang 可以找时间研究一下
           */
          // form.query(field.address.concat([index, '*'])).forEach(field => {
          //   if (isDataField(field)) {
          //     duplicateField = field;
          //   }
          // });
          let duplicateField: any;
          query.forEach(item => {
            if (FormPath.parse(`${arrayFieldName}.${index}${isObjectArray ? '.*' : ''}`).match(item.path.toString())) {
              if (isDataField(item)) {
                if (!isObjectArray || item.path.match(`${arrayFieldName}.${index}.${name}`)) {
                  duplicateField = item;
                }
              }
            }
          });
          if (!duplicateField) return;
          if (!duplicate) {
            duplicateField.setSelfErrors([]);
            return;
          }
          if (firstError || duplicateTag.indexOf(duplicate) !== index) {
            duplicateField.setSelfErrors([errorMessage]);
          } else {
            duplicateField.setSelfErrors([]);
          }
        });
      });
    };

    if (isObjectArray) {
      Object.keys(valuesMap).forEach((name, index) => {
        const duplicateIndices = findDuplicateIndices(valuesMap[name]);
        const errorMessage =
          subMessage[index] ?? formatLocale(locale.CForm.array.disabledRepeatValueInObjArr, { name });
        const duplicateTag = getDuplicateTag(duplicateIndices);
        setErrors(duplicateTag, errorMessage, name);
      });
    } else {
      const duplicateIndices = findDuplicateIndices(field.value);
      const errorMessage = subMessage[0] ?? locale.CForm.array.disabledRepeatValueInArr;
      const duplicateTag = getDuplicateTag(duplicateIndices);
      setErrors(duplicateTag, errorMessage, subNames[0].toString());
    }
  });
};
