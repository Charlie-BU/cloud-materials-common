export var GLOBAL_PREFIX = "c-m";
export var createCssPrefix = function (prefix, componentName) {
    return function (string) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var after = string.map(function (item, index) { var _a; return item + ((_a = params[index]) !== null && _a !== void 0 ? _a : ''); }).join('');
        return "".concat(prefix).concat(componentName ? "-".concat(componentName) : '').concat(after ? "-".concat(after) : after);
    };
};
var classNamePrefixFactory = function (componentName) {
    return createCssPrefix(GLOBAL_PREFIX, componentName);
};
export default classNamePrefixFactory;
//# sourceMappingURL=classNamePrefixFactory.js.map