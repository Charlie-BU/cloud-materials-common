import type { IParseOptions, IStringifyOptions } from 'qs';
type R = Record<string, any>;
/**
 * 获取当前 url 中的 query
 * @param parseOptions qs parse 的参数
 * @returns
 */
export declare const getUrlQuery: (parseOptions?: IParseOptions) => R;
/**
 * 设置 url 中的 query
 * @param params 要设置的新 query 参数
 * @param options
 */
export declare const setUrlQuery: (params: R, options?: {
    /** 是否将传入的 params 和当前 url 的 query 合并，默认为 true */
    merge?: boolean | undefined;
    /** qs stringify 的参数 */
    stringifyOptions?: IStringifyOptions | undefined;
    /** 默认为 replaceState */
    method?: "pushState" | "replaceState" | undefined;
    /** 新的 state，不传则默认为当前 state */
    newState?: R | ((oldState: R) => R) | undefined;
    /**
     * 生成自定义的 url
     * @param newUrl 默认生成的新 url
     * @param newParams 新的 query 参数
     * @param newQuery 将 newParams 序列化后的字符串
     * @returns
     */
    genNewUrl?: ((newUrl: string, newParams: R, newQuery: string) => string) | undefined;
} | undefined) => {
    url: string;
    newParams: R;
    newQuery: string;
    state: any;
};
export {};
