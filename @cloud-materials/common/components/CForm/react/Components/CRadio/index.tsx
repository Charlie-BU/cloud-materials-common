import { observer, useField } from '@formily/react';
import React from 'react';
import Radio from '../../../../CRadio';
import type { CRadioGroupProps, GroupOption } from '../../../../CRadio/interface';
import type { CField } from '../../../interface';
import { isObject } from 'lodash-es';

const CRadio: React.FC<CRadioGroupProps> = observer(props => {
  const field = useField() as CField;
  const readPretty = field.readPretty;
  const dataSource = props?.options ?? (field.dataSource as GroupOption[]) ?? [];
  const currentOption = dataSource.find(optionItem => {
    const option = isObject(optionItem) ? optionItem : { value: optionItem, label: optionItem };
    return option.value === props?.value;
  });
  let readPrettyValue = props.value;
  if (currentOption) {
    readPrettyValue = isObject(currentOption) ? currentOption.label : currentOption;
  }

  return readPretty ? <span>{readPrettyValue}</span> : <Radio.Group {...props} options={dataSource} />;
});

export default CRadio;
