import type { Key, ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { Checkbox, Select } from '@arco-design/web-react';
import { useCConfigContext } from '../../CConfigProvider';
import type { CCombineSearchSelect } from '../interface';
import type { SelectHandle, SelectProps } from '@arco-design/web-react/es/Select/interface';

export interface MultipleSelectProps extends Pick<SelectProps, 'filterOption'> {
  options: CCombineSearchSelect['options'];
  value: any;
  onChange: (value: any) => void;
  searchWord?: string;
  popSelectRef?: React.MutableRefObject<SelectHandle | null>;
}

const MultipleSelect = (props: MultipleSelectProps): ReactElement => {
  const { locale, getCPrefixCls } = useCConfigContext();
  const selectCls = getCPrefixCls('search-combine-select');

  const { options, value, searchWord, onChange, popSelectRef, ...rest } = props;

  const optionLength = options.length;
  const currentLength = (value as any[])?.length || 0;
  const [checked, setChecked] = useState(currentLength === optionLength);
  const indeterminate = currentLength > 0 && currentLength < optionLength;

  const onCheckboxChange = (checked: boolean) => {
    const val = checked ? options.map(o => o.value) : undefined;
    onChange(val);
  };

  const onSelectChange = (val: Key[]) => {
    onChange(val);
  };

  useEffect(() => {
    setChecked(currentLength === optionLength);
  }, [optionLength, currentLength]);

  useEffect(() => {
    return () => {
      if (popSelectRef?.current) {
        popSelectRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Checkbox
        className={`${selectCls}-all`}
        indeterminate={indeterminate}
        checked={checked}
        onChange={onCheckboxChange}
      >
        {locale.CSearch.selectAll}
      </Checkbox>
      <Select
        ref={popSelectRef}
        popupVisible
        defaultActiveFirstOption={false}
        dropdownMenuStyle={{ maxHeight: '400px' }}
        mode="multiple"
        options={options}
        inputValue={searchWord}
        value={value}
        getPopupContainer={node => node}
        triggerProps={{
          autoAlignPopupMinWidth: true,
          autoAlignPopupWidth: false,
          popupStyle: { boxShadow: 'none', border: 'none' },
          style: { position: 'static' },
        }}
        triggerElement={<div className={selectCls} />}
        onChange={onSelectChange}
        {...rest}
      />
    </>
  );
};

export default MultipleSelect;
