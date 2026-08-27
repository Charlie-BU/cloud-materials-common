"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailPage = void 0;
var tslib_1 = require("tslib");
var reactive_1 = require("@formily/reactive");
var lodash_es_1 = require("lodash-es");
var Tab_1 = require("./Tab");
var shared_1 = require("../../shared");
var DetailPage = /** @class */ (function () {
    function DetailPage(detailPageConfig) {
        var _this = this;
        var _a;
        /**
         * loading状态
         */
        this.loading = false;
        /**
         * DetailPage对象的全局数据
         */
        this.globalScope = {};
        /**
         * 详情页的数据
         */
        this.data = {};
        /**
         *  tabs配置数组
         */
        this.tabs = [];
        /**
         * 切换Tab
         * @param tabKey
         */
        this.changeActiveTab = function (tabKey, replaceHistory) {
            var _a;
            if (replaceHistory === void 0) { replaceHistory = false; }
            _this.setActiveTabKey(tabKey);
            (0, shared_1.changeUrlTabKey)({
                tabKey: tabKey,
                tabKeyName: (_a = _this.options) === null || _a === void 0 ? void 0 : _a.urlTabKeyName,
                replaceHistory: replaceHistory,
            });
        };
        this.makeObservable();
        this.options = tslib_1.__assign(tslib_1.__assign({}, (0, shared_1.getInitDetailPageOptions)()), detailPageConfig);
        this.originFetcher = this.options.fetcher;
        this.renderActiveTabContent = this.options.renderActiveTabContent;
        // new 的时候自动初始化
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.autoInit) {
            this.init();
        }
    }
    /**
     * 获取合法的activeTabKey，urlTabKey > visibleTabs[0].key
     * @description 如果不合法，则返回 第一个可见tab的key
     */
    DetailPage.prototype.getAvailableActiveTabKey = function () {
        var _a;
        var visibleTabs = this.getVisibleTabs();
        var urlTabKey = (0, shared_1.getUrlTabKey)(this.options.urlTabKeyName);
        var tabKey = visibleTabs.some(function (item) { return item.key === urlTabKey; }) ? urlTabKey : (_a = visibleTabs === null || visibleTabs === void 0 ? void 0 : visibleTabs[0]) === null || _a === void 0 ? void 0 : _a.key;
        // runCallable(this?.options?.arcoTabProps, {
        //   data: this.data,
        //   detailPage: this,
        // })?.defaultActiveTab ||
        return tabKey;
    };
    /**
     * 响应式转化
     */
    DetailPage.prototype.makeObservable = function () {
        (0, reactive_1.define)(this, {
            loading: reactive_1.observable,
            globalScope: reactive_1.observable,
            data: reactive_1.observable,
            activeTabKey: reactive_1.observable,
            tabs: reactive_1.observable,
            setLoading: reactive_1.action,
            refresh: reactive_1.action,
            setGlobalScope: reactive_1.action,
            setActiveTabKey: reactive_1.action,
            setData: reactive_1.action,
            changeActiveTab: reactive_1.action,
            init: reactive_1.action,
        });
    };
    /**
     * 获取当前活跃的tab对象
     */
    DetailPage.prototype.getActiveTab = function () {
        return this.getTabByKey(this.activeTabKey);
    };
    /**
     * 详情页顶部配置
     * @returns
     */
    DetailPage.prototype.getDetailHeaderProps = function () {
        return tslib_1.__assign({ needRefreshBtn: true, title: '' }, (0, shared_1.runCallable)(this.options.cDetailPageHeaderProps, {
            data: this.data,
            detailPage: this,
        }));
    };
    DetailPage.prototype.getDetailPageContentProps = function () {
        var _a;
        return (0, shared_1.runCallable)((_a = this.options) === null || _a === void 0 ? void 0 : _a.cDetailPageContentProps, {
            data: this.data,
            detailPage: this,
        });
    };
    /**
     * 全局错误配置项
     */
    DetailPage.prototype.getGlobalErrorConfig = function () {
        var _a;
        return (0, shared_1.runCallable)((_a = this.options) === null || _a === void 0 ? void 0 : _a.globalErrorConfig, {
            data: this.data,
            detailPage: this,
        });
    };
    /**
     * 全局Tab错误配置项
     */
    DetailPage.prototype.getTabErrorConfig = function () {
        var _a;
        return (0, shared_1.runCallable)((_a = this.options) === null || _a === void 0 ? void 0 : _a.tabErrorConfig, {
            data: this.data,
            detailPage: this,
        });
    };
    DetailPage.prototype.getNeedTabPane = function () {
        var _a;
        return (0, shared_1.runCallable)((_a = this.options) === null || _a === void 0 ? void 0 : _a.needTabPane, {
            data: this.data,
            detailPage: this,
        });
    };
    DetailPage.prototype.getNeedLoading = function () {
        var _a;
        return (0, shared_1.runCallable)((_a = this.options) === null || _a === void 0 ? void 0 : _a.needLoading, {
            data: this.data,
            detailPage: this,
        });
    };
    /**
     * 根据tab的key值获取Tab对象
     * @param tabKey
     * @returns
     */
    DetailPage.prototype.getTabByKey = function (tabKey) {
        return (this.tabs || []).find(function (tab) { return (tab === null || tab === void 0 ? void 0 : tab.key) === tabKey; });
    };
    /**
     * 计算当前visible为true的tab列表
     */
    DetailPage.prototype.getVisibleTabs = function () {
        return this.tabs.filter(function (tab) { return tab.getVisible(); });
    };
    DetailPage.prototype.resetDetailPage = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, showLoading, resetActiveTab, isFirstRender;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = options || {}, showLoading = _a.showLoading, resetActiveTab = _a.resetActiveTab, isFirstRender = _a.isFirstRender;
                        this.initTabsFromOptions({ resetActiveTab: resetActiveTab, initPlaceholder: true, isFirstRender: isFirstRender });
                        return [4 /*yield*/, this.innerRefresh({
                                showLoading: showLoading,
                                useOriginFetcher: true,
                            })];
                    case 1:
                        _b.sent();
                        this.initTabsFromOptions({ resetActiveTab: resetActiveTab, isFirstRender: isFirstRender });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 清空tabs
     */
    DetailPage.prototype.clearTabs = function () {
        this.tabs = [];
    };
    DetailPage.prototype.clearError = function () {
        this.error = null;
    };
    /**
     * 从detailPage的配置参数中初始化tabs对象数组
     */
    DetailPage.prototype.initTabsFromOptions = function (options) {
        var _this = this;
        var _a, _b, _c;
        var resetActiveTab = options.resetActiveTab, _d = options.initPlaceholder, initPlaceholder = _d === void 0 ? false : _d, _e = options.isFirstRender, isFirstRender = _e === void 0 ? false : _e;
        // 首先清空tabs数组
        this.clearTabs();
        var optionTabs = (0, shared_1.runCallable)((_a = this.options) === null || _a === void 0 ? void 0 : _a.tabs, {
            data: this.data,
            detailPage: this,
        });
        optionTabs === null || optionTabs === void 0 ? void 0 : optionTabs.map(function (tabItem) {
            var tab = (0, shared_1.runCallable)(tabItem, {
                data: _this.data,
                tab: '',
                detailPage: _this,
            });
            tab = tslib_1.__assign({ visible: true }, tab);
            _this.tabs.push(new Tab_1.Tab(_this, tab));
        });
        if (!initPlaceholder) {
            // 这里需要将visible为true的tab过滤出来，然后再根据所有当前可见的tab列表来给urlTabKey赋初始值，
            // 否则会出现visible为false时的tab会被展示出来
            var visibleTabs = this.getVisibleTabs();
            var urlTabKey = this.getAvailableActiveTabKey();
            var finalTabKey = resetActiveTab ? (_b = visibleTabs === null || visibleTabs === void 0 ? void 0 : visibleTabs[0]) === null || _b === void 0 ? void 0 : _b.key : urlTabKey || ((_c = visibleTabs === null || visibleTabs === void 0 ? void 0 : visibleTabs[0]) === null || _c === void 0 ? void 0 : _c.key);
            var replaceHistory = isFirstRender !== null && isFirstRender !== void 0 ? isFirstRender : (urlTabKey ? false : true);
            this.changeActiveTab(finalTabKey, replaceHistory);
        }
        else {
            this.activeTabKey = this.getAvailableActiveTabKey();
        }
    };
    /**
     * 设置loading状态
     * @param loading
     */
    DetailPage.prototype.setLoading = function (loading) {
        this.loading = loading;
    };
    /**
     * 执行请求
     */
    DetailPage.prototype.runFetcher = function (useOriginFetcher) {
        var _a;
        if (useOriginFetcher === void 0) { useOriginFetcher = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (useOriginFetcher ? this.originFetcher() : this.options.fetcher())];
                    case 1:
                        res = _b.sent();
                        if (((_a = this.options.extraConfig) === null || _a === void 0 ? void 0 : _a.clearGlobalScopeInFetcher) === false) {
                            this.globalScope = tslib_1.__assign(tslib_1.__assign({}, this.globalScope), res === null || res === void 0 ? void 0 : res.globalScope);
                        }
                        else {
                            // 每次重新请求详情数据globalScope会被重置
                            // detailPage globalScope的来源： 详情接口返回设置
                            this.globalScope = (res === null || res === void 0 ? void 0 : res.globalScope) || {};
                        }
                        this.data = (res === null || res === void 0 ? void 0 : res.data) || {};
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailPage.prototype.innerRefresh = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, showLoading, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (options || {}).showLoading, showLoading = _a === void 0 ? true : _a;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        this.clearError();
                        showLoading && this.setLoading(true);
                        return [4 /*yield*/, this.runFetcher(options === null || options === void 0 ? void 0 : options.useOriginFetcher)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        this.error = error_1 || new Error('详情页请求失败');
                        return [3 /*break*/, 5];
                    case 4:
                        showLoading && this.setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 重新请求数据
     * showLoading: 是否展示loading
     * resetActiveTab: 是否重置当前选中的tab
     * reset: 是否重新加载页面
     */
    DetailPage.prototype.refresh = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._refresh(options)];
            });
        });
    };
    /**
     * 重新请求数据
     * showLoading: 是否展示loading
     * resetActiveTab: 是否重置当前选中的tab
     * reset: 是否重新加载页面
     * isFirstRender: 是否是首次进入页面请求
     */
    DetailPage.prototype._refresh = function (options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _c, showLoading, reset, _d, resetActiveTab, isFirstRender;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _c = options || {}, showLoading = _c.showLoading, reset = _c.reset, _d = _c.resetActiveTab, resetActiveTab = _d === void 0 ? false : _d, isFirstRender = _c.isFirstRender;
                        if (!reset) return [3 /*break*/, 1];
                        this.resetDetailPage({
                            showLoading: showLoading,
                            resetActiveTab: resetActiveTab,
                            isFirstRender: isFirstRender,
                        });
                        return [3 /*break*/, 4];
                    case 1:
                        resetActiveTab && this.changeActiveTab((_a = this.getVisibleTabs()) === null || _a === void 0 ? void 0 : _a[0].key);
                        return [4 /*yield*/, this.innerRefresh({
                                showLoading: showLoading,
                            })];
                    case 2:
                        _e.sent();
                        // 刷新当前Tab下的数据
                        return [4 /*yield*/, ((_b = this.getActiveTab()) === null || _b === void 0 ? void 0 : _b.refresh())];
                    case 3:
                        // 刷新当前Tab下的数据
                        _e.sent();
                        _e.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param options
     * 该方法只用做页面第一次初始化时使用
     * 因为从其它页面跳到详情页会调用一次history.push方法，而组件中在初始化的时候也会再调用一次，这样就会导致如果
     *  第一次进入页面后再点击浏览器回退按钮，需要点击两次才可回退到之前的页面
     */
    DetailPage.prototype.init = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                this._refresh(tslib_1.__assign({ reset: true, isFirstRender: true, resetActiveTab: (_a = this.options) === null || _a === void 0 ? void 0 : _a.resetActiveTab }, (options !== null && options !== void 0 ? options : {})));
                return [2 /*return*/];
            });
        });
    };
    /**
     * 设置全局对象的值
     */
    DetailPage.prototype.setGlobalScope = function (globalScope) {
        this.globalScope = (0, lodash_es_1.merge)(this.globalScope, globalScope);
    };
    /**
     * 设置当前活跃tabkey
     * @param activeTab
     */
    DetailPage.prototype.setActiveTabKey = function (activeTabKey) {
        this.activeTabKey = activeTabKey;
    };
    /**
     * 设置详情页data：通过该方法设置直接覆盖
     * @param data
     */
    DetailPage.prototype.setData = function (data) {
        this.data = data;
    };
    return DetailPage;
}());
exports.DetailPage = DetailPage;
//# sourceMappingURL=DetailPage.js.map