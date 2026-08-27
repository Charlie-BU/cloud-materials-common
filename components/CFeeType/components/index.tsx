import type { FC } from 'react';
import React from 'react';
import dayjs from 'dayjs';
import { Popover } from '@arco-design/web-react';
import { cssPrefix } from '..';
import type { NormalProps, ChargeErrorProps } from '../interface';
import { useCountDownConfig } from '../hooks';
import { useCConfigContext } from '../../CConfigProvider';

/** Normal状态的展示 */
export const Normal: FC<NormalProps> = props => {
  const { date, name, chargeStatus, chargeType, statusMap } = props;
  const { restTime } = useCountDownConfig({ date, chargeStatus, chargeType, statusMap });

  const { locale, formatLocale } = useCConfigContext();
  if (!date || !name) return null;

  const timeInfo = formatLocale(locale.CFeeType.timeInfo, {
    time: dayjs(date).format(locale.CFeeType.formatTime),
    name,
    split: locale.CFeeType.timeWithStatusSplit,
  });

  // 正常状态的包年包月实例需要判断即将到期的时间是否大于7天
  const isRestTimeLessSevenDays =
    chargeType === 'PrePaid' && dayjs(date).diff(Date.now(), 'd') < 7 && dayjs(date).diff(Date.now()) > 0;
  return isRestTimeLessSevenDays ? (
    <Popover content={timeInfo} className={cssPrefix`detail-normal-pop-container`}>
      <span className={cssPrefix`detail-normal-content`}>
        {formatLocale(locale.CFeeType.timeInfo, { time: restTime, name, split: locale.CFeeType.warningSplit })}
      </span>
    </Popover>
  ) : (
    <span className={cssPrefix`detail-normal`}>{timeInfo}</span>
  );
};

/** error 状态下的展示 */
export const ChargeError: React.FC<ChargeErrorProps> = props => {
  const { statusName, nextStatusName, date } = props;

  const { restTime } = useCountDownConfig({ date });
  const { locale, formatLocale } = useCConfigContext();

  let status = `${locale.CFeeType.be}${statusName}`;
  // 没有时间或者下一个状态时，都不展示下一个状态的提示
  if (nextStatusName && date) {
    status = `${status}${locale.CFeeType.colon}${formatLocale(locale.CFeeType.timeInfo, {
      time: restTime,
      name: nextStatusName,
      split: '',
    })}`;
  }
  return <div className={cssPrefix`detail-error`}>{status}</div>;
};
