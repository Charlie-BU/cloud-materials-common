import { __assign } from "tslib";
import classNames from 'classnames';
export var mergeSpecialProps = function () {
    var restProps = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        restProps[_i] = arguments[_i];
    }
    var safeProps = restProps.filter(function (v) { return Boolean(v); });
    if (safeProps.every(function (v) { return !v.style; })) {
        return safeProps.reduce(function (prev, current) { return (__assign(__assign(__assign({}, prev), current), { className: classNames(prev.className, current.className) || void 0 })); }, {});
    }
    return safeProps.reduce(function (prev, current) { return (__assign(__assign(__assign({}, prev), current), { style: __assign(__assign({}, prev.style), current.style), className: classNames(prev.className, current.className) || void 0 })); }, {});
};
//# sourceMappingURL=utils.js.map