import type { ObjRecord, TGlobalError, IRefreshOptions, ICDetailPageHeaderProps, IDetailPageContentProps, InnerRefreshOptions, ICDetailPageOptions } from '../../types';
import { Tab } from './Tab';
export declare class DetailPage<DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = any> {
    /**
     * DetailPage的配置项
     */
    options: ICDetailPageOptions<DetailData, GlobalScopeType>;
    /** 原始 fetcher，用于服务 init 时获取数据，防止 init 后立即 refresh 造成页面白板 */
    originFetcher: ICDetailPageOptions<DetailData, GlobalScopeType>['fetcher'];
    /**
     * loading状态
     */
    loading: boolean;
    /**
     * DetailPage对象的全局数据
     */
    globalScope: GlobalScopeType;
    /**
     * 详情页的数据
     */
    data: DetailData;
    /**
     * 错误信息
     */
    error: TGlobalError;
    /**
     * 当前活跃的tab
     */
    activeTabKey: string;
    /**
     *  tabs配置数组
     */
    tabs: Tab<ObjRecord, DetailData, GlobalScopeType>[];
    constructor(detailPageConfig: ICDetailPageOptions<DetailData>);
    /**
     * 获取合法的activeTabKey，urlTabKey > visibleTabs[0].key
     * @description 如果不合法，则返回 第一个可见tab的key
     */
    getAvailableActiveTabKey(): string;
    /**
     * 响应式转化
     */
    private makeObservable;
    /**
     * 获取当前活跃的tab对象
     */
    getActiveTab(): Tab<ObjRecord, DetailData, any> | undefined;
    /**
     * 详情页顶部配置
     * @returns
     */
    getDetailHeaderProps(): ICDetailPageHeaderProps;
    getDetailPageContentProps(): IDetailPageContentProps;
    /**
     * 全局错误配置项
     */
    getGlobalErrorConfig(): any;
    /**
     * 全局Tab错误配置项
     */
    getTabErrorConfig(): any;
    getNeedTabPane(): any;
    getNeedLoading(): any;
    /**
     * 根据tab的key值获取Tab对象
     * @param tabKey
     * @returns
     */
    getTabByKey(tabKey: string): Tab<ObjRecord, DetailData> | undefined;
    /**
     * 计算当前visible为true的tab列表
     */
    getVisibleTabs(): Tab<ObjRecord, DetailData, GlobalScopeType>[];
    resetDetailPage(options?: {
        showLoading?: boolean;
        resetActiveTab?: boolean;
        isFirstRender?: boolean;
    }): Promise<void>;
    /**
     * 清空tabs
     */
    private clearTabs;
    private clearError;
    /**
     * 从detailPage的配置参数中初始化tabs对象数组
     */
    private initTabsFromOptions;
    /**
     * 设置loading状态
     * @param loading
     */
    setLoading(loading: boolean): void;
    /**
     * 执行请求
     */
    private runFetcher;
    private innerRefresh;
    /**
     * 重新请求数据
     * showLoading: 是否展示loading
     * resetActiveTab: 是否重置当前选中的tab
     * reset: 是否重新加载页面
     */
    refresh(options?: IRefreshOptions): Promise<void>;
    /**
     * 重新请求数据
     * showLoading: 是否展示loading
     * resetActiveTab: 是否重置当前选中的tab
     * reset: 是否重新加载页面
     * isFirstRender: 是否是首次进入页面请求
     */
    private _refresh;
    /**
     *
     * @param options
     * 该方法只用做页面第一次初始化时使用
     * 因为从其它页面跳到详情页会调用一次history.push方法，而组件中在初始化的时候也会再调用一次，这样就会导致如果
     *  第一次进入页面后再点击浏览器回退按钮，需要点击两次才可回退到之前的页面
     */
    init(options?: InnerRefreshOptions): Promise<void>;
    /**
     * 设置全局对象的值
     */
    setGlobalScope(globalScope: GlobalScopeType): void;
    /**
     * 设置当前活跃tabkey
     * @param activeTab
     */
    setActiveTabKey(activeTabKey: string): void;
    /**
     * 设置详情页data：通过该方法设置直接覆盖
     * @param data
     */
    setData(data: DetailData): void;
    /**
     * 切换Tab
     * @param tabKey
     */
    changeActiveTab: (tabKey: string, replaceHistory?: boolean) => void;
    /**
     * 渲染tab内容，可用于最终自定义渲染tab内容
     * @param opts
     * @returns
     */
    renderActiveTabContent: ICDetailPageOptions<DetailData, GlobalScopeType>['renderActiveTabContent'];
}
