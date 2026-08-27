import React from 'react';
import type { TabsProps } from '@arco-design/web-react';
import type { CDrawerProps } from './interface';
import type { TabPaneProps } from '@arco-design/web-react/es/Tabs';
import type { CStatusProps } from '../CStatus';
type Items = (TabPaneProps & {
    key: React.Key;
})[];
interface ExtendsTabsProps extends TabsProps {
    items?: Items;
}
export interface CDrawerDetailProps extends CDrawerProps {
    tabs?: ExtendsTabsProps;
    cStatusProps?: CStatusProps;
}
declare const DrawerDetail: React.ForwardRefExoticComponent<CDrawerDetailProps & React.RefAttributes<HTMLDivElement>> & {
    open: <P extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<CDrawerDetailProps & React.RefAttributes<HTMLDivElement>>) => import("../_factory/maskableComponent").StaticMethodsReturn<CDrawerDetailProps & React.RefAttributes<HTMLDivElement>, P>;
    close: (id?: number | undefined) => void;
};
export default DrawerDetail;
