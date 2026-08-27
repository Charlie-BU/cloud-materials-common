import type React from 'react';
import { useContext } from 'react';

import { DetailPageContext } from '../components';
import type { DetailPage } from '../../core';
import type { ObjRecord } from '../../types';

/**
 * 获取DetailPage对象
 * @returns
 */
export const useDetailPage = <DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = any>(): DetailPage<
  DetailData,
  GlobalScopeType
> =>
  useContext<DetailPage<DetailData, GlobalScopeType>>(
    DetailPageContext as React.Context<DetailPage<DetailData, GlobalScopeType>>,
  );
