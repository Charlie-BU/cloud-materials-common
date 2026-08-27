"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var lodash_es_1 = require("lodash-es");
function useMergeValue(defaultStateValue, props) {
    var _a = props || {}, defaultValue = _a.defaultValue, value = _a.value;
    var firstRenderRef = (0, react_1.useRef)(true);
    var _b = tslib_1.__read((0, react_1.useState)(!(0, lodash_es_1.isUndefined)(value) ? value : !(0, lodash_es_1.isUndefined)(defaultValue) ? defaultValue : defaultStateValue), 2), stateValue = _b[0], setStateValue = _b[1];
    (0, react_1.useEffect)(function () {
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
    var mergedValue = (0, lodash_es_1.isUndefined)(value) ? stateValue : value;
    return [mergedValue, setStateValue, stateValue];
}
exports.default = useMergeValue;
//# sourceMappingURL=useMergeValue.js.map