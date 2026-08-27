"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusConfig = exports.setStatusConfig = void 0;
var tslib_1 = require("tslib");
var statusConfig = {
    statusMap: {},
    waitColor: 'grey',
};
var setStatusConfig = function (config) {
    var inputStatusMap = config.statusMap, rest = tslib_1.__rest(config, ["statusMap"]);
    statusConfig = tslib_1.__assign(tslib_1.__assign({}, rest), { statusMap: tslib_1.__assign({}, inputStatusMap) });
};
exports.setStatusConfig = setStatusConfig;
var getStatusConfig = function () {
    return statusConfig;
};
exports.getStatusConfig = getStatusConfig;
//# sourceMappingURL=config.js.map