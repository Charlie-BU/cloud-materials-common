import { useRef, useState } from 'react';
import type { UseCSearchControl, UseCSearchCustomProps, UseCSearchValue } from '../interface';
import { useBoolean, useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { DEFAULT_DISPLAY_COUNT, dropUndefined } from '../utils';
import { useCacheValue } from '../../hooks/useCacheValue';
import { isEqual, isUndefined } from 'lodash-es';
import { useDebounceHandler } from './useDebounceHandler';

export const useCSearch = (
  props: Pick<
    UseCSearchCustomProps,
    | 'list'
    | 'onChange'
    | 'value'
    | 'defaultValue'
    | 'defaultCollapseVisible'
    | 'displayCount'
    | 'manual'
    | 'cacheKey'
    | 'debounceOptions'
    | 'onCollapseVisibleChange'
  >,
): [UseCSearchValue, UseCSearchControl] => {
  const {
    list = [],
    onChange,
    value,
    defaultValue,
    displayCount = DEFAULT_DISPLAY_COUNT,
    manual,
    cacheKey,
    debounceOptions,
    defaultCollapseVisible,
    onCollapseVisibleChange,
  } = props;

  const [advanceVisible, { set }] = useBoolean(defaultCollapseVisible);
  const [cacheValue, setCacheValue] = useCacheValue({ value, defaultValue, cacheKey }, {});
  const [params, setParams] = useState(cacheValue);
  const isReplace = useRef(false);

  const validList = list.filter(item => item.visible !== false);
  const displayList = validList.slice(0, displayCount);
  const advanceList = validList.slice(displayCount);
  const activeAdvanceCount = advanceList.reduce((total, cur) => {
    if (!isUndefined(cur.fieldName) && !isUndefined(params[cur.fieldName])) {
      total++;
    }
    return total;
  }, 0);

  const { handleChange, debounceHandleChange } = useDebounceHandler({ onChange, debounceOptions });

  const updateParams: UseCSearchControl['updateParams'] = (val, replace?) => {
    isReplace.current = !!replace;
    setParams(v => dropUndefined(replace ? val : { ...v, ...val }));
  };

  const resetParams: UseCSearchControl['resetParams'] = () => {
    updateParams({}, true);
  };

  const resetAdvanceParams: UseCSearchControl['resetAdvanceParams'] = () => {
    updateParams(
      Object.fromEntries(
        advanceList.filter(({ fieldName }) => !isUndefined(fieldName)).map(({ fieldName }) => [fieldName, undefined]),
      ),
    );
  };

  const search: UseCSearchControl['search'] = (flush?: boolean) => {
    setCacheValue(params);
    flush ? handleChange(params) : debounceHandleChange(params);
  };

  useDeepCompareEffect(() => {
    if (!isUndefined(value) && !isEqual(dropUndefined(value), params)) {
      updateParams(value, true);
    }
  }, [value]);

  const showManual = !!manual;
  useUpdateEffect(() => {
    if (!showManual || isReplace.current) {
      search();
    }
  }, [showManual, params]);

  return [
    {
      displayList,
      advanceList,
      activeAdvanceCount,
      manual,
      advanceVisible,
      params,
    },
    {
      toggleAdvanceVisible: () => {
        const _advanceVisible = !advanceVisible;
        set(_advanceVisible);
        onCollapseVisibleChange?.(_advanceVisible);
      },
      search,
      updateParams,
      resetParams,
      resetAdvanceParams,
    },
  ];
};
