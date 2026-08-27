import type { ObjRecord, IInfoSectionListProps } from '../../../types';
import { InfoSection } from './InfoSection';
export declare class InfoSectionList<TabData extends ObjRecord, DetailData extends ObjRecord> {
    /** 基本配置 */
    options: IInfoSectionListProps<TabData, DetailData>;
    /** section数组对象 */
    sections: InfoSection<TabData, DetailData>[];
    constructor(options: IInfoSectionListProps<TabData, DetailData>);
    private makeObservable;
    private initDataFromConfig;
}
