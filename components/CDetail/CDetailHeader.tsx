import type { ReactNode } from 'react';
import React, { forwardRef, useLayoutEffect, useState, useRef } from 'react';

import classNames from 'classnames';
import { GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
import { useMergeProps } from '../hooks/useMergeProps';

import type { CDetailHeaderProps, RouteProps } from './interface';

import type { TabsProps, AffixProps } from '@arco-design/web-react';
import { Tabs, Affix } from '@arco-design/web-react';

const TabPane = Tabs.TabPane;
import COperationMenu from '../COperationMenu';
import CStatus from '../CStatus';
import CEllipsis from '../CEllipsis';
import CInfoSection from '../CInfoSection';
import { IconLeft, IconClose, IconRight } from '@arco-design/iconbox-react-ve-o-design';
import type { CStatusProps } from '../CStatus/interface';
import { useCConfigContext } from '../CConfigProvider';

const cssRoot = `${GLOBAL_PREFIX}-detail-header`;
export const testId = {
  container: `${cssRoot}-container`,
  breadcrumb: `${cssRoot}-breadcrumb`,
  back: `${cssRoot}-back`,
  close: `${cssRoot}-close`,
  title: `${cssRoot}-title`,
  status: `${cssRoot}-status`,
  tabs: `${cssRoot}-tabs`,
  operateArea: `${cssRoot}-operate-area`,
};
const defaultSeparator = <IconRight />;
const defaultStatusProps: CStatusProps = {
  type: 'highlight',
};
const defaultArcoTabProps: TabsProps = {
  type: 'card-gutter',
};
const defaultProps: Partial<CDetailHeaderProps> = {
  model: 'page-header',
  showBackIcon: true,
};

function CDetailHeader(props: CDetailHeaderProps, ref: any) {
  const {
    style,
    className,
    model,
    breadcrumbProps,
    onBack,
    title,
    cStatusProps,
    customStatus,
    cOperationMenuProps,
    customOperationMenu,
    tabs,
    arcoTabsProps,
    extraHeaderContent,
    cInfoSectionProps,
    arcoAffixProps,
    showBackIcon,
    cEllipsisProps,
  } = useMergeProps<CDetailHeaderProps>(props, defaultProps as any, {});
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('detail-header');
  const [affixTarget, setAffixTarget] = useState<HTMLElement | null>(null);
  const [tabAffixHeight, setTabAffixHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const mergedAffixProps = useMergeProps<AffixProps>(
    arcoAffixProps || {},
    { target: () => affixTarget, className: cssPrefix`affix` },
    {},
  );
  const Separator = (
    <span aria-hidden className={cssPrefix`breadcrumb-separator`}>
      {breadcrumbProps?.separator || defaultSeparator}
    </span>
  );
  const getBreadcrumbItem = (itemToRender: ReactNode, index: number) => {
    const SeparatorWithKey = React.cloneElement(Separator, { key: `${index}_separator` });
    return index === 0 ? [itemToRender] : [SeparatorWithKey, itemToRender];
  };
  const defaultItemRender = (route: RouteProps, routes: RouteProps[]): ReactNode => {
    const index = routes.indexOf(route);
    if (index === routes.length - 1) {
      return (
        <CEllipsis
          maxWidth="200px"
          className={cssPrefix`breadcrumb-item`}
          key={index}
          children={route.breadcrumbName || ''}
        />
      );
    }
    return (
      <CEllipsis
        maxWidth="200px"
        className={cssPrefix`breadcrumb-item`}
        key={index}
        onClick={route.onClick}
        children={route.breadcrumbName || ''}
      />
    );
  };
  const renderBreadcrumb = () => {
    if (breadcrumbProps && breadcrumbProps?.routes?.length >= 2) {
      const { routes } = breadcrumbProps;
      return (
        <div className={cssPrefix`breadcrumb`} data-testid={testId.breadcrumb}>
          {routes.map((route, index) => getBreadcrumbItem(defaultItemRender(route, routes), index))}
        </div>
      );
    }
  };
  const renderBackNode = () =>
    model === 'page-header' &&
    showBackIcon && (
      <span className={cssPrefix`back`} data-testid={testId.back} onClick={onBack}>
        <IconLeft />
      </span>
    );
  const renderStatusNode = () => {
    if (customStatus) {
      return (
        <span className={cssPrefix`status`} data-testid={testId.status}>
          {customStatus}
        </span>
      );
    } else {
      return (
        cStatusProps && (
          <span className={cssPrefix`status`} data-testid={testId.status}>
            <CStatus {...defaultStatusProps} {...cStatusProps} />
          </span>
        )
      );
    }
  };
  const renderOperationMenuNode = () => {
    if (customOperationMenu) {
      return customOperationMenu;
    } else {
      return cOperationMenuProps && <COperationMenu {...cOperationMenuProps} />;
    }
  };
  const renderCloseNode = () =>
    model === 'drawer-header' && (
      <span className={cssPrefix`close`} data-testid={testId.close} onClick={onBack}>
        <IconClose />
      </span>
    );
  const renderTabs = () => {
    const tabsFilter = tabs?.filter(item => !item.hidden);
    const tabContent = (
      <div className={cssPrefix`tabs`} data-testid={testId.tabs}>
        <div className={cssPrefix`tabs-wrapper`}>
          <Tabs {...defaultArcoTabProps} {...arcoTabsProps}>
            {tabsFilter?.map(({ key, ...rest }) => (
              <TabPane key={key} {...rest} />
            ))}
          </Tabs>
        </div>
      </div>
    );

    return (
      !!tabsFilter?.length &&
      (affixTarget ? (
        <Affix offsetTop={tabAffixHeight} {...mergedAffixProps}>
          {tabContent}
        </Affix>
      ) : (
        tabContent
      ))
    );
  };
  const renderInfo = () => {
    return (
      !!cInfoSectionProps && (
        <div className={cssPrefix`information`}>
          <CInfoSection.List {...cInfoSectionProps} />
        </div>
      )
    );
  };
  const renderHeaderMain = () => {
    const { maxWidth, className: cEllipsisClassName, ...otherCEllipsisProps } = cEllipsisProps ?? {};
    const headerMainContent = (
      <div
        className={classNames(cssPrefix`main`, {
          [cssPrefix`main-with-shadow`]: !tabs && !cInfoSectionProps,
        })}
        ref={headerRef}
      >
        <div className={cssPrefix`main-content`}>
          <div>
            {renderBreadcrumb()}
            <div className={cssPrefix`title-area`}>
              {renderBackNode()}
              <CEllipsis
                {...otherCEllipsisProps}
                maxWidth={maxWidth ?? '400px'}
                className={classNames(cssPrefix`title`, cEllipsisClassName)}
              >
                <>{title}</>
              </CEllipsis>
              {renderStatusNode()}
            </div>
          </div>
          <div className={cssPrefix`operate-area`} data-testid={testId.operateArea}>
            {renderOperationMenuNode()}
            {renderCloseNode()}
          </div>
        </div>
        <div className={cssPrefix`main-extra`}>{extraHeaderContent}</div>
      </div>
    );

    return affixTarget ? (
      <Affix offsetTop={1} {...mergedAffixProps}>
        {headerMainContent}
      </Affix>
    ) : (
      headerMainContent
    );
  };

  useLayoutEffect(() => {
    const parentNode = ref?.current?.parentElement;

    if (parentNode) {
      setTabAffixHeight(headerRef?.current?.offsetHeight ?? 0);
      setAffixTarget(parentNode);
    }
  }, [ref, ref?.current?.parentElement, headerRef?.current?.offsetHeight]);

  return (
    <div style={style} className={classNames(cssPrefix``, className)} data-testid={testId.container} ref={ref}>
      {renderHeaderMain()}
      {renderInfo()}
      {renderTabs()}
    </div>
  );
}

const CDetailHeaderComponent = forwardRef<unknown, CDetailHeaderProps>(CDetailHeader);
CDetailHeaderComponent.displayName = 'CDetailHeader';

export default CDetailHeaderComponent;
