import { useRef, useEffect } from 'react';
import { throttle } from 'lodash-es';
import { LoadMoreType } from '../types';
import { LoadMoreCompHeight } from '../components';
export var useLoadMore = function (table, ref) {
    var doLoadMore = useRef();
    if (!doLoadMore.current) {
        doLoadMore.current = throttle(function (e) {
            var tableContainer = e.target;
            if (!tableContainer) {
                return;
            }
            // 非加载状态、非错误状态才能触发 loadMore
            var shouldLoad = !table.loading && !table.status.loadMoreLoading && !table.status.error && !table.status.noMore;
            // 触发 loadMore 的滚动高度：总滚动高度 - 容器高度 - LoadMore 组件高度
            var maxScrollHeight = tableContainer.scrollHeight - tableContainer.offsetHeight - LoadMoreCompHeight;
            var reachBottom = tableContainer.scrollTop >= maxScrollHeight;
            if (shouldLoad && reachBottom) {
                table.loadMoreData();
            }
        }, 200);
    }
    useEffect(function () {
        var _a;
        // 如果是点击加载更多，不监听滚动事件
        if (table.isLoadMoreMode() && ((_a = table.config.extraConfig) === null || _a === void 0 ? void 0 : _a.loadMoreType) !== LoadMoreType.clickLoadMore) {
            ref.current && ref.current.addEventListener('scroll', doLoadMore.current);
            return function () {
                ref.current && ref.current.removeEventListener('scroll', doLoadMore.current);
            };
        }
    }, []);
};
export var useAutoUpdateTableWidth = function (table, ref) {
    useEffect(function () {
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
            var cb_1 = throttle(function () { return updateWidth_1(); }, 200);
            window.addEventListener('resize', cb_1);
            return function () { return window.removeEventListener('resize', cb_1); };
        }
    }, [table, ref]);
};
//# sourceMappingURL=useLoadMore.js.map