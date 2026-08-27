/*
 * @Author: youjingyu
 * @Date: 2021-10-08 17:31:14
 * @LastEditTime: 2021-10-08 17:44:39
 * @LastEditors: youjingyu
 * @Description:
 */
import { isArr } from './checkers';
export var toArr = function (val) { return (isArr(val) ? val : val ? [val] : []); };
//# sourceMappingURL=array.js.map