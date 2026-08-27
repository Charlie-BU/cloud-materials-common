"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandRowProvider = exports.ExpandRowContext = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-09 18:15:51
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var hooks_1 = require("../hooks");
var shared_1 = require("../../shared");
exports.ExpandRowContext = (0, react_1.createContext)(null);
exports.ExpandRowProvider = (0, react_2.observer)(function (_a) {
    var children = _a.children, rowKey = _a.rowKey;
    var table = (0, hooks_1.useTable)();
    var row = table.getRowByRowKey(rowKey);
    // 在某一行展开后，又进行表格的过滤，会有 rerender 动作，此时父行可能已经不能存在了，此时直接返回 null
    if (!row) {
        return null;
    }
    var options = { table: table, row: row, rowData: row.data };
    var childrenNode = (0, shared_1.isFn)(children) ? children(options) : children;
    return react_1.default.createElement(exports.ExpandRowContext.Provider, { value: row }, childrenNode);
});
//# sourceMappingURL=ExpandRow.js.map