/// <reference types="react" />
import type { CCombineSearchProps, PropsWithBase, UseCCombineSearchControl, UseCCombineSearchValue } from '../../interface';
export type SearchViewProps = PropsWithBase & Pick<UseCCombineSearchValue, 'current' | 'list' | 'params'> & Pick<UseCCombineSearchControl, 'updateParams' | 'updateState' | 'resetParams' | 'updateTempValue'> & Pick<CCombineSearchProps, 'searchParamExtraLast' | 'searchParamExtraStart' | 'enableEdit' | 'popoverClassName' | 'popoverStyle' | 'popoverTriggerProps'>;
declare const SearchView: (props: SearchViewProps) => JSX.Element | null;
export default SearchView;
