import { useCConfigContext } from '../CConfigProvider';
import type { ChargeType, ChargeStatusMap } from './interface';
import { ChargeStatusKey, DisplayTypeKey } from './interface';

export const useChargeText = (chargeType?: ChargeType) => {
  const { locale } = useCConfigContext();

  const isPostPaid = chargeType === 'PostPaid';

  const ChargeTypeLabel: Record<ChargeType, string> = {
    PostPaid: locale.CFeeType.postpaid,
    PrePaid: locale.CFeeType.prepaid,
  };

  const defaultStatusMap: ChargeStatusMap = {
    [ChargeStatusKey.WaitingPaid]: { statusName: locale.CFeeType.waitingPaid, displayType: 'none' },
    [ChargeStatusKey.Normal]: {
      statusName: locale.CFeeType.normal,
      nextStatusName: isPostPaid ? locale.CFeeType.owing : locale.CFeeType.overdue,
      displayType: DisplayTypeKey.normal,
    },
    [ChargeStatusKey.Owing]: {
      statusName: locale.CFeeType.owing,
      nextStatusName: locale.CFeeType.shutdown,
      displayType: DisplayTypeKey.error,
    },
    [ChargeStatusKey.Overdue]: {
      statusName: locale.CFeeType.overdue,
      nextStatusName: locale.CFeeType.shutdown,
      displayType: DisplayTypeKey.error,
    },
    [ChargeStatusKey.ChangingPayType]: {
      statusName: locale.CFeeType.changingPayType,
      displayType: DisplayTypeKey.typechanging,
    },
    [ChargeStatusKey.Renewing]: { statusName: locale.CFeeType.renewing, displayType: DisplayTypeKey.changing },
    [ChargeStatusKey.Unsubscribing]: {
      statusName: locale.CFeeType.unsubscribing,
      displayType: DisplayTypeKey.changing,
    },
  };
  return { ChargeTypeLabel, defaultStatusMap };
};
