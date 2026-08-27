import React from 'react';

import classNames from 'classnames';
import { GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
import { useMergeProps } from '../hooks/useMergeProps';
import type { CDetailContentWrapperProps } from './interface';
import { useCConfigContext } from '../CConfigProvider';

import { Spin } from '@arco-design/web-react';

const cssRoot = `${GLOBAL_PREFIX}-detail-content-wrapper`;
export const testId = {
  container: `${cssRoot}-container`,
};

const defaultProps: Partial<CDetailContentWrapperProps> = {};
function CDetailContentWrapper(props: CDetailContentWrapperProps) {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('detail-content-wrapper');
  const { style, className, children, loading, arcoSpinProps } = useMergeProps<CDetailContentWrapperProps>(
    props,
    defaultProps,
    {},
  );

  return children ? (
    <Spin
      block
      style={style}
      className={classNames(cssPrefix``, className)}
      loading={loading}
      {...arcoSpinProps}
      data-testid={testId.container}
    >
      {children}
    </Spin>
  ) : null;
}

CDetailContentWrapper.displayName = 'CDetailContentWrapper';
export default CDetailContentWrapper;
