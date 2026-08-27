"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterDropdownProvider = exports.FilterDropdownContext = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-12 16:17:04
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var hooks_1 = require("../hooks");
var shared_1 = require("../../shared");
exports.FilterDropdownContext = (0, react_1.createContext)(null);
exports.FilterDropdownProvider = (0, react_2.observer)(function (_a) {
    var children = _a.children, dataIndex = _a.dataIndex;
    var table = (0, hooks_1.useTable)();
    var column = table.getColumnByDataIndex(dataIndex);
    var options = { table: table, column: column };
    var childrenNode = (0, shared_1.isFn)(children) ? children(options) : children;
    return react_1.default.createElement(exports.FilterDropdownContext.Provider, { value: column }, childrenNode);
});
//# sourceMappingURL=FilterDropdown.js.map