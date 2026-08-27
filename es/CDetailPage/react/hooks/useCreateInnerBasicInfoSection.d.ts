import { InfoSectionList } from '../../core';
import type { IInfoSectionListProps, ObjRecord } from '../../types';
export declare const useCreateInnerBasicInfoSectionList: <TabData extends ObjRecord, DetailData extends ObjRecord>(config: IInfoSectionListProps<TabData, DetailData, any>) => InfoSectionList<TabData, DetailData>;
