import type { ObjRecord, ICDetailPageOptions, IInfoSectionListProps } from '../types';

/**
 * 生成DetailPage配置
 * @param config
 * @returns
 */
export const defineDetailPageConfig = <DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = ObjRecord>(
  config: ICDetailPageOptions<DetailData, GlobalScopeType>,
): ICDetailPageOptions<DetailData, GlobalScopeType> => {
  return config;
};

/**
 * 生成InfoSection配置
 * @param config
 * @returns
 */
export const defineInfoSectionListConfig = <
  TabData extends ObjRecord,
  DetailData extends ObjRecord,
  GlobalScopeType extends ObjRecord = ObjRecord,
>(
  config: IInfoSectionListProps<TabData, DetailData, GlobalScopeType>,
): IInfoSectionListProps<TabData, DetailData, GlobalScopeType> => {
  return config;
};
