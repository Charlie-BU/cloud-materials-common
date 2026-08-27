"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarRow = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-13 11:31:05
 * @LastEditTime: 2021-10-29 15:53:56
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var ToolbarItemGroup_1 = require("./ToolbarItemGroup");
var react_2 = require("../../../react");
var ToolbarRow = function (_a) {
    var config = _a.config, onChange = _a.onChange;
    var prefixCls = (0, react_2.usePrefix)('toolbar');
    var onlyClass;
    if (config.left && !config.right) {
        onlyClass = "".concat(prefixCls, "-row-only-left");
    }
    else if (config.right && !config.left) {
        onlyClass = "".concat(prefixCls, "-row-only-right");
    }
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(prefixCls, "-row"), onlyClass) },
        config.left && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-row-left") },
            react_1.default.createElement(ToolbarItemGroup_1.ToolbarItemGroup, { toolbarItems: config.left, onChange: onChange }))),
        config.right && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-row-right") },
            react_1.default.createElement(ToolbarItemGroup_1.ToolbarItemGroup, { toolbarItems: config.right, onChange: onChange })))));
};
exports.ToolbarRow = ToolbarRow;
//# sourceMappingURL=ToolbarRow.js.map