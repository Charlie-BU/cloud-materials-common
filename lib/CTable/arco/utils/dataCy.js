"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCellDataCy = exports.getRowDataCy = exports.getTableDataCy = void 0;
var utils_1 = require("../../utils");
var getTableDataCy = function () { return ({
    dataCy: 'table-container',
}); };
exports.getTableDataCy = getTableDataCy;
var getRowDataCy = function (row, prefix) {
    return {
        dataCy: "".concat(prefix, "-row"),
        dataCyIdx: "".concat(prefix, "-row-idx-").concat((0, utils_1.filterDataKey)(row.index.toString())),
    };
};
exports.getRowDataCy = getRowDataCy;
var getCellDataCy = function (cell, prefix) {
    var columnIndex = (0, utils_1.filterDataKey)(cell.column.config.dataIndex);
    var rowIndex = (0, utils_1.filterDataKey)(cell.row.index.toString());
    return {
        dataCy: "".concat(prefix, "-row-").concat(columnIndex),
        dataCyIdx: "".concat(prefix, "-row-idx-").concat(rowIndex, "-").concat(columnIndex),
    };
};
exports.getCellDataCy = getCellDataCy;
//# sourceMappingURL=dataCy.js.map