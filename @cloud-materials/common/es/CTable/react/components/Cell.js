/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-12 20:22:39
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import { useTable, useRow } from '../hooks';
import { isFn } from '../../shared';
import { useTableEditor } from '../../../CTableEditor';
export var CellContext = createContext(null);
export var CellProvider = observer(function (_a) {
    var dataIndex = _a.dataIndex, children = _a.children;
    var table = useTable();
    var row = useRow();
    var tableEditor = useTableEditor();
    var cell = row.getCellByDataIndex(dataIndex);
    var options = {
        table: table,
        tableEditor: tableEditor,
        column: cell.column,
        row: row,
        rowData: row.data,
        cell: cell,
    };
    var childrenNode = isFn(children) ? children(options) : children;
    return React.createElement(CellContext.Provider, { value: cell }, childrenNode);
});
//# sourceMappingURL=Cell.js.map