import { useCConfigContext } from '../CConfigProvider';
import { useChargeText } from './const';
import type { ChargeStatusConfigType, ChargeType, ChargeStatusMap } from './interface';
import { ChargeStatusKey, DisplayTypeKey } from './interface';

let statusConfig: ChargeStatusConfigType;

export const setChargeStatusConfig = (config: ChargeStatusConfigType): void => {
  const { customStatusMap, defaultChargeLabel, customChargeLabel } = config;
  statusConfig = { customStatusMap, defaultChargeLabel, customChargeLabel };
};

/** 获取statusMap */
export const useChargeLocalConfig = (options: { chargeType?: ChargeType; isClosed?: boolean; isReclaim?: boolean }) => {
  const { chargeType, isClosed = false, isReclaim = false } = options;
  const { defaultStatusMap, ChargeTypeLabel } = useChargeText(chargeType);
  const { locale } = useCConfigContext();
  const getChargeStatusMap = (): ChargeStatusMap => {
    const displayType: DisplayTypeKey = chargeType === 'PrePaid' ? DisplayTypeKey.wait : DisplayTypeKey.none;
    const WaitStatusConfig = {
      [ChargeStatusKey.WaitingPaid]: { statusName: locale.CFeeType.waitingPaid, displayType: displayType },
    };
    const ExpiredStatusConfig: Record<ChargeType, ChargeStatusMap> = {
      PrePaid: {
        [ChargeStatusKey.Overdue]: {
          statusName: locale.CFeeType.overdue,
          nextStatusName: locale.CFeeType.shutdown,
          displayType: DisplayTypeKey.error,
        },
      },
      PostPaid: {
        [ChargeStatusKey.Owing]: {
          statusName: locale.CFeeType.owing,
          nextStatusName: locale.CFeeType.shutdown,
          displayType: DisplayTypeKey.error,
        },
      },
    };
    const ClosedStatusConfig: Record<ChargeType, ChargeStatusMap> = {
      PrePaid: {
        [ChargeStatusKey.Overdue]: {
          statusName: locale.CFeeType.shutdown,
          nextStatusName: locale.CFeeType.reclaim,
          displayType: DisplayTypeKey.error,
        },
      },
      PostPaid: {
        [ChargeStatusKey.Owing]: {
          statusName: locale.CFeeType.shutdown,
          nextStatusName: locale.CFeeType.reclaim,
          displayType: DisplayTypeKey.error,
        },
      },
    };
    const ReclaimStatusConfig: Record<ChargeType, ChargeStatusMap> = {
      PrePaid: {
        [ChargeStatusKey.Overdue]: {
          statusName: locale.CFeeType.reclaim,
          displayType: DisplayTypeKey.error,
        },
      },
      PostPaid: {
        [ChargeStatusKey.Owing]: {
          statusName: locale.CFeeType.reclaim,
          displayType: DisplayTypeKey.error,
        },
      },
    };
    // 根据chargeType获取等待计费时的计费配置
    Object.assign(defaultStatusMap, WaitStatusConfig);
    // 内置状态映射map： 根据业务自定义的是否是关停态/释放态 更新内置默认map
    if (isClosed) {
      // 已关停态
      Object.assign(defaultStatusMap, ClosedStatusConfig[(chargeType ?? '') as ChargeType]);
    } else if (isReclaim) {
      // 已释放态
      Object.assign(defaultStatusMap, ReclaimStatusConfig[(chargeType ?? '') as ChargeType]);
    } else {
      // 已到期/已欠费
      Object.assign(defaultStatusMap, ExpiredStatusConfig[(chargeType ?? '') as ChargeType]);
    }

    if (Object.keys(statusConfig?.customStatusMap ?? {})?.length) {
      return { ...defaultStatusMap, ...statusConfig?.customStatusMap } as ChargeStatusMap;
    }

    return defaultStatusMap;
  };

  if (statusConfig?.customChargeLabel) {
    Object.assign(ChargeTypeLabel, statusConfig.customChargeLabel);
  }

  return { ChargeTypeLabel, defaultStatusMap: getChargeStatusMap() };
};

/** 获取未匹配到计费方式的默认的兜底文案 */
export const getChargeTypeLabel = () => statusConfig?.defaultChargeLabel ?? '-';
