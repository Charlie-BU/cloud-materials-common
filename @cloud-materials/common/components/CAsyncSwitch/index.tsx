import React, { forwardRef } from 'react';
import { Switch, Popconfirm } from '@arco-design/web-react';
import type { CAsyncSwitchProps } from './interface';
import { useAsyncSubmit, useControlledValue } from '../hooks';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

const prefix = classNamePrefixFactory('async-switch');
export const testId = {
  popconfirm: prefix`popconfirm`,
  switch: prefix`switch`,
};

export const CAsyncSwitch = forwardRef<unknown, CAsyncSwitchProps>((props, ref) => {
  const {
    checked,
    defaultChecked,
    onChange,
    openConfirmTips,
    closeConfirmTips,
    disabled,
    arcoPopconfirmProps,
    ...otherProps
  } = props;
  const [value, setValue] = useControlledValue({
    ...props,
    defaultValue: defaultChecked,
    ...('checked' in props && { value: checked }),
  });
  const { loading, handleSubmit } = useAsyncSubmit<boolean>({
    onSubmit: onChange,
    setValue,
    isControlledMode: !('checked' in props || 'value' in props),
  });
  const withPopConfirm = value ? Boolean(closeConfirmTips) : Boolean(openConfirmTips);

  return (
    <Popconfirm
      disabled={disabled || !withPopConfirm}
      title={value ? closeConfirmTips : openConfirmTips}
      {...arcoPopconfirmProps}
      onOk={() => {
        withPopConfirm && handleSubmit(!value);
      }}
      data-cy={testId.popconfirm}
    >
      <Switch
        loading={loading}
        {...otherProps}
        ref={ref}
        checked={value}
        disabled={disabled}
        onChange={v => {
          !withPopConfirm && handleSubmit(v);
        }}
        data-cy={testId.switch}
      />
    </Popconfirm>
  );
});

//与arco switch保持同样处理，增加__BYTE_SWITCH标识需要处理进入如下处理：当 children 中的元素 disabled 时，不能正确触发 hover 等事件，所以当监测到对应组件有 disabled 时，给元素加一层 span，处理事件，模拟样式
const CAsyncSwitchComponent = CAsyncSwitch as typeof CAsyncSwitch & {
  __BYTE_SWITCH: boolean;
};

CAsyncSwitchComponent.__BYTE_SWITCH = true;

CAsyncSwitchComponent.displayName = 'CAsyncSwitch';

export default CAsyncSwitchComponent;
