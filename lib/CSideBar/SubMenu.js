"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var resize_observer_1 = tslib_1.__importDefault(require("@react-hook/resize-observer"));
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
/**
 * 它为什么存在？
 * title的容器是span 并且没有class，并且顺序不固定，无法通过css覆盖样式达到效果，只能通过此种办法追加Popover
 */
var SubMenu = function (_a) {
    var title = _a.title, props = tslib_1.__rest(_a, ["title"]);
    var subMenuRef = (0, react_1.useRef)(null);
    var _b = tslib_1.__read((0, react_1.useState)(0), 2), maxWidth = _b[0], setMaxWidth = _b[1];
    var prefixCls = (0, react_1.useContext)(web_react_1.ConfigProvider.ConfigContext).prefixCls;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
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
    (0, react_1.useLayoutEffect)(function () {
        if (subMenuRef.current) {
            handleMaxWidth(subMenuRef.current);
        }
    }, []);
    (0, resize_observer_1.default)(subMenuRef, function (_a) {
        var target = _a.target;
        handleMaxWidth(target);
    });
    return (react_1.default.createElement(web_react_1.Menu.SubMenu, tslib_1.__assign({}, props, { ref: subMenuRef, title: react_1.default.createElement("span", { style: { maxWidth: maxWidth }, className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["submenu-title"], ["submenu-title"]))) }, title) })));
};
// 伪装成 Submenu 以被arco识别
SubMenu.menuType = web_react_1.Menu.SubMenu.menuType;
exports.default = SubMenu;
var templateObject_1;
//# sourceMappingURL=SubMenu.js.map