import React, { useContext } from 'react';
import CTag from '../../CTag';
import type { BtnTagProps } from './interface';
import { CConfigContext } from '../../CConfigProvider';
import { omit } from 'lodash-es';

// 分段选择器（CRadio和CCheckbox）公共的角标
export const BtnBadge: React.FC<BtnTagProps> = props => {
  const { tag, CTagProps } = props;
  const { useCssPrefix } = useContext(CConfigContext);
  const btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
  return (
    <>
      {!!tag ? (
        <span className={btnSelectorCommonPrefixCls`badge`}>
          <CTag
            {...omit(CTagProps, 'style')}
            shape="mark"
            size="large"
            style={{ ...CTagProps?.style, transformOrigin: 'top right' }}
          >
            {tag}
          </CTag>
        </span>
      ) : null}
    </>
  );
};
