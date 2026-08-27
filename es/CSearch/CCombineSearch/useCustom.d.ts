/// <reference types="react" />
import type { UseCCombineSearchCustomProps } from '../interface';
export declare const useCustom: (props: UseCCombineSearchCustomProps) => {
    CCombineSearchInline: JSX.Element;
    CCombineSearchTrigger?: undefined;
    CCombineSearchView?: undefined;
} | {
    CCombineSearchTrigger: JSX.Element;
    CCombineSearchView: JSX.Element;
    CCombineSearchInline?: undefined;
};
