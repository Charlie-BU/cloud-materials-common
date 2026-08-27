import React from 'react';
import cs from 'classnames';
import { Statistic } from '@arco-design/web-react';
import { isNil } from 'lodash-es';

import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks/useMergeProps';
import type { CStatisticProps } from './interface';
import { cssPrefix } from './util';

import CStatisticList from './components/CStatisticList';
import CCountdown from './components/CCountdown';

const cssRoot = cssPrefix``;
export const testId = {
  container: `${cssRoot}-container`,
  title: `${cssRoot}-title`,
  describe: `${cssRoot}-describe`,
  unit: `${cssRoot}-unit`,
  suffix: `${cssRoot}-suffix`,
  placeholder: `${cssRoot}-placeholder`,
  listWrapper: `${cssRoot}-list-Wrapper`,
  listTitle: `${cssRoot}-listTitle`,
};
const defaultProps: CStatisticProps = {
  type: 'default',
  disabled: false,
  border: true,
  placeholder: '-',
};

function CStatistic(props: CStatisticProps) {
  const {
    style,
    className,
    describe,
    unit,
    prefix,
    suffix,
    title,
    value,
    type,
    disabled,
    border,
    placeholder,
    loading,
    onClick,
    ...restStatisticProps
  } = useMergeProps<CStatisticProps>(props, defaultProps, {});
  const { useCssPrefix } = useCConfigContext();
  const classPrefix = useCssPrefix('statistic');
  return (
    <div
      style={style}
      className={cs(classPrefix``, className, classPrefix`${type}`, {
        [classPrefix`border`]: border,
        [classPrefix`${type}-disabled`]: disabled,
      })}
      data-testid={testId.container}
      onClick={() => {
        if (type === 'link' && !disabled) {
          onClick?.();
        }
      }}
    >
      <Statistic
        {...restStatisticProps}
        value={value}
        loading={isNil(value) || loading}
        title={
          <div className={classPrefix`title`} data-testid={testId.title}>
            {title}
          </div>
        }
        prefix={prefix}
        suffix={
          <span>
            {unit && (
              <span className={classPrefix`unit`} data-testid={testId.unit}>
                {unit}
              </span>
            )}
            {suffix && (
              <span className={classPrefix`suffix`} data-testid={testId.suffix}>
                {suffix}
              </span>
            )}
          </span>
        }
        extra={
          !isNil(value) && !loading ? (
            describe && (
              <div className={classPrefix`describe`} data-testid={testId.describe}>
                {describe}
              </div>
            )
          ) : (
            <span className={classPrefix`placeholder`} data-testid={testId.placeholder}>
              {placeholder}
            </span>
          )
        }
      />
    </div>
  );
}

CStatistic.displayName = 'CStatistic';
CStatistic.List = CStatisticList;
CStatistic.Countdown = CCountdown;

export default CStatistic;
