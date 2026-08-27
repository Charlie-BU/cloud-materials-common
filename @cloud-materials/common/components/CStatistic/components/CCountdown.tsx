import React from 'react';
import cs from 'classnames';
import { Statistic } from '@arco-design/web-react';
import CStatistic from '../index';

import { useCConfigContext } from '../../CConfigProvider';
import type { CCountdownProps } from '../interface';

const Countdown = Statistic.Countdown;

const CCountdown: React.FC<CCountdownProps> = props => {
  const {
    style,
    className,
    title,
    unit,
    describe,
    suffix,
    prefix,
    styleValue,
    border,
    renderFormat,
    ...restCountdownProps
  } = props;
  const { useCssPrefix } = useCConfigContext();
  const classPrefix = useCssPrefix('statistic');
  return (
    <Countdown
      {...restCountdownProps}
      style={{ ...style }}
      className={cs(classPrefix``, classPrefix`countdown`, className)}
      renderFormat={(valueDiff, _value) => {
        return (
          <CStatistic
            title={title}
            styleValue={styleValue}
            border={border}
            value={_value}
            renderFormat={() => {
              if (renderFormat) {
                return renderFormat(valueDiff, _value);
              } else {
                return _value;
              }
            }}
            unit={unit}
            describe={describe}
            prefix={prefix}
            suffix={suffix}
          />
        );
      }}
    />
  );
};
export default CCountdown;
