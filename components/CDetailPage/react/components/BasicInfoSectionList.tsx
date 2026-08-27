import React, { createContext } from 'react';

import type { InfoSectionList as InfoSectionListModel } from '../../core';
import type { ObjRecord } from '../../types';

export const BasicInfoSectionContext = createContext<InfoSectionListModel<ObjRecord, ObjRecord>>(
  {} as InfoSectionListModel<ObjRecord, ObjRecord>,
);

export interface BasicInfoSectionProviderProps<TabData extends ObjRecord, DetailData extends ObjRecord> {
  infoSectionList: InfoSectionListModel<TabData, DetailData>;
}

export const BasicInfoSectionListProvider: React.FC<BasicInfoSectionProviderProps<any, any>> = props => {
  return (
    <BasicInfoSectionContext.Provider value={props?.infoSectionList}>{props.children}</BasicInfoSectionContext.Provider>
  );
};
