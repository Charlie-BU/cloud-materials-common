/*
 * @Author: youjingyu
 * @Date: 2021-11-28 11:18:56
 * @LastEditTime: 2021-11-28 11:33:39
 * @LastEditors: youjingyu
 * @Description:
 */
import { get, set } from 'lodash-es';
// 支持 a.b.c 的形式的 dataIndex
export var getCellData = function (rowData, dataIndex) {
    return get(rowData, dataIndex);
};
// 支持 a.b.c 的形式的 dataIndex
export var setCellData = function (rowData, dataIndex, value) {
    set(rowData, dataIndex, value);
};
export var formatCellData = function (options) {
    var _a;
    var cellData = options.cellData, table = options.table, column = options.column, cell = options.cell, rowData = options.rowData;
    var _b = table.plugin.getFormatter(column.config.formatter), formatterFn = _b.formatterFn, formatterMapping = _b.formatterMapping;
    var content = cellData;
    if (formatterMapping) {
        content = formatterMapping[content] || content;
    }
    // 支持在 formatterMapping 后再次执行 formatterFn
    if (formatterFn) {
        content = formatterFn({
            cellData: cellData,
            cell: cell,
            row: cell === null || cell === void 0 ? void 0 : cell.row,
            rowData: ((_a = cell === null || cell === void 0 ? void 0 : cell.row) === null || _a === void 0 ? void 0 : _a.data) || rowData,
            column: column,
            table: table,
        });
    }
    return content;
};
//# sourceMappingURL=helper.js.map