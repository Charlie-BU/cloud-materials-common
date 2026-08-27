"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargeError = exports.Normal = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var web_react_1 = require("@arco-design/web-react");
var __1 = require("..");
var hooks_1 = require("../hooks");
var CConfigProvider_1 = require("../../CConfigProvider");
/** Normal状态的展示 */
var Normal = function (props) {
    var date = props.date, name = props.name, chargeStatus = props.chargeStatus, chargeType = props.chargeType, statusMap = props.statusMap;
    var restTime = (0, hooks_1.useCountDownConfig)({ date: date, chargeStatus: chargeStatus, chargeType: chargeType, statusMap: statusMap }).restTime;
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, formatLocale = _a.formatLocale;
    if (!date || !name)
        return null;
    var timeInfo = formatLocale(locale.CFeeType.timeInfo, {
        time: (0, dayjs_1.default)(date).format(locale.CFeeType.formatTime),
        name: name,
        split: locale.CFeeType.timeWithStatusSplit,
    });
    // 正常状态的包年包月实例需要判断即将到期的时间是否大于7天
    var isRestTimeLessSevenDays = chargeType === 'PrePaid' && (0, dayjs_1.default)(date).diff(Date.now(), 'd') < 7 && (0, dayjs_1.default)(date).diff(Date.now()) > 0;
    return isRestTimeLessSevenDays ? (react_1.default.createElement(web_react_1.Popover, { content: timeInfo, className: (0, __1.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["detail-normal-pop-container"], ["detail-normal-pop-container"]))) },
        react_1.default.createElement("span", { className: (0, __1.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["detail-normal-content"], ["detail-normal-content"]))) }, formatLocale(locale.CFeeType.timeInfo, { time: restTime, name: name, split: locale.CFeeType.warningSplit })))) : (react_1.default.createElement("span", { className: (0, __1.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["detail-normal"], ["detail-normal"]))) }, timeInfo));
};
exports.Normal = Normal;
/** error 状态下的展示 */
var ChargeError = function (props) {
    var statusName = props.statusName, nextStatusName = props.nextStatusName, date = props.date;
    var restTime = (0, hooks_1.useCountDownConfig)({ date: date }).restTime;
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, formatLocale = _a.formatLocale;
    var status = "".concat(locale.CFeeType.be).concat(statusName);
    // 没有时间或者下一个状态时，都不展示下一个状态的提示
    if (nextStatusName && date) {
        status = "".concat(status).concat(locale.CFeeType.colon).concat(formatLocale(locale.CFeeType.timeInfo, {
            time: restTime,
            name: nextStatusName,
            split: '',
        }));
    }
    return react_1.default.createElement("div", { className: (0, __1.cssPrefix)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["detail-error"], ["detail-error"]))) }, status);
};
exports.ChargeError = ChargeError;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map