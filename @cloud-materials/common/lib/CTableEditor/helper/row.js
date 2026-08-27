"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRowKeyByRowData = exports.getRowKeyByIndex = exports.deleteRow = exports.toggleRowEditable = exports.setRowEditable = exports.getRowDataByIndex = exports.getRowDataByRowKey = exports.getRowData = exports.getRowFieldByRowData = exports.getRowFieldByIndex = exports.getRowFieldByRowKey = exports.getRowObjectField = void 0;
var constants_1 = require("../constants");
/**
 * 通过 rowKey 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
var getRowObjectField = function (options) {
    var tableEditor = options.tableEditor, rowKey = options.rowKey;
    return tableEditor.form.fields[rowKey];
};
exports.getRowObjectField = getRowObjectField;
/**
 * 通过 rowKey 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
exports.getRowFieldByRowKey = exports.getRowObjectField;
/**
 * 通过行序号 index 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 */
var getRowFieldByIndex = function (options) {
    var tableEditor = options.tableEditor, index = options.index;
    var rowData = tableEditor.currentData[index];
    if (!rowData) {
        console.warn('数据不存在: index 超出范围');
        return null;
    }
    var rowKey = rowData[constants_1.ROW_KEY];
    return tableEditor.form.fields[rowKey];
};
exports.getRowFieldByIndex = getRowFieldByIndex;
/**
 * 按 rowData 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
var getRowFieldByRowData = function (options) {
    var tableEditor = options.tableEditor, rowData = options.rowData;
    var rowKey = rowData[constants_1.ROW_KEY];
    return (0, exports.getRowFieldByRowKey)({ tableEditor: tableEditor, rowKey: rowKey });
};
exports.getRowFieldByRowData = getRowFieldByRowData;
/**
 * 通过 rowKey 获取 CTableEditor 中某一行的当前数据
 * @param options
 * @returns
 */
var getRowData = function (options) {
    var tableEditor = options.tableEditor, rowKey = options.rowKey;
    return tableEditor.currentData.find(function (d) { return d[constants_1.ROW_KEY] === rowKey; });
};
exports.getRowData = getRowData;
/**
 * 通过 rowKey 获取 CTableEditor 中某一行的当前数据
 */
exports.getRowDataByRowKey = exports.getRowData;
/**
 * 按 index 获取 CTableEditor 中某一行的当前数据
 * @param options
 */
var getRowDataByIndex = function (options) {
    var tableEditor = options.tableEditor, index = options.index;
    var rowData = tableEditor.currentData[index];
    if (!rowData) {
        console.warn('数据不存在: index 超出范围');
        return null;
    }
    return rowData;
};
exports.getRowDataByIndex = getRowDataByIndex;
/**
 * 设置某一行的编辑态 (editable)
 *
 * 注意: 设置某一行的编辑态后，该行的编辑态就不受 form 管控了，也就是切换 form 的编辑态时不会影响该行
 * @param options
 */
var setRowEditable = function (options) {
    var objectField = (0, exports.getRowObjectField)(options);
    objectField.editable = options.editable;
};
exports.setRowEditable = setRowEditable;
/**
 * 切换某一行的编辑态 (editable)
 *
 * 注意: 设置某一行的编辑态后，该行的编辑态就不受 form 管控了，也就是切换 form 的编辑态时不会影响该行
 * @param options
 */
var toggleRowEditable = function (options) {
    var objectField = (0, exports.getRowObjectField)(options);
    objectField.editable = !objectField.editable;
};
exports.toggleRowEditable = toggleRowEditable;
/**
 * 删除某一行
 * @param options
 */
var deleteRow = function (options) {
    var tableEditor = options.tableEditor, rowKey = options.rowKey;
    tableEditor.deleteRows([rowKey]);
};
exports.deleteRow = deleteRow;
/**
 * 按 index 获取某一行的 rowKey
 * @param options
 * @returns
 */
var getRowKeyByIndex = function (options) {
    var index = options.index, tableEditor = options.tableEditor;
    var rowData = (0, exports.getRowDataByIndex)({ tableEditor: tableEditor, index: index });
    return rowData === null || rowData === void 0 ? void 0 : rowData[constants_1.ROW_KEY];
};
exports.getRowKeyByIndex = getRowKeyByIndex;
/**
 * 通过 rowData 获取这一行数据的 rowKey
 * @param rowData
 * @returns
 */
var getRowKeyByRowData = function (rowData) {
    return rowData[constants_1.ROW_KEY];
};
exports.getRowKeyByRowData = getRowKeyByRowData;
//# sourceMappingURL=row.js.map