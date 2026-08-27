import type { ReactNode } from 'react';
import type { CommonProps } from './interface';
/**
 * 清空 localStorage 中存储的被隐藏的列
 */
export declare const resetLocalStorageHiddenCols: (storage: Storage, localStorageKey?: string) => void;
/**
 * 获取 localStorage 中存储的被隐藏的列
 * @param localStorageKey
 * @returns
 */
export declare const getLocalStorageHiddenCols: (storage: Storage, localStorageKey?: string) => any;
/**
 * 设置 localStorage 中存储的被隐藏的列
 * @param localStorageKey
 * @param hiddenCols
 */
export declare const setLocalStorageHiddenCols: (storage: Storage, hiddenCols: string[], localStorageKey?: string) => void;
/**
 * 获取自定义列中该列展示的 tooltip
 * @param tooltipConfig 自定义列组件的 columnTooltip
 * @param dataIndex 该列的 dataIndex
 * @param columnTooltip 该列 column 中的 tooltip 配置
 * @returns
 */
export declare const getTooltip: (tooltipConfig: CommonProps['tooltip'], dataIndex: string, columnTooltip?: ReactNode) => {} | null | undefined;
