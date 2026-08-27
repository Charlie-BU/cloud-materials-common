"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onColumnFilterValueChange = exports.onSortValueChange = exports.onTablePageChangeEnd = exports.onTablePageChangeStart = exports.onTableUpdateRowEnd = exports.onTableUpdateDataEnd = exports.onTableUpdateDataStart = exports.onTableSelectRow = exports.onTableInitColumn = exports.onTableInit = exports.onTableInitConfig = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:01
 * @LastEditTime: 2021-11-04 17:46:50
 * @LastEditors: youjingyu
 * @Description:
 */
var reactive_1 = require("@formily/reactive");
var shared_1 = require("../shared");
var types_1 = require("../types");
var createTableEffect = function (type) {
    return (0, shared_1.createEffectHook)(type, function (table, payload) {
        return function (callback) {
            (0, reactive_1.batch)(function () {
                // @ts-ignore
                callback(tslib_1.__assign({ table: table }, payload));
            });
        };
    });
};
exports.onTableInitConfig = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_INIT_CONFIG);
exports.onTableInit = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_INIT);
exports.onTableInitColumn = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_INIT_COLUMN);
exports.onTableSelectRow = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_SELECT_ROW);
exports.onTableUpdateDataStart = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_UPDATE_DATA_START);
exports.onTableUpdateDataEnd = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_UPDATE_DATA_END);
exports.onTableUpdateRowEnd = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_UPDATE_ROW_END);
exports.onTablePageChangeStart = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_PAGE_CHANGE_START);
exports.onTablePageChangeEnd = createTableEffect(types_1.LifeCycleTypes.ON_TABLE_PAGE_CHANGE_END);
exports.onSortValueChange = createTableEffect(types_1.LifeCycleTypes.ON_SORT_VALUE_CHANGE);
exports.onColumnFilterValueChange = createTableEffect(types_1.LifeCycleTypes.ON_COLUMN_FILTER_VALUE_CHANGE);
//# sourceMappingURL=table.js.map