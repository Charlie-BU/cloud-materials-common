import React from 'react';
import type { CCollapseProps } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import CCollapseGroup from './Group';
import CCollapseText from './Text';
import { useCConfigContext } from '../CConfigProvider';

export const cssPrefix = classNamePrefixFactory('collapse');
export const testId = {
  container: `${cssPrefix``}-container`,
  operate: `${cssPrefix``}-operate`,
};
const dataIsArray = <T extends any>(val: string | T[]): val is T[] => Array.isArray(val);

const CCollapse = <T extends any>(props: CCollapseProps<T>) => {
  const { data, emptyNode } = props;
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('collapse');

  if (!data || data.length === 0) {
    return <span className={cssPrefix`empty`}>{emptyNode || '-'}</span>;
  }

  if (dataIsArray(data)) {
    return <CCollapseGroup {...props} data={data} />;
  } else {
    return <CCollapseText {...props} data={data} />;
  }
};

CCollapse.displayName = 'CCollapse';
export default CCollapse;
