import React from 'react';
import type { CLinkProps } from './interface';
import classNames from 'classnames';
import { useCConfigContext } from '../CConfigProvider';
import { Link, Popover } from '@arco-design/web-react';
import { getCLinkStyle, getInnerLinkSetting } from './utils';
import { IconIconNewWindow } from '@arco-design/iconbox-react-ve-o-design';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

const cssPrefix = classNamePrefixFactory('link');
export const testId = {
  popover: cssPrefix`popover`,
  link: cssPrefix``,
  suffixicon: cssPrefix`link-suffixicon`,
};

const CLink: React.FC<CLinkProps> = ({
  style,
  className,
  popoverContent,
  prefixIcon,
  suffixIcon,
  size = 'default',
  type = 'default',
  children,
  arcoPopoverProps,
  ...restProps
}) => {
  const { getCPrefixCls, locale } = useCConfigContext();
  const innerLinkSetting = getInnerLinkSetting(locale)[type];
  const pureLink = (
    <Link
      style={getCLinkStyle(size, style)}
      className={classNames(getCPrefixCls('link'), className)}
      icon={prefixIcon ?? innerLinkSetting?.icon}
      {...restProps}
      data-cy={testId.link}
      data-testid={testId.link}
    >
      {children ?? innerLinkSetting?.label}
      {suffixIcon ? (
        <span className={getCPrefixCls('link-suffixicon')} data-cy={testId.suffixicon} data-testid={testId.suffixicon}>
          {suffixIcon === true ? <IconIconNewWindow /> : suffixIcon}
        </span>
      ) : null}
    </Link>
  );

  return popoverContent || arcoPopoverProps ? (
    <Popover position="bottom" content={popoverContent} {...arcoPopoverProps} data-cy={testId.popover}>
      {pureLink}
    </Popover>
  ) : (
    pureLink
  );
};

CLink.displayName = 'CLink';

export default CLink;
