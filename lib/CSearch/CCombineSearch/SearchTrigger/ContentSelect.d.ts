/// <reference types="react" />
import type { CCombineSearchSelect, UseCCombineSearchControl, UseCCombineSearchValue } from '../../interface';
import type { InputTagProps } from '@arco-design/web-react';
interface ContentSelectPropsProps extends Pick<UseCCombineSearchValue, 'tempValue' | 'placeholder' | 'searchWord'>, Pick<UseCCombineSearchControl, 'updateTempValue' | 'updateSearchValue' | 'updateSearchWord' | 'updateState'>, Pick<InputTagProps, 'size'> {
    className: string;
    item: CCombineSearchSelect;
}
declare const ContentSelect: (props: ContentSelectPropsProps) => JSX.Element;
export default ContentSelect;
