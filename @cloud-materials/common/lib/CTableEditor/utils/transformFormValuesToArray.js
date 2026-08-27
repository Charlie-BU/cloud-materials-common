"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFormValuesToArray = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var constants_1 = require("../constants");
var transformFormValuesToArray = function (values, tableData) {
    var t = tableData === null || tableData === void 0 ? void 0 : tableData.map(function (v) {
        return tslib_1.__assign(tslib_1.__assign({}, v), values[v[constants_1.ROW_KEY]]);
    });
    // cloneDeep 的原因: Table 和 Form 都会对数据建立响应式
    // 如果使用同一个对象，建立两次响应式时，第二次会失效。因为 formily/reactive 的响应式是基于对象引用来做记录的
    return (0, lodash_es_1.cloneDeep)(t);
};
exports.transformFormValuesToArray = transformFormValuesToArray;
//# sourceMappingURL=transformFormValuesToArray.js.map