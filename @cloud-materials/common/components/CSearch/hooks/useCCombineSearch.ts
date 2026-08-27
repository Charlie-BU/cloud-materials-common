import { useDeepCompareEffect, useSetState, useUpdateEffect } from 'ahooks';
import { debounce, isArray, isEqual, isPlainObject, isString, isUndefined, noop } from 'lodash-es';
import type { Key } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { useCacheValue } from '../../hooks/useCacheValue';
import type {
  CCombineSearchItem,
  CCombineSearchProps,
  CCombineSearchSelect,
  CCombineSearchStatus,
  CSearchParams,
  UseCCombineSearchControl,
  UseCCombineSearchValue,
} from '../interface';
import {
  dropUndefined,
  transformToSearchParams,
  transformToComponentParams,
  getCurrentValue,
  getCSearchCombineFilterOptions,
} from '../utils';
import { getCombineFilterUserInput, getConbineSearchPlaceholder, getDefaultFieldConfig } from '../CCombineSearch/utils';

type UseCCombineSearchProps = Pick<
  CCombineSearchProps,
  | 'defaultValue'
  | 'value'
  | 'onChange'
  | 'cacheKey'
  | 'list'
  | 'fuzzy'
  | 'fuzzyConfig'
  | 'defaultField'
  | 'placeholder'
  | 'validator'
  | 'enableEdit'
>;

export const useCCombineSearch = (
  props: UseCCombineSearchProps,
): [UseCCombineSearchValue, UseCCombineSearchControl] => {
  const {
    cacheKey,
    defaultField,
    defaultValue,
    fuzzy = false,
    fuzzyConfig,
    list = [],
    enableEdit,
    onChange = noop,
    placeholder: _placeholder,
    validator,
    value,
  } = props;

  const [cacheValue, setCacheValue] = useCacheValue({ value, defaultValue, cacheKey }, {});
  const [params, setParams] = useState<CSearchParams>(transformToComponentParams(cacheValue, list));
  const [currentFieldName, setCurrentFieldName] = useState<Key>();
  const current = list.find(v => v.fieldName === currentFieldName) ?? null;
  const [status, setStatus] = useState<CCombineSearchStatus>('default');
  // 临时值
  const [tempValue, setTempValue] = useState(getCurrentValue(params, current));
  // 单选和多选进行搜索时的搜索词
  const [searchWord, setSearchWord] = useState<string>();
  const { locale } = useCConfigContext();
  const [state, setState] = useSetState<Pick<UseCCombineSearchValue, 'errState'>>({ errState: false });
  const edit = (current?.viewItemConfig?.enableEdit ?? enableEdit) !== false;

  const updateParams: UseCCombineSearchControl['updateParams'] = (val, replace) => {
    const err = validator?.({
      value: val,
      prevValues: params,
      newValues: dropUndefined(replace ? val : { ...params, ...val }),
    });
    if (err) {
      setState({ errState: true });
      setTimeout(() => {
        setState({ errState: false });
      }, 1000);
      return;
    }
    setParams(v => dropUndefined(replace ? val : { ...v, ...val }));
  };

  const updateState: UseCCombineSearchControl['updateState'] = (
    status: CCombineSearchStatus,
    current?: CCombineSearchItem | null,
  ) => {
    if (!isUndefined(current)) {
      setCurrentFieldName(current?.fieldName);
    }
    setStatus(status);
  };

  const search: UseCCombineSearchControl['search'] = () => {
    setCacheValue(params);
    const _params = transformToSearchParams(params, list);
    onChange(_params);
  };

  const resetCurrent: UseCCombineSearchControl['resetCurrent'] = () => {
    updateState('default', null);
  };

  const updateTempValue: UseCCombineSearchControl['updateTempValue'] = (val?) => {
    setTempValue(val);
    if (fuzzy && val) {
      setStatus('value');
    }
  };

  const updateSearchWord: UseCCombineSearchControl['updateSearchWord'] = (val?) => {
    setSearchWord(val);
  };

  const updateSearchField: UseCCombineSearchControl['updateSearchField'] = field => {
    const option = list.find(v => v.fieldName === field);
    if (option) {
      updateState('value', option);
    }
  };

  const updateSearchValue: UseCCombineSearchControl['updateSearchValue'] = (val, field) => {
    const fieldName = field || current?.fieldName || list[0].fieldName;
    // 数组为空或者空字符串时，删除该筛选字段
    let value = val;
    if (isArray(val) && !val.length) {
      value = undefined;
    } else if (isString(val) && !val) {
      value = undefined;
    } else if (isPlainObject(val) && !Object.keys(val).length) {
      value = undefined;
    }
    if (fieldName) {
      updateParams({ [fieldName]: value });
      updateState('default', null);
    }
  };

  const resetParams: UseCCombineSearchControl['resetParams'] = () => {
    updateParams({}, true);
    updateState('default', null);
  };

  /** 模糊搜索相关参数 */
  const filterUserInput = getCombineFilterUserInput(fuzzy, fuzzyConfig);

  useEffect(() => {
    updateTempValue(getCurrentValue(params, current));
  }, [params]);

  useEffect(() => {
    if (edit) {
      updateTempValue(getCurrentValue(params, current));
    } else {
      updateTempValue(undefined);
    }
  }, [currentFieldName]);

  useEffect(() => {
    if (current?.type === 'select') {
      current.onSearch?.({
        searchWord,
        item: current,
        filterOptions: getCSearchCombineFilterOptions({
          fuzzyConfig: { ...fuzzyConfig, ...current.fuzzyConfig },
          values: params,
          filterUserInput,
          item: current,
          searchWord,
        }),
      });
    }
  }, [searchWord]);

  const handleFuzzySearch = useCallback(
    debounce((fuzzyConfig, searchWord, list, values, filterUserInput) => {
      const filterList = list
        .filter((el: CCombineSearchItem) => {
          return el.type === 'select';
        })
        .map((el: CCombineSearchSelect) => {
          return {
            ...el,
            options: getCSearchCombineFilterOptions({
              fuzzyConfig,
              values,
              filterUserInput,
              item: el,
              searchWord,
            }),
          };
        });
      fuzzyConfig?.onSearch?.({ searchWord, list, values, filterList });
    }, fuzzyConfig?.searchHandleDebounce ?? 200),
    [],
  );

  useUpdateEffect(() => {
    if (fuzzy && !current && status === 'value') {
      handleFuzzySearch(fuzzyConfig, tempValue, list, params, filterUserInput);
    }
  }, [tempValue]);

  // 受控模式下，传入value变化，需要更新内部状态
  useDeepCompareEffect(() => {
    if (!isUndefined(value) && !isEqual(value, params)) {
      updateParams(transformToComponentParams(value, list), true);
    }
  }, [value]);

  useUpdateEffect(search, [params]);

  const placeholder = getConbineSearchPlaceholder(status, current, locale, _placeholder);

  return [
    {
      list,
      tempValue,
      params,
      status,
      current,
      placeholder,
      defaultField: getDefaultFieldConfig(defaultField),
      searchWord,
      errState: state.errState,
      filterUserInput,
    },
    {
      updateParams,
      updateState,
      search,
      resetCurrent,
      updateTempValue,
      updateSearchField,
      updateSearchValue,
      resetParams,
      updateSearchWord,
    },
  ];
};
