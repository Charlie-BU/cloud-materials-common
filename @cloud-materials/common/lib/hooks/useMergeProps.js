"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMergeProps = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMergeProps = function (componentProps, defaultProps, globalComponentConfig, deps) {
    if (deps === void 0) { deps = []; }
    var _defaultProps = (0, react_1.useMemo)(function () {
        return tslib_1.__assign(tslib_1.__assign({}, defaultProps), globalComponentConfig);
    }, tslib_1.__spreadArray([defaultProps, globalComponentConfig], tslib_1.__read(deps), false));
    var props = (0, react_1.useMemo)(function () {
        var mProps = tslib_1.__assign({}, componentProps);
        for (var propName in _defaultProps) {
            if (mProps[propName] === undefined) {
                mProps[propName] = _defaultProps[propName];
            }
        }
        return mProps;
    }, tslib_1.__spreadArray([componentProps, _defaultProps], tslib_1.__read(deps), false));
    return props;
};
exports.useMergeProps = useMergeProps;
//# sourceMappingURL=useMergeProps.js.map