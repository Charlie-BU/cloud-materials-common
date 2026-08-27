"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableProvider = exports.TableContext = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-06 17:31:09
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importStar(require("react"));
exports.TableContext = (0, react_1.createContext)(null);
var TableProvider = function (props) {
    return react_1.default.createElement(exports.TableContext.Provider, { value: props.table }, props.children);
};
exports.TableProvider = TableProvider;
//# sourceMappingURL=Table.js.map