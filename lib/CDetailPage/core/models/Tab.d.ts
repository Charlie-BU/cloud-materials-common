import type { ObjRecord, ITabOptions } from '../../types';
import type { DetailPage } from './DetailPage';
export declare class Tab<TabData extends ObjRecord, DetailData extends ObjRecord, GlobalScopeType extends ObjRecord = any> {
    /**
     * 唯一key
     */
    key: string;
    /**
     * tab级的loading
     */
    loading: boolean;
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
    constructor(detailPage: DetailPage<DetailData>, options: ITabOptions<TabData, DetailData, GlobalScopeType>);
    private makeObservable;
    /**
     * 当前Tab最后渲染的组件
     */
    getCurrentTabComponent(): any;
    /**
     * 提示内容组件
     */
    getCurrentTabNoticeComponent(): any;
    /**
     * tab的可见性
     */
    getVisible(): any;
    /**
     * tab标题
     */
    getTitle(): any;
    /**
     * tab内容上方提示内容
     */
    getNoticeComponent(): any;
    /**
     * tab内容上方提示内容组件属性
     */
    getNoticeComponentProps(): any;
    /**
     * 单个Tab错误配置
     */
    getTabErrorConfig(): any;
    /**
     * 执行请求逻辑
     * 只在refresh中调用，错误会在refresh中被捕获
     */
    private runFetcher;
    /**
     * 刷新
     */
    refresh(options?: {
        showLoading: boolean;
    }): Promise<void>;
    /**
     * 设置loading状态
     */
    setLoading(loading: boolean): void;
    /**
     * 设置globalScope
     * @param globalScope
     */
    setGlobalScope(globalScope: GlobalScopeType): void;
    /**
     * 设置Tab的数据
     */
    setData(data: TabData): void;
    /**
     * 设置tab的错误信息
     * @param error
     */
    setError(error: Error): void;
    private clearError;
}
