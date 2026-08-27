import type { DetailPage } from '../../core';
import type { ObjRecord } from '../../types';
/**
 * 获取DetailPage对象
 * @returns
 */
export declare const useDetailPage: <DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = any>() => DetailPage<DetailData, GlobalScopeType>;
