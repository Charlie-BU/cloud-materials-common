"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassNamePrefixHooks = exports.formatLocale = exports.getCPrefixClsFn = exports.defaultProps = exports.DEFAULT_C_PREFIX_CLS = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var default_1 = tslib_1.__importDefault(require("../locales/default"));
var classNamePrefixFactory_1 = require("../_utils/classNamePrefixFactory");
exports.DEFAULT_C_PREFIX_CLS = classNamePrefixFactory_1.GLOBAL_PREFIX;
exports.defaultProps = {
    locale: default_1.default,
    cPrefixCls: exports.DEFAULT_C_PREFIX_CLS,
};
var getCPrefixClsFn = function (defaultPrefixCls) {
    return function (componentName, customPrefix) {
        return "".concat(customPrefix || defaultPrefixCls, "-").concat(componentName);
    };
};
exports.getCPrefixClsFn = getCPrefixClsFn;
var formatLocale = function (locale, replaceParams) {
    var value = locale;
    Object.entries(replaceParams).forEach(function (_a) {
        var _b = tslib_1.__read(_a, 2), key = _b[0], val = _b[1];
        value = value.replace("{".concat(key, "}"), "".concat(val));
    });
    return value;
};
exports.formatLocale = formatLocale;
var createClassNamePrefixHooks = function (prefix) {
    var useCssPrefix = function (componentName, customPrefix) {
        return (0, react_1.useMemo)(function () {
            return (0, classNamePrefixFactory_1.createCssPrefix)(customPrefix || prefix, componentName);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [componentName, customPrefix, prefix]);
    };
    return useCssPrefix;
};
exports.createClassNamePrefixHooks = createClassNamePrefixHooks;
//# sourceMappingURL=utils.js.map