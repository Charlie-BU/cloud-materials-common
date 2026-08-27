import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-10-22 18:46:25
 * @LastEditTime: 2021-10-22 18:49:30
 * @LastEditors: youjingyu
 * @Description:
 */
import { isPlainObj } from './checkers';
export var shallowCloneObj = function (obj) {
    if (!isPlainObj(obj)) {
        return obj;
    }
    return __assign({}, obj);
};
//# sourceMappingURL=clone.js.map