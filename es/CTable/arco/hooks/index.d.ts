import type { TableModel, TableConfig } from '../types';
export * from './useLoadMore';
export * from './usePolling';
export * from './useControlled';
export declare const useMergedTableConfig: <T extends TableConfig<any, any> | undefined>(tableConfig: T) => T;
/**
 * 业务方可以直接生成领域模型传入 Table 组件，从而不需要通过 ref 拿到 table 的领域模型实例
 * 用法：
 * const SomeComp = () => {
 *    const table = useCreateTable({})
 *    return (<Table table={table} />)
 * }
 */
export declare const useCreateTable: <T extends Record<string, any> = any>(originTableConfig: TableConfig<T, any>) => TableModel<any, any>;
/**
 * 在 Table 组件内部消费业务方传入的 props
 * 业务方可能直接传 props.config，也可能传 props.table
 */
export declare const useInnerCreateTable: <T extends Record<string, any> = any>(tableConfig?: TableConfig<T, any> | undefined, tableModel?: TableModel<any>) => TableModel<any, any>;
