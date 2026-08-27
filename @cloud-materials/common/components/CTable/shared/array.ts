/*
 * @Author: youjingyu
 * @Date: 2021-10-08 17:31:14
 * @LastEditTime: 2021-10-08 17:44:39
 * @LastEditors: youjingyu
 * @Description:
 */
import { isArr } from './checkers';

export const toArr = (val: any): any[] => (isArr(val) ? val : val ? [val] : []);
