import type { CSSProperties, ReactNode } from 'react';
import type { RulesProps, SelectProps, PopoverProps, InputProps, InputTagProps } from '@arco-design/web-react';
import type { CPopoverVerifyProps, CPopoverVerifyRule } from '../CPopoverVerify/interface';
import type { builtInMap } from './constant';
import type { DefineBuiltInHybridListType } from '../_factory/builtInComponent';

type CAsyncSelectProps = SelectProps;

/**
 * @title CListEditorProps
 */
export interface CListEditorProps {
  /** 传入style */
  style?: CSSProperties;
  /** 传入className */
  className?: string | string[];
  /** 表单字段名称 */
  fieldName: string;
  /** add时添加的内容 */
  items: Item[];
  /** 支持输入最大标签数量，默认不做限制和提示 */
  maxLen?: number;
  /** 添加标签到达上限后，添加按钮的tooltip文案 */
  disableAddTip?: string;
  /** 添加按钮的文案 */
  addBtnText?: string;
  /** 添加按钮后的文案
   * 当传入函数时，入参为剩余可添加标签数
   * 请注意当传入函数时，一定要传入maxLen。否则默认入参为0
   */
  addBtnSuffix?: ReactNode | ((num: number) => ReactNode);

  /** 初始化值 */
  initValue?: InitValue[];

  /** 需要内置重复校验的item，传入Items中的label值 */
  repeatValidatorLabel?: string[] | string;
  /** 重复添加的错误提示，默认为：该值禁止重复添加 */
  repeatMessage?: string;

  /** 必填label */
  requireLabel?: string[] | string;
  /** 必填的错误提示，默认为：不能为空
   * @defaultValue 不能为空
   */
  requireMessage?: string;

  /** 最大可视高度 */
  maxHeight?: number;

  /** 编辑过程中动态校验创建+编辑的item数量并禁止修改*/
  onEditingDisableVerify?: (values: Value[]) => EditingDisableVerify | undefined | void;
}

/**
 * @title CListEditorRules
 * 传入CListEditor的规则，validator不同于传统规则，会传入当前item值、当前行所有item值、CListEditor所有行的值、当前行number
 */
export interface CListEditorRules extends Omit<CPopoverVerifyRule, 'validateLevel' | 'validator'> {
  validator?: (
    value: any,
    callback: (error?: ReactNode) => void, // callback放这里，兼容已经使用的用户和CPopoverVerifyRule的validator
    arr: Record<string, any>,
    all: Record<string, any>[],
    idx: number,
  ) => void;
}
/**
 * @title Item
 * ListEditor组件每一行需要展示的Item
 */
export interface Item {
  /** 传入label */
  label: string;
  /** 默认是input,当表单内容为非input、select时，传入自定义内容。支持内置通用组件组件内部会使用Form.Item包裹传入自定义内容*/
  component: 'input' | 'select' | React.ReactElement | DefineBuiltInHybridListType<typeof builtInMap>;
  /** 不考虑该模式，如果需要多选，直接透传对应cAsyncSelectProps，或者传入component */
  multiple?: boolean;
  /** 传入校验的规则 */
  rules?: CListEditorRules[];
  /**
   * CPopoverVerify组件的透传属性, 默认为true，传入false，不使用弹出式校验，仅Form内校验
   * @default true
   * */
  popoverVerify?: boolean | Partial<Omit<CPopoverVerifyProps, 'rules'>>;
  /** 非校验，只想要提示，优先级低于CPopoverVerifyProps */
  popoverContent?: React.ReactNode;
  /** 透传Popover的属性 */
  arcoPopoverProps?: Partial<Omit<PopoverProps, 'content'>>;
  /** 弹出框，实时校验 */
  cAsyncSelectProps?: Partial<Omit<CAsyncSelectProps, 'rules'>>;
  /** 透传输入框其他props */
  arcoInputProps?: Partial<Omit<InputProps, 'value'>>;
  /** 透传InputTag其他props */
  arcoInputTagProps?: Partial<Omit<InputTagProps, 'value'>>;
  /** item的宽度 */
  width?: number;
  /** 默认值value */
  triggerPropName?: 'value' | 'checked';
  /** 添加时的默认值 */
  addDefaultValue?: any;
}

/**
 * @title InitValue
 * 一行的初始值及相关的控制变量
 **/
export interface InitValue {
  /** 初始值，需要和Item.label一一对应 */
  value: Value;
  /** 不可修改, 以两列为例，需要key不可修改，传入key */
  disableChange?: {
    [label: string]: {
      disabled?: boolean;
      tip?: string;
      /** 初始值是否需要按传入规则校验，兼容IaaS */
      disableRules?: boolean;
      [key: string]: any;
    };
  };
  /** item 不可删除 */
  disableDelete?: boolean;
  /** delete按钮提示 */
  disableDeleteTip?: string;
  /** 行不可删除、修改, 优先级高于disableChange */
  rowDisabled?: boolean;
  /** 行提示 */
  rowDisabledTip?: string;
}

export interface InitValueDisableChange {
  [label: string]: {
    disabled?: boolean;
    tip?: string;
    /** 初始值是否需要按传入规则校验，兼容IaaS */
    disableRules?: boolean;
  };
}

/**
 * @title Value
 */
export interface Value {
  [label: string]: string | string[] | boolean | number;
}

/**
 * @title EditingDisableVerify
 * 传入onEditingDisableVerify可以返回的值
 */
export interface EditingDisableVerify {
  /** 添加按钮是否可用 */
  disableAdd?: boolean;
  /** 添加按钮不可用，的文案提示 */
  disableAddTip?: string;
  /** 传入number,指定行不可修改+删除；
   * 传入Object可精细化控制某行中的某个item是否可用, 一个这个item其他的属性，
   * 注意！透传属性会同时做用到Form.Item和组件上 */
  disableItemsIndex?: (number | (Omit<InitValue, 'value'> & { index: number; [key: string]: any }))[];
  /** item不可删除、修改的提示 */
  disableItemsIndexTip?: string;
  /** 所有行不可删除,优先级低于disableItemsIndex内指定的disableDelete */
  disableDelete?: boolean;
  /** 所有行不可删除的提示文案 */
  disableDeleteTip?: string;
}

export interface VerifiedInputRule extends RulesProps {
  /** 关键字 用于错误信息和规则匹配，默认为索引 */
  key?: string | number;
}

/** 子组件props */
export interface RowItemProps {
  field: string;
  items: Item[];
  index: number;
  controlProps: ItemControl;
  listValue: Value[];
  changeListValue: (path: string, val: any) => void;
  remove: (index: number) => void;
  repeatValidator: (label: string, index: number) => (value: any, callback: (error?: React.ReactNode) => void) => void;
  requireValidator: (label: string) => { required: boolean; message: string };
  handleEditingDisableVerify: () => void;
  changeRuleValidator: (index: number, rules?: CListEditorRules[]) => CPopoverVerifyRule[];
}

/** 每行的控制参数 */
export type ItemControl = Required<Omit<InitValue, 'value'>>;

/** 包裹item的子组件 */
export interface ComponentWrapperProps extends Item {
  index: number;
  disabled: boolean;
  value?: any;
  checked?: boolean;
  rules?: CPopoverVerifyRule[];
  itemOptions?: Record<string, any>;
  changeListValue: (path: string, val: any) => void;
  handleEditingDisableVerify: () => void;
}

export type ComponentProps = Omit<
  ComponentWrapperProps,
  'index' | 'component' | 'changeListValue' | 'handleEditingDisableVerify' | 'label'
>;

/** addBtn部分需要参数*/
export type AddProps = {
  disableAdd: boolean;
  addBtnText: string;
  disableAddTip: string;
};

export type CListEditorHooksProps = Omit<CListEditorProps, 'style' | 'className'>;
