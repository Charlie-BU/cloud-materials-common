import { isFunction } from 'lodash-es';

/**
 * 处理可能是函数的参数
 * @param config
 * @param option
 * @returns
 */
export const runCallable = <T, D>(config: D, option?: T) => {
  if (isFunction(config)) {
    return config?.(option);
  }
  return config;
};
