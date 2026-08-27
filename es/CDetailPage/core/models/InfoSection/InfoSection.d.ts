import type { ObjRecord, IInfoSectionDataProps } from '../../../types';
import { InfoSectionItem } from './InfoSectionItem';
import type { InfoSectionList } from './InfoSectionList';
export declare class InfoSection<TabData extends ObjRecord, DetailData extends ObjRecord> {
    /**
     * 单个InfoSection的配置参数
     */
    options: IInfoSectionDataProps<TabData, DetailData>;
    /**
     * 每一项的配置
     */
    infoItemList?: InfoSectionItem<TabData, DetailData>[];
    /**
     *
     * @param options
     */
    infoSectionListModel: InfoSectionList<TabData, DetailData>;
    constructor(options: IInfoSectionDataProps<TabData, DetailData>, infoSectionListModel: InfoSectionList<TabData, DetailData>);
    private makeObservable;
    /**
     * 初始化Section每一项
     */
    private initInfoItemList;
}
