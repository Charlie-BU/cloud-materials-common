import type { CCombineSearchInput, CCombineSearchSelect, CSearchParams, CCombineSearchItem } from './interface';
import type { ReactNode } from 'react';
import React from 'react';
export declare const DEFAULT_DISPLAY_COUNT = 2;
export declare const DEFAULT_LABEL_WIDTH = 100;
export declare const DEFAULT_SEPARATOR = ", ";
export declare const DEFAULT_COLSPAN: {
    InputNumber: number;
    Select: number;
    DatePicker: number;
    Input: number;
    RangePicker: number;
};
export declare const dropUndefined: (value: CSearchParams) => CSearchParams;
/** 根据separator转换成配置 */
export declare const getSeparator: (separator?: string | {
    symbol: string;
    isOriginalData?: boolean;
}) => {
    symbol: string;
    isOriginalData?: boolean;
};
export declare const isMultipleSeparatorSelect: (item: CCombineSearchItem) => item is CCombineSearchSelect;
export declare const isTagSeparatorInput: (item: CCombineSearchItem) => item is CCombineSearchInput;
/** 内部组件值转换后抛出给外部 */
export declare const transformToSearchParams: (params: CSearchParams, list: CCombineSearchItem[]) => {
    [x: string]: any;
};
export declare const transformToComponentParams: (params: CSearchParams, list: CCombineSearchItem[]) => {
    [x: string]: any;
};
export declare const transformToString: (value: any, item: CCombineSearchItem | null) => ReactNode;
export declare const getCurrentValue: (params: CSearchParams, current: CCombineSearchItem | null) => any;
export declare const isEmptyValue: (value: any) => boolean;
/**
 * 复合搜索-获取搜索词处理函数
 * @param fuzzy
 * @param fuzzyConfig
 */
export declare const getCSearchCombineFilterUserInput: (fuzzy: boolean | undefined, fuzzyConfig: {
    filterUserInput?: ((userInputValue?: string | undefined) => string | undefined) | undefined;
    letterCase?: "ignore" | "upperCase" | "lowerCase" | undefined;
    ignoreCharacters?: (string | RegExp)[] | undefined;
    target?: "both" | "label" | "value" | undefined;
    displayNum?: number | undefined;
    enableChangeSearchItem?: boolean | undefined;
    fuzzyOptionsFilter?: ((searchWord: string, optionsSet: CCombineSearchSelect[]) => CCombineSearchSelect[]) | undefined;
    onSearch?: ((options: {
        searchWord?: string | undefined;
        list: CCombineSearchItem[];
        values: CSearchParams;
        filterList: CCombineSearchSelect[];
    }) => void) | undefined;
    searchHandleDebounce?: number | undefined;
} | undefined) => (userInputValue?: string | undefined) => string | undefined;
/**
 * 复合搜索-获取搜索时过滤出来的options
 */
export declare const getCSearchCombineFilterOptions: ({ fuzzyConfig, filterUserInput, searchWord, item, values, }: {
    values: CSearchParams;
    item: CCombineSearchSelect | null;
} & Pick<import("./interface").UseCCombineSearchValue, "searchWord" | "filterUserInput"> & {
    fuzzyConfig?: ({
        filterUserInput?: ((userInputValue?: string | undefined) => string | undefined) | undefined;
        letterCase?: "ignore" | "upperCase" | "lowerCase" | undefined;
        ignoreCharacters?: (string | RegExp)[] | undefined;
        target?: "both" | "label" | "value" | undefined;
        displayNum?: number | undefined;
        enableChangeSearchItem?: boolean | undefined;
        fuzzyOptionsFilter?: ((searchWord: string, optionsSet: CCombineSearchSelect[]) => CCombineSearchSelect[]) | undefined;
        onSearch?: ((options: {
            searchWord?: string | undefined;
            list: CCombineSearchItem[];
            values: CSearchParams;
            filterList: CCombineSearchSelect[];
        }) => void) | undefined;
        searchHandleDebounce?: number | undefined;
    } & {
        target?: "both" | "label" | "value" | undefined;
        letterCase?: "ignore" | "upperCase" | "lowerCase" | undefined;
        enableSearch?: boolean | undefined;
    }) | undefined;
}) => {
    label: ReactNode;
    value: React.Key;
    disabled?: boolean | undefined;
}[];
