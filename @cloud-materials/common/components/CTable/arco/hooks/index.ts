/*
 * @Author: youjingyu
 * @Date: 2021-10-14 17:04:10
 * @LastEditTime: 2021-12-04 12:15:29
 * @LastEditors: youjingyu
 * @Description:
 */
import { useMemo } from 'react';
import { createTable } from '../../core';
import type { TableModel, TableConfig } from '../types';
import { useCConfigContext } from '../../../CConfigProvider';
import { merge } from 'lodash-es';
// import { fixTableConfig } from '../utils';

export * from './useLoadMore';
export * from './usePolling';
export * from './useControlled';

export const useMergedTableConfig = <T extends TableConfig<any> | undefined>(tableConfig: T): T => {
  const { cComponentConfig } = useCConfigContext();

  const cTableGlobalConfig = cComponentConfig?.CTable;

  return useMemo(() => {
    // tableConfig 存在时才合并，否则会造成 props.table 与 props.config 互斥逻辑错误
    if (tableConfig && cTableGlobalConfig) {
      return merge<Partial<TableConfig<any>>, TableConfig<any>, Partial<TableConfig<any>>>(
        {},
        tableConfig,
        cTableGlobalConfig,
      ) as T;
    }

    return tableConfig;
  }, [tableConfig, cTableGlobalConfig]);
};

/**
 * 业务方可以直接生成领域模型传入 Table 组件，从而不需要通过 ref 拿到 table 的领域模型实例
 * 用法：
 * const SomeComp = () => {
 *    const table = useCreateTable({})
 *    return (<Table table={table} />)
 * }
 */
export const useCreateTable = <T extends Record<string, any> = any>(originTableConfig: TableConfig<T>) => {
  const tableConfig = useMergedTableConfig(originTableConfig);
  // fixTableConfig(tableConfig);
  const table = useMemo(() => createTable(tableConfig), []) as TableModel<any>;
  /**
   * 这里直接更新 table 的配置，因为 config 变化时，一定是调用 useCreateTable 的组件(上面的SomeComp) rerender 了
   * 而作为子组件的 Table 本身也会更新，如果这里使用 useEffect 监听 config 变化，然后 forceUpdate
   * 此时 rerender 的是 SomeComp，该组件又会生成新的 config
   * 新的 config 被 useEffect 监听到，又 rerender，导致组件无限 render
   *
   * 另外，因为 table.config 有 setter 逻辑，初始化时，实例化 table 实例（createTable），有一次 config 赋值
   * 这里又有一次 config 赋值，其实会导致 setter 执行两次，影响不大
   * */
  table.config = tableConfig;
  return table;
};

/**
 * 在 Table 组件内部消费业务方传入的 props
 * 业务方可能直接传 props.config，也可能传 props.table
 */
export const useInnerCreateTable = <T extends Record<string, any> = any>(
  tableConfig?: TableConfig<T>,
  tableModel?: TableModel<any>,
) => {
  // if (tableConfig) {
  //   fixTableConfig(tableConfig);
  // }
  const table = useMemo(() => tableModel || createTable(tableConfig!), []) as TableModel<any>;

  return table;
};
