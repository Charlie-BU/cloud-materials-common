"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTableConfig = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 14:57:23
 * @LastEditTime: 2021-12-15 17:00:09
 * @LastEditors: youjingyu
 * @Description:
 */
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var reactive_1 = require("@formily/reactive");
var lodash_es_1 = require("lodash-es");
var react_1 = tslib_1.__importDefault(require("react"));
var CLoadingV2_1 = tslib_1.__importDefault(require("../../CLoadingV2"));
var core_1 = require("../core");
var shared_1 = require("../shared");
var components_1 = require("./components");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var mapFilterConfig = function (column, arcoPrefixCls) {
    var _a;
    var tableConfig = column.table.config;
    // 为了兼容老配置
    var isPolling = tableConfig.polling || ((_a = tableConfig.extraConfig) === null || _a === void 0 ? void 0 : _a.isPolling);
    var filterComponentProps = (0, core_1.getFnComponentProps)(column.filterComponentProps, {
        table: column.table,
        column: column,
    });
    var filterConfig = column.table.plugin.getFilter(column.config.filter);
    // 如果要隐藏 filter 的展示，直接返回空，让 arco 不渲染 filter
    if (filterConfig.hide === true) {
        return {};
    }
    var config = {
        // 在 filter 值清空时，必须传递一个空数组给 arco，才能告诉 arco 将组件值置为空
        // filteredValue: column.filterValue || [],
        filterMultiple: filterConfig.multiple === true,
        // 不兼容老的 filterComponentProps?.multiple 的写法
        // filterMultiple: filterComponentProps?.multiple === true || filterConfig.multiple === true,
        onFilterDropdownVisibleChange: function (visible) {
            column.setFilterVisible(visible);
        },
        filterDropdownProps: filterComponentProps === null || filterComponentProps === void 0 ? void 0 : filterComponentProps.dropdownProps,
    };
    /**
     * 轮询模式下筛选值不受控. 仅赋初值。不然每次轮询、导致 Table 刷新时，会打断用户对 filter 的操作
     * 非轮询模式下受控, arco 不支持传 undefined, 会被认为是受控
     */
    if (isPolling) {
        config.defaultFilters = column.filterValue || [];
    }
    else {
        config.filteredValue = column.filterValue || [];
    }
    if (column.filterDataSource) {
        config.filters = column.filterDataSource;
    }
    if (column.filterIconComponentType) {
        var _b = column.table.plugin.getComponent(column.filterIconComponentType, {
            scope: 'filter',
        }), Component = _b.Component, defaultComponentProps = _b.defaultComponentProps;
        if (Component) {
            config.filterIcon = react_1.default.createElement(Component, tslib_1.__assign({}, defaultComponentProps, column.filterIconComponentProps));
        }
    }
    if (column.filterComponentType) {
        config.filterDropdown = function (options) {
            return (react_1.default.createElement("div", { className: "".concat(arcoPrefixCls, "-table-custom-filter") },
                react_1.default.createElement(components_1.FilterDropdown, { dataIndex: column.config.dataIndex, dropdownOptions: options })));
        };
    }
    // filter 事件在 table onChange 事件中统一处理
    return config;
};
var mapColumnConfig = function (table, column, ctx) {
    var _a;
    var cPrefixCls = ctx.cPrefixCls, _b = ctx.prefixCls, prefixCls = _b === void 0 ? 'arco' : _b;
    var directions = table.plugin.getSorter(column.config.sorter).directions;
    var columnProps = tslib_1.__assign(tslib_1.__assign({ title: (react_1.default.createElement(react_1.default.Fragment, null,
            column.title,
            column.config.tooltip && (react_1.default.createElement(web_react_1.Popover, { content: column.config.tooltip },
                react_1.default.createElement(icon_1.IconQuestionCircle, { className: "".concat(cPrefixCls, "-table-column-title-tooltip") }))))), align: column.config.alignType === 'right' ? 'right' : undefined, width: column.width || ((_a = table.columnsAutoWidth) === null || _a === void 0 ? void 0 : _a[column.config.dataIndex]), dataIndex: column.config.dataIndex, fixed: column.config.fixed, sorter: Boolean(directions), sortOrder: column.sorterValue, sortDirections: directions }, (column.config.filter ? mapFilterConfig(column, prefixCls) : {})), { 
        // onHeaderCell 的返回值会作为 TableHeaderCell 的 props 传入
        onHeaderCell: function () {
            return {
                // 这里也可以传入 dataIndex，然后在 TableHeaderCell 中通过 dataIndex 查找对应的 Column 实例
                columnModel: column,
            };
        } });
    if (column.children) {
        columnProps.children = column.children
            .filter(function (c) { return c.show; })
            .map(function (item) { return mapColumnConfig(table, item, ctx); });
    }
    var mergedColumnProps = tslib_1.__assign(tslib_1.__assign({}, columnProps), ((0, shared_1.isFn)(column.config.arcoColumnProps)
        ? column.config.arcoColumnProps({ table: table, column: column, originalProps: columnProps })
        : column.config.arcoColumnProps));
    return mergedColumnProps;
};
// 自动计算 scroll x
var autoScrollX = function (table) {
    var e_1, _a;
    var _b;
    // 如果每一列都设置了宽度的情况
    var scrollX = 0;
    try {
        for (var _c = tslib_1.__values(table.columns.filter(function (c) { return c.show; })), _d = _c.next(); !_d.done; _d = _c.next()) {
            var c = _d.value;
            var width = c.width || ((_b = table.columnsAutoWidth) === null || _b === void 0 ? void 0 : _b[c.dataIndex]);
            // 只要有一个列没有不存在宽度或者不是数字，直接返回
            if (!(0, shared_1.isNum)(width)) {
                return;
            }
            scrollX += width;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return scrollX;
};
var getScroll = function (table) {
    var extraConfig = table.config.extraConfig;
    var scroll = {};
    var scrollX = autoScrollX(table);
    if (scrollX) {
        scroll.x = scrollX;
    }
    // 滚动加载模式和自动固定底部滚动条，都需要设置 scroll.y 为 auto
    // 设为 auto 时，arco 才会应用 ArcoTableProps.component 配置中的 wrapper
    // 并且将 body 部分和 header 部分通过两个 table 渲染
    if (table.isLoadMoreMode() || (extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.autoFixBottomScroll)) {
        scroll.y = 'auto';
    }
    return scroll;
};
/**
 * 2024-03-19 解决 selectable、expandable 在第一次渲染后再更新时，无法触发对应 ui 的更新的问题
 *
 * 原因：渲染 行选择与展开行 ui 的组件都是 Table 的子孙组件，而子孙组件是没有被 observer 包裹的，只有最外层的 Table 包裹了
 * 只有被 observer 包裹的组件才会在数据变化时自动重新渲染（之前很多情况下没问题，可能是 Table 整体渲染了，驱动了子孙组件的渲染）
 *
 * 暂时的解决方案：因为无法去改 arco 的代码来对 Table 的子孙组件包裹 observer
 * 因此只有在 Table 的最外层组件中访问一下响应式数据，让最外层的 Table 收集到依赖，让最外层的 rerender 驱动子孙组件渲染
 *
 * 这里存在一个风险：所有未经 observer 包裹的子孙组件如果依赖了响应式数据，都无法自动更新
 * 初步评估 arco Table 的子孙组件依赖的响应式状态，暂时只有 selectable、expandable，其它状态暂不影响
 */
var getRowStatusMap = function (table) {
    var rowStatusMap = {};
    table.rows.forEach(function (item) {
        rowStatusMap[item.key] = {
            selectable: item.selectable,
            expandable: item.expandable,
        };
    });
    return rowStatusMap;
};
var mapTableConfig = function (table, ctx) {
    var columns = table.columns
        .filter(function (c) { return c.show; })
        .map(function (columnModel) { return mapColumnConfig(table, columnModel, ctx); });
    var extraConfig = table.config.extraConfig;
    var isRefresh = table.loading && table.status.statusChangeReason === core_1.StatusChangeReason.REFRESH;
    var rowStatusMap = getRowStatusMap(table);
    var hidePagination = table.config.pagination === false ||
        // load more 模式不显示分页
        table.isLoadMoreMode() ||
        // 当数据总数小于某个数值时，隐藏分页
        (0, utils_1.hidePaginationWhenTotalLessThan)(table) ||
        (0, utils_1.shouldHideBottomButton)(table);
    // 在初始化时，不显示 '无数据' 组件，这里用一个空 div 替换
    // 182 是 arco '无数据' 占位组件的高度，这里保持和 arco 一样
    var emptyHeight = 182;
    var noDataElement = react_1.default.createElement("div", { style: { height: emptyHeight } });
    if (!table.loading && table.rows.length === 0) {
        // 如果在没有数据时，发生错误，显示 error 组件
        // 如果有数据，仍旧展示原有的数据
        // 如果是 axios 的 cancel 错误，不展示错误界面
        if (table.status.error && !table.status.error.__CANCEL__) {
            noDataElement = (react_1.default.createElement(CLoadingV2_1.default, { style: { height: emptyHeight }, type: "block", hasError: true, onReload: function () { return table.refresh(); } }));
        }
        else {
            // 用 untracked 避免收集依赖，导致 noDataElement 频繁改变
            // 保证只在 Table 组件重渲染时，才重渲染
            (0, reactive_1.untracked)(function () {
                var _a, _b;
                var _noDataElement = (_b = (_a = table.config).noDataElement) === null || _b === void 0 ? void 0 : _b.call(_a, { table: table });
                if ((0, shared_1.isReactNode)(_noDataElement)) {
                    noDataElement = _noDataElement;
                }
                else {
                    noDataElement = (react_1.default.createElement(CLoadingV2_1.default.Result, tslib_1.__assign({ style: { height: emptyHeight }, status: react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoDataHighSaturation, null), title: ctx.locale.CTable.noData }, _noDataElement)));
                }
            });
        }
    }
    var tableProps = {
        /**
         * loading 改成了我们自己通过 Spin 包裹 table，不用 table 自己的了
         * 因为现在是自定义渲染分页组件，table 的 loading 无法覆盖自定义的分页组件
         * */
        // loading: table.loading,
        // 当 memo row 后，对每个 row 都浅拷贝一下，防止对比不出来前后属性的变化，比如 isSelected
        // TODO 在 TableEditor 中默认也会拷贝，原因待定，为了降低风险，保持原有逻辑
        data: (extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.isInTableEditor) || (extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.useMemoTableRow)
            ? table.rows.map(function (r) {
                return tslib_1.__assign({}, r);
            })
            : table.rows,
        // 在 row 上已经计算好了 rowKey，放在 key 属性上
        rowKey: 'key',
        columns: columns,
        showSorterTooltip: false,
        scroll: getScroll(table),
        noDataElement: noDataElement,
        rowClassName: function (record) {
            var _a;
            // 只有在第一次渲染的时候高亮一次之前点过的行
            if (table.status.statusChangeReason !== core_1.StatusChangeReason.INIT) {
                return '';
            }
            return ((_a = table.initStatus) === null || _a === void 0 ? void 0 : _a.activeRowKey) === record.key ? "".concat(constants_1.prefixCls, "-active-row") : '';
        },
        pagination: hidePagination
            ? false
            : tslib_1.__assign({ showTotal: true, total: table.total, pageSize: table.pageSize, 
                // 适配 startPageNumber 为 0 或者 1 的情况
                current: table.currentPage + (1 - table.startPageNumber), sizeCanChange: true, onChange: function (pageNumber, pageSize) {
                    table.changePage(pageNumber - 1 + table.startPageNumber, pageSize);
                }, 
                // 默认向上弹出，虽然向上弹会遮挡一部分内容，但问题不大，而且可以规避在 Tabs 中使用时被截断的问题
                selectProps: {
                    triggerProps: {
                        position: 'top',
                        // 分页器下拉选择框宽度自适应，以便在多语音环境下有遮挡文档
                        autoAlignPopupWidth: false,
                    },
                }, sizeOptions: [10, 20, 50, 100] }, ((0, shared_1.isPlainObj)(table.config.pagination) ? table.config.pagination : {})),
        onChange: function (_, sorter, filters, extra) {
            var _a;
            // 由于 arco 的 bug，切换分页事件需要在 pagination 配置中监听
            // 否则 arco 在切换分页时，会触发 row select 事件（事件回调中 selectedRowKeys 为空数组），无法与取消全选这个动作区分开
            // 从而导致切换分页后，回到上一个页，保留选择状态这个功能无法实现
            // issue: https://github.com/arco-design/arco-design/issues/320
            if (extra.action === 'sort') {
                // 2023-05-29 更新
                // arco 支持了多列排序，CTable 暂不支持，所以如果 sorter 是数组也只取第一个元素
                var sorterInfo = (0, lodash_es_1.isArray)(sorter) ? sorter[0] : sorter;
                table.sort((_a = {}, _a[sorterInfo.field] = sorterInfo.direction, _a));
            }
            else if (extra.action === 'filter') {
                table.filter(filters);
            }
        },
    };
    if (table.config.rowSelection) {
        var rowSelection_1 = table.plugin.getRowSelection(table.config.rowSelection);
        if (rowSelection_1.component) {
            tableProps.rowSelection = {
                renderCell: function (_, __, record) {
                    return react_1.default.createElement(components_1.RowSelection, { record: record });
                },
            };
        }
        else {
            tableProps.rowSelection = {
                type: rowSelection_1.type,
                selectedRowKeys: table.selectedRowKeys,
                // 在本地模式下，翻页时，保存行的选择状态
                preserveSelectedRowKeys: true,
                // 在回调中，我们不需要 arco 传入 row，只需要 rowKey
                // 因此 pureKeys 配置为 true，为大数据场景的性能优化做准备
                pureKeys: true,
                onSelect: function (selected, record) {
                    var row = table.getRowByRowKey(record.key);
                    row === null || row === void 0 ? void 0 : row.setSelect(selected, { overwrite: !rowSelection_1.multiple, triggerSelectRowEvent: true });
                },
                onSelectAll: function (selected) {
                    table.selectRowAll(selected, { triggerSelectRowEvent: true });
                },
                checkboxProps: function (record) {
                    var _a;
                    var row = table.getRowByRowKey(record.key);
                    if (!row) {
                        return {};
                    }
                    var rowSelectionComponentProps = (0, core_1.getFnComponentProps)(row.rowSelectionComponentProps, { table: row.table, row: row, rowData: row.data });
                    return tslib_1.__assign(tslib_1.__assign({}, rowSelectionComponentProps), { disabled: ((_a = rowStatusMap[row.key]) === null || _a === void 0 ? void 0 : _a.selectable) === false });
                },
            };
        }
    }
    if (table.config.expandRow) {
        var expandRow = table.plugin.getExpandRow(table.config.expandRow);
        // 默认在表格刷新时，卸载展开的行
        var unmoutExpandRow = isRefresh && (expandRow === null || expandRow === void 0 ? void 0 : expandRow.unmountWhenParentTableRefresh) !== false;
        // 如果要卸载展开行，刷新时，设置 expandedRowKeys 为空，ui 上会收起所有展开行
        // 刷新完成后，之前展开的行会再次展开，衡量多种交互后，这个交互流程相对比较理想
        tableProps.expandedRowKeys = unmoutExpandRow ? [] : table.rows.filter(function (row) { return row.isExpanded; }).map(function (row) { return row.key; });
        tableProps.expandedRowRender = function (record) { return react_1.default.createElement(components_1.ExpandRow, { record: record }); };
        tableProps.onExpand = function (detail, expanded) {
            table.expendRow(detail.key, expanded);
        };
        tableProps.expandProps = {
            rowExpandable: function (row) { var _a; return ((_a = rowStatusMap[row.key]) === null || _a === void 0 ? void 0 : _a.expandable) === true; },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            icon: function (_a) {
                var expanded = _a.expanded, record = _a.record, restProps = tslib_1.__rest(_a, ["expanded", "record"]);
                return expanded ? (react_1.default.createElement("button", tslib_1.__assign({}, restProps, { type: "button" }),
                    react_1.default.createElement(iconbox_react_ve_o_design_1.IconMinus, null))) : (react_1.default.createElement("button", tslib_1.__assign({}, restProps, { type: "button" }),
                    react_1.default.createElement(iconbox_react_ve_o_design_1.IconPlus, null)));
            },
        };
    }
    if (table.sumRowData) {
        tableProps.summary = function () {
            return (react_1.default.createElement(web_react_1.Table.Summary, null,
                react_1.default.createElement(web_react_1.Table.Summary.Row, null, table.columns
                    .filter(function (c) { return c.show; })
                    .map(function (c) {
                    var _a;
                    return (react_1.default.createElement(web_react_1.Table.Summary.Cell, { key: c.config.dataIndex }, (_a = (0, shared_1.getCellData)(table.sumRowData, c.config.dataIndex)) !== null && _a !== void 0 ? _a : '-'));
                }))));
        };
    }
    return tableProps;
};
exports.mapTableConfig = mapTableConfig;
//# sourceMappingURL=mapModelToArco.js.map