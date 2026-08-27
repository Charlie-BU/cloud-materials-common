import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import { Select } from '@arco-design/web-react';
import classNames from 'classnames';
import type { MergedDurationConfig, ValueType } from '../interface';
import { feePrefix } from '../utils/prefix';

interface DurationNodeProps {
  // 时长相关状态
  durationConfigState: MergedDurationConfig;
  // 时长发生变化时的回调函数
  handleOnChange: (newConfig: Partial<ValueType>) => void;
}

export const DurationNode: React.FC<DurationNodeProps> = ({ durationConfigState, handleOnChange }) => {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix(feePrefix);
  return (
    <div className={cssPrefix`duration`}>
      <div className={classNames(cssPrefix`duration-title`)}>{durationConfigState.durationLabel}</div>
      <Select
        className={cssPrefix`duration-select`}
        data-cy={testId.durationSelect}
        data-testid={testId.durationSelect}
        options={durationConfigState.durationOptions}
        defaultValue={durationConfigState.duration}
        // Select组件始终受控
        value={durationConfigState.duration}
        onChange={duration => {
          handleOnChange({ duration });
        }}
      />
    </div>
  );
};
