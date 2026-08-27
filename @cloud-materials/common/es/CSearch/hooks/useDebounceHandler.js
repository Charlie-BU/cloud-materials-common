import { __assign, __rest } from "tslib";
import { debounce, noop } from 'lodash-es';
import { useEffect, useMemo, useRef } from 'react';
var defaultDebounceOptions = { wait: 500 };
export var useDebounceHandler = function (props) {
    var _a = props.onChange, onChange = _a === void 0 ? noop : _a, debounceOptions = props.debounceOptions;
    var refChange = useRef(onChange);
    refChange.current = onChange;
    var debounceHandleChange = useMemo(function () {
        if (debounceOptions === null) {
            return refChange.current;
        }
        var _a = __assign(__assign({}, defaultDebounceOptions), debounceOptions), wait = _a.wait, restOptions = __rest(_a, ["wait"]);
        return debounce(refChange.current, wait, restOptions);
    }, [debounceOptions]);
    useEffect(function () {
        if ('cancel' in debounceHandleChange && typeof debounceHandleChange.cancel === 'function') {
            debounceHandleChange.cancel();
        }
    }, [debounceHandleChange]);
    return { handleChange: onChange, debounceHandleChange: debounceHandleChange };
};
//# sourceMappingURL=useDebounceHandler.js.map