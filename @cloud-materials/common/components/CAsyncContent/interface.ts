import type { Options, Result } from 'ahooks/es/useRequest/src/types';
import type { CLoadingV2Props } from '../CLoadingV2/interface';

/**
 * @title CAsyncContentRef
 */
export type CAsyncContentRef<T = any> = Result<T, []>;

/**
 * @title CAsyncContentProps
 */
export interface CAsyncContentProps<T> {
  /** 数据请求函数 */
  fetcher: () => Promise<T>;
  /** 透传给 useRequest 的 options */
  requestOptions?: Options<T, []>;
  /** 内容渲染函数 */
  children: (data: T, request: CAsyncContentRef<T>) => React.ReactNode;
  /** 初始化时的占位，避免初始化后闪动 */
  placeholder?: React.ReactNode;
  /** 透传给CLoadingV2的props */
  cLoadingProps?: CLoadingV2Props;
}
