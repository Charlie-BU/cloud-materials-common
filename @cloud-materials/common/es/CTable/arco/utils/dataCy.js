import { filterDataKey } from '../../utils';
export var getTableDataCy = function () { return ({
    dataCy: 'table-container',
}); };
export var getRowDataCy = function (row, prefix) {
    return {
        dataCy: "".concat(prefix, "-row"),
        dataCyIdx: "".concat(prefix, "-row-idx-").concat(filterDataKey(row.index.toString())),
    };
};
export var getCellDataCy = function (cell, prefix) {
    var columnIndex = filterDataKey(cell.column.config.dataIndex);
    var rowIndex = filterDataKey(cell.row.index.toString());
    return {
        dataCy: "".concat(prefix, "-row-").concat(columnIndex),
        dataCyIdx: "".concat(prefix, "-row-idx-").concat(rowIndex, "-").concat(columnIndex),
    };
};
//# sourceMappingURL=dataCy.js.map