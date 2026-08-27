import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import {
  Input,
  InputTag,
  Select,
  InputNumber,
  Radio,
  Switch,
  Rate,
  Slider,
  TimePicker,
  Cascader,
  Checkbox,
} from '@arco-design/web-react';
import type { CascaderProps, CheckboxProps } from '@arco-design/web-react';

export const cssPrefix = classNamePrefixFactory('list-editor');

export const testId = {
  root: cssPrefix``,
  rowItem: cssPrefix`rowItem`,
  deleteButton: cssPrefix`delete-button`,
};

export const builtInMap = {
  Input,
  InputTag,
  Select,
  InputNumber,
  ['Input.TextArea']: Input.TextArea,
  Radio,
  ['Radio.Group']: Radio.Group,
  Switch,
  Rate,
  Slider,
  TimePicker,
  ['TimePicker.RangePicker']: TimePicker.RangePicker,
  Cascader: Cascader as React.FC<React.PropsWithChildren<CascaderProps>>,
  Checkbox: Checkbox as React.FC<React.PropsWithChildren<CheckboxProps>>,
};
