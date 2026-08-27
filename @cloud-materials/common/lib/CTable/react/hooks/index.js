"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToolbar = exports.useCell = exports.useRow = exports.useTable = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-06 17:30:05
 * @LastEditTime: 2021-10-29 12:00:17
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = require("react");
// import { TableContext, RowContext, CellContext, ToolbarContext, ToolbarItemContext } from '../components';
var components_1 = require("../components");
tslib_1.__exportStar(require("./useAttach"), exports);
tslib_1.__exportStar(require("./useCreateTable"), exports);
tslib_1.__exportStar(require("./usePrefix"), exports);
var useTable = function () { return (0, react_1.useContext)(components_1.TableContext); };
exports.useTable = useTable;
var useRow = function () {
    return (0, react_1.useContext)(components_1.RowContext);
};
exports.useRow = useRow;
var useCell = function () { return (0, react_1.useContext)(components_1.CellContext); };
exports.useCell = useCell;
var useToolbar = function () { return (0, react_1.useContext)(components_1.ToolbarContext); };
exports.useToolbar = useToolbar;
// export const useToolbarItem = () => useContext(ToolbarItemContext);
//# sourceMappingURL=index.js.map