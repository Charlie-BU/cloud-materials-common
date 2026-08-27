/// <reference types="react" />
import type { CCSearchItem, CSearchParams, UseCSearchControl } from '../interface';
export interface SearchItemProps extends Omit<CCSearchItem, 'colspan' | 'visible'> {
    params: CSearchParams;
    updateParams: UseCSearchControl['updateParams'];
}
declare const SearchItem: (props: SearchItemProps) => JSX.Element;
export default SearchItem;
