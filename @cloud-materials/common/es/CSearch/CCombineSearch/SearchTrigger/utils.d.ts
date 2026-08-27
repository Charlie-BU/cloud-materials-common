import type { CCombineSearchSelect, UseCCombineSearchCustomProps, UseCCombineSearchValue } from '../../interface';
/**
 * 内置默认过滤选项函数
 */
export declare const fuzzyDefualtFilterOptions: ({ searchWord, item, fuzzyConfig, params, }: {
    searchWord: string[];
    item: CCombineSearchSelect;
    fuzzyConfig: UseCCombineSearchCustomProps['fuzzyConfig'];
    params: UseCCombineSearchValue['params'];
}) => CCombineSearchSelect;
/**
 * 搜索时，获取某一项select搜索项中options里搜索匹配到的options
 * @returns options
 */
export declare const getFilterOptions: ({ fuzzyConfig, filterUserInput, searchWord, item, values, }: {
    values: UseCCombineSearchValue['params'];
    item: CCombineSearchSelect | null;
} & Pick<UseCCombineSearchValue, "searchWord" | "filterUserInput"> & {
    fuzzyConfig?: UseCCombineSearchCustomProps['fuzzyConfig'] & CCombineSearchSelect['fuzzyConfig'];
}) => CCombineSearchSelect['options'];
