import { isArray, isEmpty, isUndefined, omitBy } from 'lodash-es';
import type { CCombineSearchInput, CCombineSearchSelect, CSearchParams, CCombineSearchItem } from './interface';
import type { ReactNode } from 'react';
import React from 'react';
import { getCombineFilterUserInput } from './CCombineSearch/utils';
import { getFilterOptions } from './CCombineSearch/SearchTrigger/utils';

export const DEFAULT_DISPLAY_COUNT = 2;
export const DEFAULT_LABEL_WIDTH = 100;
export const DEFAULT_SEPARATOR = ', ';
export const DEFAULT_COLSPAN = {
  InputNumber: 4,
  Select: 4,
  DatePicker: 4,
  Input: 5,
  RangePicker: 7,
};

export const dropUndefined = (value: CSearchParams): CSearchParams => {
  return omitBy(value, isUndefined);
};

/** 根据separator转换成配置 */
export const getSeparator = (
  separator?: string | { symbol: string; isOriginalData?: boolean },
): { symbol: string; isOriginalData?: boolean } => {
  if (typeof separator === 'string') {
    return {
      symbol: separator,
      isOriginalData: false,
    };
  }
  if (typeof separator === 'object') {
    return {
      symbol: separator.symbol ?? DEFAULT_SEPARATOR,
      isOriginalData: separator.isOriginalData ?? false,
    };
  }
  return {
    symbol: DEFAULT_SEPARATOR,
    isOriginalData: true,
  };
};

export const isMultipleSeparatorSelect = (item: CCombineSearchItem): item is CCombineSearchSelect => {
  return item.type === 'select' && item.mode === 'multiple';
};

export const isTagSeparatorInput = (item: CCombineSearchItem): item is CCombineSearchInput => {
  return item.type === 'input' && item.mode === 'tag';
};

/** 内部组件值转换后抛出给外部 */
export const transformToSearchParams = (params: CSearchParams, list: CCombineSearchItem[]) => {
  const _params = { ...params };
  list.forEach(item => {
    const _val = _params[item.fieldName];
    if (Array.isArray(_val) && (isMultipleSeparatorSelect(item) || isTagSeparatorInput(item))) {
      const separatorConfig = getSeparator(item.separator);
      _params[item.fieldName] = separatorConfig.isOriginalData ? _val : _val.join(separatorConfig.symbol);
    }
  });
  return _params;
};

export const transformToComponentParams = (params: CSearchParams, list: CCombineSearchItem[]) => {
  const _params = { ...params };
  list.forEach(item => {
    const _val = _params[item.fieldName];
    if (typeof _val === 'string' && (isMultipleSeparatorSelect(item) || isTagSeparatorInput(item))) {
      const separatorConfig = getSeparator(item.separator);
      _params[item.fieldName] = separatorConfig.isOriginalData ? _val : _val.split(separatorConfig.symbol);
    }
  });
  return _params;
};

export const transformToString = (value: any, item: CCombineSearchItem | null): ReactNode => {
  if (!item || value === undefined) {
    return '';
  }
  if (item.type === 'select') {
    const _value = isArray(value) ? value : [value];
    const filterOptions = item.options?.filter(option => _value.includes(option.value));
    const customOptions = _value
      .filter(el => !filterOptions.some(option => option.value === el))
      .map(el => ({ label: el, value: el }));
    const options = filterOptions.concat(customOptions);
    const optionsLength = options.length - 1;
    return options.map((val, i) => (
      <>
        {val.label}
        {i !== optionsLength && getSeparator(item.separator).symbol}
      </>
    ));
  }
  if (item.type === 'input' && item.mode === 'tag') {
    return value?.join(getSeparator(item.separator).symbol);
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value as string;
};

export const getCurrentValue = (params: CSearchParams, current: CCombineSearchItem | null) => {
  return current?.fieldName ? params[current.fieldName] : undefined;
};

export const isEmptyValue = (value: any) => {
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  if (typeof value === 'object') {
    return isEmpty(value);
  }
  return value === undefined;
};

/**
 * 复合搜索-获取搜索词处理函数
 * @param fuzzy
 * @param fuzzyConfig
 */
export const getCSearchCombineFilterUserInput = getCombineFilterUserInput;
/**
 * 复合搜索-获取搜索时过滤出来的options
 */
export const getCSearchCombineFilterOptions = getFilterOptions;
