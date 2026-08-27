"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CTable_1 = require("../../CTable");
// import { getColumns, getPagination, getTableBaseConfig, mode } from '.';
var Header_1 = require("../components/Header");
var constant_1 = require("../constant");
var getColumns_1 = require("./getColumns");
var getPagination_1 = require("./getPagination");
var getTableBaseConfig_1 = require("./getTableBaseConfig");
var tools_1 = require("./tools");
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
    var targetColumns = (0, getColumns_1.getColumns)(cTransferProps).targetColumns;
    var baseConfig = (0, getTableBaseConfig_1.getTableBaseConfig)(tslib_1.__assign({}, cTransferProps), locale);
    var _c = (0, tools_1.mode)(tslib_1.__assign({}, cTransferProps)), retain = _c.retain, simple = _c.simple;
    var sourceCTableProps = CTableProps ? CTableProps[0] || {} : {};
    var rightCTableProps = CTableProps ? CTableProps[1] || {} : {};
    var _d = tslib_1.__read((0, getPagination_1.getPagination)(tslib_1.__assign({}, cTransferProps)), 2), _ = _d[0], pagination = _d[1];
    var config = tslib_1.__assign(tslib_1.__assign({ rowKey: sourceCTableProps.rowKey || constant_1.DEFAULT_KEY }, rightCTableProps), { pagination: pagination, mode: CTable_1.TableMode.LOCAL, columns: targetColumns, extraConfig: tslib_1.__assign(tslib_1.__assign({}, rightCTableProps.extraConfig), baseConfig.extraConfig), arcoTableProps: tslib_1.__assign(tslib_1.__assign({ showHeader: ((_b = rightCTableProps.columns) === null || _b === void 0 ? void 0 : _b.length) ? true : false }, baseConfig.arcoTableProps), rightCTableProps.arcoTableProps), toolbar: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, baseConfig.toolbar), rightCTableProps.toolbar), { left: [
                {
                    component: function () { return react_1.default.createElement(Header_1.RightHeader, { onClear: onClear, cTransferProps: cTransferProps }); },
                },
            ] }), effects: function (_a) {
            var table = _a.table;
            (0, CTable_1.onTableSelectRow)(function () {
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
exports.default = TargetTable;
//# sourceMappingURL=targetTableConfig.js.map