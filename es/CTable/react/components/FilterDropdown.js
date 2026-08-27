/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-12 16:17:04
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import { useTable } from '../hooks';
import { isFn } from '../../shared';
export var FilterDropdownContext = createContext(null);
export var FilterDropdownProvider = observer(function (_a) {
    var children = _a.children, dataIndex = _a.dataIndex;
    var table = useTable();
    var column = table.getColumnByDataIndex(dataIndex);
    var options = { table: table, column: column };
    var childrenNode = isFn(children) ? children(options) : children;
    return React.createElement(FilterDropdownContext.Provider, { value: column }, childrenNode);
});
//# sourceMappingURL=FilterDropdown.js.map