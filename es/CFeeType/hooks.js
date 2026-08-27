import { __read } from "tslib";
import { useCountDown } from 'ahooks';
import { useCConfigContext } from '../CConfigProvider';
import { useChargeLocalConfig } from './config';
import { DisplayTypeKey } from './interface';
export var useCountDownConfig = function (props) {
    var _a, _b;
    var date = props.date, _c = props.chargeStatus, chargeStatus = _c === void 0 ? '' : _c, chargeType = props.chargeType, isClosed = props.isClosed, isReclaim = props.isReclaim, statusMap = props.statusMap;
    var _d = __read(useCountDown({ targetDate: date }), 2), formattedRes = _d[1];
    var defaultStatusMap = useChargeLocalConfig({ chargeType: chargeType, isClosed: isClosed, isReclaim: isReclaim }).defaultStatusMap;
    var _e = (_b = (_a = statusMap === null || statusMap === void 0 ? void 0 : statusMap[chargeStatus]) !== null && _a !== void 0 ? _a : defaultStatusMap[chargeStatus]) !== null && _b !== void 0 ? _b : {}, statusName = _e.statusName, nextStatusName = _e.nextStatusName, displayType = _e.displayType;
    var days = formattedRes.days, hours = formattedRes.hours, minutes = formattedRes.minutes, seconds = formattedRes.seconds;
    var restTime;
    var _f = useCConfigContext(), locale = _f.locale, formatLocale = _f.formatLocale;
    switch (true) {
        // 大于1天：x天后xx
        case days >= 1:
            restTime = formatLocale(locale.CFeeType.days, { days: days });
            break;
        case Boolean(hours):
            // normal下，1天内：24小时内xx
            // error下，x小时x分后xx
            restTime =
                displayType === DisplayTypeKey.normal
                    ? locale.CFeeType.lessOneDay
                    : formatLocale(locale.CFeeType.hours, { hours: hours, minutes: minutes });
            break;
        case Boolean(minutes):
            // 1小时内：x分钟后xx
            restTime = formatLocale(locale.CFeeType.minutes, { minutes: minutes });
            break;
        case !minutes && Boolean(seconds):
            // 1分钟内：1分钟内xx
            restTime = locale.CFeeType.lessOneMin;
            break;
        default:
            // 兜底展示：即将xx;
            restTime = locale.CFeeType.willBe;
    }
    return { statusName: statusName, nextStatusName: nextStatusName, restTime: restTime, formattedRes: formattedRes };
};
//# sourceMappingURL=hooks.js.map