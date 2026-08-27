/// <reference types="react" />
import type { UseCSearchControl, UseCSearchCustomProps, UseCSearchValue } from '../interface';
type SearchDisplayProps = Pick<UseCSearchValue, 'activeAdvanceCount' | 'advanceList' | 'advanceVisible' | 'displayList' | 'manual' | 'params'> & Pick<UseCSearchControl, 'resetParams' | 'search' | 'toggleAdvanceVisible' | 'updateParams'> & Pick<UseCSearchCustomProps, 'displayArcoSpaceProps' | 'showReset'>;
declare const SearchDisplay: (props: SearchDisplayProps) => JSX.Element;
export default SearchDisplay;
