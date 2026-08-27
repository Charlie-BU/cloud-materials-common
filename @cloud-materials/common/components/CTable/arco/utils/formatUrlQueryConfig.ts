import type { Table } from '../../core';
import { effects } from '../../core';
import type { TableConfig, TableStatus } from '../types';
import { TableStatusKeys } from '../types';
import { helper } from '../../helper';
import { isEqual } from 'lodash-es';

/**
 * 如果用户配了 syncWithUrlQuery，需要处理 config
 *
 * - table status 改变同步到 url query，是在各个 status 改变的 effect 中执行的，所以需要处理 effect
 * - 初始化时，将 url query 同步到 table status，需要处理 getInitStatus
 * @param config
 * @returns
 */
export const formatUrlQueryConfig = (config?: TableConfig<any>): TableConfig<any> | undefined => {
  if (config?.syncWithUrlQuery) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { status, getQueryOptions, setQueryOptions } = config?.syncWithUrlQuery;
    const commonSetOptions = {
      stringifyOptions: setQueryOptions?.stringifyOptions,
      method: setQueryOptions?.method,
    };
    const formatSetQuery = (table: Table, status: TableStatus) => {
      if (setQueryOptions?.format) {
        return setQueryOptions.format({
          pageSize: table.pageSize,
          currentPage: table.currentPage,
          columnFilterValues: table.columnFilterValues,
          sorterValues: table.sorterValues,
          toolbarValues: table.toolbar?.filterValues,
        });
      }
      return status;
    };

    const getCurrentStatusFromUrl = () => {
      const urlQuery = helper.getUrlQuery(getQueryOptions?.parseOptions);
      // 如果传了自定义的 format 函数，就用 format
      if (getQueryOptions?.format) {
        return getQueryOptions?.format(urlQuery);
      }
      return {
        pageSize: parseInt(urlQuery.pageSize) || 10,
        currentPage: parseInt(urlQuery.currentPage) || 1,
        columnFilterValues: urlQuery.columnFilterValues || {},
        sorterValues: urlQuery.sorterValues || {},
        toolbarValues: urlQuery.toolbarValues || {},
      };
    };

    return {
      ...config,
      effects: options => {
        config.effects?.(options);

        /**
         * 在每个 status 改变的 effect 中去改变 url query
         *
         * setUrlQuery 方法默认会 merge 已有的 query（浅拷贝），所以改某个 status 时不会影响其他 status
         *
         * 2023-12-27 更新，之前漏掉了 filter 时会改变 currentPage 的 case。修改为只监听 onTableUpdateDataEnd 事件，在事件中做 url query 的同步
         */
        effects.onTableUpdateDataEnd(({ table }) => {
          const customStatus: TableStatus = {};
          if (status.includes(TableStatusKeys.toolbarValues)) {
            customStatus.toolbarValues = table.toolbar?.filterValues;
          }
          if (status.includes(TableStatusKeys.pageSize)) {
            customStatus.pageSize = table.pageSize;
          }
          if (status.includes(TableStatusKeys.currentPage)) {
            customStatus.currentPage = table.currentPage;
          }
          if (status.includes(TableStatusKeys.columnFilterValues)) {
            customStatus.columnFilterValues = table.columnFilterValues;
          }
          if (status.includes(TableStatusKeys.sorterValues)) {
            customStatus.sorterValues = table.sorterValues;
          }

          const currentStatus = getCurrentStatusFromUrl();

          // 如果新状态和当前状态不一致才 setUrlQuery
          if (!isEqual(customStatus, currentStatus)) {
            helper.setUrlQuery(formatSetQuery(table, customStatus), commonSetOptions);
          }
        });
      },
      getInitStatus(options) {
        // 如果用户传了 getInitStatus 则使用用户的
        if (config.getInitStatus) {
          return config.getInitStatus(options);
        }
        return getCurrentStatusFromUrl();
      },
    };
  }
  return config;
};
