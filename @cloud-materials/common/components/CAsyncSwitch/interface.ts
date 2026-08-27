import type { ReactNode } from 'react';
import type { PopconfirmProps, SwitchProps } from '@arco-design/web-react';

/**
 * @title CAsyncSwitchProps
 */
export interface CAsyncSwitchProps extends SwitchProps {
  /** Switch是否打开, 与checked等同 */
  value?: boolean;
  /** 开关改变的回调， 当变更状态失败时必须要reject error */
  onChange?: (value: boolean) => Promise<void>;
  /** 开启时的二次确认提示内容 */
  openConfirmTips?: ReactNode;
  /** 关闭时的二次确认提示内容 */
  closeConfirmTips?: ReactNode;
  /** Arco Popconfirm props */
  arcoPopconfirmProps?: Partial<PopconfirmProps>;
}
