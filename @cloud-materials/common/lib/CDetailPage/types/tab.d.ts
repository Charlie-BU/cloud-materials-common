import type { ReactNode, ReactElement } from 'react';
import type { TabPaneProps } from '@arco-design/web-react/es/Tabs';
import type { TabNoticeAllComponentProps, TabNoticeComponentPropsMap, TabComponentPropsMap, AllTabComponentProps } from './component';
import type { Tab, DetailPage } from '../core';
import type { IBaseErrorConfig, ObjRecord } from './detailPage';
/**
 * @title IDetailPageOptions
 */
export interface ITabOptions<TabData extends ObjRecord, DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = any> extends Omit<TabPaneProps, 'title'> {
    /**
     * @zh tab的唯一key值
     */
    key: string;
    /**
     * @zh tab的标题
     */
    title: React.ReactNode | ((option: {
        data: DetailData;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => React.ReactNode);
    /**
     * @zh tab的可见性
     */
    visible?: boolean | ((option: {
        data: DetailData;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => boolean);
    /**
     * @zh 是否需要tab级的loading
     */
    needLoading?: boolean;
    /**
     * @zh loading状态
     */
    loading?: boolean;
    /**
     *
     * @zh 单个tab发生错误时的错误页面配置
     */
    tabErrorConfig?: IBaseErrorConfig | ((option: {
        data: DetailData;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => IBaseErrorConfig);
    /** @zh 内置组件处理 */
    component?: keyof TabComponentPropsMap | ((option: {
        data: DetailData;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => ReactNode);
    /** @zh 内置组件的属性 */
    componentProps?: (option: {
        data: DetailData;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => AllTabComponentProps;
    /**
     * @zh  tab顶部提示的内容
     */
    noticeComponent?: keyof TabNoticeComponentPropsMap | ((option: {
        data: DetailData;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => ReactNode);
    noticeComponentProps?: (option: {
        data: DetailData;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => TabNoticeAllComponentProps;
    /** @zh 渲染方法 */
    render?: (options: {
        data: DetailData;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => ReactElement | React.FC<any>;
    /** fetcher: 异步请求逻辑 */
    fetcher?: (options: {
        data: DetailData;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
    }) => Promise<ITabFetcherResult<TabData, GlobalScopeType>> | Promise<any>;
    /** @zh Tab页接口请求发生错误时的自定义回调  */
    onError?: (error: Error | null) => void;
}
export interface ITabFetcherResult<TabData = ObjRecord, GlobalScopeType extends ObjRecord = any> {
    /** Tab下的数据 */
    data?: TabData;
    /** tab的globalscope */
    globalScope?: GlobalScopeType;
}
