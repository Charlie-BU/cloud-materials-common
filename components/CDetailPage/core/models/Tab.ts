import { define, observable, action } from '@formily/reactive';
import { isFunction } from 'lodash-es';

import type { ObjRecord, ITabOptions } from '../../types';
import type { DetailPage } from './DetailPage';
import { runCallable, getComponent, getNoticeComponent } from '../../shared';

export class Tab<TabData extends ObjRecord, DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = any> {
  /**
   * 唯一key
   */
  key: string;
  /**
   * tab级的loading
   */
  loading = false;

  /**
   * tab 的data
   */
  data: ObjRecord;
  /**
   *  globalScope全局属性
   */
  globalScope: GlobalScopeType;
  /**
   * Tab级的错误
   */
  error: Error | null;

  /**
   * 父级详情对象
   * */
  detailPage: DetailPage<DetailData>;
  /**
   * tab的配置
   */
  options: ITabOptions<TabData, DetailData, GlobalScopeType>;

  constructor(detailPage: DetailPage<DetailData>, options: ITabOptions<TabData, DetailData, GlobalScopeType>) {
    this.makeObservable();
    this.options = {
      ...this.options,
      needLoading: true,
      ...options,
    };
    this.detailPage = detailPage;
    this.key = options.key;
  }

  private makeObservable() {
    define(this, {
      key: observable,
      globalScope: observable,
      data: observable,
      detailPage: observable,
      error: observable,
      loading: observable,
      setGlobalScope: action,
      setLoading: action,
      setData: action,
      setError: action,
    });
  }

  /**
   * 当前Tab最后渲染的组件
   */
  getCurrentTabComponent() {
    const tabRunCallableProps = {
      data: this.detailPage?.data,
      tab: this,
      detailPage: this.detailPage,
    };
    if (this.options?.render) {
      return runCallable(this.options?.render, tabRunCallableProps);
    }
    if (isFunction(this.options?.component)) {
      return runCallable(this.options?.component, tabRunCallableProps);
    }
    const componentProps = runCallable(this.options?.componentProps, tabRunCallableProps);

    return getComponent(this.options?.component, componentProps);
  }

  /**
   * 提示内容组件
   */
  getCurrentTabNoticeComponent() {
    if (isFunction(this.options?.noticeComponent)) {
      return runCallable(this.options.noticeComponent, {
        data: this.detailPage?.data,
        tab: this,
        detailPage: this.detailPage,
      });
    }
    const noticeComponentProps = runCallable(this.options?.noticeComponentProps, {
      data: this.detailPage?.data,
      tab: this,
      detailPage: this.detailPage,
    });
    return getNoticeComponent(this.options?.noticeComponent, noticeComponentProps);
  }

  /**
   * tab的可见性
   */
  getVisible() {
    return runCallable(this.options?.visible, {
      data: this.detailPage?.data,
      tab: this,
      detailPage: this.detailPage,
    });
  }

  /**
   * tab标题
   */
  getTitle() {
    return runCallable(this.options?.title, {
      data: this.detailPage?.data,
      tab: this,
      detailPage: this.detailPage,
    });
  }

  /**
   * tab内容上方提示内容
   */
  getNoticeComponent() {
    return runCallable(this.options?.noticeComponent, {
      data: this.detailPage?.data,
      tab: this,
      detailPage: this.detailPage,
    });
  }
  /**
   * tab内容上方提示内容组件属性
   */
  getNoticeComponentProps() {
    return runCallable(this.options?.noticeComponentProps, {
      data: this.detailPage?.data,
      tab: this,
      detailPage: this.detailPage,
    });
  }

  /**
   * 单个Tab错误配置
   */
  getTabErrorConfig() {
    return runCallable(this.options?.tabErrorConfig, {
      data: this.detailPage?.data,
      tab: this,
      detailPage: this.detailPage,
    });
  }

  /**
   * 执行请求逻辑
   * 只在refresh中调用，错误会在refresh中被捕获
   */
  private async runFetcher() {
    const res = await this.options?.fetcher?.({
      detailPage: this.detailPage,
      tab: this,
      data: this.detailPage?.data as DetailData,
    });
    this.setGlobalScope(res?.globalScope);
    this.setData(res?.data);
  }

  /**
   * 刷新
   */
  async refresh(options?: { showLoading: boolean }) {
    const { showLoading = true } = options || {};
    try {
      this.clearError();
      showLoading && this.setLoading(true);
      await this.runFetcher();
    } catch (error) {
      this.setError(error);
    } finally {
      showLoading && this.setLoading(false);
    }
  }

  /**
   * 设置loading状态
   */
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  /**
   * 设置globalScope
   * @param globalScope
   */
  setGlobalScope(globalScope: GlobalScopeType) {
    this.globalScope = globalScope;
  }
  /**
   * 设置Tab的数据
   */
  setData(data: TabData) {
    this.data = data;
  }

  /**
   * 设置tab的错误信息
   * @param error
   */
  setError(error: Error) {
    this.error = error;
  }

  private clearError() {
    this.error = null;
  }
}
