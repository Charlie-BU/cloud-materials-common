import type { UseCCombineSearchControl, UseCCombineSearchCustomProps, UseCCombineSearchValue } from '../../interface';
import { Input } from '@arco-design/web-react';
import React from 'react';
import ContentInput from './ContentInput';
import ContentSelect from './ContentSelect';

export interface ContentProps
  extends Pick<UseCCombineSearchValue, 'current' | 'tempValue' | 'placeholder' | 'defaultField' | 'searchWord'>,
    Pick<UseCCombineSearchControl, 'updateTempValue' | 'updateSearchValue' | 'updateSearchWord' | 'updateState'>,
    Pick<UseCCombineSearchCustomProps, 'alignType'> {
  className: string;
  readOnly: boolean;
}

const Content = (props: ContentProps) => {
  const {
    className,
    current,
    tempValue,
    placeholder,
    alignType,
    readOnly,
    defaultField,
    searchWord,
    updateSearchWord,
    updateTempValue,
    updateSearchValue,
    updateState,
  } = props;
  const isInLine = alignType === 'inline';

  if (current?.type === 'input') {
    return (
      <ContentInput
        className={className}
        size={isInLine ? 'mini' : 'default'}
        item={current}
        tempValue={tempValue}
        placeholder={placeholder}
        updateTempValue={updateTempValue}
        updateSearchValue={updateSearchValue}
        updateState={updateState}
      />
    );
  }

  if (current?.type === 'select') {
    return (
      <ContentSelect
        size={isInLine ? 'mini' : 'default'}
        searchWord={searchWord}
        className={className}
        item={current}
        tempValue={tempValue}
        placeholder={placeholder}
        updateTempValue={updateTempValue}
        updateSearchValue={updateSearchValue}
        updateSearchWord={updateSearchWord}
        updateState={updateState}
      />
    );
  }

  if (current?.type === 'custom' && tempValue !== undefined) {
    const onSave = (value = tempValue) => {
      updateSearchValue(value, current?.fieldName);
      updateState('default', null);
      updateTempValue(undefined);
    };
    const onBack = () => {
      updateState('field', null);
      updateTempValue(undefined);
    };
    return (
      <div className={className}>{current.renderTrigger?.({ item: current, value: tempValue, onSave, onBack })}</div>
    );
  }

  return (
    <Input
      autoFocus={!isInLine}
      size={isInLine ? 'mini' : 'default'}
      className={className}
      placeholder={placeholder}
      readOnly={!defaultField && readOnly}
      // TODO: 这里是默认字段进行输入，其输入内容应该是select的搜索词，而不是临时值，待优化
      onBlur={!readOnly ? () => updateTempValue(undefined) : undefined}
      onChange={v => updateTempValue(v)}
      value={tempValue}
    />
  );
};

export default Content;
