import React from 'react';
import { observer, useField } from '@formily/react';
import CTableTransfer from '../../../../CTableTransfer';
import type { CTableTransferItem, CTableTransferProps } from '../../../../CTableTransfer/interface';
import type { Field, FieldDataSource } from '@formily/core';

export interface ICFormTableTransfer extends CTableTransferProps {
  value?: CTableTransferProps['defaultSelectedValues'];
}

const CFormTableTransfer = observer((props: ICFormTableTransfer) => {
  const { value = [], ...restProps } = props;
  const field = useField<Field>();
  const onDataSource = (dataSource: CTableTransferItem) => {
    field.setDataSource(dataSource as FieldDataSource);
  };
  return <CTableTransfer {...restProps} defaultSelectedValues={value} onDataSource={onDataSource} />;
});

export default CFormTableTransfer;
