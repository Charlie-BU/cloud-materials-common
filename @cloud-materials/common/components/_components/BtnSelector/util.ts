import { isUndefined } from 'lodash-es';
import type { ComponentProps } from 'react';

/**
 * 获取分段选择器带索引的data-Cy生成函数
 * @param param0
 * @returns
 */
export const getBtnDataSuffix = ({ props }: { props: ComponentProps<any> }) => {
  const currentIndex = props?.['data-inner-index'];
  const suffix = isUndefined(currentIndex) ? '' : `-index${currentIndex}`;
  return (prefix: string) => {
    return prefix + suffix;
  };
};
