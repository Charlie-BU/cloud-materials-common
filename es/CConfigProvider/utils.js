import { __read } from "tslib";
import { useMemo } from 'react';
import defaultLocale from '../locales/default';
import { createCssPrefix, GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
export var DEFAULT_C_PREFIX_CLS = GLOBAL_PREFIX;
export var defaultProps = {
    locale: defaultLocale,
    cPrefixCls: DEFAULT_C_PREFIX_CLS,
};
export var getCPrefixClsFn = function (defaultPrefixCls) {
    return function (componentName, customPrefix) {
        return "".concat(customPrefix || defaultPrefixCls, "-").concat(componentName);
    };
};
export var formatLocale = function (locale, replaceParams) {
    var value = locale;
    Object.entries(replaceParams).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], val = _b[1];
        value = value.replace("{".concat(key, "}"), "".concat(val));
    });
    return value;
};
export var createClassNamePrefixHooks = function (prefix) {
    var useCssPrefix = function (componentName, customPrefix) {
        return useMemo(function () {
            return createCssPrefix(customPrefix || prefix, componentName);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [componentName, customPrefix, prefix]);
    };
    return useCssPrefix;
};
//# sourceMappingURL=utils.js.map