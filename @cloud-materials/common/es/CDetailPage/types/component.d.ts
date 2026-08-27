import type React from 'react';
import { Alert } from '@arco-design/web-react';
declare const InfoSectionList: import("../../_factory/builtInComponent/interface").BuiltInType<(props: import("../../CInfoSection/interface").CInfoSectionListProps) => JSX.Element, {
    CEllipsis: typeof import("../../CEllipsis").default;
    CInlineEdit: React.FC<import("../..").CInlineEditProps<any>>;
    CCopy: React.FC<import("../..").CCopyProps>;
    Word: React.FC<import("../../CInfoSection/Word").WordProps>;
}>;
export interface TabNoticeComponentPropsMap {
    Alert: React.ComponentProps<typeof Alert>;
}
export declare const TabNoticeComponentMap: Record<string, any>;
export type TabNoticeComponentsProps<T extends keyof TabNoticeComponentPropsMap> = TabNoticeComponentPropsMap[T];
export type TabNoticeAllComponentProps = TabNoticeComponentsProps<'Alert'> | any;
export interface TabComponentPropsMap {
    InfoSectionList: React.ComponentProps<typeof InfoSectionList>;
}
export type TabComponentsProps<T extends keyof TabComponentPropsMap> = TabComponentPropsMap[T];
export type AllTabComponentProps = TabComponentsProps<'InfoSectionList'>;
export declare const TabComponentMap: Record<string, any>;
export {};
