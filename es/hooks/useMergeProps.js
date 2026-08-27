import { __assign, __read, __spreadArray } from "tslib";
import { useMemo } from 'react';
export var useMergeProps = function (componentProps, defaultProps, globalComponentConfig, deps) {
    if (deps === void 0) { deps = []; }
    var _defaultProps = useMemo(function () {
        return __assign(__assign({}, defaultProps), globalComponentConfig);
    }, __spreadArray([defaultProps, globalComponentConfig], __read(deps), false));
    var props = useMemo(function () {
        var mProps = __assign({}, componentProps);
        for (var propName in _defaultProps) {
            if (mProps[propName] === undefined) {
                mProps[propName] = _defaultProps[propName];
            }
        }
        return mProps;
    }, __spreadArray([componentProps, _defaultProps], __read(deps), false));
    return props;
};
//# sourceMappingURL=useMergeProps.js.map