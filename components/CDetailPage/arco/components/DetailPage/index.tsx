import React, { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import cls from 'classnames';
import { Spin } from '@arco-design/web-react';
import { observer } from '@formily/react';
import { useUpdateEffect } from 'ahooks';

import type { DetailPage } from '../../../core';
import { DetailPageProvider, useCreateInnerDetailPage } from '../../../react';
import CDetail from '../../../../CDetail';
import { dealOperationMenus, defineDetailPageConfig, testId, runCallable } from '../../../shared';
import { LoadingError } from '../LoadingError';
import type { IRouteProps, IDetailPageComponent, ICDetailPageProps, ICDetailPageOptions } from '../../../types';
import { useCConfigContext } from '../../../../CConfigProvider';
import { useMergeProps } from '../../../../hooks';

const { CDetailHeader, CDetailContentWrapper } = CDetail;

interface CInnerDetailPageProps {
  detailPage: DetailPage<any>;
}

const CInnerDetailPage = observer((props: CInnerDetailPageProps) => {
  const { getCPrefixCls, locale } = useCConfigContext();
  const cssRoot = getCPrefixCls('detail-page');
  const { detailPage } = props;
  const detailHeaderProps = detailPage.getDetailHeaderProps();
  const classNames = cls(cssRoot, detailHeaderProps?.className);
  const activeTab = detailPage.getActiveTab();
  const noticeComponent = activeTab?.getCurrentTabNoticeComponent();
  const refreshKeyRef = useRef(0);
  const isEmptyData = !Object.keys(detailPage.data ?? {}).length;
  const updateUrlTabKey = () => {
    detailPage.setActiveTabKey(detailPage.getAvailableActiveTabKey()!);
  };

  // 监听浏览器前进后退事件，在切换tab后浏览器url中的tabKey变化时能同步切换Tab内容
  useEffect(() => {
    // 浏览器前进后退事件
    window.addEventListener('popstate', updateUrlTabKey);

    return () => {
      // 取消事件监听
      window.removeEventListener('popstate', updateUrlTabKey);
    };
  }, []);

  // 在tabKey发生变化时刷新tab
  useUpdateEffect(() => {
    activeTab?.refresh({
      showLoading: Boolean(activeTab.options.needLoading),
    });
  }, [detailPage.activeTabKey, detailPage, activeTab]);

  // 处理自定义错误回调逻辑
  useEffect(() => {
    if (detailPage.options?.onError) {
      detailPage.options?.onError(detailPage.error);
    }
  }, [detailPage.error]);

  useEffect(() => {
    if (activeTab?.options?.onError) {
      activeTab?.options?.onError(activeTab?.error);
    }
  }, [activeTab?.error]);

  useUpdateEffect(() => {
    // 刷新不卸载，直接返回
    if (detailPage.options?.unmountContentWhenRefresh?.({ detailPage }) === false) {
      return;
    }

    if (detailPage.loading) {
      refreshKeyRef.current++;
    }
  }, [detailPage.loading]);

  const getTabContent = () => {
    if (activeTab?.error) {
      const errorConfig = detailPage.getTabErrorConfig() || activeTab?.getTabErrorConfig();

      return (
        <LoadingError
          detailPage={detailPage}
          activeTab={activeTab}
          type={'tab'}
          {...errorConfig}
          data-cy={testId.tabLoadError}
          data-testid={testId.tabLoadError}
        />
      );
    }

    const activeTabContent = activeTab?.getCurrentTabComponent();

    // 自定义渲染 tab content
    if (typeof detailPage.renderActiveTabContent === 'function') {
      return detailPage.renderActiveTabContent({
        tabKey: activeTab?.key,
        content: activeTab?.getCurrentTabComponent(),
        data: detailPage.data,
        detailPage,
      });
    }

    return activeTabContent;
  };

  const getDetailPageContent = () => {
    if (detailPage?.error) {
      return (
        <LoadingError
          detailPage={detailPage}
          type={'global'}
          {...detailPage.getGlobalErrorConfig()}
          data-cy={testId.globalLoadError}
          data-testid={testId.globalLoadError}
        />
      );
    }

    return (
      // 通过key控制重新挂载 tab content 子组件（强制重新渲染），key 更新，子组件重新挂载
      // @see https://dev.to/malapashish/mastering-react-re-renders-the-key-prop-hack-you-need-to-know-17hh
      <React.Fragment key={refreshKeyRef.current}>
        <CDetailHeader
          className={
            detailPage.getNeedTabPane()
              ? cls(`${cssRoot}-header`, detailHeaderProps?.className)
              : cls(`${cssRoot}-header-no-tab-pane`, detailHeaderProps?.className)
          }
          style={detailHeaderProps?.style}
          model={detailHeaderProps?.model}
          data-cy={testId.detailPageHeader}
          data-testid={testId.detailPageHeader}
          showBackIcon={detailHeaderProps?.showBackIcon}
          title={detailHeaderProps.title || '-'}
          onBack={() => detailHeaderProps?.onBack?.()}
          cStatusProps={detailHeaderProps?.statusProps}
          cOperationMenuProps={dealOperationMenus({
            operationMenuProps: detailHeaderProps?.operationMenuProps,
            needRefresh: Boolean(detailHeaderProps?.needRefreshBtn),
            detailPage,
            refresh: detailPage?.refresh,
            refreshText: locale.CDetailPage.refresh,
          })}
          customStatus={detailHeaderProps?.customStatus}
          customOperationMenu={detailHeaderProps?.customOperationMenu}
          extraHeaderContent={detailHeaderProps?.extraHeaderContent}
          breadcrumbProps={{
            routes:
              detailHeaderProps?.navProps?.routes?.map((route: IRouteProps) => {
                return {
                  breadcrumbName: route?.title || '',
                  onClick: route?.onClick,
                };
              }) || [],
            separator: detailHeaderProps?.navProps?.separator,
          }}
          arcoTabsProps={{
            activeTab: detailPage?.activeTabKey,
            onChange: (tabKey: string) => {
              // 设置当前tabKey
              detailPage.changeActiveTab(tabKey);
            },
            ...runCallable(detailPage?.options?.arcoTabProps, {
              data: detailPage.data,
              detailPage,
            }),
          }}
          // 明确传参
          tabs={
            detailPage.tabs
              .filter(item => item?.getVisible())
              .map(item => {
                return {
                  // 因为title是getter类型，所以在这里需要显示读取下
                  title: item?.getTitle(),
                  key: item?.key,
                  style: item?.options?.style,
                  className: item?.options?.className,
                  destroyOnHide: item?.options?.destroyOnHide,
                  disabled: item?.options?.disabled,
                  lazyload: item?.options?.lazyload,
                  children: item?.options?.children || null,
                };
              }) || []
          }
        />
        <CDetailContentWrapper
          // 有全局loading时不展示tab的loading
          loading={Boolean(activeTab?.loading) && !Boolean(detailPage.loading)}
          className={detailPage.getDetailPageContentProps()?.className}
          data-cy={testId.detailPageContent}
          data-testid={testId.detailPageContent}
        >
          {!activeTab?.loading && !activeTab?.error && noticeComponent && (
            <div
              className={`${classNames}-notice`}
              data-cy={testId.detailPageNotice}
              data-testid={testId.detailPageNotice}
            >
              {noticeComponent}
            </div>
          )}
          {/* 有数据才展示tab内容 */}
          {!isEmptyData ? getTabContent() : null}
          {isEmptyData && detailPage.loading ? <div className={`${cssRoot}-content-loading`} /> : null}
        </CDetailContentWrapper>
      </React.Fragment>
    );
  };

  return (
    <DetailPageProvider detailPage={detailPage}>
      <div className={classNames} data-cy={testId.detailPage} data-testid={testId.detailPage}>
        <Spin
          className={`${cssRoot}-loading`}
          loading={Boolean(detailPage.loading)}
          data-cy={testId.detailPageLoading}
          data-testid={testId.detailPageLoading}
        >
          {getDetailPageContent()}
        </Spin>
      </div>
    </DetailPageProvider>
  );
});

const _CDetailPage: React.ForwardRefRenderFunction<DetailPage<any>, ICDetailPageProps> = (props, ref) => {
  useImperativeHandle(ref, () => detailPage);
  const { cComponentConfig } = useCConfigContext();
  const config = useMergeProps<ICDetailPageOptions<any>>(
    props.config,
    // @ts-expect-error 预期内错误
    {},
    cComponentConfig?.CDetailPage ?? {},
  );
  const detailPage = useCreateInnerDetailPage(config);

  return <CInnerDetailPage detailPage={detailPage} />;
};

export const CDetailPage = forwardRef(_CDetailPage) as IDetailPageComponent;

CDetailPage.defineConfig = defineDetailPageConfig;

CDetailPage.displayName = 'CDetailPage';
