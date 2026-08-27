import type { CDetailHeaderProps } from '../../CDetail/interface';
import type { DetailPage } from '../core';
import type { ObjRecord, ICDetailPageOptions, IRefreshOptions } from '../types';
/**
 * @zh 处理顶部操作按钮
 * @param options
 */
export declare const dealOperationMenus: (options: {
    operationMenuProps: CDetailHeaderProps['cOperationMenuProps'];
    needRefresh: boolean;
    detailPage: DetailPage<ObjRecord>;
    refresh: (options: IRefreshOptions) => Promise<void>;
    refreshText: string;
}) => CDetailHeaderProps['cOperationMenuProps'];
/**
 * 获取detailPage options的默认值
 * @returns
 */
export declare const getInitDetailPageOptions: <T extends ObjRecord>() => ICDetailPageOptions<T, any>;
