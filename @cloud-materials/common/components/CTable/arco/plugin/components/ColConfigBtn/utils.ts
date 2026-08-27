import type { ReactNode } from 'react';
import type { CommonProps } from './interface';

/**
 * 清空 localStorage 中存储的被隐藏的列
 */
export const resetLocalStorageHiddenCols = (storage: Storage, localStorageKey?: string) => {
  if (!localStorageKey) return;
  storage.removeItem(localStorageKey);
};

/**
 * 获取 localStorage 中存储的被隐藏的列
 * @param localStorageKey
 * @returns
 */
export const getLocalStorageHiddenCols = (storage: Storage, localStorageKey?: string) => {
  if (!localStorageKey) return;
  const savedKeys = storage.getItem(localStorageKey);
  if (savedKeys) {
    let hiddenCols = [];
    try {
      hiddenCols = JSON.parse(savedKeys);
    } catch (error) {
      console.error(`[CTable] 获取本地存储的被隐藏的列失败, key:${localStorageKey}.`, error);
    }
    return hiddenCols;
  }
};

/**
 * 设置 localStorage 中存储的被隐藏的列
 * @param localStorageKey
 * @param hiddenCols
 */
export const setLocalStorageHiddenCols = (storage: Storage, hiddenCols: string[], localStorageKey?: string) => {
  if (localStorageKey) {
    storage.setItem(localStorageKey, JSON.stringify(hiddenCols));
  }
};

/**
 * 获取自定义列中该列展示的 tooltip
 * @param tooltipConfig 自定义列组件的 columnTooltip
 * @param dataIndex 该列的 dataIndex
 * @param columnTooltip 该列 column 中的 tooltip 配置
 * @returns
 */
export const getTooltip = (tooltipConfig: CommonProps['tooltip'], dataIndex: string, columnTooltip?: ReactNode) => {
  if (!tooltipConfig) {
    return undefined;
  }
  if (tooltipConfig === true) {
    return columnTooltip;
  }

  const _tooltip = tooltipConfig[dataIndex];
  if (_tooltip === true) {
    return columnTooltip;
  }
  return _tooltip;
};
