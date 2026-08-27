import type { MenuSubMenuProps } from '@arco-design/web-react';
import React from 'react';
/**
 * 它为什么存在？
 * title的容器是span 并且没有class，并且顺序不固定，无法通过css覆盖样式达到效果，只能通过此种办法追加Popover
 */
declare const SubMenu: React.FC<MenuSubMenuProps> & {
    menuType: string;
};
export default SubMenu;
