import React, { useContext } from 'react';
import CLoadingV2 from '../CLoadingV2';
import { CConfigContext } from '../CConfigProvider';
import { IconNoDataLowSaturation } from '@arco-design/iconbox-react-ve-o-design';
export var DefaultEmptyContent = function () {
    var locale = useContext(CConfigContext).locale;
    return (React.createElement("div", null,
        React.createElement(CLoadingV2.Result, { status: React.createElement(IconNoDataLowSaturation, null), title: locale.CTreeTransfer.noData })));
};
//# sourceMappingURL=DefaultEmptyContent.js.map