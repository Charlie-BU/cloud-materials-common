import type React from 'react';
import { Alert } from '@arco-design/web-react';

import InfoSection from '../../CInfoSection';

const { List: InfoSectionList } = InfoSection;

export interface TabNoticeComponentPropsMap {
  Alert: React.ComponentProps<typeof Alert>;
}
export const TabNoticeComponentMap: Record<string, any> = {
  Alert,
};

export type TabNoticeComponentsProps<T extends keyof TabNoticeComponentPropsMap> = TabNoticeComponentPropsMap[T];

export type TabNoticeAllComponentProps = TabNoticeComponentsProps<'Alert'> | any;

export interface TabComponentPropsMap {
  InfoSectionList: React.ComponentProps<typeof InfoSectionList>;
}
export type TabComponentsProps<T extends keyof TabComponentPropsMap> = TabComponentPropsMap[T];
export type AllTabComponentProps = TabComponentsProps<'InfoSectionList'>;
export const TabComponentMap: Record<string, any> = {
  InfoSectionList: InfoSectionList,
};
