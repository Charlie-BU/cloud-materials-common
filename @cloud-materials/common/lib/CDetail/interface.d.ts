import type { CSSProperties, ReactNode } from 'react';
import type React from 'react';
import type { SpinProps, TabsProps, AffixProps } from '@arco-design/web-react';
import type { TabPaneProps } from '@arco-design/web-react/es/Tabs';
import type { CStatusProps } from '../CStatus/interface';
import type { COperationMenuProps } from '../COperationMenu/interface';
import type { CInfoSectionListProps } from '../CInfoSection/interface';
import type { CEllipsisProps } from '../CEllipsis/interface';
/**
 * @title CDetailProps
 */
export interface CDetailProps {
    style?: CSSProperties;
    className?: string | string[];
    /**
     * @zh 详情页Header
     */
    cDetailHeaderProps: CDetailHeaderProps;
    /**
     * @zh 详情页内容区Wrapper，默认自动计算Wrapper的高度。
     * @defaultValue true
     */
    cDetailContentWrapper?: LoadingProps | boolean;
    /**
     * @zh 非tab模式下内容区元素
     */
    content?: ReactNode;
    /**
     * @zh tab模式下tab子元素Map
     */
    tabContentMap?: Record<string, ReactNode>;
    /**
     * @zh tab模式下将activeTab记录到url query中的key，不配置则不记录。
     */
    urlTabKey?: string;
}
/**
 * @title DetailHeaderProps
 */
export interface CDetailHeaderProps {
    style?: CSSProperties;
    className?: string | string[];
    /** @zh 在'page-header' 模式下是否展示返回icon */
    showBackIcon?: boolean;
    /**
     * @zh 详情页头部其他自定义渲染内容
     */
    extraHeaderContent?: React.ReactNode;
    /**
     * @zh 详情页标题
     */
    title: ReactNode;
    /**
     * @zh 返回按钮的回调
     */
    onBack?: () => void;
    /**
     * @zh 面包屑（页面层级达到两级以上才展示面包屑）
     */
    breadcrumbProps?: BreadcrumbProps;
    /**
     * @zh 状态
     * @defaultValue undefined，当传入statusProps时，type默认为highlight
     */
    cStatusProps?: CStatusProps;
    /**
     * @zh 自定义状态元素
     */
    customStatus?: ReactNode;
    /**
     * @zh 操作按钮组
     */
    cOperationMenuProps?: COperationMenuProps;
    /**
     * @zh 自定义状态操作按钮组
     */
    customOperationMenu?: ReactNode;
    /**
     * @zh 模式，可选详情页中header或drawer中的header。
     * @defaultValue page-header
     */
    model?: 'page-header' | 'drawer-header';
    /**
     * @zh TabPane配置
     */
    tabs?: Array<TabPaneProps & {
        key: string;
        hidden?: boolean;
    }>;
    /**
     * @zh arco Tabs配置
     * @defaultValue undefined，当传入arcoTabsProps时，type默认为card-gutter
     */
    arcoTabsProps?: TabsProps;
    /**
     * @zh cInfoSectionProps配置
     * @defaultValue undefined
     */
    cInfoSectionProps?: CInfoSectionListProps;
    /**
     * @zh cInfoSectionProps配置
     * @defaultValue undefined
     */
    arcoAffixProps?: AffixProps;
    /**
     * @zh cEllipsisProps配置
     * @defaultValue undefined
     */
    cEllipsisProps?: Omit<CEllipsisProps, 'content' | 'children'>;
}
export interface BreadcrumbProps {
    /**
     * @zh 面包屑配置
     */
    routes: RouteProps[];
    /**
     * @zh 分割符
     * @defaultValue  <IconRightArrow />
     */
    separator?: ReactNode;
}
export interface RouteProps {
    /**
     * @zh 面包屑文案
     */
    breadcrumbName: ReactNode;
    /**
     * @zh 面包屑回调，组件内部会忽略最后一级面包屑的回调。
     */
    onClick?: () => void;
}
/**
 * @title CDetailContentWrapperProps
 */
export interface CDetailContentWrapperProps extends LoadingProps {
    /**
     * @zh 子元素，子元素不存在组件不渲染。
     */
    children?: ReactNode;
}
export interface LoadingProps {
    style?: CSSProperties;
    className?: string | string[];
    /**
     * @zh 是否为加载状态（仅在有子节点时生效）
     */
    loading?: boolean;
    /**
     * @zh arco Spin
     */
    arcoSpinProps?: SpinProps;
}
