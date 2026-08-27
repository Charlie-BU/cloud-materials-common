"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMaskableOnOkGuard = void 0;
var hooks_1 = require("../../../hooks");
var react_1 = require("react");
var components_1 = require("../components");
/**
 * onOk守卫
 *
 * ```ts
 * useMaskableOnOkGuard(() => {
 *  if (condition) {
 *    return Promise.resolve(true)
 *  }
 *  return false;
 * })
 * ```
 *
 */
var useMaskableOnOkGuard = function (callback) {
    var setOnOkGuardPool = (0, components_1.useMaskableContext)().setOnOkGuardPool;
    var callbackRef = (0, hooks_1.useAutoRef)(callback);
    (0, react_1.useEffect)(function () {
        var callback = function () { return callbackRef.current(); };
        setOnOkGuardPool(function (onOkGuardPool) { return onOkGuardPool.concat(callback); });
        return function () {
            setOnOkGuardPool(function (onOkGuardPool) { return onOkGuardPool.filter(function (v) { return v !== callback; }); });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
exports.useMaskableOnOkGuard = useMaskableOnOkGuard;
//# sourceMappingURL=useMaskableOnOkGuard.js.map