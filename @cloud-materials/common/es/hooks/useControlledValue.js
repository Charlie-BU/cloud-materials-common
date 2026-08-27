import { __read } from "tslib";
import { useDeepCompareEffect } from 'ahooks';
import { isEqual } from 'lodash-es';
import { useState } from 'react';
//1. 无论组件的value受控非受控，都由组件内部控制
//2. 默认值优先判断props的，props的value有改变 重新set
//3. ahooks的主要用于在某些组件开发时，我们需要组件的状态既可以自己管理，也可以被外部控制，而在这里我们只需要内部管理。
export var useControlledValue = function (props, initValue) {
    var _a;
    var defaultValue = props.defaultValue, value = props.value;
    var _b = __read(useState((_a = ('value' in props ? value : defaultValue)) !== null && _a !== void 0 ? _a : initValue), 2), current = _b[0], setCurrent = _b[1];
    useDeepCompareEffect(function () {
        if ('value' in props && !isEqual(value, current)) {
            setCurrent(value);
        }
    }, [value]);
    return [current, setCurrent];
};
//# sourceMappingURL=useControlledValue.js.map