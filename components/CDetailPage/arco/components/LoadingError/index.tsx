import React from 'react';
import { Button } from '@arco-design/web-react';
import cls from 'classnames';

import CLoadingV2 from '../../../../CLoadingV2';
import type { DetailPage, Tab } from '../../../core';
import type { ObjRecord, ErrorConfigType, IBtnProps } from '../../../types';
import type { CResultProps } from '../../../../CLoadingV2/interface';
import { useCConfigContext } from '../../../../CConfigProvider';

const getDefaultHandleReload = (options: {
  type: ErrorConfigType;
  detailPage: DetailPage<ObjRecord>;
  activeTab?: Tab<ObjRecord, ObjRecord>;
}) => {
  const { type, detailPage, activeTab } = options;
  if (type === 'global') {
    return () =>
      detailPage?.refresh({
        reset: true,
      });
  } else {
    return () => activeTab?.refresh();
  }
};
const getDefaultExtraBtn = (options: {
  type: ErrorConfigType;
  reloadBtnProps: IBtnProps;
  goBackBtnProps: IBtnProps;
}) => {
  const { type, reloadBtnProps, goBackBtnProps } = options;
  const reloadBtnList = [
    <Button type="primary" style={{ margin: '0 16px' }} key={'reload'} onClick={() => reloadBtnProps?.onClick?.()}>
      {reloadBtnProps?.text}
    </Button>,
  ];
  if (type === 'global') {
    return reloadBtnList.concat([
      <Button key={'goBack'} onClick={() => goBackBtnProps?.onClick?.()}>
        {goBackBtnProps?.text}
      </Button>,
    ]);
  } else {
    return reloadBtnList;
  }
};

interface Props {
  title?: React.ReactNode;
  type: ErrorConfigType;
  detailPage: DetailPage<ObjRecord>;
  activeTab?: Tab<ObjRecord, ObjRecord>;
  reloadBtnProps?: IBtnProps;
  goBackBtnProps?: IBtnProps;
  cLoadingProps?: CResultProps;
}

export const LoadingError: React.FC<Props> = props => {
  const { getCPrefixCls, locale } = useCConfigContext();
  const cssRoot = getCPrefixCls('detail-page');
  const { type, detailPage, activeTab, reloadBtnProps, goBackBtnProps, cLoadingProps, title } = props;
  const classNames =
    type === 'global' ? cls('detailPage-load-error', cLoadingProps?.className) : cLoadingProps?.className;

  return (
    <div className={`${cssRoot}-loading-result-container`}>
      <CLoadingV2.Result
        title={title || locale.CDetailPage.loadErrorText}
        extra={getDefaultExtraBtn({
          type,
          reloadBtnProps: {
            text: locale.CDetailPage.reloadText,
            onClick: getDefaultHandleReload({
              type,
              detailPage,
              activeTab,
            }),
            ...reloadBtnProps,
          },
          goBackBtnProps: {
            text: locale.CDetailPage.goBackHomePage,
            ...goBackBtnProps,
          },
        })}
        {...cLoadingProps}
        className={classNames}
      />
    </div>
  );
};
