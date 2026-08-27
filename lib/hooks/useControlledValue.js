"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useControlledValue = void 0;
var tslib_1 = require("tslib");
var ahooks_1 = require("ahooks");
var lodash_es_1 = require("lodash-es");
var react_1 = require("react");
//1. 无论组件的value受控非受控，都由组件内部控制
//2. 默认值优先判断props的，props的value有改变 重新set
//3. ahooks的主要用于在某些组件开发时，我们需要组件的状态既可以自己管理，也可以被外部控制，而在这里我们只需要内部管理。
var useControlledValue = function (props, initValue) {
    var _a;
    var defaultValue = props.defaultValue, value = props.value;
    var _b = tslib_1.__read((0, react_1.useState)((_a = ('value' in props ? value : defaultValue)) !== null && _a !== void 0 ? _a : initValue), 2), current = _b[0], setCurrent = _b[1];
    (0, ahooks_1.useDeepCompareEffect)(function () {
        if ('value' in props && !(0, lodash_es_1.isEqual)(value, current)) {
            setCurrent(value);
        }
    }, [value]);
    return [current, setCurrent];
};
exports.useControlledValue = useControlledValue;
//# sourceMappingURL=useControlledValue.js.map