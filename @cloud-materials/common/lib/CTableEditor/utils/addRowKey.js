"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRowKeyToArray = exports.addRowKey = void 0;
var tslib_1 = require("tslib");
var constants_1 = require("../constants");
// 自增 rowKey 唯一标识
var rowKeyUniqId = 0;
// 给 数据加 rowKey，如果存在则跳过
var addRowKey = function (data) {
    var _a;
    return tslib_1.__assign(tslib_1.__assign({}, data), (_a = {}, _a[constants_1.ROW_KEY] = data[constants_1.ROW_KEY] || "".concat(rowKeyUniqId++, "_").concat(Date.now()), _a));
};
exports.addRowKey = addRowKey;
// 给 array 数据加 rowKey，如果存在则跳过
var addRowKeyToArray = function (data) {
    return data.map(function (d) {
        var _a;
        return tslib_1.__assign(tslib_1.__assign({}, d), (_a = {}, _a[constants_1.ROW_KEY] = d[constants_1.ROW_KEY] || "".concat(rowKeyUniqId++, "_").concat(Date.now()), _a));
    });
};
exports.addRowKeyToArray = addRowKeyToArray;
//# sourceMappingURL=addRowKey.js.map