import type { FC } from 'react';
import React from 'react';
import { observer } from '@formily/react';
import type { CheckboxProps } from '@arco-design/web-react';
import { Checkbox, Popover } from '@arco-design/web-react';
import { IconQuestionCircle } from '@arco-design/web-react/icon';
import classnames from 'classnames';
import CEllipsis from '../../../../../CEllipsis';
import { usePrefix } from '../../../../react';

interface Props extends CheckboxProps {
  name: string;
  value: boolean;
  tooltip?: React.ReactNode;
  onChange: (checked: boolean) => void;
}

export const CheckboxItem: FC<Props> = observer(props => {
  const { name, value, tooltip, disabled, onChange, ...restProps } = props;

  const prefixCls = usePrefix('comp-col-config-btn-checkbox-item');
  const handleClick = () => {
    if (disabled) return;
    onChange(!value);
  };

  return (
    <span className={classnames(`${prefixCls}`, { disabled })} onClick={handleClick}>
      <Checkbox checked={value} disabled={disabled} {...restProps} />
      <span className={`${prefixCls}-name`}>
        <CEllipsis content={name} />
      </span>
      {tooltip && (
        <Popover content={tooltip}>
          <IconQuestionCircle className={`${prefixCls}-tooltip`} />
        </Popover>
      )}
    </span>
  );
});
