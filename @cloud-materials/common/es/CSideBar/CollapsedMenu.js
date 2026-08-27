import { __makeTemplateObject } from "tslib";
import classNames from 'classnames';
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';
/**
 * normal模式下菜单收起后单独渲染
 */
var CollapsedMenu = function (_a) {
    var menus = _a.menus, logo = _a.logo, activeRootMenuIndex = _a.activeRootMenuIndex, style = _a.style;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('sidebar');
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["collapsed-menu"], ["collapsed-menu"]))), style: style },
        logo && React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["collapsed-menu-logo"], ["collapsed-menu-logo"]))) }, logo),
        menus.map(function (menu, i) { return (React.createElement("div", { key: menu.key, className: classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["collapsed-menu-item"], ["collapsed-menu-item"]))), activeRootMenuIndex === i && cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["collapsed-menu-item-active"], ["collapsed-menu-item-active"]))), menu.type === 'sub-menu' && menu.redDot && cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["menu-item-badge-dot"], ["menu-item-badge-dot"])))) }, menu.icon)); })));
};
export default CollapsedMenu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=CollapsedMenu.js.map