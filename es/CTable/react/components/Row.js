/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-09 17:31:36
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import { useTable } from '../hooks';
import { isFn } from '../../shared';
import { usePrefix } from '../../react';
export var RowContext = createContext(null);
export var _RowProvider = function (_a) {
    var children = _a.children, index = _a.index;
    var table = useTable();
    var prefix = usePrefix();
    var row = table.rows[index];
    if (!row) {
        return null;
    }
    var options = { table: table, row: row, prefix: prefix };
    var childrenNode = isFn(children) ? children(options) : children;
    return React.createElement(RowContext.Provider, { value: row }, childrenNode);
};
export var RowProvider = observer(_RowProvider);
export var RowProviderWithoutObserver = _RowProvider;
//# sourceMappingURL=Row.js.map