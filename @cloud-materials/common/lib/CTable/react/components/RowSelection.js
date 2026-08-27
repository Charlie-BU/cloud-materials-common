"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowSelectionProvider = exports.RowSelectionContext = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-24 20:17:31
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var hooks_1 = require("../hooks");
var shared_1 = require("../../shared");
exports.RowSelectionContext = (0, react_1.createContext)(null);
exports.RowSelectionProvider = (0, react_2.observer)(function (_a) {
    var children = _a.children, rowKey = _a.rowKey;
    var table = (0, hooks_1.useTable)();
    var row = table.getRowByRowKey(rowKey);
    if (!row) {
        return null;
    }
    var options = { table: table, row: row, rowData: row.data };
    var childrenNode = (0, shared_1.isFn)(children) ? children(options) : children;
    return react_1.default.createElement(exports.RowSelectionContext.Provider, { value: row }, childrenNode);
});
//# sourceMappingURL=RowSelection.js.map