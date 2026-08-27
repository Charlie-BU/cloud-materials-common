"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateTable = void 0;
/*
 * @Author: youjingyu
 * @Date: 2021-10-20 11:24:16
 * @LastEditTime: 2021-11-28 13:45:06
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = require("react");
var core_1 = require("../../core");
var useCreateTable = function (tableConfig) {
    var table = (0, react_1.useMemo)(function () { return (0, core_1.createTable)(tableConfig); }, []);
    return table;
};
exports.useCreateTable = useCreateTable;
//# sourceMappingURL=useCreateTable.js.map