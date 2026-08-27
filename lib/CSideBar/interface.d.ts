import type { MenuItemProps as ArcoMenuItemProps, MenuItemGroupProps, MenuSubMenuProps as ArcoMenuSubMenuProps, MenuProps, DropdownProps, PopoverProps, ButtonProps } from '@arco-design/web-react';
import type { ReactNode } from 'react';
import type React from 'react';
export type MenuItemConfig<MenuItemData extends Record<string, any> = Record<string, unknown>, SubMenuData extends Record<string, any> = Record<string, unknown>, GroupMenuData extends Record<string, any> = Record<string, unknown>> = CustomProps | GroupMenuItemProps<GroupMenuData> | MenuItemProps<MenuItemData> | MenuSubMenuProps<SubMenuData> | CategoryTitleProps;
interface BaseMenu {
    /** subMenus配置 */
    children?: MenuItemConfig[];
}
/**
 * @title GroupMenuItemProps arco的分组菜单
 */
export interface GroupMenuItemProps<T extends Record<string, any> = Record<string, unknown>> extends Omit<MenuItemGroupProps, 'children'>, BaseMenu {
    type: 'group';
    key: string;
    data?: T;
}
/**
 * @title sidebar的最小菜单元素
 */
export interface MenuItemProps<T extends Record<string, any> = Record<string, unknown>> extends Omit<ArcoMenuItemProps, 'children'> {
    type?: 'menu';
    path?: string;
    /**
     * @zh 菜单的名称文本
     */
    label?: ReactNode;
    /**
     * @zh 菜单的名称文本，过时的，使用label代替
     * @deprecated
     */
    name?: ReactNode;
    /**
     * @zh 标记菜单应该跳出当前应用
     * @defaultValue false
     */
    isOuter?: boolean;
    /**
     * @zh 跳出当前应用的 icon，设置 null 为不展示
     * @defaultValue false
     */
    outerMarkIcon?: React.ReactElement | null;
    /**
     * @zh 菜单前面的icon
     */
    icon?: ReactNode;
    /**
     * @zh 它决定了sidebar在自动计算selectKeys时是否精确匹配
     */
    exact?: boolean;
    /**
     * @zh currentPath 匹配这里的任意 key 时，菜单高亮，匹配规则同 react-router
     */
    extraMatchKeys?: string[];
    /** 控制该条菜单是否展示。 */
    hidden?: boolean;
    /** 其他数据，用于在 onMenuItemClick 中拿到后做其他操作 */
    data?: T;
    /**
     * @zh 菜单是否可以被选中高亮，不影响 onClickMenuItem 调用
     * @defaultValue true
     */
    selectable?: boolean;
    /** 菜单标签，促销等icon */
    badge?: React.ReactNode | CSideBarBadgeProps;
}
export interface CSideBarBadgeProps {
    /**
     * 数字徽标或自定义内容
     */
    type?: 'badge' | 'custom';
    /**
     * 是否紧随菜单文本
     */
    follow?: boolean;
    /**
     * 徽标内容
     */
    content: React.ReactNode;
}
/**
 * @title MenuSubMenuProps 包含子菜单的菜单类型
 */
export interface MenuSubMenuProps<T extends Record<string, any> = Record<string, unknown>> extends Omit<ArcoMenuSubMenuProps, 'children'>, BaseMenu {
    type: 'sub-menu';
    /** 菜单title前面的icon */
    icon?: ReactNode;
    data?: T;
    /** 菜单标签，促销等icon */
    badge?: React.ReactNode | CSideBarBadgeProps;
    /** 子菜单上是否有红点提示 */
    redDot?: boolean;
    /** 禁用该菜单及其下面的所有子菜单 */
    disabled?: boolean;
}
/**
 * @title CategoryTitleProps 内置的分类标题
 */
export interface CategoryTitleProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    key: string;
    type: 'category-title';
    label?: ReactNode;
}
interface CustomRenderOptions {
    renderMenus: (menus: MenuItemConfig[]) => React.ReactNode;
}
/**
 * @title CustomProps 自定义渲染内容的菜单类型
 */
export interface CustomProps {
    key: string;
    type: 'custom';
    /**
     * @zh 自定义渲染内容
     */
    render: (options: CustomRenderOptions) => React.ReactNode;
}
/**
 * @title CSideBarProps
 */
export interface CSideBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'title'> {
    /**
     * 当前页面的路径，如果有basePath，建议移除掉basePath，用于计算当前应该展开哪些子菜单，并选中哪些菜单项。
     * 与 `defaultSelectedKeys` 和 `defaultOpenKeys` 互斥！
     */
    currentPath?: string;
    /**
     * @zh sidebar 标题（icon + 应用名）
     */
    title?: {
        logo?: React.ReactNode;
        /** 与logo互斥，点击返回按钮回调 */
        onBack?: (e: React.MouseEvent) => void;
        text?: React.ReactNode;
        /** 标题自定义文字大小 */
        size?: number;
        menuConfig?: {
            menus?: ArcoMenuItemProps[];
            arcoDropdownProps?: DropdownProps;
            arcoMenuProps?: MenuProps;
        };
    };
    /**
     * @zh 用于本地状态存储，不填会自动取text字段
     */
    appId?: string;
    /**
     * @zh 是否默认收起sidebar
     * @defaultValue false
     */
    defaultCollapse?: boolean;
    /**
     * @zh 传入后将使 sidebar 的`collapse`状态变为受控的。⚠️：注意，当 collapse 受控后，将无法自动保存 collapse 状态，因为受控模式下的展开收起可能不是用户操作的，所以不作持久化
     * @defaultValue false
     */
    collapse?: boolean;
    /**
     * @zh 菜单是否可以折叠，当配置为不可折叠时底部折叠按钮将隐藏。若设置为false，collapse 将不再生效
     * @defaultValue true
     */
    collapsible?: boolean;
    /**
     * @zh collapse 属性在受控模式下，是否依然以本地状态优先。若为 true，用户未操作过收起或展开时，依然是受控，否则变为不受控
     * @defaultValue false
     */
    collapsePersistFirstWhenControlled?: boolean;
    /**
     * @zh collapse 状态改变后触发
     * @defaultValue false
     */
    onCollapseChange?: (collapse: boolean) => void;
    /**
     * @zh 选中的菜单项 key 数组（受控模式）
     * @en Selected menu item's key array
     */
    selectedKeys?: string[];
    /**
     * @zh 选中的菜单项 key 数组（受控模式）
     * @en Selected menu item's key array
     */
    onSelectedKeysChange?: (selectedKeys: string[]) => void;
    /**
     * @zh 展开的子菜单 key 数组（受控模式）
     * @en Opened menu item's key array
     */
    openKeys?: string[];
    /**
     * @zh 展开的子菜单 key 数组（受控模式）
     * @en Opened menu item's key array
     */
    onOpenKeysChange?: (openKeys: string[]) => void;
    /**
     * @zh 默认展开的菜单key
     */
    defaultOpenKeys?: string[];
    /**
     * @zh 默认展开所有子菜单，与 `defaultOpenKeys` `accordion` 互斥
     */
    defaultOpenSubMenu?: boolean;
    /**
     * @zh 初始选中的菜单项 key 数组
     */
    defaultSelectedKeys?: string[];
    /**
     * @zh 菜单配置
     * @defaultValue []
     */
    menus?: MenuItemConfig[];
    /**
     * @zh ui模式，icon-less默认不展示icon，且收起后占用的空间更小
     * @defaultValue 'normal'
     */
    mode?: 'normal' | 'icon-less';
    /**
     * @zh 对arco的Menu组件进行属性透传
     */
    arcoMenuProps?: Omit<MenuProps, 'defaultOpenKeys' | 'defaultCollapse' | 'defaultSelectedKeys' | 'accordion' | 'onClickMenuItem'>;
    /**
     * @zh 开启手风琴效果（展开当前菜单时自动收起其他菜单）
     * @defaultValue false
     */
    accordion?: boolean;
    /**
     * @zh sidebar 支持宽度控制 **💥💥💥💥仅限内部产品使用**
     * @defaultValue false
     */
    widthControl?: boolean | {
        /**
         * @defaultValue window.clientWidth / 2
         */
        maxWidth?: number;
        /**
         * @defaultValue 140
         */
        minWidth?: number;
        /**
         * 当小于 `minWidth` 时会自动收起
         * @defaultValue true
         */
        autoCollapse?: boolean;
    };
    /**
     * @zh 自动根据用户屏幕大小决定是否收起sidebar，阈值为窗口宽度 992。<br/>_自动展开/收起仅限于用户未操作过或者主动设置为展开状态时生效，程序不主动缩小用户视野*
     * @defaultValue true
     */
    autoCollapse?: boolean;
    /**
     * @zh 底部展开收起控制器旁边额外的内容
     */
    extraCtrl?: React.ReactNode;
    /**
     * @zh 当菜单项被点击时的回调
     */
    onClickMenuItem?: (menu: MenuItemPropsWithPath, ...restArgs: unknown[]) => void;
    /**
     * @zh 自定义渲染菜单，用于和 `react-router` 结合等场景
     * @param wrapperProps
     * @param menuItemProps
     * @returns
     */
    renderMenuItem?: (wrapperProps: {
        children?: React.ReactNode;
        className?: string;
    }, menuItemProps: MenuItemProps) => React.ReactElement;
}
export interface MenuItemPropsWithPath extends MenuItemProps {
    /**
     * @internal
     */
    _menuPath: string[];
}
/**
 * @title CSideBarHooksProps
 */
export interface CSideBarHooksProps extends CSideBarProps {
    controlledRefs?: React.RefObject<HTMLElement>[];
    widthControllerRef?: React.RefObject<HTMLElement>;
    expandTriggerRef?: React.RefObject<HTMLElement>;
    rootRef?: React.RefObject<HTMLElement>;
}
export interface UseSideBarWidthControlParams extends Pick<CSideBarHooksProps, 'controlledRefs' | 'widthControllerRef' | 'widthControl'> {
    storage?: SidebarStateStorage;
    onSetCollapse: (collapse: boolean) => void;
    onSetStorage: (storage: Partial<SidebarStateStorage>) => void;
}
export interface SidebarStateStorage {
    collapse?: boolean;
    width?: number;
}
export interface FeedbackProps extends Omit<ButtonProps, 'type'> {
    type?: 'normal' | 'prizes';
    circle?: boolean;
    popoverContent?: React.ReactNode;
    popoverProps?: PopoverProps;
}
export {};
