import { connect, mapProps } from '@formily/react';
import type { ReactText } from 'react';
import type { Field } from '@formily/core';
import Checkbox from '../../../../CCheckbox';
import type { CCheckboxGroupOption } from '../../../../CCheckbox/interface';

const CCheckbox = connect(
  Checkbox.Group,
  mapProps((props, field) => {
    if (!field) return props;
    return {
      options: props?.options || ((field as Field).dataSource as CCheckboxGroupOption<ReactText>[]),
      value: (field as Field).value,
    };
  }),
);

export default CCheckbox;
