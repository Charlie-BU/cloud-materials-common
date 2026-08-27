"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounceInput = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var react_1 = require("react");
var defaultDebounceOptions = { wait: 500 };
var useDebounceInput = function (props) {
    var _a = props.onChange, onChange = _a === void 0 ? lodash_es_1.noop : _a, debounceOptions = props.debounceOptions, value = props.value, defaultValue = props.defaultValue, rest = tslib_1.__rest(props, ["onChange", "debounceOptions", "value", "defaultValue"]);
    var _b = tslib_1.__read((0, react_1.useState)('value' in props ? value : defaultValue), 2), currentValue = _b[0], setCurrentValue = _b[1];
    var changeHandler = (0, react_1.useMemo)(function () {
        if (debounceOptions === null) {
            return onChange;
        }
        var _a = tslib_1.__assign(tslib_1.__assign({}, defaultDebounceOptions), debounceOptions), wait = _a.wait, restOptions = tslib_1.__rest(_a, ["wait"]);
        return (0, lodash_es_1.debounce)(onChange, wait, restOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceOptions]);
    var cancel = function () {
        if (debounceOptions !== null) {
            changeHandler.cancel();
        }
    };
    var handleChange = function (value) {
        setCurrentValue(value);
        changeHandler(value);
    };
    (0, react_1.useEffect)(function () {
        if ('value' in props && value !== currentValue) {
            cancel();
            handleChange(value);
        }
        return function () {
            cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return tslib_1.__assign({ value: currentValue, onChange: handleChange }, rest);
};
exports.useDebounceInput = useDebounceInput;
//# sourceMappingURL=useDebounceInput.js.map