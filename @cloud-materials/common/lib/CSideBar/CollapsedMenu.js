"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
/**
 * normal模式下菜单收起后单独渲染
 */
var CollapsedMenu = function (_a) {
    var menus = _a.menus, logo = _a.logo, activeRootMenuIndex = _a.activeRootMenuIndex, style = _a.style;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('sidebar');
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["collapsed-menu"], ["collapsed-menu"]))), style: style },
        logo && react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["collapsed-menu-logo"], ["collapsed-menu-logo"]))) }, logo),
        menus.map(function (menu, i) { return (react_1.default.createElement("div", { key: menu.key, className: (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["collapsed-menu-item"], ["collapsed-menu-item"]))), activeRootMenuIndex === i && cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["collapsed-menu-item-active"], ["collapsed-menu-item-active"]))), menu.type === 'sub-menu' && menu.redDot && cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["menu-item-badge-dot"], ["menu-item-badge-dot"])))) }, menu.icon)); })));
};
exports.default = CollapsedMenu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=CollapsedMenu.js.map