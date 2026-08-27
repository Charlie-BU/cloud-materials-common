import { define, observable, action } from '@formily/reactive';
import { merge } from 'lodash-es';

import type {
  ObjRecord,
  TGlobalError,
  ITabOptions,
  IRefreshOptions,
  ICDetailPageHeaderProps,
  IDetailPageContentProps,
  InnerRefreshOptions,
  ICDetailPageOptions,
} from '../../types';
import { Tab } from './Tab';
import { runCallable, getUrlTabKey, changeUrlTabKey, getInitDetailPageOptions } from '../../shared';

export class DetailPage<DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = any> {
  /**
   * DetailPage的配置项
   */
  options: ICDetailPageOptions<DetailData, GlobalScopeType>;
  /** 原始 fetcher，用于服务 init 时获取数据，防止 init 后立即 refresh 造成页面白板 */
  originFetcher: ICDetailPageOptions<DetailData, GlobalScopeType>['fetcher'];
  /**
   * loading状态
   */
  loading = false;
  /**
   * DetailPage对象的全局数据
   */
  globalScope: GlobalScopeType = {} as GlobalScopeType;
  /**
   * 详情页的数据
   */
  data: DetailData = {} as DetailData;
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
  tabs: Tab<ObjRecord, DetailData, GlobalScopeType>[] = [] as unknown as Tab<ObjRecord, DetailData, GlobalScopeType>[];

  constructor(detailPageConfig: ICDetailPageOptions<DetailData>) {
    this.makeObservable();
    this.options = {
      ...getInitDetailPageOptions(),
      ...detailPageConfig,
    };
    this.originFetcher = this.options.fetcher;
    this.renderActiveTabContent = this.options.renderActiveTabContent;

    // new 的时候自动初始化
    if (this.options?.autoInit) {
      this.init();
    }
  }

  /**
   * 获取合法的activeTabKey，urlTabKey > visibleTabs[0].key
   * @description 如果不合法，则返回 第一个可见tab的key
   */
  getAvailableActiveTabKey() {
    const visibleTabs = this.getVisibleTabs();
    const urlTabKey = getUrlTabKey(this.options.urlTabKeyName);
    const tabKey = visibleTabs.some(item => item.key === urlTabKey) ? urlTabKey : visibleTabs?.[0]?.key;
    // runCallable(this?.options?.arcoTabProps, {
    //   data: this.data,
    //   detailPage: this,
    // })?.defaultActiveTab ||

    return tabKey;
  }

  /**
   * 响应式转化
   */
  private makeObservable() {
    define(this, {
      loading: observable,
      globalScope: observable,
      data: observable,
      activeTabKey: observable,
      tabs: observable,
      setLoading: action,
      refresh: action,
      setGlobalScope: action,
      setActiveTabKey: action,
      setData: action,
      changeActiveTab: action,
      init: action,
    });
  }

  /**
   * 获取当前活跃的tab对象
   */
  getActiveTab() {
    return this.getTabByKey(this.activeTabKey);
  }

  /**
   * 详情页顶部配置
   * @returns
   */
  getDetailHeaderProps(): ICDetailPageHeaderProps {
    return {
      needRefreshBtn: true,
      title: '',
      ...runCallable(this.options.cDetailPageHeaderProps, {
        data: this.data,
        detailPage: this,
      }),
    };
  }

  getDetailPageContentProps(): IDetailPageContentProps {
    return runCallable(this.options?.cDetailPageContentProps, {
      data: this.data,
      detailPage: this,
    });
  }

  /**
   * 全局错误配置项
   */
  getGlobalErrorConfig() {
    return runCallable(this.options?.globalErrorConfig, {
      data: this.data,
      detailPage: this,
    });
  }

  /**
   * 全局Tab错误配置项
   */
  getTabErrorConfig() {
    return runCallable(this.options?.tabErrorConfig, {
      data: this.data,
      detailPage: this,
    });
  }

  getNeedTabPane() {
    return runCallable(this.options?.needTabPane, {
      data: this.data,
      detailPage: this,
    });
  }
  getNeedLoading() {
    return runCallable(this.options?.needLoading, {
      data: this.data,
      detailPage: this,
    });
  }

  /**
   * 根据tab的key值获取Tab对象
   * @param tabKey
   * @returns
   */
  getTabByKey(tabKey: string): Tab<ObjRecord, DetailData> | undefined {
    return (this.tabs || []).find(tab => tab?.key === tabKey);
  }

  /**
   * 计算当前visible为true的tab列表
   */
  getVisibleTabs() {
    return this.tabs.filter(tab => tab.getVisible());
  }

  async resetDetailPage(options?: { showLoading?: boolean; resetActiveTab?: boolean; isFirstRender?: boolean }) {
    const { showLoading, resetActiveTab, isFirstRender } = options || {};
    this.initTabsFromOptions({ resetActiveTab, initPlaceholder: true, isFirstRender });
    await this.innerRefresh({
      showLoading,
      useOriginFetcher: true,
    });
    this.initTabsFromOptions({ resetActiveTab, isFirstRender });
  }

  /**
   * 清空tabs
   */
  private clearTabs() {
    this.tabs = [] as unknown as Tab<ObjRecord, DetailData>[];
  }

  private clearError() {
    this.error = null;
  }

  /**
   * 从detailPage的配置参数中初始化tabs对象数组
   */
  private initTabsFromOptions(options: {
    resetActiveTab?: boolean;
    initPlaceholder?: boolean;
    isFirstRender?: boolean;
  }) {
    const { resetActiveTab, initPlaceholder = false, isFirstRender = false } = options;
    // 首先清空tabs数组
    this.clearTabs();
    const optionTabs = runCallable(this.options?.tabs, {
      data: this.data,
      detailPage: this,
    });
    optionTabs?.map((tabItem: ITabOptions<ObjRecord, DetailData>) => {
      let tab = runCallable(tabItem, {
        data: this.data,
        tab: '',
        detailPage: this,
      });
      tab = {
        visible: true,
        ...tab,
      };
      this.tabs.push(new Tab(this, tab));
    });

    if (!initPlaceholder) {
      // 这里需要将visible为true的tab过滤出来，然后再根据所有当前可见的tab列表来给urlTabKey赋初始值，
      // 否则会出现visible为false时的tab会被展示出来
      const visibleTabs = this.getVisibleTabs();
      const urlTabKey = this.getAvailableActiveTabKey();
      const finalTabKey = resetActiveTab ? visibleTabs?.[0]?.key : urlTabKey || visibleTabs?.[0]?.key;
      const replaceHistory = isFirstRender ?? (urlTabKey ? false : true);

      this.changeActiveTab(finalTabKey, replaceHistory);
    } else {
      this.activeTabKey = this.getAvailableActiveTabKey();
    }
  }

  /**
   * 设置loading状态
   * @param loading
   */
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  /**
   * 执行请求
   */
  private async runFetcher(useOriginFetcher = false) {
    const res = await (useOriginFetcher ? this.originFetcher() : this.options.fetcher());
    if (this.options.extraConfig?.clearGlobalScopeInFetcher === false) {
      this.globalScope = {
        ...this.globalScope,
        ...res?.globalScope,
      };
    } else {
      // 每次重新请求详情数据globalScope会被重置
      // detailPage globalScope的来源： 详情接口返回设置
      this.globalScope = res?.globalScope || ({} as GlobalScopeType);
    }
    this.data = res?.data || ({} as DetailData);
  }

  private async innerRefresh(options?: { showLoading?: boolean; useOriginFetcher?: boolean }) {
    const { showLoading = true } = options || {};
    try {
      this.clearError();
      showLoading && this.setLoading(true);
      await this.runFetcher(options?.useOriginFetcher);
    } catch (error) {
      this.error = error || new Error('详情页请求失败');
    } finally {
      showLoading && this.setLoading(false);
    }
  }
  /**
   * 重新请求数据
   * showLoading: 是否展示loading
   * resetActiveTab: 是否重置当前选中的tab
   * reset: 是否重新加载页面
   */
  async refresh(options?: IRefreshOptions) {
    return this._refresh(options);
  }
  /**
   * 重新请求数据
   * showLoading: 是否展示loading
   * resetActiveTab: 是否重置当前选中的tab
   * reset: 是否重新加载页面
   * isFirstRender: 是否是首次进入页面请求
   */
  private async _refresh(options?: InnerRefreshOptions) {
    const { showLoading, reset, resetActiveTab = false, isFirstRender } = options || {};
    if (reset) {
      this.resetDetailPage({
        showLoading,
        resetActiveTab,
        isFirstRender,
      });
    } else {
      resetActiveTab && this.changeActiveTab(this.getVisibleTabs()?.[0].key);
      await this.innerRefresh({
        showLoading,
      });
      // 刷新当前Tab下的数据
      await this.getActiveTab()?.refresh();
    }
  }
  /**
   *
   * @param options
   * 该方法只用做页面第一次初始化时使用
   * 因为从其它页面跳到详情页会调用一次history.push方法，而组件中在初始化的时候也会再调用一次，这样就会导致如果
   *  第一次进入页面后再点击浏览器回退按钮，需要点击两次才可回退到之前的页面
   */
  async init(options?: InnerRefreshOptions) {
    this._refresh({
      reset: true,
      isFirstRender: true,
      resetActiveTab: this.options?.resetActiveTab,
      ...(options ?? {}),
    });
  }

  /**
   * 设置全局对象的值
   */
  setGlobalScope(globalScope: GlobalScopeType) {
    this.globalScope = merge(this.globalScope, globalScope);
  }

  /**
   * 设置当前活跃tabkey
   * @param activeTab
   */
  setActiveTabKey(activeTabKey: string) {
    this.activeTabKey = activeTabKey;
  }

  /**
   * 设置详情页data：通过该方法设置直接覆盖
   * @param data
   */
  setData(data: DetailData) {
    this.data = data;
  }

  /**
   * 切换Tab
   * @param tabKey
   */
  changeActiveTab = (tabKey: string, replaceHistory = false) => {
    this.setActiveTabKey(tabKey);
    changeUrlTabKey({
      tabKey,
      tabKeyName: this.options?.urlTabKeyName,
      replaceHistory,
    });
  };

  /**
   * 渲染tab内容，可用于最终自定义渲染tab内容
   * @param opts
   * @returns
   */
  renderActiveTabContent: ICDetailPageOptions<DetailData, GlobalScopeType>['renderActiveTabContent'];
}
