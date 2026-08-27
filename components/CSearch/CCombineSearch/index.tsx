import { Space } from '@arco-design/web-react';
import classNames from 'classnames';
import type { ReactElement } from 'react';
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import type { CCombineSearchProps } from '../interface';
import { useCustom } from './useCustom';
import { combineDataCy, getTriggerExtraNode } from './utils';

const CCombineSearch = (props: CCombineSearchProps): ReactElement => {
  const { extraLeft, extraRight, triggerSpaceSize = 12, alignType = 'bottom', className, style, ...restProps } = props;
  const { CCombineSearchTrigger, CCombineSearchView, CCombineSearchInline } = useCustom({ ...restProps, alignType });
  const { getCPrefixCls } = useCConfigContext();
  const combineCls = getCPrefixCls('search-combine');
  const extraLeftNode = getTriggerExtraNode(extraLeft);
  const extraRightNode = getTriggerExtraNode(extraRight);

  if (alignType === 'inline') {
    return (
      <div
        className={classNames(`${combineCls}-wrapper`, classNames(`${combineCls}-wrapper-inline`), className)}
        style={style}
        data-cy={combineDataCy``}
      >
        <Space size={triggerSpaceSize} align="start" className={classNames(`${combineCls}-wrapper-trigger-left`)}>
          {extraLeftNode}
          {CCombineSearchInline}
        </Space>
        {extraRight && (
          <Space size={triggerSpaceSize} style={{ marginLeft: 12 }}>
            {extraRightNode}
          </Space>
        )}
      </div>
    );
  }

  return (
    <div className={classNames(`${combineCls}-wrapper`, className)} style={style} data-cy={combineDataCy``}>
      <div className={classNames(`${combineCls}-wrapper-bottom`)}>
        <Space size={triggerSpaceSize} align="start" className={classNames(`${combineCls}-wrapper-trigger-left`)}>
          {extraLeftNode}
          {CCombineSearchTrigger}
        </Space>
        {extraRight && (
          <Space size={triggerSpaceSize} style={{ marginLeft: 12 }}>
            {extraRightNode}
          </Space>
        )}
      </div>
      {CCombineSearchView}
    </div>
  );
};

CCombineSearch.useCustom = useCustom;
CCombineSearch.displayName = 'CCombineSearch';

export default CCombineSearch;
