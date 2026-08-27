import type { ReactElement } from 'react';
import type { CCombineSearchProps } from '../interface';
declare const CCombineSearch: {
    (props: CCombineSearchProps): ReactElement;
    useCustom: (props: import("../interface").UseCCombineSearchCustomProps) => {
        CCombineSearchInline: JSX.Element;
        CCombineSearchTrigger?: undefined;
        CCombineSearchView?: undefined;
    } | {
        CCombineSearchTrigger: JSX.Element;
        CCombineSearchView: JSX.Element;
        CCombineSearchInline?: undefined;
    };
    displayName: string;
};
export default CCombineSearch;
