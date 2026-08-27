import React from 'react';
import { Input, InputNumber, InputTag } from '@arco-design/web-react';
import type { CCombineSearchInput, UseCCombineSearchControl, UseCCombineSearchValue } from '../../interface';

interface ContentInputProps
  extends Pick<UseCCombineSearchValue, 'tempValue' | 'placeholder'>,
    Pick<UseCCombineSearchControl, 'updateTempValue' | 'updateSearchValue' | 'updateState'> {
  item: CCombineSearchInput;
  size?: 'mini' | 'small' | 'default' | 'large';
  onBlur?: () => void;
  className?: string;
}

const ContentInput = (props: ContentInputProps) => {
  const { className, item, tempValue, size, placeholder, updateTempValue, updateSearchValue, updateState, onBlur } =
    props;

  if (item.mode === 'number') {
    return (
      <InputNumber
        className={className}
        autoFocus
        size={size}
        hideControl
        placeholder={placeholder}
        value={tempValue}
        onChange={val => {
          updateTempValue(val);
        }}
        onBlur={onBlur}
      />
    );
  } else if (item.mode === 'tag') {
    return (
      <InputTag
        className={className}
        autoFocus
        allowClear={false}
        placeholder={placeholder}
        value={tempValue as string[]}
        onChange={val => {
          updateTempValue(val);
        }}
        size={size}
        onBlur={onBlur}
        onPressEnter={e => {
          e.stopPropagation();
          if (!e.target.value.trim()) {
            updateSearchValue(tempValue);
          }
        }}
        onKeyDown={e => {
          if (e.key === 'Backspace') {
            if (!tempValue?.length) {
              updateState('field', null);
              updateTempValue(undefined);
            }
          }
        }}
      />
    );
  }

  return (
    <Input
      className={className}
      autoFocus
      allowClear={false}
      placeholder={placeholder}
      value={tempValue as string}
      onChange={val => {
        updateTempValue(val);
      }}
      size={size}
      onBlur={onBlur}
    />
  );
};

export default ContentInput;
