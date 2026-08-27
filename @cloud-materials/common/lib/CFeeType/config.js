"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChargeTypeLabel = exports.useChargeLocalConfig = exports.setChargeStatusConfig = void 0;
var tslib_1 = require("tslib");
var CConfigProvider_1 = require("../CConfigProvider");
var const_1 = require("./const");
var interface_1 = require("./interface");
var statusConfig;
var setChargeStatusConfig = function (config) {
    var customStatusMap = config.customStatusMap, defaultChargeLabel = config.defaultChargeLabel, customChargeLabel = config.customChargeLabel;
    statusConfig = { customStatusMap: customStatusMap, defaultChargeLabel: defaultChargeLabel, customChargeLabel: customChargeLabel };
};
exports.setChargeStatusConfig = setChargeStatusConfig;
/** 获取statusMap */
var useChargeLocalConfig = function (options) {
    var chargeType = options.chargeType, _a = options.isClosed, isClosed = _a === void 0 ? false : _a, _b = options.isReclaim, isReclaim = _b === void 0 ? false : _b;
    var _c = (0, const_1.useChargeText)(chargeType), defaultStatusMap = _c.defaultStatusMap, ChargeTypeLabel = _c.ChargeTypeLabel;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var getChargeStatusMap = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var _h, _j;
        var displayType = chargeType === 'PrePaid' ? interface_1.DisplayTypeKey.wait : interface_1.DisplayTypeKey.none;
        var WaitStatusConfig = (_a = {},
            _a[interface_1.ChargeStatusKey.WaitingPaid] = { statusName: locale.CFeeType.waitingPaid, displayType: displayType },
            _a);
        var ExpiredStatusConfig = {
            PrePaid: (_b = {},
                _b[interface_1.ChargeStatusKey.Overdue] = {
                    statusName: locale.CFeeType.overdue,
                    nextStatusName: locale.CFeeType.shutdown,
                    displayType: interface_1.DisplayTypeKey.error,
                },
                _b),
            PostPaid: (_c = {},
                _c[interface_1.ChargeStatusKey.Owing] = {
                    statusName: locale.CFeeType.owing,
                    nextStatusName: locale.CFeeType.shutdown,
                    displayType: interface_1.DisplayTypeKey.error,
                },
                _c),
        };
        var ClosedStatusConfig = {
            PrePaid: (_d = {},
                _d[interface_1.ChargeStatusKey.Overdue] = {
                    statusName: locale.CFeeType.shutdown,
                    nextStatusName: locale.CFeeType.reclaim,
                    displayType: interface_1.DisplayTypeKey.error,
                },
                _d),
            PostPaid: (_e = {},
                _e[interface_1.ChargeStatusKey.Owing] = {
                    statusName: locale.CFeeType.shutdown,
                    nextStatusName: locale.CFeeType.reclaim,
                    displayType: interface_1.DisplayTypeKey.error,
                },
                _e),
        };
        var ReclaimStatusConfig = {
            PrePaid: (_f = {},
                _f[interface_1.ChargeStatusKey.Overdue] = {
                    statusName: locale.CFeeType.reclaim,
                    displayType: interface_1.DisplayTypeKey.error,
                },
                _f),
            PostPaid: (_g = {},
                _g[interface_1.ChargeStatusKey.Owing] = {
                    statusName: locale.CFeeType.reclaim,
                    displayType: interface_1.DisplayTypeKey.error,
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
            return tslib_1.__assign(tslib_1.__assign({}, defaultStatusMap), statusConfig === null || statusConfig === void 0 ? void 0 : statusConfig.customStatusMap);
        }
        return defaultStatusMap;
    };
    if (statusConfig === null || statusConfig === void 0 ? void 0 : statusConfig.customChargeLabel) {
        Object.assign(ChargeTypeLabel, statusConfig.customChargeLabel);
    }
    return { ChargeTypeLabel: ChargeTypeLabel, defaultStatusMap: getChargeStatusMap() };
};
exports.useChargeLocalConfig = useChargeLocalConfig;
/** 获取未匹配到计费方式的默认的兜底文案 */
var getChargeTypeLabel = function () { var _a; return (_a = statusConfig === null || statusConfig === void 0 ? void 0 : statusConfig.defaultChargeLabel) !== null && _a !== void 0 ? _a : '-'; };
exports.getChargeTypeLabel = getChargeTypeLabel;
//# sourceMappingURL=config.js.map