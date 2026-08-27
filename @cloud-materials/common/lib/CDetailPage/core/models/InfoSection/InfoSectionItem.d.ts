import type { IInfoSectionItemProps, ObjRecord } from '../../../types';
import type { InfoSection } from './InfoSection';
import type { InfoSectionList } from './InfoSectionList';
export declare class InfoSectionItem<TabData extends ObjRecord, DetailData extends ObjRecord> {
    /**
     *  InfoSectionItem的配置
     */
    options: IInfoSectionItemProps<TabData, DetailData>;
    /**
     * InfoSectionModel对象
     */
    infoSectionModel: InfoSection<TabData, DetailData>;
    /**
     * InfoSectionListModel对象
     */
    infoSectionListModel: InfoSectionList<TabData, DetailData>;
    /**
     *
     * @param infoSection
     * @param options
     */
    constructor(options: IInfoSectionItemProps<TabData, DetailData>, infoSection: InfoSection<TabData, DetailData>, infoSectionList: InfoSectionList<TabData, DetailData>);
    private makeObservable;
}
