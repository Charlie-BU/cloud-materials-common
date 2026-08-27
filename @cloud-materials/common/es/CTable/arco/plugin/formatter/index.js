/*
 * @Author: youjingyu
 * @Date: 2021-10-07 17:42:28
 * @LastEditTime: 2021-12-14 20:56:49
 * @LastEditors: youjingyu
 * @Description:
 */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { fallbackText as fallbackTextFn, isEmpty, tryToNumber } from '../../../utils';
import { toLocaleString } from '../../utils';
dayjs.extend(utc);
export var intFormatter = {
    type: 'int',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return (isEmpty(cellData) ? '-' : toLocaleString(cellData));
    },
};
export var floatFormatter = {
    type: 'float',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return (isEmpty(cellData) ? '-' : toLocaleString(cellData));
    },
};
export var money = {
    type: 'money',
    formatterFn: function (_a) {
        var _b;
        var cellData = _a.cellData;
        // 金额保留两位小数
        return isEmpty(cellData) ? '-' : (_b = cellData.toLocaleString) === null || _b === void 0 ? void 0 : _b.call(cellData, undefined, { maximumFractionDigits: 2 });
    },
};
var formatTime = function (time, isUtc) {
    if (isUtc === void 0) { isUtc = false; }
    if (isEmpty(time))
        return '-';
    var fixedTime = tryToNumber(time);
    if (typeof fixedTime === 'number' && fixedTime.toString().length < 13) {
        fixedTime = Number("".concat(fixedTime, "000"));
    }
    var FORMAT_TIME_STYLE = 'YYYY-MM-DD HH:mm:ss';
    // 如果不合法，返回原始值
    if (!dayjs(fixedTime).isValid()) {
        return time;
    }
    if (isUtc) {
        return dayjs.utc(fixedTime).local().format(FORMAT_TIME_STYLE);
    }
    return dayjs(fixedTime).format(FORMAT_TIME_STYLE);
};
export var time = {
    type: 'time',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return formatTime(cellData);
    },
};
export var utcTime = {
    type: 'utcTime',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return formatTime(cellData, true);
    },
};
export var timestamp = {
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
export var fallbackText = {
    type: 'fallbackText',
    formatterFn: function (_a) {
        var cellData = _a.cellData;
        return fallbackTextFn(cellData);
    },
};
export var formatter = {
    fallbackText: function (value) { return fallbackTextFn(value); },
    timestamp: function (value) { var _a; return (_a = timestamp.formatterFn) === null || _a === void 0 ? void 0 : _a.call(timestamp, { cellData: value }); },
    utcTime: function (value) { return formatTime(value, true); },
    time: function (value) { return formatTime(value); },
    money: function (value) { var _a; return (_a = money.formatterFn) === null || _a === void 0 ? void 0 : _a.call(money, { cellData: value }); },
    float: function (value) { var _a; return (_a = floatFormatter.formatterFn) === null || _a === void 0 ? void 0 : _a.call(floatFormatter, { cellData: value }); },
    int: function (value) { var _a; return (_a = intFormatter.formatterFn) === null || _a === void 0 ? void 0 : _a.call(intFormatter, { cellData: value }); },
};
//# sourceMappingURL=index.js.map