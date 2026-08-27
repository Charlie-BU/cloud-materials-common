import React from 'react';
import { mergeWith } from 'lodash-es';
export var merge = function (object, source) {
    return mergeWith(object, source, function (objValue, srcValue) {
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
//# sourceMappingURL=merge.js.map