import type { UseCSearchControl, UseCSearchCustomProps, UseCSearchValue } from '../interface';
export declare const useCSearch: (props: Pick<UseCSearchCustomProps, 'list' | 'onChange' | 'value' | 'defaultValue' | 'defaultCollapseVisible' | 'displayCount' | 'manual' | 'cacheKey' | 'debounceOptions' | 'onCollapseVisibleChange'>) => [UseCSearchValue, UseCSearchControl];
