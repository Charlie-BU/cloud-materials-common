import type { GuardCallback } from '../components';
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
export declare const useMaskableOnOkGuard: (callback: GuardCallback) => void;
