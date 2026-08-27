import type { CCombineSearchProps, UseCCombineSearchControl, UseCCombineSearchValue } from '../interface';
type UseCCombineSearchProps = Pick<CCombineSearchProps, 'defaultValue' | 'value' | 'onChange' | 'cacheKey' | 'list' | 'fuzzy' | 'fuzzyConfig' | 'defaultField' | 'placeholder' | 'validator' | 'enableEdit'>;
export declare const useCCombineSearch: (props: UseCCombineSearchProps) => [UseCCombineSearchValue, UseCCombineSearchControl];
export {};
