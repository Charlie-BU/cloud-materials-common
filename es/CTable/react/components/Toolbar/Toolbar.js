/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-13 17:37:54
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
import { observer } from '@formily/react';
import { useTable } from '../../hooks';
import { isFn } from '../../../shared';
export var ToolbarContext = createContext(null);
export var ToolbarProvider = observer(function (_a) {
    var children = _a.children;
    var table = useTable();
    var toolbar = table.toolbar;
    var options = { table: table, toolbar: toolbar };
    var childrenNode = isFn(children) ? children(options) : children;
    return React.createElement(ToolbarContext.Provider, { value: toolbar }, childrenNode);
});
//# sourceMappingURL=Toolbar.js.map