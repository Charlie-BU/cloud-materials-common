import type { CDetailHeaderProps } from '../../CDetail/interface';
import type { DetailPage } from '../core';
import type { ObjRecord, ICDetailPageOptions, IRefreshOptions } from '../types';

/**
 * @zh 处理顶部操作按钮
 * @param options
 */
export const dealOperationMenus = (options: {
  // 顶部操作按钮配置
  operationMenuProps: CDetailHeaderProps['cOperationMenuProps'];
  // 是否需要刷新按钮
  needRefresh: boolean;
  detailPage: DetailPage<ObjRecord>;
  // 刷新事件
  refresh: (options: IRefreshOptions) => Promise<void>;
  refreshText: string;
}): CDetailHeaderProps['cOperationMenuProps'] => {
  const { operationMenuProps, needRefresh, detailPage, refresh, refreshText } = options;
  if (needRefresh) {
    const refreshBtn = {
      name: refreshText,
      onClick: () => {
        refresh?.({
          showLoading: Boolean(detailPage?.options?.needLoading),
        });
      },
    };

    return {
      ...operationMenuProps,
      operations: [refreshBtn, ...(operationMenuProps?.operations || [])],
    };
  } else {
    return operationMenuProps;
  }
};

/**
 * 获取detailPage options的默认值
 * @returns
 */
export const getInitDetailPageOptions = <T extends ObjRecord>() => {
  const defaultOptions: ICDetailPageOptions<T> = {
    needLoading: true,
    needTabPane: true,
    tabs: [],
    resetActiveTab: false,
    autoInit: true,
    urlTabKeyName: 'tabKey',
    cDetailPageHeaderProps: {
      title: '',
      needRefreshBtn: true,
    },
    cDetailPageContentProps: {},
    fetcher: () => Promise.resolve({}),
  };
  return defaultOptions;
};
