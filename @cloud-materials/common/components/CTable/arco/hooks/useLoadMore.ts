/*
 * @Author: youjingyu
 * @Date: 2021-12-04 12:03:44
 * @LastEditTime: 2021-12-06 21:17:57
 * @LastEditors: youjingyu
 * @Description:
 */
import type { RefObject } from 'react';
import { useRef, useEffect } from 'react';
import { throttle } from 'lodash-es';
import type { TableModel } from '../types';
import { LoadMoreType } from '../types';
import { LoadMoreCompHeight } from '../components';

export const useLoadMore = (table: TableModel<any>, ref: RefObject<HTMLDivElement>) => {
  const doLoadMore = useRef<(e: Event) => void>();
  if (!doLoadMore.current) {
    doLoadMore.current = throttle((e: Event) => {
      const tableContainer = e.target as HTMLDivElement;
      if (!tableContainer) {
        return;
      }
      // 非加载状态、非错误状态才能触发 loadMore
      const shouldLoad = !table.loading && !table.status.loadMoreLoading && !table.status.error && !table.status.noMore;
      // 触发 loadMore 的滚动高度：总滚动高度 - 容器高度 - LoadMore 组件高度
      const maxScrollHeight = tableContainer.scrollHeight - tableContainer.offsetHeight - LoadMoreCompHeight;
      const reachBottom = tableContainer.scrollTop >= maxScrollHeight;
      if (shouldLoad && reachBottom) {
        table.loadMoreData();
      }
    }, 200);
  }
  useEffect(() => {
    // 如果是点击加载更多，不监听滚动事件
    if (table.isLoadMoreMode() && table.config.extraConfig?.loadMoreType !== LoadMoreType.clickLoadMore) {
      ref.current && ref.current.addEventListener('scroll', doLoadMore.current!);
      return () => {
        ref.current && ref.current.removeEventListener('scroll', doLoadMore.current!);
      };
    }
  }, []);
};

export const useAutoUpdateTableWidth = (table: TableModel<any>, ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    // 如果用户没有主动设置 table 的宽度，尝试自动获取
    if (!table.config.width) {
      const updateWidth = () => {
        const realWidth = ref.current?.getBoundingClientRect?.()?.width;
        if (realWidth) {
          table.setWidth(realWidth);
        }
      };
      updateWidth();
      const cb = throttle(() => updateWidth(), 200);
      window.addEventListener('resize', cb);
      return () => window.removeEventListener('resize', cb);
    }
  }, [table, ref]);
};
