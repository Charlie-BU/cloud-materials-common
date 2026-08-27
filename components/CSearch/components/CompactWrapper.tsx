import { Input } from '@arco-design/web-react';
import classNames from 'classnames';
import type { CompactWrapperProps } from '../interface';
import type { PropsWithChildren, ReactElement } from 'react';
import React, { isValidElement } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { DEFAULT_LABEL_WIDTH } from '../utils';

const CompactWrapper = (props: PropsWithChildren<CompactWrapperProps>): ReactElement => {
  const { className, style, label, labelWidth = DEFAULT_LABEL_WIDTH, labelBordered, children } = props;
  const { getCPrefixCls } = useCConfigContext();
  const compactCls = getCPrefixCls('search-compact');

  const renderLabel = () => {
    if (!isValidElement(label) || labelBordered) {
      return (
        <div className={classNames(`${compactCls}-label`, `${compactCls}-bordered`)} style={{ width: labelWidth }}>
          {label}
        </div>
      );
    }
    return React.cloneElement(label, {
      ...label.props,
      className: classNames(`${compactCls}-before`, label.props.className),
      style: { width: labelWidth, ...label.props.style },
    });
  };

  if (!label) {
    return <>{children}</>;
  }

  return (
    <Input.Group compact className={classNames(compactCls, className)} style={style}>
      {renderLabel()}
      {children}
    </Input.Group>
  );
};

export default CompactWrapper;
