import React, { useContext, useMemo } from 'react';
import type { CSpinProps } from '../interface';
import classNames from 'classnames';
import { Spin } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/iconbox-react-ve-o-design';
import { CConfigContext } from '../../CConfigProvider';
import { TEST_ID } from '../constants';

const CSpin: React.FC<CSpinProps> = props => {
  const { style, className, size = 'small', loading = false, isBlock = false, arcoSpinProps, children } = props;

  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('spin');
  const cssRoot = cssPrefix``;

  const customSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return size;
    }
  }, [size]);

  return (
    <Spin
      className={classNames(cssRoot, className)}
      style={style}
      size={customSize}
      icon={<IconLoading />}
      loading={loading}
      children={children}
      block={isBlock}
      data-cy={TEST_ID.spin}
      {...arcoSpinProps}
    />
  );
};

CSpin.displayName = 'CSpin';

export default CSpin;
