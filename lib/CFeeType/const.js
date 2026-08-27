"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChargeText = void 0;
var CConfigProvider_1 = require("../CConfigProvider");
var interface_1 = require("./interface");
var useChargeText = function (chargeType) {
    var _a;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var isPostPaid = chargeType === 'PostPaid';
    var ChargeTypeLabel = {
        PostPaid: locale.CFeeType.postpaid,
        PrePaid: locale.CFeeType.prepaid,
    };
    var defaultStatusMap = (_a = {},
        _a[interface_1.ChargeStatusKey.WaitingPaid] = { statusName: locale.CFeeType.waitingPaid, displayType: 'none' },
        _a[interface_1.ChargeStatusKey.Normal] = {
            statusName: locale.CFeeType.normal,
            nextStatusName: isPostPaid ? locale.CFeeType.owing : locale.CFeeType.overdue,
            displayType: interface_1.DisplayTypeKey.normal,
        },
        _a[interface_1.ChargeStatusKey.Owing] = {
            statusName: locale.CFeeType.owing,
            nextStatusName: locale.CFeeType.shutdown,
            displayType: interface_1.DisplayTypeKey.error,
        },
        _a[interface_1.ChargeStatusKey.Overdue] = {
            statusName: locale.CFeeType.overdue,
            nextStatusName: locale.CFeeType.shutdown,
            displayType: interface_1.DisplayTypeKey.error,
        },
        _a[interface_1.ChargeStatusKey.ChangingPayType] = {
            statusName: locale.CFeeType.changingPayType,
            displayType: interface_1.DisplayTypeKey.typechanging,
        },
        _a[interface_1.ChargeStatusKey.Renewing] = { statusName: locale.CFeeType.renewing, displayType: interface_1.DisplayTypeKey.changing },
        _a[interface_1.ChargeStatusKey.Unsubscribing] = {
            statusName: locale.CFeeType.unsubscribing,
            displayType: interface_1.DisplayTypeKey.changing,
        },
        _a);
    return { ChargeTypeLabel: ChargeTypeLabel, defaultStatusMap: defaultStatusMap };
};
exports.useChargeText = useChargeText;
//# sourceMappingURL=const.js.map