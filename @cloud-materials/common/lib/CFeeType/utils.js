"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSingleTime = exports.dateFormatter = void 0;
var tslib_1 = require("tslib");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var lodash_es_1 = require("lodash-es");
/** 时间格式化 */
function dateFormatter(date) {
    return (0, dayjs_1.default)(date).format('YYYY-MM-DD HH:mm:ss');
}
exports.dateFormatter = dateFormatter;
/** 判断当前传入的时间是单个状态的时间还是多个状态的时间 */
var isSingleTime = function (statusChangeTime) {
    return !(0, lodash_es_1.isObject)(statusChangeTime) || (0, lodash_es_1.isDate)(statusChangeTime);
};
exports.isSingleTime = isSingleTime;
//# sourceMappingURL=utils.js.map