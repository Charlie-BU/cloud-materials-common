import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

// CRadio特有样式
export const prefixCls = classNamePrefixFactory('radio');
// 分段选择器内容区样式
export const btnSelectorContentPrefixCls = classNamePrefixFactory('btn-selector-content');
// 分段选择器通用样式
export const btnSelectorCommonPrefixCls = classNamePrefixFactory('btn-selector-common');

export const testId = {
  groupContainer: prefixCls`group-container`,
  cRadioContainer: prefixCls`container`,
  arcoRadioContainer: prefixCls`arco-radio`,
};
