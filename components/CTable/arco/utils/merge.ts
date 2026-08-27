import React from 'react';
import { mergeWith } from 'lodash-es';

export const merge = (object?: Record<string, any>, source?: Record<string, any>) => {
  return mergeWith(object, source, (objValue, srcValue) => {
    // react 元素不进行合并
    if (React.isValidElement(objValue)) {
      return srcValue;
    }
    // 数组不合并，直接以传入的为准
    if (Array.isArray(objValue)) {
      return srcValue;
    }
  });
};
