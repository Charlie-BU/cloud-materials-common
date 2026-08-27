import type { CSSProperties, ReactNode } from 'react';

/**
 * @title CBrandBannerProps
 */
export interface CBrandBannerProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 产品标题
   */
  title: ReactNode;
  /**
   * @zh 产品描述
   */
  description: ReactNode;
  /**
   * @zh 右侧图片，建议尺寸480*240
   */
  imgUrl: string;
  /**
   * @zh 操作
   */
  operation?: ReactNode;
}
