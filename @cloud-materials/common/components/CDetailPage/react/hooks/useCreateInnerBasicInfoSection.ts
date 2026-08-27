import { useMemo } from 'react';

import { InfoSectionList } from '../../core';
import type { IInfoSectionListProps, ObjRecord } from '../../types';

export const useCreateInnerBasicInfoSectionList = <TabData extends ObjRecord, DetailData extends ObjRecord>(
  config: IInfoSectionListProps<TabData, DetailData>,
) => {
  const infoSectionList = useMemo(() => new InfoSectionList(config), []);
  return infoSectionList;
};
