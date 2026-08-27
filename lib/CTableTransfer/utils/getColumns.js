"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumns = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var index_1 = require("./index");
var Delete_1 = tslib_1.__importDefault(require("../components/Delete"));
var lodash_es_1 = require("lodash-es");
var constant_1 = require("../constant");
var filter = {
    type: 'searchInput',
    hide: true,
};
/**
 * @description 为指定searchInput添加过滤函数
 * @param {ColumnConfig<any>[]} columns
 * @param {CTableTransferProps['searchIndex']} searchIndex
 * @return {*}
 */
var addSearchInputFilter = function (columns, searchIndex) {
    var filterIndex = { dataIndex: searchIndex, title: '', visible: false, filter: filter };
    // column是否定义过searchInput的列
    var dataIndex = columns.find(function (item) { return item.dataIndex === searchIndex; });
    if (dataIndex && !dataIndex.filter) {
        // 定义过，找到列，添加filter
        columns = columns.map(function (item) {
            if ((item === null || item === void 0 ? void 0 : item.dataIndex) === searchIndex) {
                return tslib_1.__assign(tslib_1.__assign({}, item), { filter: filter });
            }
            return tslib_1.__assign({}, item);
        });
        return columns;
    }
    if (!dataIndex) {
        //未定义过，添加隐藏列
        return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(columns), false), [filterIndex], false);
    }
    return columns;
};
/**
 * @description 获取column配置
 * @param {CTableTransferProps} props
 * @return {*}
 */
var getColumns = function (props) {
    var _a, _b, _c, _d;
    // searchIndex = rowLabel 兼容历史用户使用rowLabel筛选
    var _e = props.rowLabel, rowLabel = _e === void 0 ? constant_1.DEFAULT_LABEL : _e, CTableProps = props.CTableProps, simple = props.simple, _f = props.searchIndex, searchIndex = _f === void 0 ? rowLabel : _f;
    var sourceColumns = [];
    var targetColumns = [];
    var retain = (0, index_1.mode)(props).retain;
    var sourceTableCTable = CTableProps ? CTableProps[0] || {} : {};
    var rightTableCTable = CTableProps ? CTableProps[1] || {} : {};
    if (!((_a = sourceTableCTable === null || sourceTableCTable === void 0 ? void 0 : sourceTableCTable.columns) === null || _a === void 0 ? void 0 : _a.length) || !((_b = rightTableCTable === null || rightTableCTable === void 0 ? void 0 : rightTableCTable.columns) === null || _b === void 0 ? void 0 : _b.length)) {
        sourceColumns = targetColumns = [
            {
                dataIndex: rowLabel,
                title: '',
            },
        ];
    }
    if ((_c = sourceTableCTable === null || sourceTableCTable === void 0 ? void 0 : sourceTableCTable.columns) === null || _c === void 0 ? void 0 : _c.length) {
        sourceColumns = (0, lodash_es_1.cloneDeep)((sourceTableCTable === null || sourceTableCTable === void 0 ? void 0 : sourceTableCTable.columns).map(function (item) { return (tslib_1.__assign({}, item)); }));
    }
    if ((_d = rightTableCTable === null || rightTableCTable === void 0 ? void 0 : rightTableCTable.columns) === null || _d === void 0 ? void 0 : _d.length) {
        targetColumns = (0, lodash_es_1.cloneDeep)((rightTableCTable === null || rightTableCTable === void 0 ? void 0 : rightTableCTable.columns).map(function (item) { return (tslib_1.__assign({}, item)); }));
    }
    if (retain || simple) {
        var operation_1 = 'operation';
        var operationColumn = targetColumns.find(function (item) { return item.dataIndex === operation_1; });
        // 优先取用户定义的操作列
        if (!operationColumn) {
            targetColumns = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(targetColumns), false), [
                {
                    dataIndex: operation_1,
                    title: '',
                    width: 40,
                    render: function (__col, item, __index) {
                        return react_1.default.createElement(Delete_1.default, { item: item });
                    },
                },
            ], false);
        }
    }
    // 解决的问题是：简单模式下，传入label为reactNode，筛选不生效。为指定字段添加筛选函数，且字段应该是unvisible状态
    sourceColumns = addSearchInputFilter(sourceColumns, searchIndex);
    targetColumns = addSearchInputFilter(targetColumns, searchIndex);
    return {
        sourceColumns: sourceColumns,
        targetColumns: targetColumns,
    };
};
exports.getColumns = getColumns;
//# sourceMappingURL=getColumns.js.map