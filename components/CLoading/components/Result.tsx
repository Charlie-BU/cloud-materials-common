import React, { useContext, useMemo } from 'react';
import type { CResultProps } from '../interface';
import classNames from 'classnames';
import { Result } from '@arco-design/web-react';
import {
  Icon404ErrorHighSaturation,
  Icon404ErrorLowSaturation,
  Icon403ErrorHighSaturation,
  Icon403ErrorLowSaturation,
  IconNoChartLowSaturation,
  IconNoChartHighSaturation,
  IconNoPicHighSaturation,
  IconNoPicLowSaturation,
  IconErrorTypeHighSaturation,
  IconErrorTypeLowSaturation,
  IconErrorTypeSimplified,
  IconSearchNullLowSaturation,
  IconSearchNullHighSaturation,
  IconSearchNullSimplified,
  IconNoContentHighSaturation,
  IconNoContentLowSaturation,
  IconNoContentSimplified,
  IconNetWorkErrorSimplified,
  IconNetworkErrorHighSaturation,
  IconNetworkErrorLowSaturation,
  IconNoDataHighSaturation,
  IconNoDataLowSaturation,
  IconNoDataSimplified,
  IconNoPermissionHighSaturation,
  IconNoPermissionLowSaturation,
  IconNoPermissionSimplified,
} from '@arco-design/iconbox-react-ve-o-design';
import { CConfigContext } from '../../CConfigProvider';
import { TEST_ID } from '../constants';

/**
 * 请使用 CLoadingV2.Result 来替代，最多可以减少 490+KiB 的包体积
 * @deprecated
 */
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
    icon,
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
      case 'no-picture-gray':
        return <IconNoPicLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-permission':
        return <IconNoPermissionHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-permission-gray':
        return <IconNoPermissionLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-permission-simple':
        return <IconNoPermissionSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-data':
        return <IconNoDataHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-data-gray':
        return <IconNoDataLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-data-simple':
        return <IconNoDataSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-search-result':
        return <IconSearchNullHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-search-result-gray':
        return <IconSearchNullLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-search-result-simple':
        return <IconSearchNullSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'error-type':
        return <IconErrorTypeHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'error-type-gray':
        return <IconErrorTypeLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'error-type-simple':
        return <IconErrorTypeSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-content':
        return <IconNoContentHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-content-gray':
        return <IconNoContentLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-content-simple':
        return <IconNoContentSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'network-error':
        return <IconNetworkErrorHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'network-error-gray':
        return <IconNetworkErrorLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'network-error-simple':
        return (
          <>
            {/* <IconNetworkErrorSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} /> */}
            <IconNetWorkErrorSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />
          </>
        );
      // return <IconNetWorkErrorSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case '404-error':
        return <Icon404ErrorHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case '404-error-gray':
        return <Icon404ErrorLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case '403-error':
        return <Icon403ErrorHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case '403-error-gray':
        return <Icon403ErrorLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-chart':
        return <IconNoChartHighSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case 'no-chart-gray':
        return <IconNoChartLowSaturation width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
      case null:
      default:
        return icon;
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
