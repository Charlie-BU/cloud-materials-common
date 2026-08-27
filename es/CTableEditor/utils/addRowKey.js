import { __assign } from "tslib";
import { ROW_KEY } from '../constants';
// 自增 rowKey 唯一标识
var rowKeyUniqId = 0;
// 给 数据加 rowKey，如果存在则跳过
export var addRowKey = function (data) {
    var _a;
    return __assign(__assign({}, data), (_a = {}, _a[ROW_KEY] = data[ROW_KEY] || "".concat(rowKeyUniqId++, "_").concat(Date.now()), _a));
};
// 给 array 数据加 rowKey，如果存在则跳过
export var addRowKeyToArray = function (data) {
    return data.map(function (d) {
        var _a;
        return __assign(__assign({}, d), (_a = {}, _a[ROW_KEY] = d[ROW_KEY] || "".concat(rowKeyUniqId++, "_").concat(Date.now()), _a));
    });
};
//# sourceMappingURL=addRowKey.js.map