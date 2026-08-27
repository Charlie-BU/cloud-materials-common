/// <reference types="react" />
import type { LoadingType, PropsWithBase, UseCCombineSearchControl, UseCCombineSearchCustomProps, UseCCombineSearchValue } from '../../interface';
export type SearchTriggerProps = {
    loading: LoadingType;
} & PropsWithBase & Pick<UseCCombineSearchCustomProps, 'alignType' | 'fuzzy' | 'fuzzyConfig' | 'enableEdit' | 'ellipsisProps' | 'trigger' | 'popoverClassName' | 'popoverStyle' | 'listGroup' | 'popoverTriggerProps' | 'keyboardTip'> & Pick<UseCCombineSearchValue, 'current' | 'status' | 'list' | 'tempValue' | 'params' | 'placeholder' | 'defaultField' | 'filterUserInput' | 'searchWord' | 'errState'> & Pick<UseCCombineSearchControl, 'updateTempValue' | 'updateState' | 'updateSearchField' | 'updateSearchValue' | 'updateSearchWord'>;
declare const SearchTrigger: (props: SearchTriggerProps) => JSX.Element;
export default SearchTrigger;
