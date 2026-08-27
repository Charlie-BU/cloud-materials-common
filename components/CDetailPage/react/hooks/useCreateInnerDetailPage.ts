import { useMemo } from 'react';
import { safeRace } from '@byted-c/storage.utils.safe-race';
import type { ICDetailPageOptions, ObjRecord } from '../../types';
import { DetailPage } from '../../core';
import { getInitDetailPageOptions } from '../../shared';

/**
 * 创建detailPage配置化对象
 * @param config
 * @returns
 */
export const useCreateInnerDetailPage = <DetailData extends ObjRecord>(config: ICDetailPageOptions<DetailData>) => {
  const detailPage = useMemo(() => new DetailPage<DetailData>(config), []);

  // 在config改变时重新赋值
  if (config) {
    const { fetcher, ...rest } = {
      ...getInitDetailPageOptions(),
      ...config,
    };

    detailPage.options = {
      ...rest,
      fetcher: rest.enableRaceCondition ? safeRace(fetcher) : fetcher,
    };

    detailPage.originFetcher = fetcher;
  }

  return detailPage;
};
