"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSpecialProps = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var mergeSpecialProps = function () {
    var restProps = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        restProps[_i] = arguments[_i];
    }
    var safeProps = restProps.filter(function (v) { return Boolean(v); });
    if (safeProps.every(function (v) { return !v.style; })) {
        return safeProps.reduce(function (prev, current) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, prev), current), { className: (0, classnames_1.default)(prev.className, current.className) || void 0 })); }, {});
    }
    return safeProps.reduce(function (prev, current) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, prev), current), { style: tslib_1.__assign(tslib_1.__assign({}, prev.style), current.style), className: (0, classnames_1.default)(prev.className, current.className) || void 0 })); }, {});
};
exports.mergeSpecialProps = mergeSpecialProps;
//# sourceMappingURL=utils.js.map