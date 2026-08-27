import type { RefAttributes, CSSProperties } from 'react';
import type React from 'react';
import type { TabsProps, SpinProps } from '@arco-design/web-react';
import type { ITabOptions } from '.';
import type { DetailPage } from '../core';
import type { CDetailHeaderProps } from '../../CDetail/interface';
import type { CResultProps } from '../../CLoading/interface';
export type ObjRecord = Record<any, any>;
export interface IUrlPrams {
    tabKey?: string;
    [key: string]: any;
}
export type TGlobalError = Error | null;
export interface IFetchResult<BasicData = ObjRecord, GlobalScopeType extends ObjRecord = any> {
    /** 基本详情数据 */
    data?: BasicData;
    /** 全局数据 */
    globalScope?: GlobalScopeType;
}
/**
 * @title IDetailPageOptions
 */
export interface ICDetailPageOptions<DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = any> {
    /***** DetailPage的全局配置 ******/
    /**
     * @zh 是否自动发起初始化请求
     * @default true
     */
    autoInit?: boolean;
    /**
     * @zh 重新加载是否固定Tab
     * @default false
     */
    resetActiveTab?: boolean;
    /**
     * @zh 刷新时，是否卸载内容区的组件，默认会卸载
     */
    unmountContentWhenRefresh?: (options: {
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => boolean;
    /**
     * @zh 是否需要全局loading
     */
    needLoading?: boolean | ((options: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => boolean);
    /**
     * @zh 是否需要展示Tab页签(简单版的详情页不需要Tab页签)
     */
    needTabPane?: boolean | ((options: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => boolean);
    /**
     *
     * @zh 详情页发生错误时错误页面配置
     */
    globalErrorConfig?: IBaseErrorConfig | ((options: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => IBaseErrorConfig);
    /**
     *
     * @zh 单个tab发生错误时的错误页面配置，此处的配置会被单个tab的配置覆盖掉
     */
    tabErrorConfig?: IBaseErrorConfig | ((option: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => IBaseErrorConfig);
    /**
     * @zh url上使用的标识tabKey的字段名
     * @default tabKey
     */
    urlTabKeyName?: string;
    /** 开启 fetcher 的竞态处理 */
    enableRaceCondition?: boolean;
    /**
     * @zh 获取详情页需要的数据
     */
    fetcher: () => Promise<IFetchResult<DetailData, GlobalScopeType> | undefined>;
    /**
     *  @zh arco的Tabs组件的配置，需要和我们该参数的默认值合并
     */
    arcoTabProps?: TabsProps | ((options: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => TabsProps);
    /** @zh tabs的配置 */
    tabs: (ITabOptions<ObjRecord, DetailData, GlobalScopeType> | ((options: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => ITabOptions<ObjRecord, DetailData, GlobalScopeType>))[];
    /**
     * 渲染tab内容，可用于最终自定义渲染tab内容
     * @param opts
     * @returns
     */
    renderActiveTabContent?: (opts: {
        tabKey?: string;
        content?: React.ReactNode;
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => React.ReactNode;
    /** @zh 详情页接口请求发生错误时的自定义回调  */
    onError?: (error: Error | null) => void;
    /***** 详情页header配置 ******/
    /** @zh detailHeaderProps 详情页顶部配置  */
    cDetailPageHeaderProps?: ICDetailPageHeaderProps | ((options: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => ICDetailPageHeaderProps);
    /***** 详情页content配置 ******/
    /**
     * @zh 详情页内容部分配置
     */
    cDetailPageContentProps?: IDetailPageContentProps | ((options: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => IDetailPageContentProps);
    /**
     * @zh 额外配置
     */
    extraConfig?: {
        /**
         * @zh 在请求详情数据时是否清空globalScope，默认为 true（默认维持老的行为）
         */
        clearGlobalScopeInFetcher?: boolean;
    };
}
export interface IDetailPageContentProps {
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
export interface INavProps {
    routes?: IRouteProps[];
    /**
     * @zh 面包屑的分隔符
     */
    separator?: string;
}
export interface ICDetailPageHeaderProps {
    /**
     * @zh 默认是否展示刷新按钮
     */
    needRefreshBtn?: boolean;
    /**
     * @zh 标题
     */
    title: React.ReactNode;
    /**
     * @zh 返回按钮的回调
     */
    onBack?: CDetailHeaderProps['onBack'];
    /**
     * @zh 面包屑（页面层级达到两级以上才展示面包屑）
     */
    breadcrumbProps?: CDetailHeaderProps['breadcrumbProps'];
    /**
     * @zh CDetailHeader的样式
     */
    style?: CDetailHeaderProps['style'];
    /**
     * @zh CDetailHeader的css类名
     */
    className?: CDetailHeaderProps['className'];
    /**
     * @zh 模式，可选详情页中header或drawer中的header。
     * @defaultValue page-header
     */
    model?: 'page-header' | 'drawer-header';
    /**
     * @zh 详情页顶部额外自定义渲染内容
     */
    extraHeaderContent?: React.ReactNode;
    /**
     * @zh 状态
     * @defaultValue undefined，当传入statusProps时，type默认为highlight
     */
    statusProps?: CDetailHeaderProps['cStatusProps'];
    /**
     * @zh 自定义状态元素
     */
    customStatus?: CDetailHeaderProps['customStatus'];
    /**
     * @zh 操作按钮组
     */
    operationMenuProps?: CDetailHeaderProps['cOperationMenuProps'];
    /**
     * @zh 面包屑相关配置
     */
    navProps?: INavProps;
    /**
     * @zh 自定义状态操作按钮组
     */
    customOperationMenu?: CDetailHeaderProps['customOperationMenu'];
    /** @zh 在'page-header' 模式下是否展示返回icon */
    showBackIcon?: boolean;
}
export interface IRouteProps {
    /**
     * @zh 路径
     */
    path: string;
    /**
     * @zh 标题
     */
    title: string | React.ReactNode;
    /**
     * 点击事件
     * @zh 标题
     */
    onClick?: () => void;
}
export type ErrorConfigType = 'global' | 'tab';
export interface IBaseErrorConfig {
    /**
     *  错误页标题
     */
    title?: string;
    /**
     * CLoading.Result组件的配置参数
     */
    cLoadingProps?: CResultProps;
    /**
     * 重新加载按钮配置
     */
    reloadBtnProps?: IBtnProps;
    /**
     * 返回按钮配置
     */
    goBackBtnProps?: IBtnProps;
}
export interface IBtnProps {
    text?: string;
    onClick?: () => void;
}
export interface ICDetailPageProps {
    config: ICDetailPageOptions<any>;
}
export type DefineDetailPageConfig = <DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = ObjRecord>(config: ICDetailPageOptions<DetailData, GlobalScopeType>) => ICDetailPageOptions<DetailData, GlobalScopeType>;
export type IDetailPageComponent = React.ForwardRefExoticComponent<ICDetailPageProps & RefAttributes<DetailPage<any>>> & {
    defineConfig: DefineDetailPageConfig;
};
export interface IRefreshOptions {
    showLoading?: boolean;
    reset?: boolean;
    resetActiveTab?: boolean;
}
export type InnerRefreshOptions = IRefreshOptions & {
    isFirstRender?: boolean;
};
