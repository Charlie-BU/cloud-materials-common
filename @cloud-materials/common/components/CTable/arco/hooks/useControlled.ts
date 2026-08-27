import { useEffect } from 'react';
import type { TableConfig, TableModel } from '../types';

// 支持部分 table 配置的受控
export const useControlledConfig = (
  table: TableModel<Record<string, unknown>>,
  tableConfig?: TableConfig<Record<string, unknown>>,
) => {
  // TableEditor 场景下不能支持 config 根据 props.config 变化
  // 所以只有非 TableEditor 场景才会将最新的 config 赋予 table 领域模型
  if (!table.config.extraConfig?.isInTableEditor && tableConfig) {
    // 每次都将最新的 config 保存到 table 上，以规避 react 闭包问题
    table.config = tableConfig;
  }

  useEffect(() => {
    if (
      // 如果声明了 column.title 受控，或通过全局的 ConfigProvider 声明了所有的 column.title 都受控
      tableConfig?.extraConfig?.controlledConfig?.['column.title']
    ) {
      table.config.columns?.forEach(columnConfig => {
        // 其实 table.config.columns 已经被 fix 过了，columnConfig 一定存在的
        // 这里还是判断一下 columnConfig 的存在性，避免类型报错，保证此处代码的严谨性
        // 逻辑在 packages/common/components/CTable/core/models/Table.ts fixColumns
        if (!columnConfig) {
          return;
        }
        // table.config.columns 被 fix 后，dataIndex 也是必然存在的，这里同样也是处理下类型上的严谨性
        const column = table.getColumnByDataIndex(columnConfig.dataIndex ?? '');
        if (!column) {
          return;
        }
        if (column.title !== columnConfig.title) {
          column.setTitle(columnConfig.title as string);
        }
      });
    }
  }, [table.config]);
};
