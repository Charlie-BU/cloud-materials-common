/// <reference types="react" />
import type { UseCCombineSearchControl, UseCCombineSearchCustomProps, UseCCombineSearchValue } from '../../interface';
export interface ContentProps extends Pick<UseCCombineSearchValue, 'current' | 'tempValue' | 'placeholder' | 'defaultField' | 'searchWord'>, Pick<UseCCombineSearchControl, 'updateTempValue' | 'updateSearchValue' | 'updateSearchWord' | 'updateState'>, Pick<UseCCombineSearchCustomProps, 'alignType'> {
    className: string;
    readOnly: boolean;
}
declare const Content: (props: ContentProps) => JSX.Element;
export default Content;
