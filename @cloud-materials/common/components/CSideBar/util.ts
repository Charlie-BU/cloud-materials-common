import React from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import type {
  CSideBarBadgeProps,
  CategoryTitleProps,
  CustomProps,
  FeedbackProps,
  GroupMenuItemProps,
  MenuItemConfig,
  MenuItemProps,
  MenuItemPropsWithPath,
  MenuSubMenuProps,
} from './interface';
import { get } from 'lodash-es';

export const testIdPrefix = classNamePrefixFactory('sidebar');

export function isType(
  type: MenuItemConfig['type'] = 'menu',
  types: Exclude<MenuItemConfig['type'], undefined>[],
): boolean {
  return types.includes(type);
}

/**
 * 生成菜单到跟节点的映射
 */
export function generateMenuItemKeyToRootKeyMapping(
  menus: MenuItemConfig[],
  mapping: Record<string, string>,
  rootMenu?: MenuItemConfig,
): Record<string, string> {
  return menus
    .filter((menu): menu is MenuItemProps | MenuSubMenuProps | GroupMenuItemProps =>
      isType(menu.type, ['sub-menu', 'menu', 'group']),
    )
    .reduce((prevMapping, menu) => {
      if (menu.type === 'sub-menu' && menu.children) {
        return generateMenuItemKeyToRootKeyMapping(menu.children, prevMapping, rootMenu ?? menu);
      }

      if (menu.type === 'group' && menu.children) {
        return generateMenuItemKeyToRootKeyMapping(menu.children, prevMapping, rootMenu);
      }

      prevMapping[menu.key] = rootMenu?.key ?? menu.key;

      return prevMapping;
    }, mapping);
}

/**
 * 将传入的menus展开为扁平的数组
 * @param menus
 * @returns
 */
export function flatMenusFromPropMenus(menus: MenuItemConfig[], startMenuPath: string[] = []): MenuItemPropsWithPath[] {
  return menus
    .filter((menu): menu is Exclude<MenuItemConfig, CustomProps | CategoryTitleProps> =>
      isType(menu.type, ['menu', 'sub-menu', 'group']),
    )
    .reduce<MenuItemPropsWithPath[]>((prev, menu) => {
      // 路径取 key 不取 path
      const menuPath: string[] = startMenuPath.concat(menu.key);
      if (menu.type === 'group' || menu.type === 'sub-menu') {
        return prev.concat(menu.children ? flatMenusFromPropMenus(menu.children, menuPath) : []);
      }

      return prev.concat({
        ...menu,
        _menuPath: menuPath,
      });
    }, []);
}

/**
 * @from https://github.com/remix-run/react-router/blob/5a43e19573c11d1469fd43ef1fddaf7be02abca5/packages/router/utils.ts#L858-L908
 */
const compilePath = (path: string, end = true): RegExp => {
  let regexpSource =
    '^' +
    path
      .replace(/\/*\*?$/, '') // Ignore trailing / and /*, we'll handle it below
      .replace(/^\/*/, '/') // Make sure it has a leading /
      .replace(/[\\.*+^$?{}|()[\]]/g, '\\$&') // Escape special regex chars
      .replace(/\/:(\w+)/g, (_: string) => {
        return '/([^\\/]+)';
      });

  if (path.endsWith('*')) {
    regexpSource +=
      path === '*' || path === '/*'
        ? '(.*)$' // Already matched the initial /, just match the rest
        : '(?:\\/(.+)|\\/*)$'; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += '\\/*$';
  } else if (path !== '' && path !== '/') {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += '(?:(?=\\/|$))';
  } else {
    // Nothing to match for "" or "/"
  }

  return new RegExp(regexpSource, 'i');
};

export const matchPath = (pathname: string, options: { path: string; exact?: boolean }): boolean => {
  const { path, exact = true } = options;

  return Boolean(pathname.match(compilePath(path, exact)));
};

export function matchMenuFromFlatMenusByCurrentPath(
  currentPath: string,
  menuItems: MenuItemPropsWithPath[],
): MenuItemPropsWithPath | undefined {
  return menuItems.find(({ key, path, exact, extraMatchKeys }) => {
    const currentPathMatched =
      (path && matchPath(currentPath, { path, exact })) || matchPath(currentPath, { path: key, exact });

    if (currentPathMatched) {
      return true;
    }

    if (extraMatchKeys?.length) {
      return extraMatchKeys.some(extraKey => matchPath(currentPath, { path: extraKey, exact: true }));
    }

    return false;
  });
}

export function batchSetStyle(refs: React.RefObject<HTMLElement>[], style: Record<string, any>): void {
  refs.forEach(ref => {
    Object.keys(style).forEach(name => {
      if (ref.current) {
        ref.current.style[name as any] = style[name];
      }
    });
  });
}

export const getNodeText = (node: React.ReactNode): string | undefined => {
  if (!node || typeof node === 'boolean') return '';
  if (['string', 'number'].includes(typeof node)) return String(node);
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node) return getNodeText((node as any).props?.children);
};

export const getAllSubMenuKeys = (menus: MenuItemConfig[], start: string[] = []): string[] =>
  menus.reduce(
    (prev, menu) =>
      menu.type === 'sub-menu' ? prev.concat(menu.key, menu.children ? getAllSubMenuKeys(menu.children) : []) : prev,
    start,
  );

/**
 * 将第一层有 icon 的菜单提取出来
 */
export const filterRootMenus = (menus: MenuItemConfig[]) => {
  const hasItemMenus = menus.filter((menu): menu is MenuItemProps | MenuSubMenuProps | GroupMenuItemProps =>
    isType(menu.type, ['menu', 'sub-menu', 'group']),
  );

  return hasItemMenus
    .map(item => {
      if (item.type === 'group') {
        return (
          item.children?.filter((menu): menu is MenuItemProps | MenuSubMenuProps =>
            isType(menu.type, ['menu', 'sub-menu']),
          ) ?? []
        );
      }

      return item;
    })
    .flat()
    .filter(item => Boolean(item.icon) && !item.hidden);
};

export const badgeToProps = (
  badge: MenuItemProps['badge'],
  defaultProps: Partial<CSideBarBadgeProps> = {},
): CSideBarBadgeProps => {
  if ((badge as CSideBarBadgeProps)?.content) {
    return { ...defaultProps, ...(badge as CSideBarBadgeProps) };
  }

  return { type: 'badge', follow: false, ...defaultProps, content: badge };
};

const collectCustomRenderMenus = (menus: MenuItemConfig[]): CustomProps[] => {
  return menus.reduce<CustomProps[]>((prev, menu) => {
    if (menu.type === 'custom') {
      return prev.concat(menu);
    }

    if ((menu.type === 'group' || menu.type === 'sub-menu') && menu.children?.length) {
      return prev.concat(collectCustomRenderMenus(menu.children));
    }

    return prev;
  }, []);
};

/**
 * 从自定义渲染的逻辑中拿到所有的菜单并聚合起来
 */
export const collectMenusFromCustomRender = (menus: MenuItemConfig[]) => {
  const customRenderMenus = collectCustomRenderMenus(menus);

  return customRenderMenus.reduce((prev, menu) => {
    let prevMenus = prev;
    menu.render({
      renderMenus: customRenderMenus => {
        prevMenus = prevMenus.concat(collectMenusFromCustomRender(customRenderMenus));
        return null;
      },
    });

    return prevMenus;
  }, menus);
};

export const matchMenuFromPropsMenuByCurrentPath = (currentPath: string, menuItems: MenuItemConfig[]) =>
  matchMenuFromFlatMenusByCurrentPath(currentPath, flatMenusFromPropMenus(menuItems));

export const extraCtrlIsFeedback = (v: React.ReactNode): v is React.ReactElement<FeedbackProps> => {
  return React.isValidElement(v) && Boolean(get(v.type, '_Feedback'));
};
