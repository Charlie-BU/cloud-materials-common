/// <reference types="react" />
import type { UseCSearchControl, UseCSearchCustomProps, UseCSearchValue } from '../interface';
type SearchCollapseProps = Pick<UseCSearchValue, 'advanceList' | 'advanceVisible' | 'params'> & Pick<UseCSearchControl, 'updateParams' | 'resetAdvanceParams'> & Pick<UseCSearchCustomProps, 'collapsedClassName' | 'labelWith' | 'showAdvanceReset' | 'colspan'>;
declare const SearchCollapse: (props: SearchCollapseProps) => JSX.Element | null;
export default SearchCollapse;
