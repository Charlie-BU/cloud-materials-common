import { __makeTemplateObject } from "tslib";
import React from 'react';
import dayjs from 'dayjs';
import { Popover } from '@arco-design/web-react';
import { cssPrefix } from '..';
import { useCountDownConfig } from '../hooks';
import { useCConfigContext } from '../../CConfigProvider';
/** Normal状态的展示 */
export var Normal = function (props) {
    var date = props.date, name = props.name, chargeStatus = props.chargeStatus, chargeType = props.chargeType, statusMap = props.statusMap;
    var restTime = useCountDownConfig({ date: date, chargeStatus: chargeStatus, chargeType: chargeType, statusMap: statusMap }).restTime;
    var _a = useCConfigContext(), locale = _a.locale, formatLocale = _a.formatLocale;
    if (!date || !name)
        return null;
    var timeInfo = formatLocale(locale.CFeeType.timeInfo, {
        time: dayjs(date).format(locale.CFeeType.formatTime),
        name: name,
        split: locale.CFeeType.timeWithStatusSplit,
    });
    // 正常状态的包年包月实例需要判断即将到期的时间是否大于7天
    var isRestTimeLessSevenDays = chargeType === 'PrePaid' && dayjs(date).diff(Date.now(), 'd') < 7 && dayjs(date).diff(Date.now()) > 0;
    return isRestTimeLessSevenDays ? (React.createElement(Popover, { content: timeInfo, className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["detail-normal-pop-container"], ["detail-normal-pop-container"]))) },
        React.createElement("span", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["detail-normal-content"], ["detail-normal-content"]))) }, formatLocale(locale.CFeeType.timeInfo, { time: restTime, name: name, split: locale.CFeeType.warningSplit })))) : (React.createElement("span", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["detail-normal"], ["detail-normal"]))) }, timeInfo));
};
/** error 状态下的展示 */
export var ChargeError = function (props) {
    var statusName = props.statusName, nextStatusName = props.nextStatusName, date = props.date;
    var restTime = useCountDownConfig({ date: date }).restTime;
    var _a = useCConfigContext(), locale = _a.locale, formatLocale = _a.formatLocale;
    var status = "".concat(locale.CFeeType.be).concat(statusName);
    // 没有时间或者下一个状态时，都不展示下一个状态的提示
    if (nextStatusName && date) {
        status = "".concat(status).concat(locale.CFeeType.colon).concat(formatLocale(locale.CFeeType.timeInfo, {
            time: restTime,
            name: nextStatusName,
            split: '',
        }));
    }
    return React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["detail-error"], ["detail-error"]))) }, status);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map