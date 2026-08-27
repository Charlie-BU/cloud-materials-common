"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounceHandler = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var react_1 = require("react");
var defaultDebounceOptions = { wait: 500 };
var useDebounceHandler = function (props) {
    var _a = props.onChange, onChange = _a === void 0 ? lodash_es_1.noop : _a, debounceOptions = props.debounceOptions;
    var refChange = (0, react_1.useRef)(onChange);
    refChange.current = onChange;
    var debounceHandleChange = (0, react_1.useMemo)(function () {
        if (debounceOptions === null) {
            return refChange.current;
        }
        var _a = tslib_1.__assign(tslib_1.__assign({}, defaultDebounceOptions), debounceOptions), wait = _a.wait, restOptions = tslib_1.__rest(_a, ["wait"]);
        return (0, lodash_es_1.debounce)(refChange.current, wait, restOptions);
    }, [debounceOptions]);
    (0, react_1.useEffect)(function () {
        if ('cancel' in debounceHandleChange && typeof debounceHandleChange.cancel === 'function') {
            debounceHandleChange.cancel();
        }
    }, [debounceHandleChange]);
    return { handleChange: onChange, debounceHandleChange: debounceHandleChange };
};
exports.useDebounceHandler = useDebounceHandler;
//# sourceMappingURL=useDebounceHandler.js.map