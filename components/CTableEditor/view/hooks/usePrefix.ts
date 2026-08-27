import { useCConfigContext } from '../../../CConfigProvider';

/** 获取 CTableEditor 下组件的类名前缀 */
export const usePrefix = (compPrefix?: string) => {
  const { cPrefixCls } = useCConfigContext();
  return compPrefix ? `${cPrefixCls}-table-editor-${compPrefix}` : `${cPrefixCls}-table-editor`;
};
