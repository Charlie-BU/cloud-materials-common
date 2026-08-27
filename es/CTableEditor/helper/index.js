import * as rowHelper from './row';
/**
 * TableEditor 的 helper 中提供了若干便捷操作
 */
export var helper = {
    // 获取 ObjectField
    getRowObjectField: rowHelper.getRowObjectField,
    getRowFieldByRowKey: rowHelper.getRowFieldByRowKey,
    getRowFieldByIndex: rowHelper.getRowFieldByIndex,
    getRowFieldByRowData: rowHelper.getRowFieldByRowData,
    // 获取 rowData
    getRowData: rowHelper.getRowData,
    getRowDataByRowKey: rowHelper.getRowDataByRowKey,
    getRowDataByIndex: rowHelper.getRowDataByIndex,
    // 切换编辑态
    setRowEditable: rowHelper.setRowEditable,
    toggleRowEditable: rowHelper.toggleRowEditable,
    // 删除行
    deleteRow: rowHelper.deleteRow,
    // 获取 rowKey
    getRowKeyByIndex: rowHelper.getRowKeyByIndex,
    getRowKeyByRowData: rowHelper.getRowKeyByRowData,
};
//# sourceMappingURL=index.js.map