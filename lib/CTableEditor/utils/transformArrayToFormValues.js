"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArrayToFormValues = void 0;
var reactive_1 = require("@formily/reactive");
var constants_1 = require("../constants");
var lodash_es_1 = require("lodash-es");
var transformArrayToFormValues = function (tableData) {
    if (!tableData) {
        return undefined;
    }
    // 保险起见这里每行数据都 toJS 一下
    var values = tableData.reduce(function (acc, curr) {
        acc[curr[constants_1.ROW_KEY]] = (0, reactive_1.toJS)(curr);
        return acc;
    }, {});
    // 把 table 数据传给 form 时需要 cloneDeep，不然还是同一份引用，改 form 的同时 table 也被修改，可能会出问题
    return (0, lodash_es_1.cloneDeep)(values);
};
exports.transformArrayToFormValues = transformArrayToFormValues;
//# sourceMappingURL=transformArrayToFormValues.js.map