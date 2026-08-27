import React from 'react';
import type { InfoSectionList as InfoSectionListModel } from '../../core';
import type { ObjRecord } from '../../types';
export declare const BasicInfoSectionContext: React.Context<InfoSectionListModel<ObjRecord, ObjRecord>>;
export interface BasicInfoSectionProviderProps<TabData extends ObjRecord, DetailData extends ObjRecord> {
    infoSectionList: InfoSectionListModel<TabData, DetailData>;
}
export declare const BasicInfoSectionListProvider: React.FC<BasicInfoSectionProviderProps<any, any>>;
