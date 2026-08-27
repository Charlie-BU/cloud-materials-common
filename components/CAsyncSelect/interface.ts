import type { CSSProperties } from 'react';
import type { SelectProps } from '@arco-design/web-react/es/Select/interface';
import type { EmptyProps } from '@arco-design/web-react';

export type SelectOption = {
  //自定义label样式
  //注意：自定义label之后可能会导致select选中的选项会成为placeholder这个默认行为失效，这时候可以把选中信息放入extra里面，eg：options.extra?.placeholder
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  disabledTooltipContent?: React.ReactNode;
  //描述（辅助）信息的内容
  description?: React.ReactNode;
  extra?: Record<any, any>;
  [key: string]: any;
};

export type Option = SelectOption | number | string;

export interface DataSource {
  list: Option[];
  page: number;
  //判断fetchData返回值noMore的时候，建议使用当前页返回的数据的数量跟设置接口的pageSize去比较
  //不建议使用cacheData，因为cacheData 即使在缓存过期时也不会被清除，表示的是历史所有加载的数据，可能缓存过期之后对noMore的判断有所影响
  noMore: boolean;
}

export interface InitDataSource {
  list: Option[];
}

export interface FetchDataProps {
  page: number;
  searchWord?: string;
  //判断fetchData返回值noMore的时候，建议使用当前页返回的数据的数量跟设置接口的pageSize去比较
  //不建议使用cacheData，因为cacheData 即使在缓存过期时也不会被清除，表示的是历史所有加载的数据，可能缓存过期之后对noMore的判断有所影响
  cacheData?: DataSource;
}

// /**
//  * @title CAsyncSelectForDrawerProps
//  */
// export interface CAsyncSelectForDrawerProps extends SelectProps {
//   style?: CSSProperties;
//   className?: string | string[];
//   /** 自定义后缀点击事件 */
//   suffixClick?: () => void;
// }

/**
 * @title CAsyncSelectProps
 */
export interface CAsyncSelectProps extends SelectProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 包装层样式，仅当包装层存在时生效。目前仅配置了刷新按钮后存在包装层DOM
   */
  wrapperStyle?: CSSProperties;
  /**
   * @zh 包装层Class，仅当包装层存在时生效。目前仅配置了刷新按钮后存在包装层DOM
   */
  wrapperClassName?: string | string[];
  /**
   * 是否重新加载，暴露给form使用的属性
   * 发生变化时重新fetch数据
   */
  reloadKey?: string;
  /**
   * 自定义dropMenu的高度 单位px
   * 滚动加载依赖 onScroll 事件触发，设置超过一页高度会导致loadmore无法触发
   * @defaultValue 312
   */
  dropMenuMaxHeight?: number;
  /**
   * 选择展示模版：单行（singleRow）or双行（doubleRow），默认单行展示。
   * 注意：选择doubleRow模式以后要在处理返回的option[]里面添加description信息，否则样式会出问题。
   * 注意：如果自定义label样式（三行四行，字体红颜色等）需要把optionMode设置为customize，如果不设置该参数会默认为singleRow，可能会对你自定义的样式造成影响。
   */
  optionMode?: 'singleRow' | 'doubleRow' | 'customize';
  /** 拉取下拉框函数 */
  fetchData: ({ page, searchWord, cacheData }: FetchDataProps) => Promise<DataSource>;
  /**
   * 用于初始值的正常渲染。
   * 适用于在滚动加载的情况下，初始值如果不属于第一页的数据，会导致初始值显示为 value，而非label的场景。
   * 适用于异步需要通过调用接口获取初始值的情况。
   * 注意必须搭配autoLoad=true一起使用
   * 注意initOptions和fetchInitData只能选择一种使用
   */
  fetchInitData?: () => Promise<InitDataSource>;
  /**
   * 用于初始值的正常渲染。
   * 适用于在滚动加载的情况下，初始值如果不属于第一页的数据，会导致初始值显示为 value，而非label的场景。
   * 适用于同步已经有初始值可以直接使用的情况
   * 注意必须搭配autoLoad=true一起使用
   * 注意initOptions和fetchInitData只能选择一种使用
   */
  initOptions?: SelectOption[];
  /**
   * 是否自动加载下拉框，否则只有在focus时加载
   * @defaultValue false
   */
  autoLoad?: boolean;
  /**
   * 是否支持搜索，与showSearch用法相同，两者兼容，但是两个参数同时设置时，只有showSearch生效
   * @defaultValue true
   */
  enableSearch?:
    | boolean
    | {
        retainInputValue?: boolean | undefined;
        retainInputValueWhileSelect?: boolean | undefined;
      };
  /**
  /**
   * 是否启用滚动加载更多
   * @defaultValue true
   */
  enableRollingLoad?: boolean;
  /**
   * 是否自动选择第一个 需要与autoLoad=true一起使用
   * @defaultValue false
   */
  ifAutoLoadFirst?: boolean;
  /** 请求结果缓存时间 单位ms
   * @defaultValue 60000
   */
  staleTime?: number;
  /** 搜索时的防抖时间 单位ms
   * @defaultValue 300
   */
  searchDebounceTime?: number;
  /** 滚动加载时的防抖时间 单位ms
   * @defaultValue 500
   */
  loadDebounceTime?: number;
  /** 出错时的回调函数 */
  onError?: (e: any) => void;
  /** asyncSelect的可选项 多用于跟表单联动 */
  dataSource?: DataSource;
  /** 数据源发生变化时的回调 */
  onDataSourceChange?: (value?: DataSource) => void;
  /**
   * 多选情况下，+n的tag进行hover行为是否弹出popover展示详细信息
   * @defaultValue false
   */
  showMaxTagToolTip?: boolean;
  /**
   * 选项option进行hover操作是否展示复制按钮并可复制
   * 注意：目前只支持复制label
   * @defaultValue false
   */
  enableCopy?: boolean;
  /**
   * "暂无数据"展示空状态的组件相关入参，即arco的Empty组件的props
   */
  emptyProps?: EmptyProps;
  /**
   * @zh 是否展示刷新按钮
   * @defaultValue false
   */
  showRefreshBtn?: boolean;
  /**
   * @zh 组件设计之初，组件默认受控非受控都由组件内部控制，本意是方便用户使用，但是某些场景会收到约束，可以使用isControlStateChange=true 完全由用户自己控制
   * @defaultValue false
   */
  isControlStateChange?: boolean;
}

/**
 * @title CAsyncSelectHooksProps
 */
export type CAsyncSelectHooksProps = Pick<
  CAsyncSelectProps,
  | 'fetchData'
  | 'enableRollingLoad'
  | 'searchDebounceTime'
  | 'loadDebounceTime'
  | 'staleTime'
  | 'onError'
  | 'autoLoad'
  | 'ifAutoLoadFirst'
  | 'fetchInitData'
  | 'dataSource'
  | 'initOptions'
  | 'mode'
  | 'onDataSourceChange'
  | 'showSearch'
  | 'enableSearch'
>;

export interface CAsyncSelectModel {
  /**
   * 数据源
   */
  readonly data?: DataSource;
  /**
   * 重新加载第一页的数据并清除已选项
   * @returns
   */
  reset: () => void;
  /**
   * 重新加载第一页的数据(不清除已选项）
   * 用户设置了autoLoadFirst仍会触发改变当前的已选值为第一项
   * @returns
   */
  refresh: () => void;
}
