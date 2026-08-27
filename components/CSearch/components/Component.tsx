import React from 'react';
import { AutoComplete, DatePicker, InputNumber, Select } from '@arco-design/web-react';
import type { CSearchComponentProps } from '../interface';
import type { DefineComponentPropsMapType } from '../../_factory/builtInComponent';
import { useBuiltIn } from '../../_factory/builtInComponent';
import { useCConfigContext } from '../../CConfigProvider';
import SearchInput from './SearchInput';

const { RangePicker } = DatePicker;

export const components = {
  Input: SearchInput,
  InputNumber,
  Select,
  DatePicker,
  RangePicker,
  AutoComplete,
};

export type CSearchComponentEnum = typeof components;
export type CSearchComponentType = keyof CSearchComponentEnum;

const SearchComponent = ({ content, commonProps }: CSearchComponentProps) => {
  const { renderBuiltIn } = useBuiltIn();
  const { getCPrefixCls, locale } = useCConfigContext();
  const componentCls = getCPrefixCls('search-component');

  const getDefaultPlaceholder = (name: CSearchComponentType) => {
    if (['Input', 'InputNumber', 'AutoComplete'].includes(name)) {
      return locale.CSearch.inputPlaceholder;
    }
    if (name === 'Select') {
      return locale.CSearch.selectPlaceholder;
    }
    return;
  };

  const defaultProps: DefineComponentPropsMapType<CSearchComponentEnum> = Object.fromEntries(
    Object.keys(components).map(name => [
      name,
      {
        className: componentCls,
        placeholder: getDefaultPlaceholder(name as CSearchComponentType),
      },
    ]),
  );

  return (
    <>
      {renderBuiltIn(content, {
        defaultPropsMap: defaultProps,
        commonProps,
      })}
    </>
  );
};

export default SearchComponent;
