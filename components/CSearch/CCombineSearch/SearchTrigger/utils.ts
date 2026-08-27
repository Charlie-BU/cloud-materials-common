import { xor } from 'lodash-es';
import type { CCombineSearchSelect, UseCCombineSearchCustomProps, UseCCombineSearchValue } from '../../interface';
import { valueToArray } from '../utils';

/**
 * 内置默认过滤选项函数
 */
export const fuzzyDefualtFilterOptions = ({
  searchWord,
  item,
  fuzzyConfig,
  params,
}: {
  searchWord: string[];
  item: CCombineSearchSelect;
  fuzzyConfig: UseCCombineSearchCustomProps['fuzzyConfig'];
  params: UseCCombineSearchValue['params'];
}): CCombineSearchSelect => {
  const optionsSet: CCombineSearchSelect['options'] = [];
  const value = params[item.fieldName];
  // 是否匹配value
  const isValueMatch = (el: CCombineSearchSelect['options'][number], word: string) =>
    (typeof el.value === 'string' || typeof el.value === 'number') &&
    (fuzzyConfig?.letterCase === 'ignore' ? String(el.value).toLowerCase() : String(el.value)).includes(word);
  // 是否匹配label
  const isLabelMatch = (el: CCombineSearchSelect['options'][number], word: string) =>
    (typeof el.label === 'string' || typeof el.label === 'number') &&
    (fuzzyConfig?.letterCase === 'ignore' ? String(el.label).toLowerCase() : String(el.label)).includes(word);
  searchWord.forEach(word => {
    item.options.forEach(el => {
      // 过滤已选择的项目
      if (valueToArray(value).includes(el.value)) {
        return false;
      }
      let isMatched = false;
      if (fuzzyConfig?.target === 'value') {
        isMatched = isValueMatch(el, word);
      } else if (fuzzyConfig?.target === 'both') {
        isMatched = isLabelMatch(el, word) || isValueMatch(el, word);
      } else {
        isMatched = isLabelMatch(el, word);
      }
      if (isMatched) {
        optionsSet.push(el);
      }
    });
  });
  return {
    ...item,
    options: xor(optionsSet),
  };
};

/**
 * 搜索时，获取某一项select搜索项中options里搜索匹配到的options
 * @returns options
 */
export const getFilterOptions = ({
  fuzzyConfig,
  filterUserInput,
  searchWord,
  item,
  values,
}: { values: UseCCombineSearchValue['params']; item: CCombineSearchSelect | null } & Pick<
  UseCCombineSearchValue,
  'filterUserInput' | 'searchWord'
> & {
    fuzzyConfig?: UseCCombineSearchCustomProps['fuzzyConfig'] & CCombineSearchSelect['fuzzyConfig'];
  }): CCombineSearchSelect['options'] => {
  let options = item?.options;
  if (!options) return options ?? [];
  const _searchWord = fuzzyConfig ? filterUserInput(searchWord) : searchWord?.toLowerCase();
  if (_searchWord && item && fuzzyConfig?.enableSearch !== false) {
    options = fuzzyDefualtFilterOptions({
      searchWord: _searchWord.trim().replace(/^,|,$/g, '').split(',').filter(Boolean) ?? [],
      item,
      fuzzyConfig: fuzzyConfig ? fuzzyConfig : { target: 'both', letterCase: 'ignore' },
      params: values,
    }).options;
  }
  return options;
};
