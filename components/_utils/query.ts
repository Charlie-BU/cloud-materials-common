import type { IParseOptions, IStringifyOptions } from 'qs';
import qs from 'qs';
import { isFunction } from 'lodash-es';

type R = Record<string, any>;

/**
 * 获取当前 url 中的 query
 * @param parseOptions qs parse 的参数
 * @returns
 */
export const getUrlQuery = (parseOptions?: IParseOptions): R => {
  const query = window.location.search;
  const params = qs.parse(query, { ignoreQueryPrefix: true, ...parseOptions });

  return params;
};

/**
 * 设置 url 中的 query
 * @param params 要设置的新 query 参数
 * @param options
 */
export const setUrlQuery = (
  params: R,
  options?: {
    /** 是否将传入的 params 和当前 url 的 query 合并，默认为 true */
    merge?: boolean;
    /** qs stringify 的参数 */
    stringifyOptions?: IStringifyOptions;
    /** 默认为 replaceState */
    method?: 'pushState' | 'replaceState';
    /** 新的 state，不传则默认为当前 state */
    newState?: R | ((oldState: R) => R);
    /**
     * 生成自定义的 url
     * @param newUrl 默认生成的新 url
     * @param newParams 新的 query 参数
     * @param newQuery 将 newParams 序列化后的字符串
     * @returns
     */
    genNewUrl?: (newUrl: string, newParams: R, newQuery: string) => string;
  },
) => {
  const { merge = true, stringifyOptions, method = 'replaceState', newState: _newState, genNewUrl } = options || {};

  // 以当前的 url query 为基准，然后用新的 query 覆写现有的参数，避免整体替换 query
  const currentParams = getUrlQuery();

  // 合并当前查询参数对象和新的查询参数对象
  const newParams = merge ? Object.assign({}, currentParams, params) : params;

  // 将新的查询参数对象序列化为查询参数字符串
  const newQuery = qs.stringify(newParams, { ...stringifyOptions });

  // 构建新的 URL
  const newUrl = `${window.location.pathname}?${newQuery}${window.location.hash || ''}`;

  // 最终的 URL
  const url = genNewUrl ? genNewUrl(newUrl, newParams, newQuery) : newUrl;

  // 生成新的状态
  const currentState = history.state;
  const newState = isFunction(_newState) ? _newState(currentState) : _newState;

  const state = newState ?? currentState;

  if (method === 'replaceState') {
    history.replaceState(state, '', url);
  } else {
    history.pushState(state, '', url);
  }

  return { url, newParams, newQuery, state };
};
