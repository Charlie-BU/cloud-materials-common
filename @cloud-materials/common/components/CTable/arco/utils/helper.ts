import { debounce, merge } from 'lodash-es';
import { toJS } from '@formily/reactive';
import type { TableConfig, TableModel, ColumnConfig, ToolbarConfig, PollingOptions } from '../types';
import type { AllowEmpty } from '../types/common';

// 为了方便用户直接获取 table 的 config，而不需要引入 TableConfig 类型
export const getTableConfig = <
  DataItemType extends Record<string, any> = any,
  GlobalScopeType extends Record<string, any> = any,
>(
  config: TableConfig<DataItemType, GlobalScopeType>,
) => {
  return config;
};

/** 在配置 column config 有类型提示，而不需要引入 ColumnConfig 类型*/
export const defineColumn = <
  DataItemType extends Record<string, any> = any,
  GlobalScopeType extends Record<string, any> = any,
>(
  columnConfig: ColumnConfig<DataItemType, GlobalScopeType>,
) => {
  return columnConfig;
};

/** 定义 columns，有类型提示，而不需要引入 ColumnConfig 类型*/
export const defineColumns = <
  DataItemType extends Record<string, any> = any,
  GlobalScopeType extends Record<string, any> = any,
>(
  columns: AllowEmpty<ColumnConfig<DataItemType, GlobalScopeType>>[],
) => {
  return columns;
};

/** 定义 toolbar，有类型提示，而不需要引入 ToolbarConfig 类型*/
export const defineToolbar = <
  DataItemType extends Record<string, any> = any,
  GlobalScopeType extends Record<string, any> = any,
>(
  toolbarConfig: ToolbarConfig<DataItemType, GlobalScopeType>,
) => {
  return toolbarConfig;
};

/** 未做 debounce */
export const changeToolbarValuesPure = (table: TableModel<any>, values: Record<string, any>) => {
  // values 可能是 form 传过来的值，将 values toJS 避免 form 和 table 持有同一个 proxy 的对象，以防万一出问题（不确定是否有问题）
  table.toolbar?.setFilterValues(toJS(values), { merge: true });
  table.toolbar?.filter();
};

/** 这里默认为 500，若想修改 debounce 行为请依赖 changeToolbarValuesPure 自行处理 */
export const changeToolbarValues = debounce(changeToolbarValuesPure, 500);

/**
 * 创建轮询实例
 * @param options
 * @returns
 */
export const createPolling = (options: PollingOptions) => {
  const defaultOptions: Partial<PollingOptions> = {
    manual: false,
    showLoading: false,
    resetSelectedRows: false,
    autoStopAndStartOnVisibilityChange: true,
  };
  return {
    start: () => {},
    stop: () => {},
    options: merge(defaultOptions, options),
  };
};
