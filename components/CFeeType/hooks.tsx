import { useCountDown } from 'ahooks';
import { useCConfigContext } from '../CConfigProvider';
import { useChargeLocalConfig } from './config';
import type { CFeeTypeHooksProps } from './interface';
import { DisplayTypeKey } from './interface';

export const useCountDownConfig = (props: CFeeTypeHooksProps) => {
  const { date, chargeStatus = '', chargeType, isClosed, isReclaim, statusMap } = props;
  const [, formattedRes] = useCountDown({ targetDate: date });
  const { defaultStatusMap } = useChargeLocalConfig({ chargeType, isClosed, isReclaim });
  const { statusName, nextStatusName, displayType } = statusMap?.[chargeStatus] ?? defaultStatusMap[chargeStatus] ?? {};
  const { days, hours, minutes, seconds } = formattedRes;
  let restTime: string;

  const { locale, formatLocale } = useCConfigContext();

  switch (true) {
    // 大于1天：x天后xx
    case days >= 1:
      restTime = formatLocale(locale.CFeeType.days, { days });
      break;
    case Boolean(hours):
      // normal下，1天内：24小时内xx
      // error下，x小时x分后xx
      restTime =
        displayType === DisplayTypeKey.normal
          ? locale.CFeeType.lessOneDay
          : formatLocale(locale.CFeeType.hours, { hours, minutes });
      break;
    case Boolean(minutes):
      // 1小时内：x分钟后xx
      restTime = formatLocale(locale.CFeeType.minutes, { minutes });
      break;
    case !minutes && Boolean(seconds):
      // 1分钟内：1分钟内xx
      restTime = locale.CFeeType.lessOneMin;
      break;
    default:
      // 兜底展示：即将xx;
      restTime = locale.CFeeType.willBe;
  }
  return { statusName, nextStatusName, restTime, formattedRes };
};
