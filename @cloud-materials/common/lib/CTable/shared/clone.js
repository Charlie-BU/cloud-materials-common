"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shallowCloneObj = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-22 18:46:25
 * @LastEditTime: 2021-10-22 18:49:30
 * @LastEditors: youjingyu
 * @Description:
 */
var checkers_1 = require("./checkers");
var shallowCloneObj = function (obj) {
    if (!(0, checkers_1.isPlainObj)(obj)) {
        return obj;
    }
    return tslib_1.__assign({}, obj);
};
exports.shallowCloneObj = shallowCloneObj;
//# sourceMappingURL=clone.js.map