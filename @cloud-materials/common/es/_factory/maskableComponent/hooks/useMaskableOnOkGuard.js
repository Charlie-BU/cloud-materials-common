import { useAutoRef } from '../../../hooks';
import { useEffect } from 'react';
import { useMaskableContext } from '../components';
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
export var useMaskableOnOkGuard = function (callback) {
    var setOnOkGuardPool = useMaskableContext().setOnOkGuardPool;
    var callbackRef = useAutoRef(callback);
    useEffect(function () {
        var callback = function () { return callbackRef.current(); };
        setOnOkGuardPool(function (onOkGuardPool) { return onOkGuardPool.concat(callback); });
        return function () {
            setOnOkGuardPool(function (onOkGuardPool) { return onOkGuardPool.filter(function (v) { return v !== callback; }); });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
//# sourceMappingURL=useMaskableOnOkGuard.js.map