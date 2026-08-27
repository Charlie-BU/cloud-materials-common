import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { forwardRef, useLayoutEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
import { useMergeProps } from '../hooks/useMergeProps';
import { Tabs, Affix } from '@arco-design/web-react';
var TabPane = Tabs.TabPane;
import COperationMenu from '../COperationMenu';
import CStatus from '../CStatus';
import CEllipsis from '../CEllipsis';
import CInfoSection from '../CInfoSection';
import { IconLeft, IconClose, IconRight } from '@arco-design/iconbox-react-ve-o-design';
import { useCConfigContext } from '../CConfigProvider';
var cssRoot = "".concat(GLOBAL_PREFIX, "-detail-header");
export var testId = {
    container: "".concat(cssRoot, "-container"),
    breadcrumb: "".concat(cssRoot, "-breadcrumb"),
    back: "".concat(cssRoot, "-back"),
    close: "".concat(cssRoot, "-close"),
    title: "".concat(cssRoot, "-title"),
    status: "".concat(cssRoot, "-status"),
    tabs: "".concat(cssRoot, "-tabs"),
    operateArea: "".concat(cssRoot, "-operate-area"),
};
var defaultSeparator = React.createElement(IconRight, null);
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
    var _c = useMergeProps(props, defaultProps, {}), style = _c.style, className = _c.className, model = _c.model, breadcrumbProps = _c.breadcrumbProps, onBack = _c.onBack, title = _c.title, cStatusProps = _c.cStatusProps, customStatus = _c.customStatus, cOperationMenuProps = _c.cOperationMenuProps, customOperationMenu = _c.customOperationMenu, tabs = _c.tabs, arcoTabsProps = _c.arcoTabsProps, extraHeaderContent = _c.extraHeaderContent, cInfoSectionProps = _c.cInfoSectionProps, arcoAffixProps = _c.arcoAffixProps, showBackIcon = _c.showBackIcon, cEllipsisProps = _c.cEllipsisProps;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('detail-header');
    var _d = __read(useState(null), 2), affixTarget = _d[0], setAffixTarget = _d[1];
    var _e = __read(useState(0), 2), tabAffixHeight = _e[0], setTabAffixHeight = _e[1];
    var headerRef = useRef(null);
    var mergedAffixProps = useMergeProps(arcoAffixProps || {}, { target: function () { return affixTarget; }, className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["affix"], ["affix"]))) }, {});
    var Separator = (React.createElement("span", { "aria-hidden": true, className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["breadcrumb-separator"], ["breadcrumb-separator"]))) }, (breadcrumbProps === null || breadcrumbProps === void 0 ? void 0 : breadcrumbProps.separator) || defaultSeparator));
    var getBreadcrumbItem = function (itemToRender, index) {
        var SeparatorWithKey = React.cloneElement(Separator, { key: "".concat(index, "_separator") });
        return index === 0 ? [itemToRender] : [SeparatorWithKey, itemToRender];
    };
    var defaultItemRender = function (route, routes) {
        var index = routes.indexOf(route);
        if (index === routes.length - 1) {
            return (React.createElement(CEllipsis, { maxWidth: "200px", className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["breadcrumb-item"], ["breadcrumb-item"]))), key: index, children: route.breadcrumbName || '' }));
        }
        return (React.createElement(CEllipsis, { maxWidth: "200px", className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["breadcrumb-item"], ["breadcrumb-item"]))), key: index, onClick: route.onClick, children: route.breadcrumbName || '' }));
    };
    var renderBreadcrumb = function () {
        var _a;
        if (breadcrumbProps && ((_a = breadcrumbProps === null || breadcrumbProps === void 0 ? void 0 : breadcrumbProps.routes) === null || _a === void 0 ? void 0 : _a.length) >= 2) {
            var routes_1 = breadcrumbProps.routes;
            return (React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["breadcrumb"], ["breadcrumb"]))), "data-testid": testId.breadcrumb }, routes_1.map(function (route, index) { return getBreadcrumbItem(defaultItemRender(route, routes_1), index); })));
        }
    };
    var renderBackNode = function () {
        return model === 'page-header' &&
            showBackIcon && (React.createElement("span", { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["back"], ["back"]))), "data-testid": testId.back, onClick: onBack },
            React.createElement(IconLeft, null)));
    };
    var renderStatusNode = function () {
        if (customStatus) {
            return (React.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["status"], ["status"]))), "data-testid": testId.status }, customStatus));
        }
        else {
            return (cStatusProps && (React.createElement("span", { className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["status"], ["status"]))), "data-testid": testId.status },
                React.createElement(CStatus, __assign({}, defaultStatusProps, cStatusProps)))));
        }
    };
    var renderOperationMenuNode = function () {
        if (customOperationMenu) {
            return customOperationMenu;
        }
        else {
            return cOperationMenuProps && React.createElement(COperationMenu, __assign({}, cOperationMenuProps));
        }
    };
    var renderCloseNode = function () {
        return model === 'drawer-header' && (React.createElement("span", { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["close"], ["close"]))), "data-testid": testId.close, onClick: onBack },
            React.createElement(IconClose, null)));
    };
    var renderTabs = function () {
        var tabsFilter = tabs === null || tabs === void 0 ? void 0 : tabs.filter(function (item) { return !item.hidden; });
        var tabContent = (React.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["tabs"], ["tabs"]))), "data-testid": testId.tabs },
            React.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["tabs-wrapper"], ["tabs-wrapper"]))) },
                React.createElement(Tabs, __assign({}, defaultArcoTabProps, arcoTabsProps), tabsFilter === null || tabsFilter === void 0 ? void 0 : tabsFilter.map(function (_a) {
                    var key = _a.key, rest = __rest(_a, ["key"]);
                    return (React.createElement(TabPane, __assign({ key: key }, rest)));
                })))));
        return (!!(tabsFilter === null || tabsFilter === void 0 ? void 0 : tabsFilter.length) &&
            (affixTarget ? (React.createElement(Affix, __assign({ offsetTop: tabAffixHeight }, mergedAffixProps), tabContent)) : (tabContent)));
    };
    var renderInfo = function () {
        return (!!cInfoSectionProps && (React.createElement("div", { className: cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["information"], ["information"]))) },
            React.createElement(CInfoSection.List, __assign({}, cInfoSectionProps)))));
    };
    var renderHeaderMain = function () {
        var _a;
        var _b = cEllipsisProps !== null && cEllipsisProps !== void 0 ? cEllipsisProps : {}, maxWidth = _b.maxWidth, cEllipsisClassName = _b.className, otherCEllipsisProps = __rest(_b, ["maxWidth", "className"]);
        var headerMainContent = (React.createElement("div", { className: classNames(cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["main"], ["main"]))), (_a = {},
                _a[cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["main-with-shadow"], ["main-with-shadow"])))] = !tabs && !cInfoSectionProps,
                _a)), ref: headerRef },
            React.createElement("div", { className: cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["main-content"], ["main-content"]))) },
                React.createElement("div", null,
                    renderBreadcrumb(),
                    React.createElement("div", { className: cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["title-area"], ["title-area"]))) },
                        renderBackNode(),
                        React.createElement(CEllipsis, __assign({}, otherCEllipsisProps, { maxWidth: maxWidth !== null && maxWidth !== void 0 ? maxWidth : '400px', className: classNames(cssPrefix(templateObject_17 || (templateObject_17 = __makeTemplateObject(["title"], ["title"]))), cEllipsisClassName) }),
                            React.createElement(React.Fragment, null, title)),
                        renderStatusNode())),
                React.createElement("div", { className: cssPrefix(templateObject_18 || (templateObject_18 = __makeTemplateObject(["operate-area"], ["operate-area"]))), "data-testid": testId.operateArea },
                    renderOperationMenuNode(),
                    renderCloseNode())),
            React.createElement("div", { className: cssPrefix(templateObject_19 || (templateObject_19 = __makeTemplateObject(["main-extra"], ["main-extra"]))) }, extraHeaderContent)));
        return affixTarget ? (React.createElement(Affix, __assign({ offsetTop: 1 }, mergedAffixProps), headerMainContent)) : (headerMainContent);
    };
    useLayoutEffect(function () {
        var _a, _b, _c;
        var parentNode = (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (parentNode) {
            setTabAffixHeight((_c = (_b = headerRef === null || headerRef === void 0 ? void 0 : headerRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) !== null && _c !== void 0 ? _c : 0);
            setAffixTarget(parentNode);
        }
    }, [ref, (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.parentElement, (_b = headerRef === null || headerRef === void 0 ? void 0 : headerRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight]);
    return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_20 || (templateObject_20 = __makeTemplateObject([""], [""]))), className), "data-testid": testId.container, ref: ref },
        renderHeaderMain(),
        renderInfo(),
        renderTabs()));
}
var CDetailHeaderComponent = forwardRef(CDetailHeader);
CDetailHeaderComponent.displayName = 'CDetailHeader';
export default CDetailHeaderComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20;
//# sourceMappingURL=CDetailHeader.js.map