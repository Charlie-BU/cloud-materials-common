import { __makeTemplateObject, __read } from "tslib";
import React, { Fragment, useRef } from 'react';
import { Menu, Divider } from '@arco-design/web-react';
import { MenuStatus } from '../interface';
import CLoadingV2 from '../../CLoadingV2';
import OperationWrapper from './OperationWrapper';
import { getGroupNumInMaxNum } from '../util';
import { useCConfigContext } from '../../CConfigProvider';
import { useMenu } from '../hooks';
import * as dataCy from '../dataCy';
import useLimitMaxRows from '../../hooks/useLimitMaxRows';
var MenuItem = Menu.Item;
var SubMenu = Menu.SubMenu;
var MenuList = function (_a) {
    var menuOperation = _a.menuOperation, menuStatus = _a.menuStatus, currentPop = _a.currentPop, popVisibleChange = _a.popVisibleChange, setDropDownVisible = _a.setDropDownVisible, maxMenuOperationNum = _a.maxMenuOperationNum, getAsyncOperations = _a.getAsyncOperations;
    var _b = __read(useMenu(), 2), state = _b[0], control = _b[1];
    var activeMenu = state.activeMenu;
    var clearActiveMenu = control.clearActiveMenu, subMenuVisible = control.subMenuVisible;
    var menuRef = useRef(null);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('operation-menu');
    var dividerNum = getGroupNumInMaxNum(menuOperation, maxMenuOperationNum);
    useLimitMaxRows({ target: menuRef, maxRows: dividerNum + maxMenuOperationNum });
    var handleMenuClick = function (opt) {
        var _a;
        (_a = opt.onClick) === null || _a === void 0 ? void 0 : _a.call(opt);
        clearActiveMenu();
        setDropDownVisible(false);
    };
    var renderMenuItem = function (opt) {
        var _a;
        if (opt === null || opt === void 0 ? void 0 : opt.subOperation) {
            var activeSubMenu = (opt === null || opt === void 0 ? void 0 : opt.key) === activeMenu || ((_a = activeMenu === null || activeMenu === void 0 ? void 0 : activeMenu.split('.')) === null || _a === void 0 ? void 0 : _a.includes(opt === null || opt === void 0 ? void 0 : opt.key));
            return (React.createElement(SubMenu, { key: opt.key, title: opt.name, triggerProps: {
                    onVisibleChange: function (visible) { return subMenuVisible(visible, opt.key); },
                }, className: activeSubMenu ? cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["sub-menu-active"], ["sub-menu-active"]))) : '' }, opt.subOperation.map(function (item) {
                return renderMenuItem(item);
            })));
        }
        return (React.createElement(MenuItem, { key: opt.key, onClick: function () { return handleMenuClick(opt); }, disabled: opt.disabled, id: opt.name },
            React.createElement(OperationWrapper, { operation: opt, index: opt.index, currentPop: currentPop, popVisibleChange: popVisibleChange, setDropDownVisible: setDropDownVisible, inDropMenu: true }, (opt === null || opt === void 0 ? void 0 : opt.render) ? (opt.render()) : (React.createElement("div", { "data-cy": dataCy.getMenuItemCy(opt.index, opt.name), "data-cy-idx": dataCy.getMenuItemIndexCy(opt.index), "data-testid": dataCy.menuItemId }, opt.name)))));
    };
    return (React.createElement(CLoadingV2, { loading: menuStatus === MenuStatus['loading'], hasError: menuStatus === MenuStatus['error'], onReload: function () { return getAsyncOperations(); }, style: { minWidth: 50, textAlign: 'center' } },
        React.createElement("div", { ref: menuRef, className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["dropdown-menu-container"], ["dropdown-menu-container"]))) }, menuOperation.map(function (item, i) { return (React.createElement(Fragment, { key: i },
            item.map(function (opt) { return renderMenuItem(opt); }),
            i < (menuOperation === null || menuOperation === void 0 ? void 0 : menuOperation.length) - 1 && React.createElement(Divider, null))); }))));
};
export default MenuList;
var templateObject_1, templateObject_2;
//# sourceMappingURL=MenuList.js.map