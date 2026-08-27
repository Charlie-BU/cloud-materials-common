import React from 'react';
import { Select } from '@arco-design/web-react';
import type { SelectProps } from '@arco-design/web-react/es/Select';
import classnames from 'classnames';

import { useCConfigContext } from '../../../../CConfigProvider';

export const TitleSelect: React.FC<SelectProps> = props => {
  const { getCPrefixCls } = useCConfigContext();
  const cssRoot = getCPrefixCls('detail-page-title-select');
  return <Select bordered={false} {...props} className={classnames(cssRoot, props?.className)} />;
};
