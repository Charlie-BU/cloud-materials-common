"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArr = void 0;
/*
 * @Author: youjingyu
 * @Date: 2021-10-08 17:31:14
 * @LastEditTime: 2021-10-08 17:44:39
 * @LastEditors: youjingyu
 * @Description:
 */
var checkers_1 = require("./checkers");
var toArr = function (val) { return ((0, checkers_1.isArr)(val) ? val : val ? [val] : []); };
exports.toArr = toArr;
//# sourceMappingURL=array.js.map