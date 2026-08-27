import { useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { isEqual, noop, pick } from 'lodash-es';
import type { Key } from 'react';
import { useRef, useState } from 'react';
import type {
  CCascaderSearchItem,
  CCascaderSearchProps,
  CSearchComponentProps,
  CSearchParams,
  UseCCascaderSearchControl,
  UseCCascaderSearchValue,
} from '../interface';
import { dropUndefined, isEmptyValue } from '../utils';
import { useDebounceHandler } from './useDebounceHandler';

const transformValueToState = (
  list: CCascaderSearchItem[],
  value: CSearchParams = {},
  previousValue: CSearchParams = value,
): UseCCascaderSearchValue['state'] => {
  const [fieldName, val] = Object.entries(value)[0] || [];
  // 若传入的参数字段不包含在 list 表中，则过滤掉该参数，默认显示第一条数据
  if (fieldName && list.some(item => item.fieldName === fieldName)) {
    return { fieldName, value: val };
  }
  return { fieldName: previousValue?.fieldName ?? list[0]?.fieldName };
};

const transformStateToValue = (state: UseCCascaderSearchValue['state']): CSearchParams | undefined => {
  return isEmptyValue(state.value) ? {} : { [state.fieldName]: state.value };
};

export const useCCascaderSearch = (
  props: CCascaderSearchProps,
): [UseCCascaderSearchValue, UseCCascaderSearchControl] => {
  const { list = [], onChange = noop, defaultValue, value, debounceOptions } = props;
  const validOptions = list.filter(option => option.visible !== false);
  const isControlled = 'value' in props;
  const [current, setCurrent] = useState<UseCCascaderSearchValue['state']>(
    transformValueToState(validOptions, isControlled ? value : defaultValue),
  );
  // 记录上一次值，用于和更新后的值对比
  const previous = useRef(current);

  const option = validOptions.find(option => option.fieldName === current.fieldName);
  const searchComponent = pick(option, ['content', 'commonProps']) as CSearchComponentProps;

  const { debounceHandleChange } = useDebounceHandler({ onChange, debounceOptions });

  const updateField = (value: Key) => {
    previous.current = current;
    setCurrent({ fieldName: value });
  };

  const updateValue = (value: any) => {
    const _value = dropUndefined({
      ...current,
      value: isEmptyValue(value) ? undefined : value,
    }) as UseCCascaderSearchValue['state'];
    previous.current = current;
    setCurrent(_value);
  };

  useDeepCompareEffect(() => {
    if (!isControlled) {
      return;
    }
    const _value = transformValueToState(validOptions, value, current);
    if (!isEqual(_value, current)) {
      setCurrent(_value);
    }
  }, [value]);

  useUpdateEffect(() => {
    const _value = transformValueToState(validOptions, value, current);
    if (isControlled && isEqual(current, _value)) {
      return;
    }
    // 两种情况下触发 onChange
    if (
      // 1. 不切换 field，只修改 value
      (current.fieldName === previous.current?.fieldName && !isEqual(current.value, previous.current?.value)) ||
      // 2. 切换 field，且切换前后的 value 至少有一个不为空
      (current.fieldName !== previous.current?.fieldName &&
        (!isEmptyValue(current.value) || !isEmptyValue(previous.current?.value)))
    ) {
      debounceHandleChange(transformStateToValue(current));
    }
  }, [current]);

  return [
    { validOptions, state: current, searchComponent },
    { updateField, updateValue },
  ];
};
