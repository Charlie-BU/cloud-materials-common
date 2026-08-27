"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var classNamePrefixFactory_1 = require("../_utils/classNamePrefixFactory");
var useMergeProps_1 = require("../hooks/useMergeProps");
var web_react_1 = require("@arco-design/web-react");
var TabPane = web_react_1.Tabs.TabPane;
var COperationMenu_1 = tslib_1.__importDefault(require("../COperationMenu"));
var CStatus_1 = tslib_1.__importDefault(require("../CStatus"));
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var CInfoSection_1 = tslib_1.__importDefault(require("../CInfoSection"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var CConfigProvider_1 = require("../CConfigProvider");
var cssRoot = "".concat(classNamePrefixFactory_1.GLOBAL_PREFIX, "-detail-header");
exports.testId = {
    container: "".concat(cssRoot, "-container"),
    breadcrumb: "".concat(cssRoot, "-breadcrumb"),
    back: "".concat(cssRoot, "-back"),
    close: "".concat(cssRoot, "-close"),
    title: "".concat(cssRoot, "-title"),
    status: "".concat(cssRoot, "-status"),
    tabs: "".concat(cssRoot, "-tabs"),
    operateArea: "".concat(cssRoot, "-operate-area"),
};
var defaultSeparator = react_1.default.createElement(iconbox_react_ve_o_design_1.IconRight, null);
var defaultStatusProps = {
    type: 'highlight',
};
var defaultArcoTabProps = {
    type: 'card-gutter',
};
var defaultProps = {
    model: 'page-header',
    showBackIcon: true,
};
function CDetailHeader(props, ref) {
    var _a, _b;
    var _c = (0, useMergeProps_1.useMergeProps)(props, defaultProps, {}), style = _c.style, className = _c.className, model = _c.model, breadcrumbProps = _c.breadcrumbProps, onBack = _c.onBack, title = _c.title, cStatusProps = _c.cStatusProps, customStatus = _c.customStatus, cOperationMenuProps = _c.cOperationMenuProps, customOperationMenu = _c.customOperationMenu, tabs = _c.tabs, arcoTabsProps = _c.arcoTabsProps, extraHeaderContent = _c.extraHeaderContent, cInfoSectionProps = _c.cInfoSectionProps, arcoAffixProps = _c.arcoAffixProps, showBackIcon = _c.showBackIcon, cEllipsisProps = _c.cEllipsisProps;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('detail-header');
    var _d = tslib_1.__read((0, react_1.useState)(null), 2), affixTarget = _d[0], setAffixTarget = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(0), 2), tabAffixHeight = _e[0], setTabAffixHeight = _e[1];
    var headerRef = (0, react_1.useRef)(null);
    var mergedAffixProps = (0, useMergeProps_1.useMergeProps)(arcoAffixProps || {}, { target: function () { return affixTarget; }, className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["affix"], ["affix"]))) }, {});
    var Separator = (react_1.default.createElement("span", { "aria-hidden": true, className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["breadcrumb-separator"], ["breadcrumb-separator"]))) }, (breadcrumbProps === null || breadcrumbProps === void 0 ? void 0 : breadcrumbProps.separator) || defaultSeparator));
    var getBreadcrumbItem = function (itemToRender, index) {
        var SeparatorWithKey = react_1.default.cloneElement(Separator, { key: "".concat(index, "_separator") });
        return index === 0 ? [itemToRender] : [SeparatorWithKey, itemToRender];
    };
    var defaultItemRender = function (route, routes) {
        var index = routes.indexOf(route);
        if (index === routes.length - 1) {
            return (react_1.default.createElement(CEllipsis_1.default, { maxWidth: "200px", className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["breadcrumb-item"], ["breadcrumb-item"]))), key: index, children: route.breadcrumbName || '' }));
        }
        return (react_1.default.createElement(CEllipsis_1.default, { maxWidth: "200px", className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["breadcrumb-item"], ["breadcrumb-item"]))), key: index, onClick: route.onClick, children: route.breadcrumbName || '' }));
    };
    var renderBreadcrumb = function () {
        var _a;
        if (breadcrumbProps && ((_a = breadcrumbProps === null || breadcrumbProps === void 0 ? void 0 : breadcrumbProps.routes) === null || _a === void 0 ? void 0 : _a.length) >= 2) {
            var routes_1 = breadcrumbProps.routes;
            return (react_1.default.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["breadcrumb"], ["breadcrumb"]))), "data-testid": exports.testId.breadcrumb }, routes_1.map(function (route, index) { return getBreadcrumbItem(defaultItemRender(route, routes_1), index); })));
        }
    };
    var renderBackNode = function () {
        return model === 'page-header' &&
            showBackIcon && (react_1.default.createElement("span", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["back"], ["back"]))), "data-testid": exports.testId.back, onClick: onBack },
            react_1.default.createElement(iconbox_react_ve_o_design_1.IconLeft, null)));
    };
    var renderStatusNode = function () {
        if (customStatus) {
            return (react_1.default.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["status"], ["status"]))), "data-testid": exports.testId.status }, customStatus));
        }
        else {
            return (cStatusProps && (react_1.default.createElement("span", { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["status"], ["status"]))), "data-testid": exports.testId.status },
                react_1.default.createElement(CStatus_1.default, tslib_1.__assign({}, defaultStatusProps, cStatusProps)))));
        }
    };
    var renderOperationMenuNode = function () {
        if (customOperationMenu) {
            return customOperationMenu;
        }
        else {
            return cOperationMenuProps && react_1.default.createElement(COperationMenu_1.default, tslib_1.__assign({}, cOperationMenuProps));
        }
    };
    var renderCloseNode = function () {
        return model === 'drawer-header' && (react_1.default.createElement("span", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["close"], ["close"]))), "data-testid": exports.testId.close, onClick: onBack },
            react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null)));
    };
    var renderTabs = function () {
        var tabsFilter = tabs === null || tabs === void 0 ? void 0 : tabs.filter(function (item) { return !item.hidden; });
        var tabContent = (react_1.default.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["tabs"], ["tabs"]))), "data-testid": exports.testId.tabs },
            react_1.default.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["tabs-wrapper"], ["tabs-wrapper"]))) },
                react_1.default.createElement(web_react_1.Tabs, tslib_1.__assign({}, defaultArcoTabProps, arcoTabsProps), tabsFilter === null || tabsFilter === void 0 ? void 0 : tabsFilter.map(function (_a) {
                    var key = _a.key, rest = tslib_1.__rest(_a, ["key"]);
                    return (react_1.default.createElement(TabPane, tslib_1.__assign({ key: key }, rest)));
                })))));
        return (!!(tabsFilter === null || tabsFilter === void 0 ? void 0 : tabsFilter.length) &&
            (affixTarget ? (react_1.default.createElement(web_react_1.Affix, tslib_1.__assign({ offsetTop: tabAffixHeight }, mergedAffixProps), tabContent)) : (tabContent)));
    };
    var renderInfo = function () {
        return (!!cInfoSectionProps && (react_1.default.createElement("div", { className: cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["information"], ["information"]))) },
            react_1.default.createElement(CInfoSection_1.default.List, tslib_1.__assign({}, cInfoSectionProps)))));
    };
    var renderHeaderMain = function () {
        var _a;
        var _b = cEllipsisProps !== null && cEllipsisProps !== void 0 ? cEllipsisProps : {}, maxWidth = _b.maxWidth, cEllipsisClassName = _b.className, otherCEllipsisProps = tslib_1.__rest(_b, ["maxWidth", "className"]);
        var headerMainContent = (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["main"], ["main"]))), (_a = {},
                _a[cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["main-with-shadow"], ["main-with-shadow"])))] = !tabs && !cInfoSectionProps,
                _a)), ref: headerRef },
            react_1.default.createElement("div", { className: cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["main-content"], ["main-content"]))) },
                react_1.default.createElement("div", null,
                    renderBreadcrumb(),
                    react_1.default.createElement("div", { className: cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["title-area"], ["title-area"]))) },
                        renderBackNode(),
                        react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({}, otherCEllipsisProps, { maxWidth: maxWidth !== null && maxWidth !== void 0 ? maxWidth : '400px', className: (0, classnames_1.default)(cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["title"], ["title"]))), cEllipsisClassName) }),
                            react_1.default.createElement(react_1.default.Fragment, null, title)),
                        renderStatusNode())),
                react_1.default.createElement("div", { className: cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["operate-area"], ["operate-area"]))), "data-testid": exports.testId.operateArea },
                    renderOperationMenuNode(),
                    renderCloseNode())),
            react_1.default.createElement("div", { className: cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["main-extra"], ["main-extra"]))) }, extraHeaderContent)));
        return affixTarget ? (react_1.default.createElement(web_react_1.Affix, tslib_1.__assign({ offsetTop: 1 }, mergedAffixProps), headerMainContent)) : (headerMainContent);
    };
    (0, react_1.useLayoutEffect)(function () {
        var _a, _b, _c;
        var parentNode = (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (parentNode) {
            setTabAffixHeight((_c = (_b = headerRef === null || headerRef === void 0 ? void 0 : headerRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) !== null && _c !== void 0 ? _c : 0);
            setAffixTarget(parentNode);
        }
    }, [ref, (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.parentElement, (_b = headerRef === null || headerRef === void 0 ? void 0 : headerRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight]);
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject([""], [""]))), className), "data-testid": exports.testId.container, ref: ref },
        renderHeaderMain(),
        renderInfo(),
        renderTabs()));
}
var CDetailHeaderComponent = (0, react_1.forwardRef)(CDetailHeader);
CDetailHeaderComponent.displayName = 'CDetailHeader';
exports.default = CDetailHeaderComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20;
//# sourceMappingURL=CDetailHeader.js.map