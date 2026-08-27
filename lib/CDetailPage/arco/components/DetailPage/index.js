"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDetailPage = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var react_2 = require("@formily/react");
var ahooks_1 = require("ahooks");
var react_3 = require("../../../react");
var CDetail_1 = tslib_1.__importDefault(require("../../../../CDetail"));
var shared_1 = require("../../../shared");
var LoadingError_1 = require("../LoadingError");
var CConfigProvider_1 = require("../../../../CConfigProvider");
var hooks_1 = require("../../../../hooks");
var CDetailHeader = CDetail_1.default.CDetailHeader, CDetailContentWrapper = CDetail_1.default.CDetailContentWrapper;
var CInnerDetailPage = (0, react_2.observer)(function (props) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), getCPrefixCls = _b.getCPrefixCls, locale = _b.locale;
    var cssRoot = getCPrefixCls('detail-page');
    var detailPage = props.detailPage;
    var detailHeaderProps = detailPage.getDetailHeaderProps();
    var classNames = (0, classnames_1.default)(cssRoot, detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.className);
    var activeTab = detailPage.getActiveTab();
    var noticeComponent = activeTab === null || activeTab === void 0 ? void 0 : activeTab.getCurrentTabNoticeComponent();
    var refreshKeyRef = (0, react_1.useRef)(0);
    var isEmptyData = !Object.keys((_a = detailPage.data) !== null && _a !== void 0 ? _a : {}).length;
    var updateUrlTabKey = function () {
        detailPage.setActiveTabKey(detailPage.getAvailableActiveTabKey());
    };
    // 监听浏览器前进后退事件，在切换tab后浏览器url中的tabKey变化时能同步切换Tab内容
    (0, react_1.useEffect)(function () {
        // 浏览器前进后退事件
        window.addEventListener('popstate', updateUrlTabKey);
        return function () {
            // 取消事件监听
            window.removeEventListener('popstate', updateUrlTabKey);
        };
    }, []);
    // 在tabKey发生变化时刷新tab
    (0, ahooks_1.useUpdateEffect)(function () {
        activeTab === null || activeTab === void 0 ? void 0 : activeTab.refresh({
            showLoading: Boolean(activeTab.options.needLoading),
        });
    }, [detailPage.activeTabKey, detailPage, activeTab]);
    // 处理自定义错误回调逻辑
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if ((_a = detailPage.options) === null || _a === void 0 ? void 0 : _a.onError) {
            (_b = detailPage.options) === null || _b === void 0 ? void 0 : _b.onError(detailPage.error);
        }
    }, [detailPage.error]);
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if ((_a = activeTab === null || activeTab === void 0 ? void 0 : activeTab.options) === null || _a === void 0 ? void 0 : _a.onError) {
            (_b = activeTab === null || activeTab === void 0 ? void 0 : activeTab.options) === null || _b === void 0 ? void 0 : _b.onError(activeTab === null || activeTab === void 0 ? void 0 : activeTab.error);
        }
    }, [activeTab === null || activeTab === void 0 ? void 0 : activeTab.error]);
    (0, ahooks_1.useUpdateEffect)(function () {
        var _a, _b;
        // 刷新不卸载，直接返回
        if (((_b = (_a = detailPage.options) === null || _a === void 0 ? void 0 : _a.unmountContentWhenRefresh) === null || _b === void 0 ? void 0 : _b.call(_a, { detailPage: detailPage })) === false) {
            return;
        }
        if (detailPage.loading) {
            refreshKeyRef.current++;
        }
    }, [detailPage.loading]);
    var getTabContent = function () {
        if (activeTab === null || activeTab === void 0 ? void 0 : activeTab.error) {
            var errorConfig = detailPage.getTabErrorConfig() || (activeTab === null || activeTab === void 0 ? void 0 : activeTab.getTabErrorConfig());
            return (react_1.default.createElement(LoadingError_1.LoadingError, tslib_1.__assign({ detailPage: detailPage, activeTab: activeTab, type: 'tab' }, errorConfig, { "data-cy": shared_1.testId.tabLoadError, "data-testid": shared_1.testId.tabLoadError })));
        }
        var activeTabContent = activeTab === null || activeTab === void 0 ? void 0 : activeTab.getCurrentTabComponent();
        // 自定义渲染 tab content
        if (typeof detailPage.renderActiveTabContent === 'function') {
            return detailPage.renderActiveTabContent({
                tabKey: activeTab === null || activeTab === void 0 ? void 0 : activeTab.key,
                content: activeTab === null || activeTab === void 0 ? void 0 : activeTab.getCurrentTabComponent(),
                data: detailPage.data,
                detailPage: detailPage,
            });
        }
        return activeTabContent;
    };
    var getDetailPageContent = function () {
        var _a, _b, _c, _d, _e;
        if (detailPage === null || detailPage === void 0 ? void 0 : detailPage.error) {
            return (react_1.default.createElement(LoadingError_1.LoadingError, tslib_1.__assign({ detailPage: detailPage, type: 'global' }, detailPage.getGlobalErrorConfig(), { "data-cy": shared_1.testId.globalLoadError, "data-testid": shared_1.testId.globalLoadError })));
        }
        return (
        // 通过key控制重新挂载 tab content 子组件（强制重新渲染），key 更新，子组件重新挂载
        // @see https://dev.to/malapashish/mastering-react-re-renders-the-key-prop-hack-you-need-to-know-17hh
        react_1.default.createElement(react_1.default.Fragment, { key: refreshKeyRef.current },
            react_1.default.createElement(CDetailHeader, { className: detailPage.getNeedTabPane()
                    ? (0, classnames_1.default)("".concat(cssRoot, "-header"), detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.className)
                    : (0, classnames_1.default)("".concat(cssRoot, "-header-no-tab-pane"), detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.className), style: detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.style, model: detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.model, "data-cy": shared_1.testId.detailPageHeader, "data-testid": shared_1.testId.detailPageHeader, showBackIcon: detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.showBackIcon, title: detailHeaderProps.title || '-', onBack: function () { var _a; return (_a = detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.onBack) === null || _a === void 0 ? void 0 : _a.call(detailHeaderProps); }, cStatusProps: detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.statusProps, cOperationMenuProps: (0, shared_1.dealOperationMenus)({
                    operationMenuProps: detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.operationMenuProps,
                    needRefresh: Boolean(detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.needRefreshBtn),
                    detailPage: detailPage,
                    refresh: detailPage === null || detailPage === void 0 ? void 0 : detailPage.refresh,
                    refreshText: locale.CDetailPage.refresh,
                }), customStatus: detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.customStatus, customOperationMenu: detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.customOperationMenu, extraHeaderContent: detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.extraHeaderContent, breadcrumbProps: {
                    routes: ((_b = (_a = detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.navProps) === null || _a === void 0 ? void 0 : _a.routes) === null || _b === void 0 ? void 0 : _b.map(function (route) {
                        return {
                            breadcrumbName: (route === null || route === void 0 ? void 0 : route.title) || '',
                            onClick: route === null || route === void 0 ? void 0 : route.onClick,
                        };
                    })) || [],
                    separator: (_c = detailHeaderProps === null || detailHeaderProps === void 0 ? void 0 : detailHeaderProps.navProps) === null || _c === void 0 ? void 0 : _c.separator,
                }, arcoTabsProps: tslib_1.__assign({ activeTab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.activeTabKey, onChange: function (tabKey) {
                        // 设置当前tabKey
                        detailPage.changeActiveTab(tabKey);
                    } }, (0, shared_1.runCallable)((_d = detailPage === null || detailPage === void 0 ? void 0 : detailPage.options) === null || _d === void 0 ? void 0 : _d.arcoTabProps, {
                    data: detailPage.data,
                    detailPage: detailPage,
                })), 
                // 明确传参
                tabs: detailPage.tabs
                    .filter(function (item) { return item === null || item === void 0 ? void 0 : item.getVisible(); })
                    .map(function (item) {
                    var _a, _b, _c, _d, _e, _f;
                    return {
                        // 因为title是getter类型，所以在这里需要显示读取下
                        title: item === null || item === void 0 ? void 0 : item.getTitle(),
                        key: item === null || item === void 0 ? void 0 : item.key,
                        style: (_a = item === null || item === void 0 ? void 0 : item.options) === null || _a === void 0 ? void 0 : _a.style,
                        className: (_b = item === null || item === void 0 ? void 0 : item.options) === null || _b === void 0 ? void 0 : _b.className,
                        destroyOnHide: (_c = item === null || item === void 0 ? void 0 : item.options) === null || _c === void 0 ? void 0 : _c.destroyOnHide,
                        disabled: (_d = item === null || item === void 0 ? void 0 : item.options) === null || _d === void 0 ? void 0 : _d.disabled,
                        lazyload: (_e = item === null || item === void 0 ? void 0 : item.options) === null || _e === void 0 ? void 0 : _e.lazyload,
                        children: ((_f = item === null || item === void 0 ? void 0 : item.options) === null || _f === void 0 ? void 0 : _f.children) || null,
                    };
                }) || [] }),
            react_1.default.createElement(CDetailContentWrapper
            // 有全局loading时不展示tab的loading
            , { 
                // 有全局loading时不展示tab的loading
                loading: Boolean(activeTab === null || activeTab === void 0 ? void 0 : activeTab.loading) && !Boolean(detailPage.loading), className: (_e = detailPage.getDetailPageContentProps()) === null || _e === void 0 ? void 0 : _e.className, "data-cy": shared_1.testId.detailPageContent, "data-testid": shared_1.testId.detailPageContent },
                !(activeTab === null || activeTab === void 0 ? void 0 : activeTab.loading) && !(activeTab === null || activeTab === void 0 ? void 0 : activeTab.error) && noticeComponent && (react_1.default.createElement("div", { className: "".concat(classNames, "-notice"), "data-cy": shared_1.testId.detailPageNotice, "data-testid": shared_1.testId.detailPageNotice }, noticeComponent)),
                !isEmptyData ? getTabContent() : null,
                isEmptyData && detailPage.loading ? react_1.default.createElement("div", { className: "".concat(cssRoot, "-content-loading") }) : null)));
    };
    return (react_1.default.createElement(react_3.DetailPageProvider, { detailPage: detailPage },
        react_1.default.createElement("div", { className: classNames, "data-cy": shared_1.testId.detailPage, "data-testid": shared_1.testId.detailPage },
            react_1.default.createElement(web_react_1.Spin, { className: "".concat(cssRoot, "-loading"), loading: Boolean(detailPage.loading), "data-cy": shared_1.testId.detailPageLoading, "data-testid": shared_1.testId.detailPageLoading }, getDetailPageContent()))));
});
var _CDetailPage = function (props, ref) {
    var _a;
    (0, react_1.useImperativeHandle)(ref, function () { return detailPage; });
    var cComponentConfig = (0, CConfigProvider_1.useCConfigContext)().cComponentConfig;
    var config = (0, hooks_1.useMergeProps)(props.config, 
    // @ts-expect-error 预期内错误
    {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CDetailPage) !== null && _a !== void 0 ? _a : {});
    var detailPage = (0, react_3.useCreateInnerDetailPage)(config);
    return react_1.default.createElement(CInnerDetailPage, { detailPage: detailPage });
};
exports.CDetailPage = (0, react_1.forwardRef)(_CDetailPage);
exports.CDetailPage.defineConfig = shared_1.defineDetailPageConfig;
exports.CDetailPage.displayName = 'CDetailPage';
//# sourceMappingURL=index.js.map