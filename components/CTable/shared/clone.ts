/*
 * @Author: youjingyu
 * @Date: 2021-10-22 18:46:25
 * @LastEditTime: 2021-10-22 18:49:30
 * @LastEditors: youjingyu
 * @Description:
 */
import { isPlainObj } from './checkers';

export const shallowCloneObj = <T>(obj?: T): T => {
  if (!isPlainObj(obj)) {
    return obj!;
  }
  return { ...obj };
};
