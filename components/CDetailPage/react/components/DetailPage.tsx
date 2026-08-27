import React, { createContext } from 'react';

import type { DetailPage } from '../../core';
import type { ObjRecord } from '../../types';

export const DetailPageContext = createContext<DetailPage<ObjRecord>>({} as DetailPage<ObjRecord>);

export interface DetailPageProviderProps<DetailData extends ObjRecord> {
  detailPage: DetailPage<DetailData>;
}
export const DetailPageProvider: React.FC<DetailPageProviderProps<any>> = props => {
  return <DetailPageContext.Provider value={props?.detailPage}>{props.children}</DetailPageContext.Provider>;
};
