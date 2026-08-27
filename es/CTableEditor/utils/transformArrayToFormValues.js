import { toJS } from '@formily/reactive';
import { ROW_KEY } from '../constants';
import { cloneDeep } from 'lodash-es';
export var transformArrayToFormValues = function (tableData) {
    if (!tableData) {
        return undefined;
    }
    // 保险起见这里每行数据都 toJS 一下
    var values = tableData.reduce(function (acc, curr) {
        acc[curr[ROW_KEY]] = toJS(curr);
        return acc;
    }, {});
    // 把 table 数据传给 form 时需要 cloneDeep，不然还是同一份引用，改 form 的同时 table 也被修改，可能会出问题
    return cloneDeep(values);
};
//# sourceMappingURL=transformArrayToFormValues.js.map