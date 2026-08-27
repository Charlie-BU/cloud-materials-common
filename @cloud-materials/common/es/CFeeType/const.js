import { useCConfigContext } from '../CConfigProvider';
import { ChargeStatusKey, DisplayTypeKey } from './interface';
export var useChargeText = function (chargeType) {
    var _a;
    var locale = useCConfigContext().locale;
    var isPostPaid = chargeType === 'PostPaid';
    var ChargeTypeLabel = {
        PostPaid: locale.CFeeType.postpaid,
        PrePaid: locale.CFeeType.prepaid,
    };
    var defaultStatusMap = (_a = {},
        _a[ChargeStatusKey.WaitingPaid] = { statusName: locale.CFeeType.waitingPaid, displayType: 'none' },
        _a[ChargeStatusKey.Normal] = {
            statusName: locale.CFeeType.normal,
            nextStatusName: isPostPaid ? locale.CFeeType.owing : locale.CFeeType.overdue,
            displayType: DisplayTypeKey.normal,
        },
        _a[ChargeStatusKey.Owing] = {
            statusName: locale.CFeeType.owing,
            nextStatusName: locale.CFeeType.shutdown,
            displayType: DisplayTypeKey.error,
        },
        _a[ChargeStatusKey.Overdue] = {
            statusName: locale.CFeeType.overdue,
            nextStatusName: locale.CFeeType.shutdown,
            displayType: DisplayTypeKey.error,
        },
        _a[ChargeStatusKey.ChangingPayType] = {
            statusName: locale.CFeeType.changingPayType,
            displayType: DisplayTypeKey.typechanging,
        },
        _a[ChargeStatusKey.Renewing] = { statusName: locale.CFeeType.renewing, displayType: DisplayTypeKey.changing },
        _a[ChargeStatusKey.Unsubscribing] = {
            statusName: locale.CFeeType.unsubscribing,
            displayType: DisplayTypeKey.changing,
        },
        _a);
    return { ChargeTypeLabel: ChargeTypeLabel, defaultStatusMap: defaultStatusMap };
};
//# sourceMappingURL=const.js.map