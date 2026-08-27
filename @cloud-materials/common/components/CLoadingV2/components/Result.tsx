import { IconNoPicHighSaturation } from '@arco-design/iconbox-react-ve-o-design';
import { Result } from '@arco-design/web-react';
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { CConfigContext } from '../../CConfigProvider';
import { TEST_ID } from '../constants';
import type { CResultProps } from '../interface';

const CResult: React.FC<CResultProps> = props => {
  const {
    style,
    className,
    arcoResultProps,
    children,
    status = 'no-picture',
    size = 'large',
    title,
    extra = null,
  } = props;

  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('result');
  const cssRoot = cssPrefix``;

  const customSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 48;
      case 'medium':
        return 60;
      case 'large':
        return 80;
      default:
        return size;
    }
  }, [size]);

  const customIcon = useMemo(() => {
    const sizeWithUnit = `${customSize}px`;

    switch (status) {
      case 'no-picture':
        return <IconNoPicHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      default: {
        if (React.isValidElement(status)) {
          return React.cloneElement(status, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
        }

        return status;
      }
    }
  }, [status, customSize]);

  return (
    <Result
      className={classNames(cssRoot, className)}
      style={style}
      status={null}
      title={title}
      extra={extra}
      children={children}
      icon={customIcon}
      data-cy={TEST_ID.result}
      {...arcoResultProps}
    />
  );
};

CResult.displayName = 'CResult';

export default CResult;
