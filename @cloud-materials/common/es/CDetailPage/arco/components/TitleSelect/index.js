import { __assign } from "tslib";
import React from 'react';
import { Select } from '@arco-design/web-react';
import classnames from 'classnames';
import { useCConfigContext } from '../../../../CConfigProvider';
export var TitleSelect = function (props) {
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var cssRoot = getCPrefixCls('detail-page-title-select');
    return React.createElement(Select, __assign({ bordered: false }, props, { className: classnames(cssRoot, props === null || props === void 0 ? void 0 : props.className) }));
};
//# sourceMappingURL=index.js.map