import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import { ConfigProvider, Menu } from '@arco-design/web-react';
import useResizeObserver from '@react-hook/resize-observer';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useCConfigContext } from '../CConfigProvider';
/**
 * 它为什么存在？
 * title的容器是span 并且没有class，并且顺序不固定，无法通过css覆盖样式达到效果，只能通过此种办法追加Popover
 */
var SubMenu = function (_a) {
    var title = _a.title, props = __rest(_a, ["title"]);
    var subMenuRef = useRef(null);
    var _b = __read(useState(0), 2), maxWidth = _b[0], setMaxWidth = _b[1];
    var prefixCls = useContext(ConfigProvider.ConfigContext).prefixCls;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('sidebar');
    var handleMaxWidth = function (subMenu) {
        var subMenuDOM = subMenu.firstElementChild;
        if (subMenuDOM) {
            var _a = getComputedStyle(subMenuDOM), paddingLeft = _a.paddingLeft, paddingRight = _a.paddingRight;
            var menuIndent = subMenuDOM.getElementsByClassName("".concat(prefixCls, "-menu-indent"));
            var indent = Array.from(menuIndent).reduce(function (prev, indent) { return indent.clientWidth + prev; }, 0);
            setMaxWidth(subMenuDOM.clientWidth - (parseInt(paddingLeft, 10) || 0) - (parseInt(paddingRight, 10) || 0) - indent);
        }
    };
    useLayoutEffect(function () {
        if (subMenuRef.current) {
            handleMaxWidth(subMenuRef.current);
        }
    }, []);
    useResizeObserver(subMenuRef, function (_a) {
        var target = _a.target;
        handleMaxWidth(target);
    });
    return (React.createElement(Menu.SubMenu, __assign({}, props, { ref: subMenuRef, title: React.createElement("span", { style: { maxWidth: maxWidth }, className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["submenu-title"], ["submenu-title"]))) }, title) })));
};
// 伪装成 Submenu 以被arco识别
SubMenu.menuType = Menu.SubMenu.menuType;
export default SubMenu;
var templateObject_1;
//# sourceMappingURL=SubMenu.js.map