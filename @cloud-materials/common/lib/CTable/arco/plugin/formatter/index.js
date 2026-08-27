"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatter = exports.fallbackText = exports.timestamp = exports.utcTime = exports.time = exports.money = exports.floatFormatter = exports.intFormatter = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-07 17:42:28
 * @LastEditTime: 2021-12-14 20:56:49
 * @LastEditors: youjingyu
 * @Description:
 */
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var utc_1 = tslib_1.__importDefault(require("dayjs/plugin/utc"));
var utils_1 = require("../../../utils");
var utils_2 = require("../../utils");
dayjs_1.default.extend(utc_1.default);
exports.intFormatter = {
    type: 'int',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return ((0, utils_1.isEmpty)(cellData) ? '-' : (0, utils_2.toLocaleString)(cellData));
    },
};
exports.floatFormatter = {
    type: 'float',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return ((0, utils_1.isEmpty)(cellData) ? '-' : (0, utils_2.toLocaleString)(cellData));
    },
};
exports.money = {
    type: 'money',
    formatterFn: function (_a) {
        var _b;
        var cellData = _a.cellData;
        // 金额保留两位小数
        return (0, utils_1.isEmpty)(cellData) ? '-' : (_b = cellData.toLocaleString) === null || _b === void 0 ? void 0 : _b.call(cellData, undefined, { maximumFractionDigits: 2 });
    },
};
var formatTime = function (time, isUtc) {
    if (isUtc === void 0) { isUtc = false; }
    if ((0, utils_1.isEmpty)(time))
        return '-';
    var fixedTime = (0, utils_1.tryToNumber)(time);
    if (typeof fixedTime === 'number' && fixedTime.toString().length < 13) {
        fixedTime = Number("".concat(fixedTime, "000"));
    }
    var FORMAT_TIME_STYLE = 'YYYY-MM-DD HH:mm:ss';
    // 如果不合法，返回原始值
    if (!(0, dayjs_1.default)(fixedTime).isValid()) {
        return time;
    }
    if (isUtc) {
        return dayjs_1.default.utc(fixedTime).local().format(FORMAT_TIME_STYLE);
    }
    return (0, dayjs_1.default)(fixedTime).format(FORMAT_TIME_STYLE);
};
exports.time = {
    type: 'time',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return formatTime(cellData);
    },
};
exports.utcTime = {
    type: 'utcTime',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return formatTime(cellData, true);
    },
};
exports.timestamp = {
    type: 'timestamp',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return new Date(cellData).toLocaleString();
    },
};
// export const dealAZone: Formatter = {
//   type: 'dealAZone',
//   formatterFn({ cellData: zoneId }) {
//     const reg = /[a-zA-Z]/;
//     const zoneName = zoneId[zoneId?.length - 1] || '';
//     return reg.test(zoneName) ? `可用区${zoneName.toLocaleUpperCase()}` : zoneId;
//   },
// };
exports.fallbackText = {
    type: 'fallbackText',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return (0, utils_1.fallbackText)(cellData);
    },
};
exports.formatter = {
    fallbackText: function (value) { return (0, utils_1.fallbackText)(value); },
    timestamp: function (value) { var _a; return (_a = exports.timestamp.formatterFn) === null || _a === void 0 ? void 0 : _a.call(exports.timestamp, { cellData: value }); },
    utcTime: function (value) { return formatTime(value, true); },
    time: function (value) { return formatTime(value); },
    money: function (value) { var _a; return (_a = exports.money.formatterFn) === null || _a === void 0 ? void 0 : _a.call(exports.money, { cellData: value }); },
    float: function (value) { var _a; return (_a = exports.floatFormatter.formatterFn) === null || _a === void 0 ? void 0 : _a.call(exports.floatFormatter, { cellData: value }); },
    int: function (value) { var _a; return (_a = exports.intFormatter.formatterFn) === null || _a === void 0 ? void 0 : _a.call(exports.intFormatter, { cellData: value }); },
};
//# sourceMappingURL=index.js.map