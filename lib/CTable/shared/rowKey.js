"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRowKey = void 0;
/*
 * @Author: youjingyu
 * @Date: 2021-12-15 11:50:28
 * @LastEditTime: 2021-12-15 14:52:06
 * @LastEditors: youjingyu
 * @Description:
 */
var checkers_1 = require("./checkers");
var genRowKey = function (rowData, offsetIndexInAllData, rowKeyConfig) {
    var _a;
    if (!rowKeyConfig) {
        // 如果没有配置 row key，通过页码和 index 模拟一个
        return "".concat(offsetIndexInAllData);
    }
    var rowKey;
    if ((0, checkers_1.isFn)(rowKeyConfig)) {
        rowKey = rowKeyConfig(rowData, offsetIndexInAllData);
    }
    else {
        rowKey = rowData === null || rowData === void 0 ? void 0 : rowData[rowKeyConfig];
    }
    return ((_a = rowKey === null || rowKey === void 0 ? void 0 : rowKey.toString) === null || _a === void 0 ? void 0 : _a.call(rowKey)) || '';
};
exports.genRowKey = genRowKey;
//# sourceMappingURL=rowKey.js.map