import { useAutoRef } from '../../../hooks';
import { useEffect } from 'react';
import type { GuardCallback } from '../components';
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
export const useMaskableOnOkGuard = (callback: GuardCallback) => {
  const { setOnOkGuardPool } = useMaskableContext();
  const callbackRef = useAutoRef(callback);

  useEffect(() => {
    const callback = () => callbackRef.current();
    setOnOkGuardPool(onOkGuardPool => onOkGuardPool.concat(callback));
    return () => {
      setOnOkGuardPool(onOkGuardPool => onOkGuardPool.filter(v => v !== callback));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
