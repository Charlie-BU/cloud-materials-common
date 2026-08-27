import { __assign } from "tslib";
import { cloneDeep } from 'lodash-es';
import { ROW_KEY } from '../constants';
export var transformFormValuesToArray = function (values, tableData) {
    var t = tableData === null || tableData === void 0 ? void 0 : tableData.map(function (v) {
        return __assign(__assign({}, v), values[v[ROW_KEY]]);
    });
    // cloneDeep 的原因: Table 和 Form 都会对数据建立响应式
    // 如果使用同一个对象，建立两次响应式时，第二次会失效。因为 formily/reactive 的响应式是基于对象引用来做记录的
    return cloneDeep(t);
};
//# sourceMappingURL=transformFormValuesToArray.js.map