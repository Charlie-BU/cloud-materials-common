"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowProviderWithoutObserver = exports.RowProvider = exports._RowProvider = exports.RowContext = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-09 17:31:36
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var hooks_1 = require("../hooks");
var shared_1 = require("../../shared");
var react_3 = require("../../react");
exports.RowContext = (0, react_1.createContext)(null);
var _RowProvider = function (_a) {
    var children = _a.children, index = _a.index;
    var table = (0, hooks_1.useTable)();
    var prefix = (0, react_3.usePrefix)();
    var row = table.rows[index];
    if (!row) {
        return null;
    }
    var options = { table: table, row: row, prefix: prefix };
    var childrenNode = (0, shared_1.isFn)(children) ? children(options) : children;
    return react_1.default.createElement(exports.RowContext.Provider, { value: row }, childrenNode);
};
exports._RowProvider = _RowProvider;
exports.RowProvider = (0, react_2.observer)(exports._RowProvider);
exports.RowProviderWithoutObserver = exports._RowProvider;
//# sourceMappingURL=Row.js.map