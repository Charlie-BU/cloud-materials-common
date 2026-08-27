import { __makeTemplateObject } from "tslib";
import { makeKey } from './util';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
var cssPrefix = classNamePrefixFactory('operation-menu');
// 容器
export var container = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"])));
// 下拉菜单按钮
export var dropButton = cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["dropdown-button"], ["dropdown-button"])));
// 下拉菜单容器
export var dropContainer = cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["dropdown-container"], ["dropdown-container"])));
// --------操作按钮列表---------
// 操作按钮
export var getButtonItemCy = function (index, name) { return cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["button-item-", ""], ["button-item-", ""])), makeKey(index, name)); };
// 操作按钮二次确认按钮
export var getButtonItemConfirmCy = function (index, name) {
    return cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["button-item-confirm-", ""], ["button-item-confirm-", ""])), makeKey(index, name));
};
// 操作按钮索引
export var getButtonItemIndexCy = function (index) { return cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["button-item-idx-", ""], ["button-item-idx-", ""])), index); };
// 操作按钮二次确认按钮索引
export var getButtonItemConfirmIndexCy = function (index) { return cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["$button-item-confirm-idx-", ""], ["$button-item-confirm-idx-", ""])), index); };
// --------操作菜单列表---------
// 下拉菜单选项
export var getMenuItemCy = function (index, name) { return cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["menu-item-", ""], ["menu-item-", ""])), makeKey(index, name)); };
// 下拉菜单选项二次确认
export var getMenuItemConfirmCy = function (index, name) {
    return cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["menu-item-confirm-", ""], ["menu-item-confirm-", ""])), makeKey(index, name));
};
// 下拉菜单选项索引
export var getMenuItemIndexCy = function (index) { return cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["menu-item-idx-", ""], ["menu-item-idx-", ""])), index); };
// 下拉菜单选项二次确认索引
export var getMenuItemConfirmIndexCy = function (index) { return cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["menu-item-confirm-idx-", ""], ["menu-item-confirm-idx-", ""])), index); };
//---------test lib------------
export var btnItemId = cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["btn-id"], ["btn-id"])));
export var dropBtnId = cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["dropdown-btn-id"], ["dropdown-btn-id"])));
export var menuContainerId = cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["menu-container"], ["menu-container"])));
export var menuItemId = cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["menu-id"], ["menu-id"])));
export var groupDividerId = cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["groupdown-divider-id"], ["groupdown-divider-id"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
//# sourceMappingURL=dataCy.js.map