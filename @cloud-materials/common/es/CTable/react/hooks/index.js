/*
 * @Author: youjingyu
 * @Date: 2021-10-06 17:30:05
 * @LastEditTime: 2021-10-29 12:00:17
 * @LastEditors: youjingyu
 * @Description:
 */
import { useContext } from 'react';
// import { TableContext, RowContext, CellContext, ToolbarContext, ToolbarItemContext } from '../components';
import { TableContext, RowContext, CellContext, ToolbarContext } from '../components';
export * from './useAttach';
export * from './useCreateTable';
export * from './usePrefix';
export var useTable = function () { return useContext(TableContext); };
export var useRow = function () {
    return useContext(RowContext);
};
export var useCell = function () { return useContext(CellContext); };
export var useToolbar = function () { return useContext(ToolbarContext); };
// export const useToolbarItem = () => useContext(ToolbarItemContext);
//# sourceMappingURL=index.js.map