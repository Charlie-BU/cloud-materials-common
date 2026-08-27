"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadMoreTableBodyWrapper = exports._LoadMoreTableBodyWrapper = exports.LoadMore = exports.LoadMoreCompHeight = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var types_1 = require("../../types");
var types_2 = require("../../../core/types");
var CLoadingV2_1 = tslib_1.__importDefault(require("../../../../CLoadingV2"));
var hooks_1 = require("../../hooks");
var react_3 = require("../../../react");
var CConfigProvider_1 = require("../../../../CConfigProvider");
var Loading = function () {
    return react_1.default.createElement(CLoadingV2_1.default, { loading: true, type: "inline" });
};
exports.LoadMoreCompHeight = 44;
exports.LoadMore = (0, react_2.observer)(function (_a) {
    var _b;
    var table = _a.table;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var prefixCls = (0, react_3.usePrefix)('load-more');
    // 没有数据时，不显示 LoadMore 组件
    if (table.rows.length === 0) {
        return null;
    }
    var loadMoreType = (_b = table.config.extraConfig) === null || _b === void 0 ? void 0 : _b.loadMoreType;
    var content = loadMoreType === types_1.LoadMoreType.clickLoadMore ? (react_1.default.createElement("span", { className: "click-load-more", onClick: function () {
            table.loadMoreData();
        } }, locale.CTable.clickToLoadMore)) : (react_1.default.createElement(Loading, null));
    if (table.status.noMore) {
        content = react_1.default.createElement("span", { className: "no-more-data" }, locale.CTable.noMoreData);
    }
    else if (table.status.error) {
        content = (react_1.default.createElement("span", { className: "load-more-error" },
            react_1.default.createElement("span", null, locale.CTable.loadFail),
            react_1.default.createElement("span", { onClick: function () { return table.status.error && table.loadMoreData(); } }, locale.CTable.clickToRetry)));
    }
    else if (table.status.loadMoreLoading === true) {
        content = react_1.default.createElement(Loading, null);
    }
    return (react_1.default.createElement("div", { className: prefixCls, style: { height: exports.LoadMoreCompHeight } }, content));
});
var _LoadMoreTableBodyWrapper = function (props, _ref) {
    var ref = _ref;
    var table = (0, react_3.useTable)();
    var prefixCls = (0, react_3.usePrefix)('load-more');
    (0, hooks_1.useLoadMore)(table, ref);
    /**
     * 2023-05-08 新增
     * load more 模式下 refresh 时需要先滚回顶部，防止多次触发滚动加载
     */
    (0, react_1.useEffect)(function () {
        if (table.status.statusChangeReason === types_2.StatusChangeReason.REFRESH) {
            if (ref.current) {
                ref.current.scrollTop = 0;
            }
        }
    }, [table.status.statusChangeReason]);
    var loadMoreContainerHeight = table.config.loadMoreContainerHeight;
    // 容器不设置 height，只设置 max-height。数据较少时高度自适应，数据多了限死 max-height
    var style = loadMoreContainerHeight ? tslib_1.__assign(tslib_1.__assign({}, props.style), { maxHeight: loadMoreContainerHeight }) : props.style;
    return (
    // arco 会为 body 的 wrapper 传入 className、style，这里需要承接
    react_1.default.createElement("div", { className: (0, classnames_1.default)(props.className, "".concat(prefixCls, "-container")), style: style, ref: ref },
        props.children,
        react_1.default.createElement(exports.LoadMore, { table: table })));
};
exports._LoadMoreTableBodyWrapper = _LoadMoreTableBodyWrapper;
exports.LoadMoreTableBodyWrapper = (0, react_1.forwardRef)(exports._LoadMoreTableBodyWrapper);
//# sourceMappingURL=index.js.map