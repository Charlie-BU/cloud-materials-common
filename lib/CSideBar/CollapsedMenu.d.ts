import React from 'react';
import type { MenuItemProps, MenuSubMenuProps } from './interface';
export interface CollapseMenuProps {
    menus: (MenuItemProps | MenuSubMenuProps)[];
    logo?: React.ReactNode;
    style?: React.CSSProperties;
    activeRootMenuIndex: number;
}
/**
 * normal模式下菜单收起后单独渲染
 */
declare const CollapsedMenu: React.VFC<CollapseMenuProps>;
export default CollapsedMenu;
