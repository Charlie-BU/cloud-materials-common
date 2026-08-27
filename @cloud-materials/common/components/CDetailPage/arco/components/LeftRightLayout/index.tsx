import React from 'react';
import cls from 'classnames';

import { useCConfigContext } from '../../../../CConfigProvider';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const LeftRightLayout: React.FC<Props> = props => {
  const { getCPrefixCls } = useCConfigContext();
  const cssRoot = getCPrefixCls('detail-page');
  return <div className={cls(`${cssRoot}-left-right-layout`, props?.className)}>{props?.children}</div>;
};
