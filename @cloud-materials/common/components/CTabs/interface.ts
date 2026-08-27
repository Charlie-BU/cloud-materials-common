import type { TabsProps } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * @title CTabsProps
 */
export interface CTabsProps extends TabsProps {
  style?: CSSProperties;
  className?: string | string[];

  children?: ReactNode;
  /**
   * @zh 是否有左下角 border
   * @default false
   */
  leftBottomBorder?: boolean;

  /**
   * @zh 场景类型
   */
  sceneType?: 'statistic';

  /**
   * @zh 是否充满父元素 width
   * @default false
   */
  isFullElement?: boolean;
}
