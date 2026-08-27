import { __assign } from "tslib";
import React, { forwardRef, useEffect } from 'react';
import { observer } from '@formily/react';
import cls from 'classnames';
import { LoadMoreType } from '../../types';
import { StatusChangeReason } from '../../../core/types';
import CLoadingV2 from '../../../../CLoadingV2';
import { useLoadMore } from '../../hooks';
import { useTable, usePrefix } from '../../../react';
import { useCConfigContext } from '../../../../CConfigProvider';
var Loading = function () {
    return React.createElement(CLoadingV2, { loading: true, type: "inline" });
};
export var LoadMoreCompHeight = 44;
export var LoadMore = observer(function (_a) {
    var _b;
    var table = _a.table;
    var locale = useCConfigContext().locale;
    var prefixCls = usePrefix('load-more');
    // 没有数据时，不显示 LoadMore 组件
    if (table.rows.length === 0) {
        return null;
    }
    var loadMoreType = (_b = table.config.extraConfig) === null || _b === void 0 ? void 0 : _b.loadMoreType;
    var content = loadMoreType === LoadMoreType.clickLoadMore ? (React.createElement("span", { className: "click-load-more", onClick: function () {
            table.loadMoreData();
        } }, locale.CTable.clickToLoadMore)) : (React.createElement(Loading, null));
    if (table.status.noMore) {
        content = React.createElement("span", { className: "no-more-data" }, locale.CTable.noMoreData);
    }
    else if (table.status.error) {
        content = (React.createElement("span", { className: "load-more-error" },
            React.createElement("span", null, locale.CTable.loadFail),
            React.createElement("span", { onClick: function () { return table.status.error && table.loadMoreData(); } }, locale.CTable.clickToRetry)));
    }
    else if (table.status.loadMoreLoading === true) {
        content = React.createElement(Loading, null);
    }
    return (React.createElement("div", { className: prefixCls, style: { height: LoadMoreCompHeight } }, content));
});
export var _LoadMoreTableBodyWrapper = function (props, _ref) {
    var ref = _ref;
    var table = useTable();
    var prefixCls = usePrefix('load-more');
    useLoadMore(table, ref);
    /**
     * 2023-05-08 新增
     * load more 模式下 refresh 时需要先滚回顶部，防止多次触发滚动加载
     */
    useEffect(function () {
        if (table.status.statusChangeReason === StatusChangeReason.REFRESH) {
            if (ref.current) {
                ref.current.scrollTop = 0;
            }
        }
    }, [table.status.statusChangeReason]);
    var loadMoreContainerHeight = table.config.loadMoreContainerHeight;
    // 容器不设置 height，只设置 max-height。数据较少时高度自适应，数据多了限死 max-height
    var style = loadMoreContainerHeight ? __assign(__assign({}, props.style), { maxHeight: loadMoreContainerHeight }) : props.style;
    return (
    // arco 会为 body 的 wrapper 传入 className、style，这里需要承接
    React.createElement("div", { className: cls(props.className, "".concat(prefixCls, "-container")), style: style, ref: ref },
        props.children,
        React.createElement(LoadMore, { table: table })));
};
export var LoadMoreTableBodyWrapper = forwardRef(_LoadMoreTableBodyWrapper);
//# sourceMappingURL=index.js.map