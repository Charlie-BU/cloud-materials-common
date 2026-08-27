import React from 'react';
import type { CFeeTypeProps, StatusChangeDate, TimeType } from './interface';
import { DisplayTypeKey } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { isSingleTime } from './utils';
import { Normal, ChargeError } from './components';
import { IconLoading } from '@arco-design/iconbox-react-ve-o-design';
import { getChargeTypeLabel, setChargeStatusConfig, useChargeLocalConfig } from './config';
import { useCConfigContext } from '../CConfigProvider';

export const cssPrefix = classNamePrefixFactory('fee-type');
const testId = {
  container: cssPrefix`container`,
  type: cssPrefix`type`,
};

const CFeeType = (props: CFeeTypeProps) => {
  const {
    chargeType,
    chargeStatus,
    createTime,
    statusChangeTime,
    style,
    className,
    customStatusMap,
    defaultChargeLabel,
    isClosed,
    isReclaim,
    customChargeLabel,
  } = props;

  const { defaultStatusMap, ChargeTypeLabel } = useChargeLocalConfig({ chargeType, isClosed, isReclaim });
  //获取计费状态的map映射表，优先级：组件props传入 > 组件config配置 > 组件内置map
  const statusMap = customStatusMap ?? defaultStatusMap;
  // 获取计费类型的label，优先级：组件props传入 > 组件config > 组件内置默认值
  const validChargeType = customChargeLabel ?? ChargeTypeLabel;
  const { statusName = '', nextStatusName, displayType } = statusMap[chargeStatus] || {};

  const chargeTypeLabel = validChargeType[chargeType] ?? defaultChargeLabel ?? getChargeTypeLabel();

  const isPostPaid = chargeType === 'PostPaid';
  // 判断当前数传入一个时间还是一次传入多个时间
  const _isSingleTime = isSingleTime(statusChangeTime);
  let overdueTime: TimeType, closedTime: TimeType, reclaimTime: TimeType;
  if (_isSingleTime) {
    overdueTime = statusChangeTime as TimeType;
    closedTime = statusChangeTime as TimeType;
    reclaimTime = statusChangeTime as TimeType;
  } else {
    ({ overdueTime, closedTime, reclaimTime } = statusChangeTime as StatusChangeDate);
  }

  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('fee-type');

  const renderChargeStatus = () => {
    let detail;
    let date;
    switch (displayType) {
      case DisplayTypeKey.none:
        detail = null;
        break;
      case DisplayTypeKey.wait:
        detail = <div className={cssPrefix`detail-wait`}>{statusName}</div>;
        break;
      case DisplayTypeKey.normal:
        if (isPostPaid) {
          detail = createTime && (
            <Normal date={createTime} name={locale.CFeeType.created} chargeStatus={chargeStatus} />
          );
        } else {
          detail = (
            <Normal
              date={overdueTime as TimeType}
              name={nextStatusName}
              chargeStatus={chargeStatus}
              chargeType={chargeType}
              statusMap={statusMap}
            />
          );
        }
        break;
      case DisplayTypeKey.error:
        // 未关停 && 未删除时，处于到期/欠费状态，下一个状态是关停，取关停时间
        if (!isReclaim && !isClosed) {
          date = closedTime;
        } else if (isClosed) {
          // 关停态，下一状态是删除，取删除时间
          date = reclaimTime;
        } else {
          // 否则就是删除态，没有下一个状态
          date = '';
        }
        detail = <ChargeError statusName={statusName} nextStatusName={nextStatusName} date={date as TimeType} />;
        break;

      case DisplayTypeKey.typechanging:
      case DisplayTypeKey.changing:
        detail = (
          <span className={cssPrefix`detail-changing`}>
            <IconLoading className="arco-icon-loading" />
            <span className={cssPrefix`detail-changing-text`}>{statusName}</span>
          </span>
        );
        break;
      default:
        detail = null;
    }
    return detail;
  };

  return (
    <div style={style} className={classNames(cssPrefix``, className)} data-cy={testId.container}>
      {displayType !== DisplayTypeKey.typechanging && (
        <div className={cssPrefix`type`} data-cy={testId.type}>
          {chargeTypeLabel}
        </div>
      )}
      {renderChargeStatus()}
    </div>
  );
};

/** 注册全局状态映射配置 */
CFeeType.config = setChargeStatusConfig;

CFeeType.displayName = 'CFeeType';

export default CFeeType;
