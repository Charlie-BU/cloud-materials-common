import React from 'react';
import type { Tab } from '../../core';
import type { ObjRecord } from '../../types';
export declare const TabContext: React.Context<Tab<ObjRecord, ObjRecord, any>>;
export interface TabProviderProps {
    tab: Tab<ObjRecord, ObjRecord>;
}
export declare const TabProvider: React.FC<TabProviderProps>;
