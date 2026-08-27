"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
var tslib_1 = require("tslib");
var createLogger = function (onLog) {
    return (function (componentName) {
        return Object.fromEntries(['error', 'info', 'warn'].map(function (type) { return [
            type,
            function (args) { return onLog(tslib_1.__assign({ type: type, componentName: componentName }, args)); },
        ]; }));
    });
};
exports.createLogger = createLogger;
//# sourceMappingURL=Logger.js.map