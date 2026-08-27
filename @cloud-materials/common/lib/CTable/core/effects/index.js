"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effects = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-16 19:45:11
 * @LastEditTime: 2021-10-18 16:06:04
 * @LastEditors: youjingyu
 * @Description:
 */
var tableEffects = tslib_1.__importStar(require("./table"));
var columnEffects = tslib_1.__importStar(require("./column"));
var rowEffects = tslib_1.__importStar(require("./row"));
var toolbarEffects = tslib_1.__importStar(require("./toolbar"));
var fetcherEffects = tslib_1.__importStar(require("./fetcher"));
tslib_1.__exportStar(require("./table"), exports);
tslib_1.__exportStar(require("./column"), exports);
tslib_1.__exportStar(require("./row"), exports);
tslib_1.__exportStar(require("./fetcher"), exports);
tslib_1.__exportStar(require("./toolbar"), exports);
// 把 effects 挂在统一的变量上暴露出去，方便使用
// 只暴露必要的 effects 出去，避免用户错误地使用了 effects
exports.effects = {
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