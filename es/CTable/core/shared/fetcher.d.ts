import type { TableConfig } from '../models/Table';
import type { FetcherOptions, FetcherResponse } from '../types';
type RunFetcherParams = {
    fetcher: TableConfig['fetcher'];
    fetcherOptions: FetcherOptions;
    startPageNumber: number;
    isLoadMore: boolean;
};
type RunFetcherResp = {
    fetcherResp: FetcherResponse;
    pageNumber: number;
};
/**
 * 执行fetcher，保证页码在正确的范围里，返回请求数据和正确的页码
 * @param fetcher
 * @param fetcherOptions
 * @param startPageNumber 第一页的页码
 */
export declare function runFetcher(params: RunFetcherParams): Promise<RunFetcherResp>;
export {};
