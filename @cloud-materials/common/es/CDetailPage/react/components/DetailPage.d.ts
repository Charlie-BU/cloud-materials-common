import React from 'react';
import type { DetailPage } from '../../core';
import type { ObjRecord } from '../../types';
export declare const DetailPageContext: React.Context<DetailPage<ObjRecord, any>>;
export interface DetailPageProviderProps<DetailData extends ObjRecord> {
    detailPage: DetailPage<DetailData>;
}
export declare const DetailPageProvider: React.FC<DetailPageProviderProps<any>>;
