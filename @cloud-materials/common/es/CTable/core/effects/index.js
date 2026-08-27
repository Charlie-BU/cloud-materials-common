/*
 * @Author: youjingyu
 * @Date: 2021-10-16 19:45:11
 * @LastEditTime: 2021-10-18 16:06:04
 * @LastEditors: youjingyu
 * @Description:
 */
import * as tableEffects from './table';
import * as columnEffects from './column';
import * as rowEffects from './row';
import * as toolbarEffects from './toolbar';
import * as fetcherEffects from './fetcher';
export * from './table';
export * from './column';
export * from './row';
export * from './fetcher';
export * from './toolbar';
// 把 effects 挂在统一的变量上暴露出去，方便使用
// 只暴露必要的 effects 出去，避免用户错误地使用了 effects
export var effects = {
    onTableSelectRow: tableEffects.onTableSelectRow,
    onTableUpdateDataStart: tableEffects.onTableUpdateDataStart,
    onTableUpdateDataEnd: tableEffects.onTableUpdateDataEnd,
    onTableUpdateRowEnd: tableEffects.onTableUpdateRowEnd,
    onTablePageChangeStart: tableEffects.onTablePageChangeStart,
    onTablePageChangeEnd: tableEffects.onTablePageChangeEnd,
    onSortValueChange: tableEffects.onSortValueChange,
    onColumnFilterValueChange: tableEffects.onColumnFilterValueChange,
    onRowInit: rowEffects.onRowInit,
    onRowSelect: rowEffects.onRowSelect,
    onToolbarValueChange: toolbarEffects.onToolbarValueChange,
    onFetchStart: fetcherEffects.onFetchStart,
    onFetchEnd: fetcherEffects.onFetchEnd,
    onFetchError: fetcherEffects.onFetchError,
    onColumnInit: columnEffects.onColumnInit,
    onColumnVisibleChange: columnEffects.onColumnVisibleChange,
};
//# sourceMappingURL=index.js.map