import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { TabsProps } from '@arco-design/web-react';
import { Tabs, ConfigProvider } from '@arco-design/web-react';
import type { CDrawerProps } from './interface';
import BaseCDrawer from './Base';
import { createStaticMethods } from '../_factory/maskableComponent';
import { useCConfigContext } from '../CConfigProvider';
import type { TabPaneProps } from '@arco-design/web-react/es/Tabs';
import classNames from 'classnames';
import { useUpdate } from 'ahooks';
import type { CStatusProps } from '../CStatus';
import CStatus from '../CStatus';
import { useMergeProps } from '../hooks';

type Items = (TabPaneProps & { key: React.Key })[];

interface ExtendsTabsProps extends TabsProps {
  items?: Items;
}

export interface CDrawerDetailProps extends CDrawerProps {
  tabs?: ExtendsTabsProps;
  cStatusProps?: CStatusProps;
}

const HeaderContainer = React.forwardRef<HTMLDivElement, { onDidMount: () => void; className: string }>(
  ({ onDidMount, className }, ref) => {
    useEffect(onDidMount, []);
    const { prefixCls } = useContext(ConfigProvider.ConfigContext);

    return (
      <div
        className={`${prefixCls}-tabs ${prefixCls}-tabs-horizontal ${prefixCls}-tabs-card-gutter ${prefixCls}-tabs-top ${prefixCls}-tabs-size-default ${className}`}
        ref={ref}
      />
    );
  },
);

const DrawerDetailComponent = React.forwardRef<HTMLDivElement, CDrawerDetailProps>((props, ref) => {
  const { useCssPrefix, cComponentConfig: { 'CDrawer.Detail': CDrawerDetail = {} } = {} } = useCConfigContext();
  const { children, tabs, title, cStatusProps, extraHeader, ...restProps } = useMergeProps(props, {}, CDrawerDetail);
  const { items, ...restTabsProps } = tabs ?? {};
  const cssPrefix = useCssPrefix('drawer-detail');
  const headerRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useUpdate();

  return (
    <BaseCDrawer
      {...restProps}
      extraHeader={
        <>
          {extraHeader}
          <HeaderContainer ref={headerRef} onDidMount={forceUpdate} className={cssPrefix`custom-tab-header`} />
        </>
      }
      className={classNames(cssPrefix``, restProps.className)}
      title={
        <div className={cssPrefix`title`}>
          <span className={cssPrefix`title-text`}>{title}</span>
          {cStatusProps && (
            <CStatus {...cStatusProps} className={classNames(cssPrefix`title-status`, cStatusProps.className)} />
          )}
        </div>
      }
      ref={ref}
    >
      {headerRef.current && (
        <Tabs
          {...restTabsProps}
          type="card-gutter"
          className={classNames(cssPrefix`header-tabs`, tabs?.className)}
          renderTabHeader={(props, Header) => ReactDOM.createPortal(<Header {...props} />, headerRef.current!)}
        >
          {items?.map((tabPanelProps, fallbackKey) => (
            <Tabs.TabPane {...tabPanelProps} key={tabPanelProps.key ?? fallbackKey} />
          ))}
        </Tabs>
      )}
      {children}
    </BaseCDrawer>
  );
});

const DrawerDetail = createStaticMethods(DrawerDetailComponent);

export default DrawerDetail;
