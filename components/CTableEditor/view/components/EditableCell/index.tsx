import React from 'react';
import CInlineEdit from '../../../../CInlineEdit';
import type { CInlineEditProps } from '../../../../CInlineEdit/interface';
import { noop } from 'lodash-es';

interface Props extends Omit<CInlineEditProps, 'value' | 'onSubmit'> {
  value?: any;
  onChange?: (value: any) => void;
  /**如果配置了 onSubmit，则会接管组件的默认 onChange 行为，用户需要在 onSubmit 中处理提交逻辑 */
  onSubmit?: (value: any, oldValue: any, /** 父组件下发的 onChange */ onChange: (v: any) => void) => void;
}

export const EditableCell: React.FC<Props> = props => {
  const { value, onChange = noop, onSubmit, ...restProps } = props;

  const handleSubmit = (v: any) => {
    return onSubmit ? onSubmit(v, value, onChange) : onChange(v);
    // if (onSubmit) {
    //   return onSubmit(v, value, onChange);
    // } else {
    //   onChange(v);
    // }
  };

  return <CInlineEdit {...restProps} value={value} onSubmit={handleSubmit} />;
};
