import React from 'react';
import { connect, mapProps } from '@formily/react';
import CDrawerSelect from '../../../../CDrawerSelect';
import type { Field } from '@formily/core';
import type { CDrawerSelectProps } from '../../../../CDrawerSelect/interface';

const CFormDrawerSelectCom: React.FC<CDrawerSelectProps> = props => {
  const { controlledValue, onChange, ...restProps } = props;

  return <CDrawerSelect controlledValue={controlledValue} onValueChange={onChange} {...restProps} />;
};

export const CFormDrawerSelect = connect(
  CFormDrawerSelectCom,
  mapProps((props, field) => {
    if (!field) return props;
    return {
      rowKey: props.rowKey,
      data: props.data || (field as Field).dataSource,
      controlledValue: props.controlledValue || (field as Field).value,
    };
  }),
);
