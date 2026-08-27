import React from 'react';
import type { UseCCombineSearchControl, UseCCombineSearchCustomProps, UseCCombineSearchValue } from '../../interface';
import type { SelectHandle } from '@arco-design/web-react/es/Select/interface';
export type PopoverContentProps = {
    popSelectRef?: React.MutableRefObject<SelectHandle | null>;
} & Pick<UseCCombineSearchValue, 'list' | 'status' | 'current' | 'params' | 'tempValue' | 'filterUserInput' | 'searchWord'> & Pick<UseCCombineSearchCustomProps, 'fuzzy' | 'fuzzyConfig' | 'enableEdit' | 'ellipsisProps' | 'listGroup' | 'keyboardTip'> & Pick<UseCCombineSearchControl, 'updateSearchField' | 'updateTempValue' | 'updateSearchValue' | 'updateState' | 'updateSearchWord'>;
declare const PopoverContent: (props: PopoverContentProps) => JSX.Element | null;
export default PopoverContent;
