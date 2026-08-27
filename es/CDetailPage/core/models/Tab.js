import { __assign, __awaiter, __generator } from "tslib";
import { define, observable, action } from '@formily/reactive';
import { isFunction } from 'lodash-es';
import { runCallable, getComponent, getNoticeComponent } from '../../shared';
var Tab = /** @class */ (function () {
    function Tab(detailPage, options) {
        /**
         * tab级的loading
         */
        this.loading = false;
        this.makeObservable();
        this.options = __assign(__assign(__assign({}, this.options), { needLoading: true }), options);
        this.detailPage = detailPage;
        this.key = options.key;
    }
    Tab.prototype.makeObservable = function () {
        define(this, {
            key: observable,
            globalScope: observable,
            data: observable,
            detailPage: observable,
            error: observable,
            loading: observable,
            setGlobalScope: action,
            setLoading: action,
            setData: action,
            setError: action,
        });
    };
    /**
     * 当前Tab最后渲染的组件
     */
    Tab.prototype.getCurrentTabComponent = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var tabRunCallableProps = {
            data: (_a = this.detailPage) === null || _a === void 0 ? void 0 : _a.data,
            tab: this,
            detailPage: this.detailPage,
        };
        if ((_b = this.options) === null || _b === void 0 ? void 0 : _b.render) {
            return runCallable((_c = this.options) === null || _c === void 0 ? void 0 : _c.render, tabRunCallableProps);
        }
        if (isFunction((_d = this.options) === null || _d === void 0 ? void 0 : _d.component)) {
            return runCallable((_e = this.options) === null || _e === void 0 ? void 0 : _e.component, tabRunCallableProps);
        }
        var componentProps = runCallable((_f = this.options) === null || _f === void 0 ? void 0 : _f.componentProps, tabRunCallableProps);
        return getComponent((_g = this.options) === null || _g === void 0 ? void 0 : _g.component, componentProps);
    };
    /**
     * 提示内容组件
     */
    Tab.prototype.getCurrentTabNoticeComponent = function () {
        var _a, _b, _c, _d, _e;
        if (isFunction((_a = this.options) === null || _a === void 0 ? void 0 : _a.noticeComponent)) {
            return runCallable(this.options.noticeComponent, {
                data: (_b = this.detailPage) === null || _b === void 0 ? void 0 : _b.data,
                tab: this,
                detailPage: this.detailPage,
            });
        }
        var noticeComponentProps = runCallable((_c = this.options) === null || _c === void 0 ? void 0 : _c.noticeComponentProps, {
            data: (_d = this.detailPage) === null || _d === void 0 ? void 0 : _d.data,
            tab: this,
            detailPage: this.detailPage,
        });
        return getNoticeComponent((_e = this.options) === null || _e === void 0 ? void 0 : _e.noticeComponent, noticeComponentProps);
    };
    /**
     * tab的可见性
     */
    Tab.prototype.getVisible = function () {
        var _a, _b;
        return runCallable((_a = this.options) === null || _a === void 0 ? void 0 : _a.visible, {
            data: (_b = this.detailPage) === null || _b === void 0 ? void 0 : _b.data,
            tab: this,
            detailPage: this.detailPage,
        });
    };
    /**
     * tab标题
     */
    Tab.prototype.getTitle = function () {
        var _a, _b;
        return runCallable((_a = this.options) === null || _a === void 0 ? void 0 : _a.title, {
            data: (_b = this.detailPage) === null || _b === void 0 ? void 0 : _b.data,
            tab: this,
            detailPage: this.detailPage,
        });
    };
    /**
     * tab内容上方提示内容
     */
    Tab.prototype.getNoticeComponent = function () {
        var _a, _b;
        return runCallable((_a = this.options) === null || _a === void 0 ? void 0 : _a.noticeComponent, {
            data: (_b = this.detailPage) === null || _b === void 0 ? void 0 : _b.data,
            tab: this,
            detailPage: this.detailPage,
        });
    };
    /**
     * tab内容上方提示内容组件属性
     */
    Tab.prototype.getNoticeComponentProps = function () {
        var _a, _b;
        return runCallable((_a = this.options) === null || _a === void 0 ? void 0 : _a.noticeComponentProps, {
            data: (_b = this.detailPage) === null || _b === void 0 ? void 0 : _b.data,
            tab: this,
            detailPage: this.detailPage,
        });
    };
    /**
     * 单个Tab错误配置
     */
    Tab.prototype.getTabErrorConfig = function () {
        var _a, _b;
        return runCallable((_a = this.options) === null || _a === void 0 ? void 0 : _a.tabErrorConfig, {
            data: (_b = this.detailPage) === null || _b === void 0 ? void 0 : _b.data,
            tab: this,
            detailPage: this.detailPage,
        });
    };
    /**
     * 执行请求逻辑
     * 只在refresh中调用，错误会在refresh中被捕获
     */
    Tab.prototype.runFetcher = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.fetcher) === null || _b === void 0 ? void 0 : _b.call(_a, {
                            detailPage: this.detailPage,
                            tab: this,
                            data: (_c = this.detailPage) === null || _c === void 0 ? void 0 : _c.data,
                        }))];
                    case 1:
                        res = _d.sent();
                        this.setGlobalScope(res === null || res === void 0 ? void 0 : res.globalScope);
                        this.setData(res === null || res === void 0 ? void 0 : res.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 刷新
     */
    Tab.prototype.refresh = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, showLoading, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (options || {}).showLoading, showLoading = _a === void 0 ? true : _a;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        this.clearError();
                        showLoading && this.setLoading(true);
                        return [4 /*yield*/, this.runFetcher()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        this.setError(error_1);
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
     * 设置loading状态
     */
    Tab.prototype.setLoading = function (loading) {
        this.loading = loading;
    };
    /**
     * 设置globalScope
     * @param globalScope
     */
    Tab.prototype.setGlobalScope = function (globalScope) {
        this.globalScope = globalScope;
    };
    /**
     * 设置Tab的数据
     */
    Tab.prototype.setData = function (data) {
        this.data = data;
    };
    /**
     * 设置tab的错误信息
     * @param error
     */
    Tab.prototype.setError = function (error) {
        this.error = error;
    };
    Tab.prototype.clearError = function () {
        this.error = null;
    };
    return Tab;
}());
export { Tab };
//# sourceMappingURL=Tab.js.map