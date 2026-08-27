import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, ConfigProvider } from '@arco-design/web-react';
import BaseCDrawer from './Base';
import { createStaticMethods } from '../_factory/maskableComponent';
import { useCConfigContext } from '../CConfigProvider';
import classNames from 'classnames';
import { useUpdate } from 'ahooks';
import CStatus from '../CStatus';
import { useMergeProps } from '../hooks';
var HeaderContainer = React.forwardRef(function (_a, ref) {
    var onDidMount = _a.onDidMount, className = _a.className;
    useEffect(onDidMount, []);
    var prefixCls = useContext(ConfigProvider.ConfigContext).prefixCls;
    return (React.createElement("div", { className: "".concat(prefixCls, "-tabs ").concat(prefixCls, "-tabs-horizontal ").concat(prefixCls, "-tabs-card-gutter ").concat(prefixCls, "-tabs-top ").concat(prefixCls, "-tabs-size-default ").concat(className), ref: ref }));
});
var DrawerDetailComponent = React.forwardRef(function (props, ref) {
    var _a = useCConfigContext(), useCssPrefix = _a.useCssPrefix, _b = _a.cComponentConfig, _c = _b === void 0 ? {} : _b, _d = _c["CDrawer.Detail"], CDrawerDetail = _d === void 0 ? {} : _d;
    var _e = useMergeProps(props, {}, CDrawerDetail), children = _e.children, tabs = _e.tabs, title = _e.title, cStatusProps = _e.cStatusProps, extraHeader = _e.extraHeader, restProps = __rest(_e, ["children", "tabs", "title", "cStatusProps", "extraHeader"]);
    var _f = tabs !== null && tabs !== void 0 ? tabs : {}, items = _f.items, restTabsProps = __rest(_f, ["items"]);
    var cssPrefix = useCssPrefix('drawer-detail');
    var headerRef = useRef(null);
    var forceUpdate = useUpdate();
    return (React.createElement(BaseCDrawer, __assign({}, restProps, { extraHeader: React.createElement(React.Fragment, null,
            extraHeader,
            React.createElement(HeaderContainer, { ref: headerRef, onDidMount: forceUpdate, className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["custom-tab-header"], ["custom-tab-header"]))) })), className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), restProps.className), title: React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["title"], ["title"]))) },
            React.createElement("span", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["title-text"], ["title-text"]))) }, title),
            cStatusProps && (React.createElement(CStatus, __assign({}, cStatusProps, { className: classNames(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["title-status"], ["title-status"]))), cStatusProps.className) })))), ref: ref }),
        headerRef.current && (React.createElement(Tabs, __assign({}, restTabsProps, { type: "card-gutter", className: classNames(cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["header-tabs"], ["header-tabs"]))), tabs === null || tabs === void 0 ? void 0 : tabs.className), renderTabHeader: function (props, Header) { return ReactDOM.createPortal(React.createElement(Header, __assign({}, props)), headerRef.current); } }), items === null || items === void 0 ? void 0 : items.map(function (tabPanelProps, fallbackKey) {
            var _a;
            return (React.createElement(Tabs.TabPane, __assign({}, tabPanelProps, { key: (_a = tabPanelProps.key) !== null && _a !== void 0 ? _a : fallbackKey })));
        }))),
        children));
});
var DrawerDetail = createStaticMethods(DrawerDetailComponent);
export default DrawerDetail;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=DrawerDetail.js.map