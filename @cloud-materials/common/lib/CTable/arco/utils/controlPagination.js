"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlPagination = exports.getArcoPropsFilterPagination = exports.shouldHideBottomButton = exports.hidePaginationWhenTotalLessThan = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var core_1 = require("../../core");
var components_1 = require("../components");
/**
 * 规范：当数据总数小于某个数值时，隐藏分页
 * @param table
 */
var hidePaginationWhenTotalLessThan = function (table) {
    var _a;
    // 当用户配置了 alwaysShowPagination 时，这个规范不生效
    if (table.config.alwaysShowPagination) {
        return false;
    }
    // 按照火山引擎的规范，小于等于 10 条时，隐藏分页，当currentPage !== 1 时不能隐藏分页，这样是为了让用户在第2页数据为空时切换回第一页
    // 2023-07-14 更新 火山规范更新，始终展示分页器
    // 2023-08-01 回滚，小于等于 10 条时，隐藏分页
    return table.total <= (((_a = table.config.extraConfig) === null || _a === void 0 ? void 0 : _a.hidePaginationTotal) || 10) && table.isOnFirstPage();
};
exports.hidePaginationWhenTotalLessThan = hidePaginationWhenTotalLessThan;
// 是否应该隐藏 table 底部的操作按钮
var shouldHideBottomButton = function (table) {
    // 左下角的操作按钮隐藏逻辑同下面注释的分页
    return (
    // 初始化时隐藏分页，避免先有分页，后又隐藏导致分页按钮闪现
    (table.status.statusChangeReason === core_1.StatusChangeReason.INIT && table.loading) ||
        // 没有数据时，出现错误，才能隐藏分页
        // 有数据时，仍旧显示的上一次的数据，需要展示分页
        (!table.rows.length && table.status.error));
};
exports.shouldHideBottomButton = shouldHideBottomButton;
/** 处理了 pagination 后的最终传递给 arco table 的 props */
var getArcoPropsFilterPagination = function (table, 
// mapTableConfig 返回的 arcoProps
tableConfig, 
// merge 之后的 arcoProps
mergedArcoProps) {
    var _a;
    /**
     * arco Pagination 组件有一个 bug: 初始 props 包含 pageSize, 当 props 改变且改变后不含 pageSize 时会报错
     * 这个问题在 Table 中的表现是：假如用户在 arcoTableProps 中配置了 pagination，且 pagination 中不含有 pageSize 的话，
     * 初始情况: 假如请求的数据不为空（并大于10条），Pagination 组件正常展示
     * 触发问题: Table 再次请求的数据为空(或小于 10 条)，tableConfig.pagination 变为 false，最终传递给 Pagination 组件的 props 会变成 arcoTableProps.pagination，其中不含有 pageSize，于是报错
     */
    if (!tableConfig.pagination) {
        // 这里直接改 mergedArcoProps，因为不管是渲染 arco table 的分页还是自定义的分页，都需要先处理 pagination
        mergedArcoProps.pagination = false;
    }
    // 配置 useArcoPagination 为 true 时，展示 arco table 的分页
    // useArcoPagination 默认为 false，即使用自定义的分页
    if (((_a = table.config.extraConfig) === null || _a === void 0 ? void 0 : _a.useArcoPagination) === true) {
        return tslib_1.__assign({}, mergedArcoProps);
    }
    // 渲染自定义分页器时，把 arco table 的 pagination 干掉
    return tslib_1.__assign(tslib_1.__assign({}, mergedArcoProps), { pagination: false });
};
exports.getArcoPropsFilterPagination = getArcoPropsFilterPagination;
// 处理自定义分页的渲染
var controlPagination = function (table, mergedArcoProps, tablePrefixCls, arcoPrefixCls) {
    var _a, _b;
    /**
     * 配置 useArcoPagination 为 true 时，展示 arco 的分页，默认使用自定义的分页
     * 在 addRow、deleteRow 的场景，每页的条数和 pageSize 可能对不上
     * 这时 arco table 会根据 pageSize 对数据进行截取，但是我们希望添加和删除行后，当前页的数据永远留在当前页而不是被截取到第二页
     * 另外考虑到，在处理左下角的操作按钮时，也会自定义样式，为了避免这部分未来受 arco 的影响
     * 从这个角度考虑，也选择直接自定义渲染分页
     * 另外，如果强行配置使用 arco 自己的分页，暂时不支持渲染 BottomLeftToolbar
     */
    if (((_a = table.config.extraConfig) === null || _a === void 0 ? void 0 : _a.useArcoPagination) === true) {
        return null;
    }
    var pagination = mergedArcoProps.pagination, renderPagination = mergedArcoProps.renderPagination;
    // 原始的分页配置
    var paginationNode = pagination && react_1.default.createElement(web_react_1.Pagination, tslib_1.__assign({}, pagination));
    // 这里直接复用了 arco 的分页容器样式，好处是可以直接应用全局的风格样式，坏处是可能会受 arco 样式的影响
    var containerClassName = "".concat(tablePrefixCls, "-pagination ").concat(arcoPrefixCls, "-table-pagination");
    // 兼容业务自定义渲染分页器的情况，如果是业务自渲染分页，暂时不支持渲染 BottomLeftToolbar，如果业务方有诉求，可以自己渲染
    if (renderPagination) {
        return react_1.default.createElement("div", { className: containerClassName }, renderPagination(paginationNode));
    }
    var showPagination = Boolean(pagination);
    var showBottomLeft = Boolean((_b = table.config.toolbar) === null || _b === void 0 ? void 0 : _b.bottomLeft) && !(0, exports.shouldHideBottomButton)(table);
    if (showPagination || showBottomLeft) {
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(containerClassName, showBottomLeft && "".concat(tablePrefixCls, "-pagination-with-toolbar"), showBottomLeft && table.selectedRowKeys.length > 0 && "".concat(tablePrefixCls, "-pagination-with-toolbar-highlight")) },
            showBottomLeft && react_1.default.createElement(components_1.BottomLeftToolbar, { config: table.config.toolbar }),
            showPagination && paginationNode));
    }
    return null;
};
exports.controlPagination = controlPagination;
//# sourceMappingURL=controlPagination.js.map