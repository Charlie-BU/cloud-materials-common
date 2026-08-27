import type { ControlledTableEditorConfig, UncontrolledTableEditorConfig, TableEditorColumnConfig, R } from '../types';
/**
 * 定义 CTableEditor config 的 helper 函数，便于类型提示
 * @param config
 * @returns
 */
export declare function defineConfig<DataItemType extends R = any, ValueType extends R = any>(config: ControlledTableEditorConfig<DataItemType, ValueType>): ControlledTableEditorConfig<DataItemType, ValueType>;
export declare function defineConfig<DataItemType extends R = any, ValueType extends R = any>(config: UncontrolledTableEditorConfig<DataItemType, ValueType>): UncontrolledTableEditorConfig<DataItemType, ValueType>;
/**
 * 定义 CTableEditor config 中 tableConfig 中的单个 column 配置的 helper 函数，便于类型提示
 * @param columnConfig
 * @returns
 */
export declare const defineColumn: <DataItemType extends R = any>(columnConfig: TableEditorColumnConfig<DataItemType>) => TableEditorColumnConfig<DataItemType>;
/**
 * 定义 CTableEditor config 中 tableConfig 中的 columns 配置的 helper 函数，便于类型提示
 * @param columnConfig
 * @returns
 */
export declare const defineColumns: <DataItemType extends R = any>(columns: TableEditorColumnConfig<DataItemType>[]) => TableEditorColumnConfig<DataItemType>[];
