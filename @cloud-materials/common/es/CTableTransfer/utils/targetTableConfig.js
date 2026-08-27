import { __assign, __read } from "tslib";
import React from 'react';
import { onTableSelectRow, TableMode } from '../../CTable';
// import { getColumns, getPagination, getTableBaseConfig, mode } from '.';
import { RightHeader } from '../components/Header';
import { DEFAULT_KEY } from '../constant';
import { getColumns } from './getColumns';
import { getPagination } from './getPagination';
import { getTableBaseConfig } from './getTableBaseConfig';
import { mode } from './tools';
/**
 * @description 右侧Table配置
 *
 * @param {TargetTableProps} { cTransferProps, onTargetTableSelectRow, onClear }
 * @return {*}
 */
var TargetTable = function (_a) {
    var _b;
    var cTransferProps = _a.cTransferProps, onTargetTableSelectRow = _a.onTargetTableSelectRow, onClear = _a.onClear, locale = _a.locale;
    var CTableProps = cTransferProps.CTableProps;
    var targetColumns = getColumns(cTransferProps).targetColumns;
    var baseConfig = getTableBaseConfig(__assign({}, cTransferProps), locale);
    var _c = mode(__assign({}, cTransferProps)), retain = _c.retain, simple = _c.simple;
    var sourceCTableProps = CTableProps ? CTableProps[0] || {} : {};
    var rightCTableProps = CTableProps ? CTableProps[1] || {} : {};
    var _d = __read(getPagination(__assign({}, cTransferProps)), 2), _ = _d[0], pagination = _d[1];
    var config = __assign(__assign({ rowKey: sourceCTableProps.rowKey || DEFAULT_KEY }, rightCTableProps), { pagination: pagination, mode: TableMode.LOCAL, columns: targetColumns, extraConfig: __assign(__assign({}, rightCTableProps.extraConfig), baseConfig.extraConfig), arcoTableProps: __assign(__assign({ showHeader: ((_b = rightCTableProps.columns) === null || _b === void 0 ? void 0 : _b.length) ? true : false }, baseConfig.arcoTableProps), rightCTableProps.arcoTableProps), toolbar: __assign(__assign(__assign({}, baseConfig.toolbar), rightCTableProps.toolbar), { left: [
                {
                    component: function () { return React.createElement(RightHeader, { onClear: onClear, cTransferProps: cTransferProps }); },
                },
            ] }), effects: function (_a) {
            var table = _a.table;
            onTableSelectRow(function () {
                // table 中的行被选择或者取消选择
                onTargetTableSelectRow();
            });
            if (baseConfig.effects) {
                baseConfig.effects({ table: table });
            }
            if (rightCTableProps.effects) {
                rightCTableProps.effects({ table: table });
            }
        } });
    if (!retain && !simple) {
        // 数据留存和简单模式不需要展示全选框
        config.rowSelection = 'checkbox';
    }
    //分页
    if (pagination) {
        config.toolbar.bottomLeft = [
            {
                component: function () { return null; },
            },
        ];
    }
    return config;
};
export default TargetTable;
//# sourceMappingURL=targetTableConfig.js.map