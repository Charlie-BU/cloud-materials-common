"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellDecorator = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CTable_1 = require("../../../../CTable");
var CForm_1 = tslib_1.__importDefault(require("../../../../CForm"));
var hooks_1 = require("../../hooks");
var lodash_es_1 = require("lodash-es");
var CellDecorator = function (props) {
    var cell = (0, CTable_1.useCell)();
    var table = (0, CTable_1.useTable)();
    var row = (0, CTable_1.useRow)();
    var tableEditor = (0, hooks_1.useTableEditor)();
    var columnConfig = cell.column.config;
    var fieldName = columnConfig.dataIndex;
    var options = {
        table: table,
        tableEditor: tableEditor,
        column: cell.column,
        row: row,
        rowData: row.data,
        cell: cell,
        cellData: cell.data,
    };
    var _editConfig = columnConfig.editConfig;
    var editConfig = (0, lodash_es_1.isFunction)(_editConfig) ? _editConfig(options) : _editConfig;
    var _editable = editConfig === null || editConfig === void 0 ? void 0 : editConfig.editable;
    var fieldConfig = editConfig === null || editConfig === void 0 ? void 0 : editConfig.fieldConfig;
    // 可编辑的条件: 配置了 fieldConfig 且没有配置 editable 为 false
    var editable = fieldConfig && _editable !== false;
    return (react_1.default.createElement(react_1.default.Fragment, null, !editable ? (
    // 不支持编辑时渲染 table cell
    react_1.default.createElement("div", null, props.children)) : (
    // 支持编辑时渲染 FormItem
    react_1.default.createElement(CForm_1.default.Field, tslib_1.__assign({ name: fieldName }, fieldConfig)))));
};
exports.CellDecorator = CellDecorator;
//# sourceMappingURL=index.js.map