import type { CSSProperties } from 'react';
import type React from 'react';
import type { RulesProps, PopoverProps, FormItemProps } from '@arco-design/web-react';

/**
 * @title RuleFeedback
 */
export interface RuleFeedback {
  /**
   * @zh 关键字 用于错误信息和规则匹配，默认为索引
   * @defaultValue 索引
   */
  key: string | number;
  /**
   * @zh 展示的信息
   */
  message: RulesProps['message'];
}

/**
 * @title CPopoverVerifyRule
 */
export interface CPopoverVerifyRule extends Omit<RulesProps, 'validateLevel'> {
  /**
   * @zh 关键字 用于错误信息和规则匹配，默认为索引
   * @defaultValue 索引
   */
  key?: string | number;
  message: RulesProps['message'];
}

/**
 * @title  CPopoverVerifyProps
 */
export interface CPopoverVerifyProps {
  /**
   * @zh 规则
   */
  rules?: CPopoverVerifyRule[];
  /**
   * @zh 外部控制校验逻辑，错误的 key 的数组
   */
  errorKeys?: CPopoverVerifyRule['key'][];
  /**
   * @zh arco Form.Item 给子组件的 error，一般用来表示输入状态错误
   * @defaultValue false
   */
  error?: boolean;
  /**
   * @zh 与 rules 连用，对规则进行校验
   */
  value?: any;
  /**
   * @zh 暴露给 Form.Item
   */
  onChange?: (val: any, e: any) => void;
  /**
   * @zh 气泡参数
   */
  arcoPopoverProps?: PopoverProps;
  /**
   * @zh 样式
   */
  style?: CSSProperties;
  /**
   * @zh 类名
   */
  className?: string | string[];
  /**
   * @zh 子节点
   */
  children: React.ReactElement;
  /**
   * @zh 规则改变时，是否主动触发重新校验
   * @defaultValue false
   */
  validateOnRulesChange?: boolean;
}

/**
 * @title  CPopoverVerifyFormItemProps
 */
export interface CPopoverVerifyFormItemProps extends Omit<FormItemProps, 'help' | 'children'> {
  /**
   * @zh 规则
   */
  rules?: CPopoverVerifyRule[];
  /**
   * @zh cPopoverVerifyProps 参数
   */
  cPopoverVerifyProps?: {
    /**
     * @zh 样式
     */
    style?: CSSProperties;
    /**
     * @zh 类名
     */
    className?: string | string[];
    /**
     * @zh 规则改变时，是否主动触发重新校验
     * @defaultValue false
     */
    validateOnRulesChange?: boolean;
  };
  /**
   * @zh 气泡参数
   */
  arcoPopoverProps?: PopoverProps;
  /**
   * @zh 子节点
   */
  children: React.ReactElement;
}
