"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var interface_1 = require("../interface");
var CLoadingV2_1 = tslib_1.__importDefault(require("../../CLoadingV2"));
var OperationWrapper_1 = tslib_1.__importDefault(require("./OperationWrapper"));
var util_1 = require("../util");
var CConfigProvider_1 = require("../../CConfigProvider");
var hooks_1 = require("../hooks");
var dataCy = tslib_1.__importStar(require("../dataCy"));
var useLimitMaxRows_1 = tslib_1.__importDefault(require("../../hooks/useLimitMaxRows"));
var MenuItem = web_react_1.Menu.Item;
var SubMenu = web_react_1.Menu.SubMenu;
var MenuList = function (_a) {
    var menuOperation = _a.menuOperation, menuStatus = _a.menuStatus, currentPop = _a.currentPop, popVisibleChange = _a.popVisibleChange, setDropDownVisible = _a.setDropDownVisible, maxMenuOperationNum = _a.maxMenuOperationNum, getAsyncOperations = _a.getAsyncOperations;
    var _b = tslib_1.__read((0, hooks_1.useMenu)(), 2), state = _b[0], control = _b[1];
    var activeMenu = state.activeMenu;
    var clearActiveMenu = control.clearActiveMenu, subMenuVisible = control.subMenuVisible;
    var menuRef = (0, react_1.useRef)(null);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('operation-menu');
    var dividerNum = (0, util_1.getGroupNumInMaxNum)(menuOperation, maxMenuOperationNum);
    (0, useLimitMaxRows_1.default)({ target: menuRef, maxRows: dividerNum + maxMenuOperationNum });
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
            return (react_1.default.createElement(SubMenu, { key: opt.key, title: opt.name, triggerProps: {
                    onVisibleChange: function (visible) { return subMenuVisible(visible, opt.key); },
                }, className: activeSubMenu ? cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["sub-menu-active"], ["sub-menu-active"]))) : '' }, opt.subOperation.map(function (item) {
                return renderMenuItem(item);
            })));
        }
        return (react_1.default.createElement(MenuItem, { key: opt.key, onClick: function () { return handleMenuClick(opt); }, disabled: opt.disabled, id: opt.name },
            react_1.default.createElement(OperationWrapper_1.default, { operation: opt, index: opt.index, currentPop: currentPop, popVisibleChange: popVisibleChange, setDropDownVisible: setDropDownVisible, inDropMenu: true }, (opt === null || opt === void 0 ? void 0 : opt.render) ? (opt.render()) : (react_1.default.createElement("div", { "data-cy": dataCy.getMenuItemCy(opt.index, opt.name), "data-cy-idx": dataCy.getMenuItemIndexCy(opt.index), "data-testid": dataCy.menuItemId }, opt.name)))));
    };
    return (react_1.default.createElement(CLoadingV2_1.default, { loading: menuStatus === interface_1.MenuStatus['loading'], hasError: menuStatus === interface_1.MenuStatus['error'], onReload: function () { return getAsyncOperations(); }, style: { minWidth: 50, textAlign: 'center' } },
        react_1.default.createElement("div", { ref: menuRef, className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["dropdown-menu-container"], ["dropdown-menu-container"]))) }, menuOperation.map(function (item, i) { return (react_1.default.createElement(react_1.Fragment, { key: i },
            item.map(function (opt) { return renderMenuItem(opt); }),
            i < (menuOperation === null || menuOperation === void 0 ? void 0 : menuOperation.length) - 1 && react_1.default.createElement(web_react_1.Divider, null))); }))));
};
exports.default = MenuList;
var templateObject_1, templateObject_2;
//# sourceMappingURL=MenuList.js.map