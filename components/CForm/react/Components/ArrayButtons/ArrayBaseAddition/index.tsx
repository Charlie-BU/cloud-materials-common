import type { ReactNode } from 'react';
import React from 'react';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import ArrayBase from '@storage-fe/formily-arco/es/ArrayBase';
import CAddButton from '../../../../../CAddButton';
import { useCConfigContext } from '../../../../../CConfigProvider';
import type { CAddButtonProps } from '../../../../../CAddButton/interface';

export const cssPrefix = classNamePrefixFactory('cform-array-base-addition');

export interface CArrayBaseAddition {
  /**
   * 展示的文案
   */
  title?: ReactNode;
  /**
   * push 新增到最后
   * unshift 新增到最前面
   */
  method?: 'push' | 'unshift';
  /**
   * 新增 item 的默认值
   */
  defaultValue?: any;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 是否展示辅助提示文案
   * @default true
   */
  showSubInfo?: boolean;
  /**
   * @default '还可添加 X 个'
   * 自定义的辅助文案
   * 支持模板字符串如 '还可添加${count}个'
   * 支持自定义渲染 @param currentCount 当前已添加的个数
   */
  subInfo?: string | ((currentCount: number) => ReactNode);
  /**
   * CAddButton的props
   */
  addButtonProps?: Partial<CAddButtonProps>;
  onClick?: () => void;
}

const ArrayBaseAddition: React.FC<CArrayBaseAddition> = props => {
  const { locale } = useCConfigContext();

  const {
    method = 'push',
    defaultValue,
    title = locale.CForm.array.addRow,
    max = Number.MAX_SAFE_INTEGER,
    showSubInfo = false,
    subInfo,
    addButtonProps,
  } = props;
  const { addItem, showAdd, disabled, title: fieldTitle } = ArrayBase.useAddition!(method, defaultValue);
  const array = ArrayBase.useArray!();

  if (!showAdd) return null;

  const currentCount = array.field.value?.length || 0;

  const disableAdd = array.field.value?.length >= max;

  let subNode: ReactNode;
  if (typeof subInfo === 'function') {
    subNode = subInfo(currentCount);
  } else if (typeof subInfo === 'string') {
    const info = subInfo.replace('${count}', `${max - currentCount}`);
    subNode = info;
  }

  return (
    <div className={cssPrefix``}>
      <CAddButton
        type={'primary'}
        disabled={disabled || disableAdd}
        onClick={() => {
          addItem();
          props.onClick?.();
        }}
        text={title || fieldTitle}
        enableAddCount={max - currentCount}
        showEnableAddTips={showSubInfo}
        customTips={showSubInfo && subNode}
        {...addButtonProps}
      />
    </div>
  );
};

ArrayBaseAddition.displayName = 'ArrayBaseAddition';

export default ArrayBaseAddition;
