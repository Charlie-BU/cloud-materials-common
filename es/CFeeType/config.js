import { __assign } from "tslib";
import { useCConfigContext } from '../CConfigProvider';
import { useChargeText } from './const';
import { ChargeStatusKey, DisplayTypeKey } from './interface';
var statusConfig;
export var setChargeStatusConfig = function (config) {
    var customStatusMap = config.customStatusMap, defaultChargeLabel = config.defaultChargeLabel, customChargeLabel = config.customChargeLabel;
    statusConfig = { customStatusMap: customStatusMap, defaultChargeLabel: defaultChargeLabel, customChargeLabel: customChargeLabel };
};
/** 获取statusMap */
export var useChargeLocalConfig = function (options) {
    var chargeType = options.chargeType, _a = options.isClosed, isClosed = _a === void 0 ? false : _a, _b = options.isReclaim, isReclaim = _b === void 0 ? false : _b;
    var _c = useChargeText(chargeType), defaultStatusMap = _c.defaultStatusMap, ChargeTypeLabel = _c.ChargeTypeLabel;
    var locale = useCConfigContext().locale;
    var getChargeStatusMap = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var _h, _j;
        var displayType = chargeType === 'PrePaid' ? DisplayTypeKey.wait : DisplayTypeKey.none;
        var WaitStatusConfig = (_a = {},
            _a[ChargeStatusKey.WaitingPaid] = { statusName: locale.CFeeType.waitingPaid, displayType: displayType },
            _a);
        var ExpiredStatusConfig = {
            PrePaid: (_b = {},
                _b[ChargeStatusKey.Overdue] = {
                    statusName: locale.CFeeType.overdue,
                    nextStatusName: locale.CFeeType.shutdown,
                    displayType: DisplayTypeKey.error,
                },
                _b),
            PostPaid: (_c = {},
                _c[ChargeStatusKey.Owing] = {
                    statusName: locale.CFeeType.owing,
                    nextStatusName: locale.CFeeType.shutdown,
                    displayType: DisplayTypeKey.error,
                },
                _c),
        };
        var ClosedStatusConfig = {
            PrePaid: (_d = {},
                _d[ChargeStatusKey.Overdue] = {
                    statusName: locale.CFeeType.shutdown,
                    nextStatusName: locale.CFeeType.reclaim,
                    displayType: DisplayTypeKey.error,
                },
                _d),
            PostPaid: (_e = {},
                _e[ChargeStatusKey.Owing] = {
                    statusName: locale.CFeeType.shutdown,
                    nextStatusName: locale.CFeeType.reclaim,
                    displayType: DisplayTypeKey.error,
                },
                _e),
        };
        var ReclaimStatusConfig = {
            PrePaid: (_f = {},
                _f[ChargeStatusKey.Overdue] = {
                    statusName: locale.CFeeType.reclaim,
                    displayType: DisplayTypeKey.error,
                },
                _f),
            PostPaid: (_g = {},
                _g[ChargeStatusKey.Owing] = {
                    statusName: locale.CFeeType.reclaim,
                    displayType: DisplayTypeKey.error,
                },
                _g),
        };
        // 根据chargeType获取等待计费时的计费配置
        Object.assign(defaultStatusMap, WaitStatusConfig);
        // 内置状态映射map： 根据业务自定义的是否是关停态/释放态 更新内置默认map
        if (isClosed) {
            // 已关停态
            Object.assign(defaultStatusMap, ClosedStatusConfig[(chargeType !== null && chargeType !== void 0 ? chargeType : '')]);
        }
        else if (isReclaim) {
            // 已释放态
            Object.assign(defaultStatusMap, ReclaimStatusConfig[(chargeType !== null && chargeType !== void 0 ? chargeType : '')]);
        }
        else {
            // 已到期/已欠费
            Object.assign(defaultStatusMap, ExpiredStatusConfig[(chargeType !== null && chargeType !== void 0 ? chargeType : '')]);
        }
        if ((_j = Object.keys((_h = statusConfig === null || statusConfig === void 0 ? void 0 : statusConfig.customStatusMap) !== null && _h !== void 0 ? _h : {})) === null || _j === void 0 ? void 0 : _j.length) {
            return __assign(__assign({}, defaultStatusMap), statusConfig === null || statusConfig === void 0 ? void 0 : statusConfig.customStatusMap);
        }
        return defaultStatusMap;
    };
    if (statusConfig === null || statusConfig === void 0 ? void 0 : statusConfig.customChargeLabel) {
        Object.assign(ChargeTypeLabel, statusConfig.customChargeLabel);
    }
    return { ChargeTypeLabel: ChargeTypeLabel, defaultStatusMap: getChargeStatusMap() };
};
/** 获取未匹配到计费方式的默认的兜底文案 */
export var getChargeTypeLabel = function () { var _a; return (_a = statusConfig === null || statusConfig === void 0 ? void 0 : statusConfig.defaultChargeLabel) !== null && _a !== void 0 ? _a : '-'; };
//# sourceMappingURL=config.js.map