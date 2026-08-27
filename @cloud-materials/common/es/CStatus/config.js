import { __assign, __rest } from "tslib";
var statusConfig = {
    statusMap: {},
    waitColor: 'grey',
};
export var setStatusConfig = function (config) {
    var inputStatusMap = config.statusMap, rest = __rest(config, ["statusMap"]);
    statusConfig = __assign(__assign({}, rest), { statusMap: __assign({}, inputStatusMap) });
};
export var getStatusConfig = function () {
    return statusConfig;
};
//# sourceMappingURL=config.js.map