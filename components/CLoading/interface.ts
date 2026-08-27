import type { CSSProperties, ReactNode } from 'react';
import type { ResultProps, SpinProps } from '@arco-design/web-react';

export type CLoadingType = 'inline' | 'block' | 'page';

/**
 * @title CLoadingProps
 */
export interface CLoadingProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 对应 `行内`、`块级`、`页面级` 不同层级的默认缺省占位及 loading 表现
   * @defaultValue inline
   */
  type?: CLoadingType;
  /**
   * @zh 是否展示加载状态
   * @defaultValue false
   */
  loading?: boolean;
  /**
   * @zh loading 是否出错，如果出错会展示占位元素
   * @defaultValue false
   */
  hasError?: boolean;
  /**
   * @zh 自定义缺省占位，默认情况下  CLoading 组件已经根据不同的 `type` 给出了对应的占位 UI，
   * 可以使用该属性自定义缺省占位
   */
  fallback?: ReactNode;
  /**
   * @zh 传给缺省占位使用的重试方法，如果自定义了 `fallback` 属性则可以不传
   */
  onReload?: () => void;
  /**
   * @zh 容器包含 children 时默认是 inline-block 布局，当你需要撑满父级容器时，可以设置 isBlock={true}
   */
  isBlock?: boolean;
  /**
   * @zh 透传给 CSpin 的参数
   */
  cSpinProps?: CSpinProps;
  /**
   * @zh 透传给 CResult 的参数
   */
  cResultProps?: CResultProps;
}

export type CResultStatus =
  | 'no-data'
  | 'no-data-simple'
  | 'no-data-gray'
  | 'no-permission'
  | 'no-permission-simple'
  | 'no-permission-gray'
  | 'no-search-result'
  | 'no-search-result-simple'
  | 'no-search-result-gray'
  | 'no-content'
  | 'no-content-simple'
  | 'no-content-gray'
  | 'network-error'
  | 'network-error-simple'
  | 'network-error-gray'
  | 'no-picture'
  | 'no-picture-gray'
  | 'no-chart'
  | 'no-chart-gray'
  | 'error-type'
  | 'error-type-simple'
  | 'error-type-gray'
  | '404-error'
  | '404-error-gray'
  | '403-error'
  | '403-error-gray'
  | null;

export interface TitleProps {
  loadFailed?: React.ReactNode;
  retry?: React.ReactNode;
}

/**
 * @title CResultProps
 */
export interface CResultProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 结果状态，对应不同占位图片，当设置为 `null` 时需要 `icon` 属性设置图标
   * @defaultValue 'no-picture'
   */
  status?: CResultStatus;
  /**
   * @zh 占位图片的大小，分别有`大`、`中`，`小`三种枚举值可选，也可以传入数字自定义图标大小
   * @defaultValue 'large'
   */
  size?: 'small' | 'medium' | 'large' | number;
  /**
   * @zh 占位标题文字
   * @defaultValue null
   */
  title?: ReactNode | TitleProps;
  /**
   * @zh 额外内容，通常可以传入按钮列表设置不同的操作
   * @defaultValue null
   */
  extra?: ReactNode;
  /**
   * @zh 自定义图标
   */
  icon?: ReactNode;
  /**
   * @zh 透传给 arco Result 组件的属性
   */
  arcoResultProps?: ResultProps;
}

/**
 * @title CSpinProps
 */
export interface CSpinProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh Loading 图标大小，`大`、`小` 两种枚举，传入数字自定义图标大小
   * @defaultValue 'small'
   */
  size?: 'small' | 'large' | number;
  /**
   * @zh 是否为加载状态（仅在 Spin 有子节点时生效）
   * @defaultValue false
   */
  loading?: boolean;
  /**
   * @zh 是否为块级元素
   * @defaultValue false
   */
  isBlock?: boolean;
  /**
   * @zh 透传给 arco Spin 组件的属性
   */
  arcoSpinProps?: SpinProps;
}
