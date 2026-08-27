import type { ICDetailPageOptions, ObjRecord } from '../../types';
import { DetailPage } from '../../core';
/**
 * 创建detailPage配置化对象
 * @param config
 * @returns
 */
export declare const useCreateInnerDetailPage: <DetailData extends ObjRecord>(config: ICDetailPageOptions<DetailData, any>) => DetailPage<DetailData, any>;
