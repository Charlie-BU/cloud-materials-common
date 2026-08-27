import React, { createContext } from 'react';

import type { Tab } from '../../core';
import type { ObjRecord } from '../../types';

export const TabContext = createContext<Tab<ObjRecord, ObjRecord>>({} as Tab<ObjRecord, ObjRecord>);

export interface TabProviderProps {
  tab: Tab<ObjRecord, ObjRecord>;
}

export const TabProvider: React.FC<TabProviderProps> = props => {
  return <TabContext.Provider value={props.tab}>{props.children}</TabContext.Provider>;
};
