import React from 'react';
import { Form } from '@arco-design/web-react';
import type { CPopoverVerifyFormItemProps } from './interface';
import CPopoverVerify from './index';

const CPopoverVerifyFormItem = (props: CPopoverVerifyFormItemProps) => {
  const { rules, children, cPopoverVerifyProps, arcoPopoverProps, ...formItemProps } = props;

  return (
    <Form.Item {...formItemProps} rules={rules} help="">
      <CPopoverVerify rules={rules} {...cPopoverVerifyProps} arcoPopoverProps={arcoPopoverProps}>
        {children}
      </CPopoverVerify>
    </Form.Item>
  );
};

export default CPopoverVerifyFormItem;
