"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupDividerId = exports.menuItemId = exports.menuContainerId = exports.dropBtnId = exports.btnItemId = exports.getMenuItemConfirmIndexCy = exports.getMenuItemIndexCy = exports.getMenuItemConfirmCy = exports.getMenuItemCy = exports.getButtonItemConfirmIndexCy = exports.getButtonItemIndexCy = exports.getButtonItemConfirmCy = exports.getButtonItemCy = exports.dropContainer = exports.dropButton = exports.container = void 0;
var tslib_1 = require("tslib");
var util_1 = require("./util");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('operation-menu');
// 容器
exports.container = cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"])));
// 下拉菜单按钮
exports.dropButton = cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["dropdown-button"], ["dropdown-button"])));
// 下拉菜单容器
exports.dropContainer = cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["dropdown-container"], ["dropdown-container"])));
// --------操作按钮列表---------
// 操作按钮
var getButtonItemCy = function (index, name) { return cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["button-item-", ""], ["button-item-", ""])), (0, util_1.makeKey)(index, name)); };
exports.getButtonItemCy = getButtonItemCy;
// 操作按钮二次确认按钮
var getButtonItemConfirmCy = function (index, name) {
    return cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["button-item-confirm-", ""], ["button-item-confirm-", ""])), (0, util_1.makeKey)(index, name));
};
exports.getButtonItemConfirmCy = getButtonItemConfirmCy;
// 操作按钮索引
var getButtonItemIndexCy = function (index) { return cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["button-item-idx-", ""], ["button-item-idx-", ""])), index); };
exports.getButtonItemIndexCy = getButtonItemIndexCy;
// 操作按钮二次确认按钮索引
var getButtonItemConfirmIndexCy = function (index) { return cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["$button-item-confirm-idx-", ""], ["$button-item-confirm-idx-", ""])), index); };
exports.getButtonItemConfirmIndexCy = getButtonItemConfirmIndexCy;
// --------操作菜单列表---------
// 下拉菜单选项
var getMenuItemCy = function (index, name) { return cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["menu-item-", ""], ["menu-item-", ""])), (0, util_1.makeKey)(index, name)); };
exports.getMenuItemCy = getMenuItemCy;
// 下拉菜单选项二次确认
var getMenuItemConfirmCy = function (index, name) {
    return cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["menu-item-confirm-", ""], ["menu-item-confirm-", ""])), (0, util_1.makeKey)(index, name));
};
exports.getMenuItemConfirmCy = getMenuItemConfirmCy;
// 下拉菜单选项索引
var getMenuItemIndexCy = function (index) { return cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["menu-item-idx-", ""], ["menu-item-idx-", ""])), index); };
exports.getMenuItemIndexCy = getMenuItemIndexCy;
// 下拉菜单选项二次确认索引
var getMenuItemConfirmIndexCy = function (index) { return cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["menu-item-confirm-idx-", ""], ["menu-item-confirm-idx-", ""])), index); };
exports.getMenuItemConfirmIndexCy = getMenuItemConfirmIndexCy;
//---------test lib------------
exports.btnItemId = cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["btn-id"], ["btn-id"])));
exports.dropBtnId = cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["dropdown-btn-id"], ["dropdown-btn-id"])));
exports.menuContainerId = cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["menu-container"], ["menu-container"])));
exports.menuItemId = cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["menu-id"], ["menu-id"])));
exports.groupDividerId = cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["groupdown-divider-id"], ["groupdown-divider-id"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
//# sourceMappingURL=dataCy.js.map