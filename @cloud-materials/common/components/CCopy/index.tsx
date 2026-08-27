import React, { useMemo } from 'react';
import type { CCopyProps } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { getChildrenString } from '../_utils/reactChildren';
import classNames from 'classnames';
import { useCCopy } from './hooks';
import { IconCopy } from '@arco-design/web-react/icon';
import { Popover } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';

const cssPrefix = classNamePrefixFactory('copy');
export const testId = {
  container: cssPrefix`container`,
  popover: cssPrefix`popover`,
  icon: cssPrefix`icon`,
};

const CCopy: React.FC<CCopyProps> = props => {
  const { style, className, children, disabled, triggerIcon, triggerEle, showCopy } = props;
  const text: string = useMemo(() => props.text || getChildrenString(children), [props.text, children]);

  const [{ arcoPopoverProps }, controls] = useCCopy({ ...props, text });

  const { getCPrefixCls } = useCConfigContext();
  const cssRoot = getCPrefixCls('copy');
  const iconCls = getCPrefixCls('icon');

  return (
    <div style={style} className={classNames(cssRoot, className)} data-cy={testId.container}>
      {children}
      <Popover {...arcoPopoverProps} data-cy={testId.popover}>
        <span
          className={classNames(`${cssRoot}-icon`, { [`${cssRoot}-icon-hover`]: showCopy === 'hover' })}
          onClick={controls.handleCopy}
          data-cy={testId.icon}
          data-testid={testId.icon}
        >
          {triggerEle ||
            React.cloneElement(triggerIcon || <IconCopy />, {
              className: classNames(iconCls, disabled && 'disabled'),
            })}
        </span>
      </Popover>
    </div>
  );
};

CCopy.displayName = 'CCopy';

export default CCopy;
