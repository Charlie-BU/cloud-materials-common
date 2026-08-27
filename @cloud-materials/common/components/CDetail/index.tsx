import React, { useState, useEffect, useRef } from 'react';
import useUrlState from '@ahooksjs/use-url-state';
import { GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { useMergeProps } from '../hooks/useMergeProps';
import type { CDetailProps } from './interface';
import { useCConfigContext } from '../CConfigProvider';

import CDetailHeader from './CDetailHeader';
import CDetailContentWrapper from './CDetailContentWrapper';

const cssRoot = `${GLOBAL_PREFIX}-detail`;
export const testId = {
  container: `${cssRoot}-container`,
};

const defaultProps: Partial<CDetailProps> = { cDetailContentWrapper: true };

function CDetail(props: CDetailProps) {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('detail');

  const { style, className, cDetailHeaderProps, cDetailContentWrapper, content, tabContentMap, urlTabKey } =
    useMergeProps<CDetailProps>(props, defaultProps as any, {});
  const { arcoTabsProps, ...restDetailHeaderProps } = cDetailHeaderProps || {};
  const { defaultActiveTab, activeTab, onChange, ...restArcoTabProps } = arcoTabsProps || {};

  const firstRenderRef = useRef(true);
  const detailHeaderRef = React.createRef<HTMLInputElement>();

  const initialTabState = activeTab || defaultActiveTab || cDetailHeaderProps?.tabs?.[0].key;
  const [tab, setTab] = useState(initialTabState);
  const [query, setQuery] = useUrlState(urlTabKey ? { [urlTabKey]: initialTabState } : {});

  const realActiveTab = urlTabKey ? query[urlTabKey] : tab;
  const setRealActiveTab = (tab: string | undefined) => {
    if (urlTabKey) {
      setQuery({ [urlTabKey]: tab });
    } else {
      setTab(tab);
    }
  };

  const detailContentWrapperProps = typeof cDetailContentWrapper === 'object' ? cDetailContentWrapper : {};
  const contentNode = tabContentMap ? tabContentMap?.[realActiveTab] : content;

  //TODO:这部分的设计还有优化空间
  //受控模式，用户外部手动修改activeTab，内部state需要同步更新
  useEffect(() => {
    // 第一次不需要再次赋值。
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (realActiveTab !== activeTab) {
      setRealActiveTab(activeTab);
    }
  }, [activeTab]);

  const changeActiveTab = (tab: string) => {
    if (tab !== realActiveTab) {
      setRealActiveTab(tab);
      onChange?.(tab);
    }
  };

  return (
    <div style={style} className={classNames(cssPrefix``, className)} data-testid={testId.container}>
      {cDetailHeaderProps && (
        <CDetailHeader
          arcoTabsProps={{ activeTab: realActiveTab, onChange: changeActiveTab, ...restArcoTabProps }}
          {...restDetailHeaderProps}
          ref={detailHeaderRef}
        />
      )}
      {cDetailContentWrapper ? (
        <CDetailContentWrapper {...detailContentWrapperProps}>{contentNode}</CDetailContentWrapper>
      ) : (
        contentNode
      )}
    </div>
  );
}

CDetail.displayName = 'CDetail';
CDetail.CDetailHeader = CDetailHeader;
CDetail.CDetailContentWrapper = CDetailContentWrapper;
export default CDetail;
