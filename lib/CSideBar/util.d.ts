import React from 'react';
import type { CSideBarBadgeProps, FeedbackProps, MenuItemConfig, MenuItemProps, MenuItemPropsWithPath, MenuSubMenuProps } from './interface';
export declare const testIdPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare function isType(type: "menu" | "group" | "custom" | "sub-menu" | "category-title" | undefined, types: Exclude<MenuItemConfig['type'], undefined>[]): boolean;
/**
 * 生成菜单到跟节点的映射
 */
export declare function generateMenuItemKeyToRootKeyMapping(menus: MenuItemConfig[], mapping: Record<string, string>, rootMenu?: MenuItemConfig): Record<string, string>;
/**
 * 将传入的menus展开为扁平的数组
 * @param menus
 * @returns
 */
export declare function flatMenusFromPropMenus(menus: MenuItemConfig[], startMenuPath?: string[]): MenuItemPropsWithPath[];
export declare const matchPath: (pathname: string, options: {
    path: string;
    exact?: boolean | undefined;
}) => boolean;
export declare function matchMenuFromFlatMenusByCurrentPath(currentPath: string, menuItems: MenuItemPropsWithPath[]): MenuItemPropsWithPath | undefined;
export declare function batchSetStyle(refs: React.RefObject<HTMLElement>[], style: Record<string, any>): void;
export declare const getNodeText: (node: React.ReactNode) => string | undefined;
export declare const getAllSubMenuKeys: (menus: MenuItemConfig[], start?: string[]) => string[];
/**
 * 将第一层有 icon 的菜单提取出来
 */
export declare const filterRootMenus: (menus: MenuItemConfig[]) => (MenuItemProps<Record<string, unknown>> | MenuSubMenuProps<Record<string, unknown>>)[];
export declare const badgeToProps: (badge: MenuItemProps['badge'], defaultProps?: Partial<CSideBarBadgeProps>) => CSideBarBadgeProps;
/**
 * 从自定义渲染的逻辑中拿到所有的菜单并聚合起来
 */
export declare const collectMenusFromCustomRender: (menus: MenuItemConfig[]) => MenuItemConfig<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>[];
export declare const matchMenuFromPropsMenuByCurrentPath: (currentPath: string, menuItems: MenuItemConfig[]) => MenuItemPropsWithPath | undefined;
export declare const extraCtrlIsFeedback: (v: React.ReactNode) => v is React.ReactElement<FeedbackProps, string | React.JSXElementConstructor<any>>;
