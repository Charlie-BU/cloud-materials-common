import type { InputTagProps } from '@arco-design/web-react/es/InputTag';
import type { TagProps } from '@arco-design/web-react';

import type { ObjectValueType, ValueChangeReason } from '@arco-design/web-react/es/InputTag/interface';

export type { ObjectValueType, ValueChangeReason };

/**
 * @title CBatchPasteInputProps
 * @zh 继承自 arco InputTagProps
 */
export interface CBatchPasteInputProps extends InputTagProps {
  value?: CBatchPasteInputValueType[];
  /**
   * @zh 默认值
   */
  defaultValue?: CBatchPasteInputValueType[];
  /**
   * @zh 自定义分隔符
   */
  separator?: SeparatorType;
  /**
   * @zh 预设校验规则
   * @en Callback when value changes
   */
  validatorMode?: ValidatorModeType;
  /**
   * 自定义校验，传递该参数后覆盖validateorMode
   * 基于Arco InputTagProps的renderTag属性设计自定义校验，传参中的value和renderTag中的value保持一致
   * 校验通过，渲染正常颜色的tag；校验失败，渲染error状态的tag
   * */
  tagValidator?: (value: any) => boolean;
  /**
   * @zh 控件值改变时触发
   * @en Callback when value changes
   */
  onChange?: (value: CBatchPasteInputValueType[], reason: ValueChangeReason) => void;
  /**
   * @zh 发生切割时的回调用。当 粘贴 或 输入的字符中包含分割符 时，会触发onSplit事件
   */
  onSplit?: (
    addedValue: CBatchPasteInputValueType[], // 粘贴事件或输入事件新增的标签组
    valueBeforeAdd: CBatchPasteInputValueType[], // 粘贴或输入前 的标签组
    valueAfterAdd: CBatchPasteInputValueType[], // 融合（去重）后的标签组
  ) => void;
  /** 透传 Arco.Tag */
  arcoTagProps?:
    | Omit<TagProps, 'closable' | 'onClose'>
    | ((options: {
        value: CBatchPasteInputValueType;
        values: CBatchPasteInputValueType[];
        tagIndex: number;
      }) => Omit<TagProps, 'closable' | 'onClose'>);
  /** 鼠标悬浮 tag 标签的提示 */
  tagTips?: React.ReactNode;
}

/**
 * @title SeparatorType
 * @zh 分隔符
 */
export interface SeparatorType {
  /**
   * @zh 用户自定义分隔符
   */
  customSeparator: RegExp;
  /**
   * @zh 自定义分隔符是否覆盖预设分隔符
   * @defaultValue false
   */
  coverPresetSeparator?: boolean;
}

/**
 * @title useCBatchPasteInputProps
 * @zh hook参数
 */
export type UseCBatchPasteInputProps = CBatchPasteInputProps;

export type CBatchPasteInputValueType = string | number | ObjectValueType;

export enum ValidatorMode {
  v4 = 'v4',
  v6 = 'v6',
  v4v6 = 'v4v6',
  v4cidr = 'v4cidr',
  v6cidr = 'v6cidr',
  v4v6cidr = 'v4v6cidr',
  whitelistIp = 'whitelistIp',
}

export type ValidatorModeType = 'v4' | 'v6' | 'v4v6' | 'v4cidr' | 'v6cidr' | 'v4v6cidr' | 'whitelistIp';
