import { __read } from "tslib";
import { useState, useEffect, useRef } from 'react';
import { isUndefined } from 'lodash-es';
export default function useMergeValue(defaultStateValue, props) {
    var _a = props || {}, defaultValue = _a.defaultValue, value = _a.value;
    var firstRenderRef = useRef(true);
    var _b = __read(useState(!isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : defaultStateValue), 2), stateValue = _b[0], setStateValue = _b[1];
    useEffect(function () {
        // 第一次渲染时候，props.value 已经在useState里赋值给stateValue了，不需要再次赋值。
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        // 外部value等于undefined，也就是一开始有值，后来变成了undefined（
        // 可能是移除了value属性，或者直接传入的undefined），那么就更新下内部的值。
        // 如果value有值，在下一步逻辑中直接返回了value，不需要同步到stateValue
        if (value === undefined) {
            // 修改arco源码 设置为defaultStateValue
            setStateValue(defaultStateValue);
        }
    }, [value]);
    var mergedValue = isUndefined(value) ? stateValue : value;
    return [mergedValue, setStateValue, stateValue];
}
//# sourceMappingURL=useMergeValue.js.map