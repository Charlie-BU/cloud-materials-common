import type { CSSProperties, ReactNode } from 'react';
import type React from 'react';
import type { ButtonProps, PopoverProps, PopconfirmProps, DropdownProps } from '@arco-design/web-react';

/**
 * @title Operation
 */
export interface Operation {
  /** 操作名称, 操作的唯一标识，不可重复, name默认会作为 button 的 children */
  name?: string;
  /** 操作点击回调，支持返回Promise实现loading效果 */
  onClick?: () => void;
  /** 是否禁止操作 */
  disabled?: boolean;
  /**
   * 是否可见
   * @default true
   */
  visible?: boolean;
  /** tooltip 用于操作按钮不可用或者其他场景下的提示文案 */
  tooltip?: React.ReactNode;
  /**
   * 自定义渲染操作按钮
   */
  render?: () => ReactNode;
  /** sub operation, 只作用于 menu operation 下 */
  subOperation?: Operation[];
  /** arco button props */
  arcoButtonProps?: ButtonProps;
  /** 配置 popover */
  arcoPopoverProps?: PopoverProps;
  /** 配置 popconfirm */
  arcoPopconfirmProps?: PopconfirmProps;
}

export type OperationList = Array<Operation | Operation[]>;

/**
 * @title COperationMenu
 */
export interface COperationMenuProps {
  /** 容器className */
  className?: string;
  /** 组件的附加样式 */
  style?: CSSProperties;
  /**
   * displayNum 外露的按钮数量
   * @default 2
   */
  displayNum?: number;
  /**
   * 展示下拉操作的上限数量，用于控制下拉框的最大高度
   * @default 8
   */
  maxMenuOperationNum?: number;
  /**
   * 操作按钮配置
   */
  operations?: OperationList;
  /** 异步下拉菜单配置，支持传入二维数组分组, 异步获取函数 */
  asyncOperations?: () => Promise<OperationList>;
  /**
   * 是否每次点击都重新加载
   * @default true
   */
  reloadOperationEachClick?: boolean;
  /**
   * 按钮间距， 基于 Arco Space 实现
   * @default 12
   */
  spaceSize?: number;
  /** 下拉菜单按钮点击的回调, 异步场景下无效 */
  onMenuBtnClick?: () => void;
  /**
   * 操作按钮组的默认类型。text类型的按钮不与其他按钮混用，因此当默认类型为text时，Operation.type 会使用组件内的文本按钮；当默认类型为其他类型时，为 button 对应类型
   */
  defaultButtonType?: 'default' | 'primary' | 'secondary' | 'dashed' | 'text' | 'outline';
  /** 下拉菜单外选项和菜单按钮的 Props, 优先级低于 item 中的 arcoButtonProps */
  arcoButtonProps?: ButtonProps;
  /** 下拉菜单按钮属性, 优先级高于 arcoButtonProps */
  menuButtonProps?: ButtonProps;
  /** dropdown props */
  arcoDropdownProps?: DropdownProps;
  /** 自定义 Dropdown Button, 传递内部 的 click 方法给自定义组件*/
  renderDropdownButton?: (onClick: () => void) => React.ReactNode;
}

// 组件内部使用
export interface CurrentDisplayPop {
  name: string;
  type: PopType;
}

export interface OperationWrapperProps {
  operation: ExtraOperation;
  inDropMenu?: boolean;
  index: string;
  popVisibleChange: (val: CurrentDisplayPop, visible: boolean) => void;
  currentPop?: CurrentDisplayPop;
  setDropDownVisible?: (val: boolean) => void;
}

export type PopType = 'popconfirm' | 'popover';

export interface ExtraOperation extends Omit<Operation, 'subOperation'> {
  key: string;
  index: string;
  subOperation?: ExtraOperation[];
}

export enum MenuStatus {
  loading,
  success,
  error,
}
