import React from 'react';
import type { CGuideFoldButtonProps } from './interface';
import type { ButtonProps } from '@arco-design/web-react/es/Button';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { IconEye, IconEyeInvisible } from '@arco-design/web-react/icon';
import { Button } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';

const cssPrefix = classNamePrefixFactory('guide');

const CGuideFoldButton: React.FC<CGuideFoldButtonProps & ButtonProps> = props => {
  const { style, className, isFold, ...otherProps } = props;
  const { locale } = useCConfigContext();

  const viewMsg = locale.CGuide.viewGuide;
  const hideMsg = locale.CGuide.hideGuide;

  return (
    <span className={cssPrefix`btn-wrapper`}>
      <Button
        type="text"
        style={{ color: '#42464E', ...style }}
        {...otherProps}
        className={classNames(cssPrefix`fold-btn`, className, { [cssPrefix`fold-btn-isFold`]: isFold })}
        icon={isFold ? <IconEye /> : <IconEyeInvisible />}
      >
        <span style={{ marginLeft: 4 }}>{isFold ? viewMsg : hideMsg}</span>
      </Button>
    </span>
  );
};

export default CGuideFoldButton;
