/// <reference types="react" />
import type { CCombineSearchInput, UseCCombineSearchControl, UseCCombineSearchValue } from '../../interface';
interface ContentInputProps extends Pick<UseCCombineSearchValue, 'tempValue' | 'placeholder'>, Pick<UseCCombineSearchControl, 'updateTempValue' | 'updateSearchValue' | 'updateState'> {
    item: CCombineSearchInput;
    size?: 'mini' | 'small' | 'default' | 'large';
    onBlur?: () => void;
    className?: string;
}
declare const ContentInput: (props: ContentInputProps) => JSX.Element;
export default ContentInput;
