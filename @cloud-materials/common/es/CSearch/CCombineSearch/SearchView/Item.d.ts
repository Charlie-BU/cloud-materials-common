/// <reference types="react" />
import type { CCombineSearchItem, UseCCombineSearchControl, UseCCombineSearchCustomProps, UseCCombineSearchValue } from '../../interface';
export interface SearchViewItemProps extends Pick<UseCCombineSearchCustomProps, 'alignType' | 'enableEdit' | 'popoverClassName' | 'popoverStyle' | 'popoverTriggerProps'>, Pick<UseCCombineSearchValue, 'current'>, Pick<UseCCombineSearchControl, 'updateParams' | 'updateState' | 'updateTempValue'> {
    value: any;
    item: CCombineSearchItem;
}
declare const SearchViewItem: (props: SearchViewItemProps) => JSX.Element;
export default SearchViewItem;
