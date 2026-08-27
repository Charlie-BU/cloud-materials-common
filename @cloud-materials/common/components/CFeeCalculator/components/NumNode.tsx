import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import { InputNumber } from '@arco-design/web-react';
import classNames from 'classnames';
import type { MergedNumConfig, ValueType } from '../interface';
import { feePrefix } from '../utils/prefix';

interface NumNodeProps {
  // 数量相关状态
  numConfigState: MergedNumConfig;
  // 数量发生变化，调用的回掉函数
  handleOnChange: (newConfig: Partial<ValueType>) => void;
}

export const NumNode: React.FC<NumNodeProps> = ({ numConfigState, handleOnChange }) => {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix(feePrefix);
  return (
    <div className={cssPrefix`num`}>
      <div className={classNames(cssPrefix`num-title`)}>{numConfigState.numLabel}</div>
      <InputNumber
        className={cssPrefix`num-input`}
        data-cy={testId.numInput}
        data-testid={testId.numInput}
        defaultValue={numConfigState.num}
        max={numConfigState.maxNum}
        min={numConfigState.minNum}
        suffix={numConfigState.numUnit}
        // InputNumber组件始终受控
        value={numConfigState.num}
        onChange={num => {
          handleOnChange({ num });
        }}
        mode="button"
        precision={0}
      />
    </div>
  );
};
