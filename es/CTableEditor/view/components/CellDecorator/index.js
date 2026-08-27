import { __assign } from "tslib";
import React from 'react';
import { useCell, useTable, useRow } from '../../../../CTable';
import CForm from '../../../../CForm';
import { useTableEditor } from '../../hooks';
import { isFunction } from 'lodash-es';
export var CellDecorator = function (props) {
    var cell = useCell();
    var table = useTable();
    var row = useRow();
    var tableEditor = useTableEditor();
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
    var editConfig = isFunction(_editConfig) ? _editConfig(options) : _editConfig;
    var _editable = editConfig === null || editConfig === void 0 ? void 0 : editConfig.editable;
    var fieldConfig = editConfig === null || editConfig === void 0 ? void 0 : editConfig.fieldConfig;
    // 可编辑的条件: 配置了 fieldConfig 且没有配置 editable 为 false
    var editable = fieldConfig && _editable !== false;
    return (React.createElement(React.Fragment, null, !editable ? (
    // 不支持编辑时渲染 table cell
    React.createElement("div", null, props.children)) : (
    // 支持编辑时渲染 FormItem
    React.createElement(CForm.Field, __assign({ name: fieldName }, fieldConfig)))));
};
//# sourceMappingURL=index.js.map