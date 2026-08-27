import type { TableConfig } from '../types';
/**
 * 如果用户配了 syncWithUrlQuery，需要处理 config
 *
 * - table status 改变同步到 url query，是在各个 status 改变的 effect 中执行的，所以需要处理 effect
 * - 初始化时，将 url query 同步到 table status，需要处理 getInitStatus
 * @param config
 * @returns
 */
export declare const formatUrlQueryConfig: (config?: TableConfig<any>) => TableConfig<any> | undefined;
