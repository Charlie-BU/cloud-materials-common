import { __assign } from "tslib";
export var createLogger = function (onLog) {
    return (function (componentName) {
        return Object.fromEntries(['error', 'info', 'warn'].map(function (type) { return [
            type,
            function (args) { return onLog(__assign({ type: type, componentName: componentName }, args)); },
        ]; }));
    });
};
//# sourceMappingURL=Logger.js.map