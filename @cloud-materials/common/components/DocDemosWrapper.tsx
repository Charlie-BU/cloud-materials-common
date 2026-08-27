import React from 'react';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';
import CConfigProvider from './CConfigProvider';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function DocDemosWrapper({ children }: React.PropsWithChildren<{}>) {
  // eslint-disable-next-line cloud-materials-common/no-global-storage
  const locale = window.localStorage.getItem('arco-material-language') === 'en-US' ? enUS : zhCN;
  CConfigProvider.config({ locale });
  return <CConfigProvider locale={locale}>{children}</CConfigProvider>;
}
