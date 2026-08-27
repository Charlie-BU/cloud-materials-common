import classNames from 'classnames';
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';
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
const CollapsedMenu: React.VFC<CollapseMenuProps> = ({ menus, logo, activeRootMenuIndex, style }) => {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('sidebar');

  return (
    <div className={cssPrefix`collapsed-menu`} style={style}>
      {logo && <div className={cssPrefix`collapsed-menu-logo`}>{logo}</div>}
      {menus.map((menu, i) => (
        <div
          key={menu.key}
          className={classNames(
            cssPrefix`collapsed-menu-item`,
            activeRootMenuIndex === i && cssPrefix`collapsed-menu-item-active`,
            menu.type === 'sub-menu' && menu.redDot && cssPrefix`menu-item-badge-dot`,
          )}
        >
          {menu.icon}
        </div>
      ))}
    </div>
  );
};

export default CollapsedMenu;
