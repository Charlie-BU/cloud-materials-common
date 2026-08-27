import React from 'react';
import type { CCombineSearchSelect, UseCCombineSearchControl, UseCCombineSearchValue } from '../../interface';
import type { InputTagProps } from '@arco-design/web-react';
import { InputTag, Tag } from '@arco-design/web-react';
import { isArray } from 'lodash-es';
import { valueToArray } from '../utils';
import CEllipsis from '../../../CEllipsis';

interface ContentSelectPropsProps
  extends Pick<UseCCombineSearchValue, 'tempValue' | 'placeholder' | 'searchWord'>,
    Pick<UseCCombineSearchControl, 'updateTempValue' | 'updateSearchValue' | 'updateSearchWord' | 'updateState'>,
    Pick<InputTagProps, 'size'> {
  className: string;
  item: CCombineSearchSelect;
}

const ContentSelect = (props: ContentSelectPropsProps) => {
  const { className, item, tempValue, placeholder, searchWord, size, updateTempValue, updateSearchWord, updateState } =
    props;

  const _value = valueToArray(tempValue);

  const renderTag: InputTagProps['renderTag'] = ({ value }) => {
    const option = item.options.find(i => i.value === value);
    return (
      <Tag
        closable
        onClose={() => {
          if (isArray(_value)) {
            const newVal = _value.filter(el => el !== value);
            updateTempValue(newVal);
          } else {
            updateTempValue(undefined);
          }
        }}
        bordered
      >
        <CEllipsis maxWidth={100} content={option?.label ?? value} />
      </Tag>
    );
  };

  return (
    <InputTag
      className={className}
      autoFocus={true}
      allowClear={false}
      placeholder={placeholder}
      value={_value}
      size={size}
      inputValue={searchWord}
      onInputChange={val => {
        updateSearchWord(val);
      }}
      onChange={(val, reason) => {
        if (reason === 'remove') {
          updateTempValue(val);
        }
      }}
      onKeyDown={e => {
        if (e.key === 'Backspace') {
          if (!_value?.length && !searchWord) {
            updateState('field', null);
            updateTempValue(undefined);
          }
        }
      }}
      renderTag={renderTag}
    />
  );
};

export default ContentSelect;
