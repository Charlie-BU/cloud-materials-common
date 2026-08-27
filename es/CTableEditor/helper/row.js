import { ROW_KEY } from '../constants';
/**
 * 通过 rowKey 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export var getRowObjectField = function (options) {
    var tableEditor = options.tableEditor, rowKey = options.rowKey;
    return tableEditor.form.fields[rowKey];
};
/**
 * 通过 rowKey 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export var getRowFieldByRowKey = getRowObjectField;
/**
 * 通过行序号 index 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 */
export var getRowFieldByIndex = function (options) {
    var tableEditor = options.tableEditor, index = options.index;
    var rowData = tableEditor.currentData[index];
    if (!rowData) {
        console.warn('数据不存在: index 超出范围');
        return null;
    }
    var rowKey = rowData[ROW_KEY];
    return tableEditor.form.fields[rowKey];
};
/**
 * 按 rowData 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export var getRowFieldByRowData = function (options) {
    var tableEditor = options.tableEditor, rowData = options.rowData;
    var rowKey = rowData[ROW_KEY];
    return getRowFieldByRowKey({ tableEditor: tableEditor, rowKey: rowKey });
};
/**
 * 通过 rowKey 获取 CTableEditor 中某一行的当前数据
 * @param options
 * @returns
 */
export var getRowData = function (options) {
    var tableEditor = options.tableEditor, rowKey = options.rowKey;
    return tableEditor.currentData.find(function (d) { return d[ROW_KEY] === rowKey; });
};
/**
 * 通过 rowKey 获取 CTableEditor 中某一行的当前数据
 */
export var getRowDataByRowKey = getRowData;
/**
 * 按 index 获取 CTableEditor 中某一行的当前数据
 * @param options
 */
export var getRowDataByIndex = function (options) {
    var tableEditor = options.tableEditor, index = options.index;
    var rowData = tableEditor.currentData[index];
    if (!rowData) {
        console.warn('数据不存在: index 超出范围');
        return null;
    }
    return rowData;
};
/**
 * 设置某一行的编辑态 (editable)
 *
 * 注意: 设置某一行的编辑态后，该行的编辑态就不受 form 管控了，也就是切换 form 的编辑态时不会影响该行
 * @param options
 */
export var setRowEditable = function (options) {
    var objectField = getRowObjectField(options);
    objectField.editable = options.editable;
};
/**
 * 切换某一行的编辑态 (editable)
 *
 * 注意: 设置某一行的编辑态后，该行的编辑态就不受 form 管控了，也就是切换 form 的编辑态时不会影响该行
 * @param options
 */
export var toggleRowEditable = function (options) {
    var objectField = getRowObjectField(options);
    objectField.editable = !objectField.editable;
};
/**
 * 删除某一行
 * @param options
 */
export var deleteRow = function (options) {
    var tableEditor = options.tableEditor, rowKey = options.rowKey;
    tableEditor.deleteRows([rowKey]);
};
/**
 * 按 index 获取某一行的 rowKey
 * @param options
 * @returns
 */
export var getRowKeyByIndex = function (options) {
    var index = options.index, tableEditor = options.tableEditor;
    var rowData = getRowDataByIndex({ tableEditor: tableEditor, index: index });
    return rowData === null || rowData === void 0 ? void 0 : rowData[ROW_KEY];
};
/**
 * 通过 rowData 获取这一行数据的 rowKey
 * @param rowData
 * @returns
 */
export var getRowKeyByRowData = function (rowData) {
    return rowData[ROW_KEY];
};
//# sourceMappingURL=row.js.map