import React, { useMemo } from 'react';
import CompactWrapper from '../components/CompactWrapper';
import SearchComponent from '../components/Component';
import type { CCSearchItem, CSearchParams, UseCSearchControl } from '../interface';
import { isEmptyValue } from '../utils';
import { isFunction, isObject } from 'lodash-es';

export interface SearchItemProps extends Omit<CCSearchItem, 'colspan' | 'visible'> {
  params: CSearchParams;
  updateParams: UseCSearchControl['updateParams'];
}

const SearchItem = (props: SearchItemProps) => {
  const { fieldName, params, updateParams, content, commonProps, valueFormatter = (v: any) => v, ...restProps } = props;

  const controlledProps = useMemo(() => {
    if (!fieldName) {
      return commonProps;
    }
    return {
      ...commonProps,
      value: params[fieldName],
      onChange: (val: any) => {
        const _val = isEmptyValue(val) ? undefined : val;
        commonProps?.onChange(valueFormatter(_val));
        updateParams({ [fieldName]: valueFormatter(_val) });
      },
    };
  }, [commonProps, fieldName, params, updateParams]);

  // renderBuiltInContent 中会用组件props覆盖commonProps，导致写了内置组件的onChange，CSearch的onChange就不会触发
  // 当配置了内置组件的onChange时，需要覆写一下
  if (isObject(content)) {
    const _content = content as any;
    if (isObject(_content.componentProps) && _content.componentProps?.onChange) {
      const origin = _content.componentProps.onChange;
      _content.componentProps.onChange = (val: any, ...rest: any) => {
        isFunction(origin) && origin(val, ...rest);
        controlledProps?.onChange(val);
      };
    }
  }
  return (
    <CompactWrapper {...restProps}>
      <SearchComponent content={content} commonProps={controlledProps} />
    </CompactWrapper>
  );
};

export default SearchItem;
