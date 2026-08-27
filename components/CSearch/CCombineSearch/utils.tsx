import type { ReactNode } from 'react';
import type { CLocale } from '../../locales/default';
import type {
  CCombineSearchProps,
  CSearchParams,
  UseCCombineSearchCustomProps,
  UseCCombineSearchValue,
} from '../interface';
import type { COperationMenuProps } from '../../COperationMenu/interface';
import { isReactNode } from '../../CTable/shared';
import { isObject } from 'lodash-es';
import COperationMenu from '../../COperationMenu';
import React from 'react';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';

/**
 * CombineSearch 获取处理用户输入字符的函数，处理结果进行模糊匹配
 * @param fuzzy
 * @param fuzzyConfig
 * @returns
 */
export const getCombineFilterUserInput = (
  fuzzy: UseCCombineSearchCustomProps['fuzzy'],
  fuzzyConfig: UseCCombineSearchCustomProps['fuzzyConfig'],
): UseCCombineSearchValue['filterUserInput'] => {
  return (userInput?: string) => {
    if (!fuzzy || !fuzzyConfig) {
      return userInput;
    }
    let formattedValue = userInput;
    if (fuzzyConfig.filterUserInput) {
      formattedValue = fuzzyConfig.filterUserInput(formattedValue);
    }
    if (fuzzyConfig.letterCase === 'lowerCase' || fuzzyConfig.letterCase === 'ignore') {
      formattedValue = formattedValue?.toLowerCase();
    }
    if (fuzzyConfig.letterCase === 'upperCase') {
      formattedValue = formattedValue?.toUpperCase();
    }
    if (Array.isArray(fuzzyConfig.ignoreCharacters) && fuzzyConfig.ignoreCharacters.length) {
      formattedValue = fuzzyConfig.ignoreCharacters.reduce((res: string | undefined, character: string | RegExp) => {
        if (!character) {
          return res;
        }
        return res?.replaceAll(character, '');
      }, formattedValue);
    }
    return formattedValue;
  };
};

/**
 * CCombineSearch 获取placeholder
 * @param status
 * @param current
 * @param locale
 * @returns
 */
export const getConbineSearchPlaceholder = (
  status: UseCCombineSearchValue['status'],
  current: UseCCombineSearchValue['current'],
  locale: CLocale,
  comPlaceholder?: string,
) => {
  // 选择了某个搜索项时，placeholder优先顺序：搜索项placeholder > 组件placeholder > 默认placeholder
  if (status === 'value') {
    return (
      current?.placeholder ||
      comPlaceholder ||
      (current?.type === 'input' ? locale.CSearch.enterAndConfirm : locale.CSearch.selectPlaceholder)
    );
  }
  return comPlaceholder || locale.CSearch.defaultPlaceholder;
};

/**
 * 获取 trigger 前后react node
 * @param extraConfig
 * @returns
 */
export const getTriggerExtraNode = (extraConfig?: ReactNode | COperationMenuProps): ReactNode => {
  let extraNode: ReactNode = null;
  if (isReactNode(extraConfig)) {
    extraNode = extraConfig;
  } else if (isObject(extraConfig)) {
    extraNode = <COperationMenu {...(extraConfig as COperationMenuProps)} />;
  }
  return extraNode;
};

/**
 * 获取已选择的搜索条件list
 * @param params
 * @param list
 * @returns
 */
export const getViewList = (params: CSearchParams, list: NonNullable<CCombineSearchProps['list']>) => {
  return Object.keys(params)
    .map(fieldName => list.find(item => item.fieldName === fieldName))
    .filter(Boolean) as NonNullable<CCombineSearchProps['list']>;
};

export const combineDataCy = classNamePrefixFactory('search-combine');

/**
 * 值转为Array
 * @param v
 * @returns Array|undefined|null
 */
export const valueToArray = <T extends any>(v: T | T[]) => {
  if (v === undefined || v === null) {
    return [];
  }
  if (Array.isArray(v)) {
    return v;
  }
  return [v];
};

/**
 * 获取defaultField 配置
 */
export const getDefaultFieldConfig = (
  defaultField: UseCCombineSearchCustomProps['defaultField'],
): UseCCombineSearchValue['defaultField'] => {
  if (typeof defaultField === 'string') {
    return {
      fieldName: defaultField,
      type: 'default',
    };
  }
  if (typeof defaultField === 'object') {
    return {
      fieldName: defaultField.fieldName,
      type: defaultField.type ?? 'default',
    };
  }
};
