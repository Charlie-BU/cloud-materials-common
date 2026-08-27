import type {
  TableEditorProps,
  ControlledTableEditorConfig,
  UncontrolledTableEditorConfig,
  TableEditorColumnConfig,
  R,
} from '../types';

/**
 * 定义 CTableEditor config 的 helper 函数，便于类型提示
 * @param config
 * @returns
 */
export function defineConfig<DataItemType extends R = any, ValueType extends R = any>(
  config: ControlledTableEditorConfig<DataItemType, ValueType>,
): ControlledTableEditorConfig<DataItemType, ValueType>;
export function defineConfig<DataItemType extends R = any, ValueType extends R = any>(
  config: UncontrolledTableEditorConfig<DataItemType, ValueType>,
): UncontrolledTableEditorConfig<DataItemType, ValueType>;

export function defineConfig<DataItemType extends R = any, ValueType extends R = any>(
  config: TableEditorProps<DataItemType, ValueType>['config'],
) {
  return config;
}

/**
 * 定义 CTableEditor config 中 tableConfig 中的单个 column 配置的 helper 函数，便于类型提示
 * @param columnConfig
 * @returns
 */
export const defineColumn = <DataItemType extends R = any>(columnConfig: TableEditorColumnConfig<DataItemType>) => {
  return columnConfig;
};

/**
 * 定义 CTableEditor config 中 tableConfig 中的 columns 配置的 helper 函数，便于类型提示
 * @param columnConfig
 * @returns
 */
export const defineColumns = <DataItemType extends R = any>(columns: TableEditorColumnConfig<DataItemType>[]) => {
  return columns;
};
