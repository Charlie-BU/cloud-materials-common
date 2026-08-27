import type { IParseOptions, IStringifyOptions } from 'qs';
import type { FilterValues, SorterValues } from '../../core/types';
type R = Record<string, any>;
export declare enum TableStatusKeys {
    pageSize = "pageSize",
    currentPage = "currentPage",
    columnFilterValues = "columnFilterValues",
    sorterValues = "sorterValues",
    toolbarValues = "toolbarValues"
}
export type TableStatus = {
    pageSize?: number;
    currentPage?: number;
    columnFilterValues?: FilterValues;
    sorterValues?: SorterValues;
    toolbarValues?: R;
};
export type UrlQuerySyncOptions = {
    /**
     * 需要同步到 url query 的 table 状态
     */
    status: (keyof typeof TableStatusKeys)[];
    /**
     * 获取 url query 的若干配置
     */
    getQueryOptions?: {
        /** qs parse 的参数 */
        parseOptions?: IParseOptions;
        /**
         * 格式化 url query 中的参数，并传递给 table。
         * 如果不配置，默认会读取 url query 中的 pageSize、toolbarValues 同步到 table
         */
        format?: (query: R) => TableStatus;
    };
    /**
     * 设置 url query 的若干配置
     */
    setQueryOptions?: {
        /** qs stringify 的参数 */
        stringifyOptions?: IStringifyOptions;
        /**
         * 将 TableStatus 以指定的格式同步到 url query，如果不传则会默认将 table 的 pageSize、toolbarValues 同步到 url query
         */
        format?: (status: TableStatus) => R;
        /**
         * 设置 url query 的 history 方法
         * @defaultValue 'replaceState'
         */
        method?: 'pushState' | 'replaceState';
    };
};
export {};
