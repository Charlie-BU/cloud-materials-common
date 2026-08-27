"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellProvider = exports.CellContext = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-12 20:22:39
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var hooks_1 = require("../hooks");
var shared_1 = require("../../shared");
var CTableEditor_1 = require("../../../CTableEditor");
exports.CellContext = (0, react_1.createContext)(null);
exports.CellProvider = (0, react_2.observer)(function (_a) {
    var dataIndex = _a.dataIndex, children = _a.children;
    var table = (0, hooks_1.useTable)();
    var row = (0, hooks_1.useRow)();
    var tableEditor = (0, CTableEditor_1.useTableEditor)();
    var cell = row.getCellByDataIndex(dataIndex);
    var options = {
        table: table,
        tableEditor: tableEditor,
        column: cell.column,
        row: row,
        rowData: row.data,
        cell: cell,
    };
    var childrenNode = (0, shared_1.isFn)(children) ? children(options) : children;
    return react_1.default.createElement(exports.CellContext.Provider, { value: cell }, childrenNode);
});
//# sourceMappingURL=Cell.js.map