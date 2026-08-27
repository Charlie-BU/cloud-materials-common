import { __assign, __read, __rest } from "tslib";
import { debounce, noop } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
var defaultDebounceOptions = { wait: 500 };
export var useDebounceInput = function (props) {
    var _a = props.onChange, onChange = _a === void 0 ? noop : _a, debounceOptions = props.debounceOptions, value = props.value, defaultValue = props.defaultValue, rest = __rest(props, ["onChange", "debounceOptions", "value", "defaultValue"]);
    var _b = __read(useState('value' in props ? value : defaultValue), 2), currentValue = _b[0], setCurrentValue = _b[1];
    var changeHandler = useMemo(function () {
        if (debounceOptions === null) {
            return onChange;
        }
        var _a = __assign(__assign({}, defaultDebounceOptions), debounceOptions), wait = _a.wait, restOptions = __rest(_a, ["wait"]);
        return debounce(onChange, wait, restOptions);
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
    useEffect(function () {
        if ('value' in props && value !== currentValue) {
            cancel();
            handleChange(value);
        }
        return function () {
            cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return __assign({ value: currentValue, onChange: handleChange }, rest);
};
//# sourceMappingURL=useDebounceInput.js.map