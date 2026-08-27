import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

// CCheckbox特有样式
export const prefixCls = classNamePrefixFactory('checkbox');
// 分段选择器内容区样式
export const btnSelectorContentPrefixCls = classNamePrefixFactory('btn-selector-content');
// 分段选择器通用样式
export const btnSelectorCommonPrefixCls = classNamePrefixFactory('btn-selector-common');

export const testId = {
  groupContainer: prefixCls`group-container`,
  cCheckboxContainer: prefixCls`container`,
  arcoCheckboxContainer: prefixCls`arco-checkbox`,
};
