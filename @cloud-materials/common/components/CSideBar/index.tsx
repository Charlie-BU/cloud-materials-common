import {
  IconCaretDown,
  IconDown,
  IconLeft,
  IconMenuFold,
  IconMenuUnfold,
} from '@arco-design/iconbox-react-ve-o-design';
import { Dropdown, Menu, Popover } from '@arco-design/web-react';
import { IconLaunch } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import { isNil } from 'lodash-es';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { useCConfigContext } from '../CConfigProvider';
import CEllipsis from '../CEllipsis';
import CollapsedMenu from './CollapsedMenu';
import SubMenu from './SubMenu';
import { useCSideBar } from './hooks';
import type { CSideBarBadgeProps, CSideBarProps, MenuItemProps } from './interface';
import { badgeToProps, extraCtrlIsFeedback, testIdPrefix } from './util';
import { Feedback } from './Feedback';

const { Item: MenuItem, ItemGroup } = Menu;

interface RenderMenuParams extends Pick<CSideBarProps, 'mode' | 'menus'> {
  openKeys: string[];
  disabled?: boolean;
}

const defaultRenderMenuItem: CSideBarProps['renderMenuItem'] = props => <span {...props} />;

const CSideBar = React.forwardRef<HTMLDivElement | null, CSideBarProps>((props, ref) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const expandTriggerRef = useRef<HTMLDivElement>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const widthControlledRef = useRef<HTMLDivElement>(null);
  const widthControllerRef = useRef<HTMLDivElement>(null);
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('sidebar');

  const [
    {
      menus,
      collapse,
      isExpandTriggerHovering,
      mode: userSetMode,
      title,
      rootMenus,
      activeRootMenuIndex,
      arcoMenuProps,
      selectedKeys,
      openKeys,
      widthControl,
      widthControlling,
      renderMenuItem = defaultRenderMenuItem,
      extraCtrl,
      collapsible,
      ...sidebarProps
    },
    sideBarControls,
  ] = useCSideBar({
    ...props,
    controlledRefs: [sidebarRef, widthControlledRef],
    widthControllerRef,
    expandTriggerRef,
    rootRef: sidebarRef,
  });

  // 用户在未传入mode时，自动计算mode
  const mode: CSideBarProps['mode'] = userSetMode ?? (rootMenus.length ? 'normal' : 'icon-less');

  const { sidebarWidth = sidebarProps.style?.width ?? 200, ...restProps } = sidebarProps;

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => sidebarRef.current);

  const renderBadge = (
    badge: MenuItemProps['badge'],
    redDot: boolean,
    reactNode: React.ReactNode,
    defaultProps: Partial<CSideBarBadgeProps> = {},
  ) => {
    const { type: badgeType = 'badge', content, follow } = badgeToProps(badge, defaultProps);
    const isBadge = badgeType === 'badge';

    return (
      <>
        <span
          className={classNames(
            cssPrefix`menu-item-left`,
            !follow && cssPrefix`menu-item-left-full-up`,
            redDot && cssPrefix`menu-item-badge-dot`,
          )}
        >
          {reactNode}
        </span>
        {content && (
          <div className={classNames(cssPrefix`menu-item-badge`, isBadge && cssPrefix`menu-item-badge-builtin`)}>
            {content}
          </div>
        )}
      </>
    );
  };

  const renderMenu = ({ mode, openKeys, menus = [], disabled = false }: RenderMenuParams) => {
    const renderIcon = (icon: React.ReactNode) => {
      if (mode !== 'icon-less') {
        if (React.isValidElement(icon)) {
          return React.cloneElement<any>(icon, {
            className: classNames(icon.props.className, cssPrefix`prefix-icon`),
          });
        }
        return icon && <span className={cssPrefix`prefix-icon`}>{icon}</span>;
      }

      return null;
    };
    return menus.map(menuConfig => {
      if (menuConfig.type === 'group') {
        const { children, title, className, ...groupProps } = menuConfig;
        return (
          // eslint-disable-next-line react/jsx-key
          <ItemGroup
            {...groupProps}
            title={
              title && (
                <CEllipsis arcoPopoverProps={{ getPopupContainer: () => popupContainerRef.current! }}>
                  {title}
                </CEllipsis>
              )
            }
            className={classNames(cssPrefix`group-title`, className)}
          >
            {renderMenu({ mode, menus: children, openKeys })}
          </ItemGroup>
        );
      }

      if (menuConfig.type === 'sub-menu') {
        const {
          children,
          icon,
          title,
          badge,
          redDot = false,
          disabled: disabledSubMenu = disabled,
          ...subMenuProps
        } = menuConfig;

        return (
          // eslint-disable-next-line react/jsx-key
          <SubMenu
            {...subMenuProps}
            className={classNames(
              openKeys.includes(subMenuProps.key) && cssPrefix`submenu-open`,
              subMenuProps.className,
              disabledSubMenu && cssPrefix`submenu-disabled`,
            )}
            onClickCapture={e => {
              // 禁用后阻止事件传播，可以禁用子元素的 onClick
              if (disabledSubMenu) {
                e.stopPropagation();
              }
            }}
            title={renderBadge(
              badge,
              redDot,
              <CEllipsis
                popoverContent={title}
                showPopover={disabledSubMenu ? false : 'auto'}
                arcoPopoverProps={{ getPopupContainer: () => popupContainerRef.current! }}
              >
                {renderIcon(icon)}
                <span style={{ verticalAlign: 'middle' }}>{title!}</span>
              </CEllipsis>,
              { type: 'custom', follow: true },
            )}
          >
            {renderMenu({ mode, menus: children, openKeys, disabled: disabledSubMenu })}
          </SubMenu>
        );
      }

      if (menuConfig.type === 'category-title') {
        const { label, className, type: _, key, ...restMenuConfig } = menuConfig;
        return (
          label && (
            <CEllipsis
              key={key}
              className={classNames(cssPrefix`category-title`, className)}
              arcoPopoverProps={{ getPopupContainer: () => popupContainerRef.current! }}
            >
              <span {...restMenuConfig}>{label}</span>
            </CEllipsis>
          )
        );
      }

      if (menuConfig.type === 'custom') {
        return (
          <React.Fragment key={menuConfig.key}>
            {menuConfig.render({
              renderMenus: menus => renderMenu({ mode, menus, openKeys }),
            })}
          </React.Fragment>
        );
      }

      const {
        label,
        name,
        isOuter,
        outerMarkIcon = <IconLaunch />,
        icon,
        hidden,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        extraMatchKeys,
        data,
        exact,
        path,
        type,
        selectable,
        badge,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        disabled: menuDisabled = disabled,
        ...restMenuConfig
      } = menuConfig;
      return (
        !hidden && (
          <MenuItem {...restMenuConfig} data-testid={path ?? restMenuConfig.key} disabled={menuDisabled}>
            {renderMenuItem(
              {
                children: renderBadge(
                  badge,
                  false,
                  <>
                    {renderIcon(icon)}
                    <CEllipsis
                      className={cssPrefix`menu-item-text`}
                      showPopover={menuDisabled ? false : 'auto'}
                      arcoPopoverProps={{
                        getPopupContainer: () => popupContainerRef.current!,
                      }}
                    >
                      {label ?? name!}
                    </CEllipsis>
                    {isOuter &&
                      outerMarkIcon &&
                      React.cloneElement(outerMarkIcon, { className: cssPrefix`menu-item-suffix` })}
                  </>,
                ),
                className: cssPrefix`menu-item-box`,
              },
              menuConfig,
            )}
          </MenuItem>
        )
      );
    });
  };
  const iconLessMode = mode === 'icon-less';
  const normalMode = mode === 'normal';

  const menuChildren = useMemo(() => renderMenu({ menus, mode, openKeys }), [menus, mode, openKeys]);

  const showMenu = !collapse || isExpandTriggerHovering || iconLessMode;

  const hasTitleMenus = Boolean(title?.menuConfig);
  const titleNode = title?.text && (
    <span
      className={classNames(cssPrefix`title-text`, hasTitleMenus && cssPrefix`title-text-point`)}
      style={{ fontSize: title.size }}
    >
      {title.text}
      {hasTitleMenus && <IconCaretDown className={cssPrefix`title-dropdown-arrow`} />}
    </span>
  );

  return (
    <div
      {...restProps}
      className={classNames(
        cssPrefix``,
        collapse && normalMode && cssPrefix`collapse`,
        collapse && iconLessMode && cssPrefix`iconLess-collapse`,
        collapse && isExpandTriggerHovering && normalMode && cssPrefix`expand`,
        restProps.className,
      )}
      ref={sidebarRef}
      style={{ ...restProps.style, width: collapse ? '' : sidebarWidth }}
      data-collapse={collapse}
      data-cy={testIdPrefix``}
    >
      <div
        className={cssPrefix`inner`}
        style={{ width: isExpandTriggerHovering && normalMode && collapse ? sidebarWidth : '' }}
      >
        <div className={cssPrefix`menus-box`} ref={expandTriggerRef}>
          {normalMode && collapse && !isExpandTriggerHovering && (
            <CollapsedMenu menus={rootMenus} logo={title?.logo} activeRootMenuIndex={activeRootMenuIndex} />
          )}
          <div
            ref={widthControlledRef}
            // 将title撑起来，不让title因为换行挤压下面的内容造成动画不连贯
            className={cssPrefix`prop-up-box`}
            style={{
              width: (isExpandTriggerHovering && normalMode) || !collapse ? sidebarWidth : '',
              display: showMenu ? void 0 : 'none',
            }}
          >
            {title && (
              <div
                className={classNames(cssPrefix`title`, hasTitleMenus && cssPrefix`title-with-menus`)}
                style={{
                  display: showMenu ? void 0 : 'none',
                }}
              >
                {title.onBack ? (
                  <button type="button" className={cssPrefix`back`} onClick={title.onBack}>
                    <IconLeft />
                  </button>
                ) : (
                  title.logo && <span className={cssPrefix`title-logo`}>{title.logo}</span>
                )}
                {hasTitleMenus ? (
                  <Dropdown
                    position="bottom"
                    droplist={
                      <Menu
                        style={{ maxWidth: parseInt(sidebarWidth.toString(), 10) * (152 / 200) }}
                        {...title.menuConfig?.arcoMenuProps}
                      >
                        {title.menuConfig?.arcoMenuProps?.children ??
                          title.menuConfig?.menus?.map(({ children, ...menuItemProps }) => (
                            // eslint-disable-next-line react/jsx-key
                            <Menu.Item {...menuItemProps}>
                              <CEllipsis
                                arcoPopoverProps={{
                                  position: 'right',
                                  getPopupContainer: () => popupContainerRef.current!,
                                }}
                              >
                                {children!}
                              </CEllipsis>
                            </Menu.Item>
                          ))}
                      </Menu>
                    }
                    {...title.menuConfig?.arcoDropdownProps}
                  >
                    {titleNode}
                  </Dropdown>
                ) : (
                  titleNode
                )}
              </div>
            )}
            <Menu
              {...arcoMenuProps}
              className={classNames(cssPrefix`menu`, arcoMenuProps?.className)}
              hasCollapseButton={false}
              collapse={false}
              onClickSubMenu={(...args) => {
                sideBarControls.setOpenKeys(args[0]);
                arcoMenuProps?.onClickSubMenu?.(...args);
              }}
              onClickMenuItem={sideBarControls.onClickMenuItem}
              levelIndent={iconLessMode ? 12 : 32}
              style={arcoMenuProps?.style}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              icons={{
                horizontalArrowDown: <IconDown useCurrentColor />,
                ...arcoMenuProps?.icons,
              }}
            >
              {menuChildren}
            </Menu>
          </div>
        </div>
        {collapsible && (
          <div className={cssPrefix`collapse-ctrl`}>
            <Popover
              content={collapse ? locale.CSidebar.expandNavigation : locale.CSidebar.collapseNavigation}
              position={collapse && !isExpandTriggerHovering ? 'right' : 'tl'}
              getPopupContainer={node => node.parentElement!}
              style={{ whiteSpace: 'nowrap' }}
              triggerProps={{ autoFitPosition: false }}
            >
              <div className={cssPrefix`collapse-button`} onClick={() => sideBarControls.toggleCollapse()}>
                {React.createElement(collapse ? IconMenuUnfold : IconMenuFold, {
                  className: cssPrefix`collapse-button-icon`,
                })}
              </div>
            </Popover>
            {!isNil(extraCtrl) && showMenu && <div className={cssPrefix`collapse-ctrl-extra`}>{extraCtrl}</div>}
            {extraCtrlIsFeedback(extraCtrl) &&
              !showMenu &&
              normalMode &&
              React.cloneElement(extraCtrl, { circle: true })}
          </div>
        )}
      </div>
      {widthControl && (
        <div
          className={classNames(cssPrefix`width-controller`, widthControlling && cssPrefix`width-controller-active`)}
          ref={widthControllerRef}
          style={{ visibility: collapse ? 'hidden' : undefined }}
        />
      )}
      <div ref={popupContainerRef} className={cssPrefix`popup-container`} />
    </div>
  );
});

CSideBar.displayName = 'CSideBar';

export default Object.assign(CSideBar, { Feedback });
