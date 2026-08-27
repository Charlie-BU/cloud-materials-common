import type { MenuSubMenuProps } from '@arco-design/web-react';
import { ConfigProvider, Menu } from '@arco-design/web-react';
import useResizeObserver from '@react-hook/resize-observer';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useCConfigContext } from '../CConfigProvider';

/**
 * 它为什么存在？
 * title的容器是span 并且没有class，并且顺序不固定，无法通过css覆盖样式达到效果，只能通过此种办法追加Popover
 */
const SubMenu: React.FC<MenuSubMenuProps> & { menuType: string } = ({ title, ...props }) => {
  const subMenuRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const { prefixCls } = useContext(ConfigProvider.ConfigContext);
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('sidebar');

  const handleMaxWidth = (subMenu: Element) => {
    const subMenuDOM: Element | null = subMenu.firstElementChild;
    if (subMenuDOM) {
      const { paddingLeft, paddingRight } = getComputedStyle(subMenuDOM);
      const menuIndent = subMenuDOM.getElementsByClassName(`${prefixCls}-menu-indent`);
      const indent = Array.from(menuIndent).reduce((prev, indent) => indent.clientWidth + prev, 0);
      setMaxWidth(
        subMenuDOM.clientWidth - (parseInt(paddingLeft, 10) || 0) - (parseInt(paddingRight, 10) || 0) - indent,
      );
    }
  };

  useLayoutEffect(() => {
    if (subMenuRef.current) {
      handleMaxWidth(subMenuRef.current);
    }
  }, []);

  useResizeObserver(subMenuRef, ({ target }) => {
    handleMaxWidth(target);
  });

  return (
    <Menu.SubMenu
      {...props}
      ref={subMenuRef}
      title={
        <span style={{ maxWidth }} className={cssPrefix`submenu-title`}>
          {title}
        </span>
      }
    />
  );
};

// 伪装成 Submenu 以被arco识别
SubMenu.menuType = Menu.SubMenu.menuType;

export default SubMenu;
