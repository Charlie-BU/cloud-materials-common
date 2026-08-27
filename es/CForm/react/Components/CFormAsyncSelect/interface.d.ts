import type { CSSProperties, ReactNode } from 'react';
import type { SelectProps } from '@arco-design/web-react/es/Select/interface';
import type { useInfiniteScroll } from 'ahooks';
import type { ButtonProps } from '@arco-design/web-react';
/**
 * @title 配置化选项类型
 */
export type CFormAsyncSelectConfigOption = {
    label: React.ReactNode;
    value: string | number;
    disabled?: boolean;
    /** 选项禁用原因，hover展示 */
    disabledTooltipContent?: React.ReactNode;
    /** 选项描述 */
    description?: React.ReactNode;
    extra?: Record<any, any>;
    [key: string]: any;
};
export type CFormAsyncSelectOption = CFormAsyncSelectConfigOption | number | string;
/**
 * @title 受控时传入dataSource的类型
 */
export interface CFormAsyncSelectDataSource {
    list: CFormAsyncSelectOption[];
    total?: number;
    /** 是否还有其他数据，如果返回这个，则优先使用noMore判断是否继续请求数据 */
    noMore?: boolean;
    /** 将在下次请求时传给fetchData */
    extra?: {
        [x: string]: unknown;
    };
}
/**
 * @title 远程拉取函数返回数据类型
 */
export type CFormAsyncSelectFetchDataSource = CFormAsyncSelectDataSource & ({
    total: number;
} | {
    noMore: boolean;
});
/**
 * @title fetchInitData的返回类型
 */
export interface CFormAsyncSelectInitDataSource {
    list: CFormAsyncSelectOption[];
}
/**
 * @title fetchData的入参类型
 */
export interface FetchDataProps {
    page: number;
    searchWord?: string;
    cacheData?: CFormAsyncSelectFetchDataSource;
    extra?: {
        [x: string]: unknown;
    };
}
/**
 * @title 组件入参类型
 */
export interface CFormAsyncSelectProps extends Omit<SelectProps, 'options' | 'dropdownRender'> {
    /**
     * @zh 是否开启自动加载
     * @defaultValue false
     * @description 开启后，组件挂载后自动调用fetchData获取第一页数据
     */
    autoLoad?: boolean;
    /**
     * @zh 数据源
     * @description 组件传入该参数，则组件dataSource受控，fetchData等非受控模式等参数无效
     */
    dataSource?: CFormAsyncSelectDataSource;
    /**
     * @zh 自定义渲染下拉内容
     * @description menu是加了loading的下拉菜单，originalMenu是未加载loading的下拉菜单
     */
    dropdownRender?: (menu?: ReactNode, originalMenu?: ReactNode, loadingType?: UseCFormAsyncSelectState['loadingType'], errorType?: UseCFormAsyncSelectState['errorType']) => ReactNode;
    /**
     * @zh dataSource 受控时，是否滚动加载更多
     * @defaultValue false
     * @description 为true时，传入dataSource，滚动会触发加载，并通过onDataSourceChange暴露出去
     */
    enableRemoteLoadWhenDataSourceControlled?: boolean;
    /**
     * @zh 过期时间
     * @defaultValue 60,000ms
     * @description 过期后，再次focus会重新加载第一页
     */
    expiredTime?: number;
    /**
     * @zh 远程获取下一页数据源
     * @description 远程获取下一页数据源
     */
    fetchData?: ({ page, searchWord, cacheData, extra }: FetchDataProps) => Promise<CFormAsyncSelectFetchDataSource>;
    /**
     * @zh 远程获取初始数据源
     * @description 当value非空，但第一页数据源没有该value，导致回显value而不是label的问题
     */
    fetchInitData?: () => Promise<CFormAsyncSelectInitDataSource>;
    /**
     * @zh Select 的 filterOption
     * @defaultValue false
     * @description 非受控时，为false。受控时默认为false。
     */
    filterOption?: SelectProps['filterOption'];
    /**
     * @zh 是否自动选择第一个非disabled的选项
     * @defaultValue false
     * @description 配合autoLoad=true使用，配置后，当组件value为空时，自动远程拉取数据源后，选择第一个非disabled的选项
     */
    ifAutoLoadFirst?: boolean;
    /**
     * @zh 滚动加载更多时的节流时间
     * @defaultValue 200
     * @description 滚动到离底部thresholdOnScrollLoad时，触发远程拉取，避免多次触发，节省性能
     */
    loadThrottleWait?: number;
    /**
     * @zh 数据源改变时触发事件
     */
    onDataSourceChange?: (dataSource?: CFormAsyncSelectFetchDataSource) => void;
    /**
     * @zh 远程拉取出错时的回调
     */
    onError?: (e: any) => void;
    /**
     *  @zh 远程拉取时loading态修改回调
     */
    onFetchDataLoadingChange?: (loading: boolean) => void;
    /**
     * @zh 选项展示模式
     * @defaultValue singleRow
     * @description singleRow - 单行，label和description同行展示；doubleRow-双行，label和description两行展示；custom-自定义，当自定义label时，配置这个，因为默认singleRow对label做了处理
     */
    optionMode?: 'singleRow' | 'doubleRow' | 'custom';
    /**
     * @zh 内置renderFormat的类型
     * @description label - 只展示label；value - 只展示value；labelWithValue - 展示 label(value)
     * @defaultValue label
     */
    renderFormatType?: 'label' | 'value' | 'labelWithValue';
    /**
     * @zh 自定义处理options
     */
    renderOptions?: (options?: CFormAsyncSelectConfigOption[]) => SelectProps['options'];
    /**
     * @zh 搜索时的防抖时间
     * @defaultValue 300
     */
    searchDebounceWait?: number;
    /**
     * @zh 是否展示刷新按钮
     * @defaultValue false
     * @description 为true时，select外会再包一层
     */
    showRefreshBtn?: boolean | ButtonProps;
    /**
     * @zh 滚动时触发加载更多的阈值
     * @defaultValue 10
     * @description 滚动离内容底部的距离阈值
     */
    rootMargin?: number;
    /**
     * @zh wrapperClassName
     * @description showRefreshBtn为true时，select外会再包一层，透传给该层
     */
    wrapperClassName?: string | string[];
    /**
     * @zh wrapperStyle
     * @description showRefreshBtn为true时，select外会再包一层，透传给该层
     */
    wrapperStyle?: CSSProperties;
}
/**
 * @title UseCFormAsyncSelectProps
 */
export type UseCFormAsyncSelectProps = Pick<CFormAsyncSelectProps, 'autoLoad' | 'dataSource' | 'enableRemoteLoadWhenDataSourceControlled' | 'expiredTime' | 'fetchData' | 'fetchInitData' | 'ifAutoLoadFirst' | 'labelInValue' | 'mode' | 'onChange' | 'onDataSourceChange' | 'onError' | 'onFetchDataLoadingChange' | 'value'>;
/**
 * @title UseCFormAsyncSelectState
 * @description 返回的内部状态
 */
export interface UseCFormAsyncSelectState extends Pick<CFormAsyncSelectProps, 'value'> {
    /** 数据源 */
    dataSource?: {
        list: CFormAsyncSelectConfigOption[];
    };
    /** dataSource是否受控 */
    dataSourceControlled: boolean;
    /** 是否可以自动远程拉取数据 */
    enableAutoFetchData: boolean;
    /** 是否可以远程拉取数据 */
    enableFetchData: boolean;
    /** 加载错误类型，初始化或加载更多时 */
    errorType?: 'init' | 'loadmore';
    /** loading态的原因，初始化或加载更多 */
    loadingType?: 'init' | 'loadmore';
    /** 搜索词 */
    searchWord?: string;
    /** value是否受控 */
    valueControlled: boolean;
}
/**
 * @title UseCFormAsyncSelectControl
 * @description 状态控制
 */
export interface UseCFormAsyncSelectControl extends Pick<ReturnType<typeof useInfiniteScroll>, 'cancel' | 'loadMore' | 'mutate'> {
    reload: () => void;
    setSearchWord: (searchWord: string) => void;
    setValue: (value: CFormAsyncSelectProps['value']) => void;
    /** 重置用于远程拉取数据源的状态 */
    resetFetchState: (clearData?: boolean) => void;
    /** 获取数据源是否已过期 */
    getDataSourceExpired: () => boolean;
}
/**
 * @zh 组件对外暴露的内容
 */
export interface CFormAsyncSelectModel extends UseCFormAsyncSelectControl {
    /**
     * 数据源
     */
    readonly data?: CFormAsyncSelectDataSource;
    /**
     * 重新加载第一页的数据并清除已选项
     * 用户设置了autoLoadFirst仍会触发改变当前的已选值为第一项(无已选)
     * @returns
     */
    reset: () => void;
    /**
     * 重新加载第一页的数据(不清除已选项）
     * 用户设置了autoLoadFirst仍会触发改变当前的已选值为第一项(无已选)
     * @returns
     */
    refresh: (flash?: boolean) => void;
}
