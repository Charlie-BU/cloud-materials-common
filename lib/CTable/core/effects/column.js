"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onColumnVisibleChange = exports.onColumnInit = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-11-04 17:46:33
 * @LastEditors: youjingyu
 * @Description:
 */
var reactive_1 = require("@formily/reactive");
var shared_1 = require("../shared");
var types_1 = require("../types");
var createColumnEffect = function (type) {
    return (0, shared_1.createEffectHook)(type, function (table, payload) {
        return function (callback) {
            (0, reactive_1.batch)(function () {
                callback(tslib_1.__assign({ table: table }, payload));
            });
        };
    });
};
exports.onColumnInit = createColumnEffect(types_1.LifeCycleTypes.ON_COLUMN_INIT);
exports.onColumnVisibleChange = createColumnEffect(types_1.LifeCycleTypes.ON_COLUMN_VISIBLE_CHANGE);
//# sourceMappingURL=column.js.map