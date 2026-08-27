import React from 'react';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';
import CConfigProvider from './CConfigProvider';
// eslint-disable-next-line @typescript-eslint/ban-types
export default function DocDemosWrapper(_a) {
    var children = _a.children;
    // eslint-disable-next-line cloud-materials-common/no-global-storage
    var locale = window.localStorage.getItem('arco-material-language') === 'en-US' ? enUS : zhCN;
    CConfigProvider.config({ locale: locale });
    return React.createElement(CConfigProvider, { locale: locale }, children);
}
//# sourceMappingURL=DocDemosWrapper.js.map