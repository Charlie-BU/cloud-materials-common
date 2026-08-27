/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-24 20:17:31
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import { useTable } from '../hooks';
import { isFn } from '../../shared';
export var RowSelectionContext = createContext(null);
export var RowSelectionProvider = observer(function (_a) {
    var children = _a.children, rowKey = _a.rowKey;
    var table = useTable();
    var row = table.getRowByRowKey(rowKey);
    if (!row) {
        return null;
    }
    var options = { table: table, row: row, rowData: row.data };
    var childrenNode = isFn(children) ? children(options) : children;
    return React.createElement(RowSelectionContext.Provider, { value: row }, childrenNode);
});
//# sourceMappingURL=RowSelection.js.map