"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoUpdateTableWidth = exports.useLoadMore = void 0;
var react_1 = require("react");
var lodash_es_1 = require("lodash-es");
var types_1 = require("../types");
var components_1 = require("../components");
var useLoadMore = function (table, ref) {
    var doLoadMore = (0, react_1.useRef)();
    if (!doLoadMore.current) {
        doLoadMore.current = (0, lodash_es_1.throttle)(function (e) {
            var tableContainer = e.target;
            if (!tableContainer) {
                return;
            }
            // 非加载状态、非错误状态才能触发 loadMore
            var shouldLoad = !table.loading && !table.status.loadMoreLoading && !table.status.error && !table.status.noMore;
            // 触发 loadMore 的滚动高度：总滚动高度 - 容器高度 - LoadMore 组件高度
            var maxScrollHeight = tableContainer.scrollHeight - tableContainer.offsetHeight - components_1.LoadMoreCompHeight;
            var reachBottom = tableContainer.scrollTop >= maxScrollHeight;
            if (shouldLoad && reachBottom) {
                table.loadMoreData();
            }
        }, 200);
    }
    (0, react_1.useEffect)(function () {
        var _a;
        // 如果是点击加载更多，不监听滚动事件
        if (table.isLoadMoreMode() && ((_a = table.config.extraConfig) === null || _a === void 0 ? void 0 : _a.loadMoreType) !== types_1.LoadMoreType.clickLoadMore) {
            ref.current && ref.current.addEventListener('scroll', doLoadMore.current);
            return function () {
                ref.current && ref.current.removeEventListener('scroll', doLoadMore.current);
            };
        }
    }, []);
};
exports.useLoadMore = useLoadMore;
var useAutoUpdateTableWidth = function (table, ref) {
    (0, react_1.useEffect)(function () {
        // 如果用户没有主动设置 table 的宽度，尝试自动获取
        if (!table.config.width) {
            var updateWidth_1 = function () {
                var _a, _b, _c;
                var realWidth = (_c = (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c.width;
                if (realWidth) {
                    table.setWidth(realWidth);
                }
            };
            updateWidth_1();
            var cb_1 = (0, lodash_es_1.throttle)(function () { return updateWidth_1(); }, 200);
            window.addEventListener('resize', cb_1);
            return function () { return window.removeEventListener('resize', cb_1); };
        }
    }, [table, ref]);
};
exports.useAutoUpdateTableWidth = useAutoUpdateTableWidth;
//# sourceMappingURL=useLoadMore.js.map