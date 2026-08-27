/// <reference types="react" />
import type { UseCCombineSearchControl, UseCCombineSearchCustomProps } from '../../interface';
import type { SearchTriggerProps } from '../SearchTrigger';
type CombineSearchInlineProps = SearchTriggerProps & Pick<UseCCombineSearchControl, 'resetParams' | 'updateParams'> & Pick<UseCCombineSearchCustomProps, 'searchParamExtraLast' | 'enableEdit' | 'ellipsisProps' | 'listGroup'>;
declare const CombineSearchInline: (props: CombineSearchInlineProps) => JSX.Element;
export default CombineSearchInline;
