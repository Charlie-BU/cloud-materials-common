"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTable = void 0;
/*
 * @Author: youjingyu
 * @Date: 2021-10-15 18:20:08
 * @LastEditTime: 2021-10-15 18:20:54
 * @LastEditors: youjingyu
 * @Description:
 */
var models_1 = require("../models");
// eslint-disable-next-line no-undef
var isTable = function (node) {
    return node instanceof models_1.Table;
};
exports.isTable = isTable;
//# sourceMappingURL=checkers.js.map