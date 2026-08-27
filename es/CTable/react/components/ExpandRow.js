/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-09 18:15:51
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import { useTable } from '../hooks';
import { isFn } from '../../shared';
export var ExpandRowContext = createContext(null);
export var ExpandRowProvider = observer(function (_a) {
    var children = _a.children, rowKey = _a.rowKey;
    var table = useTable();
    var row = table.getRowByRowKey(rowKey);
    // 在某一行展开后，又进行表格的过滤，会有 rerender 动作，此时父行可能已经不能存在了，此时直接返回 null
    if (!row) {
        return null;
    }
    var options = { table: table, row: row, rowData: row.data };
    var childrenNode = isFn(children) ? children(options) : children;
    return React.createElement(ExpandRowContext.Provider, { value: row }, childrenNode);
});
//# sourceMappingURL=ExpandRow.js.map