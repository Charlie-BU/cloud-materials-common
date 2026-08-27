"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = tslib_1.__importDefault(require("react-dom"));
var web_react_1 = require("@arco-design/web-react");
var Base_1 = tslib_1.__importDefault(require("./Base"));
var maskableComponent_1 = require("../_factory/maskableComponent");
var CConfigProvider_1 = require("../CConfigProvider");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var ahooks_1 = require("ahooks");
var CStatus_1 = tslib_1.__importDefault(require("../CStatus"));
var hooks_1 = require("../hooks");
var HeaderContainer = react_1.default.forwardRef(function (_a, ref) {
    var onDidMount = _a.onDidMount, className = _a.className;
    (0, react_1.useEffect)(onDidMount, []);
    var prefixCls = (0, react_1.useContext)(web_react_1.ConfigProvider.ConfigContext).prefixCls;
    return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-tabs ").concat(prefixCls, "-tabs-horizontal ").concat(prefixCls, "-tabs-card-gutter ").concat(prefixCls, "-tabs-top ").concat(prefixCls, "-tabs-size-default ").concat(className), ref: ref }));
});
var DrawerDetailComponent = react_1.default.forwardRef(function (props, ref) {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _a.useCssPrefix, _b = _a.cComponentConfig, _c = _b === void 0 ? {} : _b, _d = _c["CDrawer.Detail"], CDrawerDetail = _d === void 0 ? {} : _d;
    var _e = (0, hooks_1.useMergeProps)(props, {}, CDrawerDetail), children = _e.children, tabs = _e.tabs, title = _e.title, cStatusProps = _e.cStatusProps, extraHeader = _e.extraHeader, restProps = tslib_1.__rest(_e, ["children", "tabs", "title", "cStatusProps", "extraHeader"]);
    var _f = tabs !== null && tabs !== void 0 ? tabs : {}, items = _f.items, restTabsProps = tslib_1.__rest(_f, ["items"]);
    var cssPrefix = useCssPrefix('drawer-detail');
    var headerRef = (0, react_1.useRef)(null);
    var forceUpdate = (0, ahooks_1.useUpdate)();
    return (react_1.default.createElement(Base_1.default, tslib_1.__assign({}, restProps, { extraHeader: react_1.default.createElement(react_1.default.Fragment, null,
            extraHeader,
            react_1.default.createElement(HeaderContainer, { ref: headerRef, onDidMount: forceUpdate, className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["custom-tab-header"], ["custom-tab-header"]))) })), className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), restProps.className), title: react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["title"], ["title"]))) },
            react_1.default.createElement("span", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["title-text"], ["title-text"]))) }, title),
            cStatusProps && (react_1.default.createElement(CStatus_1.default, tslib_1.__assign({}, cStatusProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["title-status"], ["title-status"]))), cStatusProps.className) })))), ref: ref }),
        headerRef.current && (react_1.default.createElement(web_react_1.Tabs, tslib_1.__assign({}, restTabsProps, { type: "card-gutter", className: (0, classnames_1.default)(cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["header-tabs"], ["header-tabs"]))), tabs === null || tabs === void 0 ? void 0 : tabs.className), renderTabHeader: function (props, Header) { return react_dom_1.default.createPortal(react_1.default.createElement(Header, tslib_1.__assign({}, props)), headerRef.current); } }), items === null || items === void 0 ? void 0 : items.map(function (tabPanelProps, fallbackKey) {
            var _a;
            return (react_1.default.createElement(web_react_1.Tabs.TabPane, tslib_1.__assign({}, tabPanelProps, { key: (_a = tabPanelProps.key) !== null && _a !== void 0 ? _a : fallbackKey })));
        }))),
        children));
});
var DrawerDetail = (0, maskableComponent_1.createStaticMethods)(DrawerDetailComponent);
exports.default = DrawerDetail;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=DrawerDetail.js.map