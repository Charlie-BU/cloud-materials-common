import { clamp } from 'lodash-es';
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
export async function runFetcher(params: RunFetcherParams): Promise<RunFetcherResp> {
  const { fetcher, fetcherOptions, startPageNumber, isLoadMore } = params;
  const { currentPage, pageSize } = fetcherOptions;
  const res = await fetcher!(fetcherOptions);

  // load more 模式、第一页不需要不做页码修正
  if (isLoadMore || currentPage === startPageNumber) {
    return {
      fetcherResp: res,
      pageNumber: currentPage,
    };
  }

  // 远程分页模式⬇，根据total算出最大页码
  // 这个算法不适用total是0的情况，因为 Math.ceil(res.total / pageSize) 始终是0，会导致用current===0的参数在执行一次fetcher。所以第一页的情况在上面单独return了
  const maxPageNumber = Math.ceil(res.total! / pageSize) - 1 + startPageNumber;
  if (currentPage > maxPageNumber) {
    // 当前页码不再正确范围里，需要修正页码并重新请求数据
    const pageNumber = clamp(currentPage, startPageNumber, maxPageNumber); // 修正页码
    const offset = (pageNumber - startPageNumber) * pageSize; // 修正offset
    const res = await fetcher!({ ...fetcherOptions, currentPage: pageNumber, offset });
    return {
      fetcherResp: res,
      pageNumber, // 返回正确的页码，以便表格重新设置当前页码
    };
  } else {
    return {
      fetcherResp: res,
      pageNumber: currentPage, // 页码不需要修正时保持不变
    };
  }
}
