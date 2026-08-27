"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarItemGroup = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-24 15:38:30
 * @LastEditTime: 2021-11-02 20:01:25
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
var ToolbarItem_1 = require("./ToolbarItem");
var react_2 = require("../../../react");
var ToolbarItemGroup = function (_a) {
    var toolbarItems = _a.toolbarItems, onChange = _a.onChange;
    var prefixCls = (0, react_2.usePrefix)('toolbar');
    return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-item-group") }, toolbarItems.map(function (itemConfig, index) {
        // 在 toolbar 配置列表中，可能会通过表达式过滤某些 item
        // 为了方便使用，允许在表达式中返回 false 或者 undefined
        // 这里判断 config 是否存在
        return itemConfig && itemConfig.visible !== false ? (react_1.default.createElement(ToolbarItem_1.ToolbarItem, { config: itemConfig, key: index, onChange: onChange })) : null;
    })));
};
exports.ToolbarItemGroup = ToolbarItemGroup;
//# sourceMappingURL=ToolbarItemGroup.js.map