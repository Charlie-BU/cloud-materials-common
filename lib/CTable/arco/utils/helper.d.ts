import type { TableConfig, TableModel, ColumnConfig, ToolbarConfig, PollingOptions } from '../types';
import type { AllowEmpty } from '../types/common';
export declare const getTableConfig: <DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(config: TableConfig<DataItemType, GlobalScopeType>) => TableConfig<DataItemType, GlobalScopeType>;
/** 在配置 column config 有类型提示，而不需要引入 ColumnConfig 类型*/
export declare const defineColumn: <DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(columnConfig: ColumnConfig<DataItemType, GlobalScopeType>) => ColumnConfig<DataItemType, GlobalScopeType>;
/** 定义 columns，有类型提示，而不需要引入 ColumnConfig 类型*/
export declare const defineColumns: <DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(columns: AllowEmpty<ColumnConfig<DataItemType, GlobalScopeType>>[]) => AllowEmpty<ColumnConfig<DataItemType, GlobalScopeType>>[];
/** 定义 toolbar，有类型提示，而不需要引入 ToolbarConfig 类型*/
export declare const defineToolbar: <DataItemType extends Record<string, any> = any, GlobalScopeType extends Record<string, any> = any>(toolbarConfig: ToolbarConfig<DataItemType, GlobalScopeType>) => ToolbarConfig<DataItemType, GlobalScopeType>;
/** 未做 debounce */
export declare const changeToolbarValuesPure: (table: TableModel<any>, values: Record<string, any>) => void;
/** 这里默认为 500，若想修改 debounce 行为请依赖 changeToolbarValuesPure 自行处理 */
export declare const changeToolbarValues: import("lodash-es").DebouncedFunc<(table: TableModel<any>, values: Record<string, any>) => void>;
/**
 * 创建轮询实例
 * @param options
 * @returns
 */
export declare const createPolling: (options: PollingOptions) => {
    start: () => void;
    stop: () => void;
    options: Partial<PollingOptions> & PollingOptions;
};
