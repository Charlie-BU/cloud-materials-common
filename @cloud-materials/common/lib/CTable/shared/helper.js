"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCellData = exports.setCellData = exports.getCellData = void 0;
/*
 * @Author: youjingyu
 * @Date: 2021-11-28 11:18:56
 * @LastEditTime: 2021-11-28 11:33:39
 * @LastEditors: youjingyu
 * @Description:
 */
var lodash_es_1 = require("lodash-es");
// 支持 a.b.c 的形式的 dataIndex
var getCellData = function (rowData, dataIndex) {
    return (0, lodash_es_1.get)(rowData, dataIndex);
};
exports.getCellData = getCellData;
// 支持 a.b.c 的形式的 dataIndex
var setCellData = function (rowData, dataIndex, value) {
    (0, lodash_es_1.set)(rowData, dataIndex, value);
};
exports.setCellData = setCellData;
var formatCellData = function (options) {
    var _a;
    var cellData = options.cellData, table = options.table, column = options.column, cell = options.cell, rowData = options.rowData;
    var _b = table.plugin.getFormatter(column.config.formatter), formatterFn = _b.formatterFn, formatterMapping = _b.formatterMapping;
    var content = cellData;
    if (formatterMapping) {
        content = formatterMapping[content] || content;
    }
    // 支持在 formatterMapping 后再次执行 formatterFn
    if (formatterFn) {
        content = formatterFn({
            cellData: cellData,
            cell: cell,
            row: cell === null || cell === void 0 ? void 0 : cell.row,
            rowData: ((_a = cell === null || cell === void 0 ? void 0 : cell.row) === null || _a === void 0 ? void 0 : _a.data) || rowData,
            column: column,
            table: table,
        });
    }
    return content;
};
exports.formatCellData = formatCellData;
//# sourceMappingURL=helper.js.map