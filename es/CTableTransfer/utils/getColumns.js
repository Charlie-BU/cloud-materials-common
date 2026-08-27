import { __assign, __read, __spreadArray } from "tslib";
import React from 'react';
import { mode } from './index';
import Delete from '../components/Delete';
import { cloneDeep } from 'lodash-es';
import { DEFAULT_LABEL } from '../constant';
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
                return __assign(__assign({}, item), { filter: filter });
            }
            return __assign({}, item);
        });
        return columns;
    }
    if (!dataIndex) {
        //未定义过，添加隐藏列
        return __spreadArray(__spreadArray([], __read(columns), false), [filterIndex], false);
    }
    return columns;
};
/**
 * @description 获取column配置
 * @param {CTableTransferProps} props
 * @return {*}
 */
export var getColumns = function (props) {
    var _a, _b, _c, _d;
    // searchIndex = rowLabel 兼容历史用户使用rowLabel筛选
    var _e = props.rowLabel, rowLabel = _e === void 0 ? DEFAULT_LABEL : _e, CTableProps = props.CTableProps, simple = props.simple, _f = props.searchIndex, searchIndex = _f === void 0 ? rowLabel : _f;
    var sourceColumns = [];
    var targetColumns = [];
    var retain = mode(props).retain;
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
        sourceColumns = cloneDeep((sourceTableCTable === null || sourceTableCTable === void 0 ? void 0 : sourceTableCTable.columns).map(function (item) { return (__assign({}, item)); }));
    }
    if ((_d = rightTableCTable === null || rightTableCTable === void 0 ? void 0 : rightTableCTable.columns) === null || _d === void 0 ? void 0 : _d.length) {
        targetColumns = cloneDeep((rightTableCTable === null || rightTableCTable === void 0 ? void 0 : rightTableCTable.columns).map(function (item) { return (__assign({}, item)); }));
    }
    if (retain || simple) {
        var operation_1 = 'operation';
        var operationColumn = targetColumns.find(function (item) { return item.dataIndex === operation_1; });
        // 优先取用户定义的操作列
        if (!operationColumn) {
            targetColumns = __spreadArray(__spreadArray([], __read(targetColumns), false), [
                {
                    dataIndex: operation_1,
                    title: '',
                    width: 40,
                    render: function (__col, item, __index) {
                        return React.createElement(Delete, { item: item });
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
//# sourceMappingURL=getColumns.js.map