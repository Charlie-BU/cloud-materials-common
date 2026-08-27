"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCssPrefix = exports.GLOBAL_PREFIX = void 0;
exports.GLOBAL_PREFIX = "c-m";
var createCssPrefix = function (prefix, componentName) {
    return function (string) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var after = string.map(function (item, index) { var _a; return item + ((_a = params[index]) !== null && _a !== void 0 ? _a : ''); }).join('');
        return "".concat(prefix).concat(componentName ? "-".concat(componentName) : '').concat(after ? "-".concat(after) : after);
    };
};
exports.createCssPrefix = createCssPrefix;
var classNamePrefixFactory = function (componentName) {
    return (0, exports.createCssPrefix)(exports.GLOBAL_PREFIX, componentName);
};
exports.default = classNamePrefixFactory;
//# sourceMappingURL=classNamePrefixFactory.js.map