import React from 'react';
import cls from 'classnames';
import { useCConfigContext } from '../../../../CConfigProvider';
export var LeftRightLayout = function (props) {
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var cssRoot = getCPrefixCls('detail-page');
    return React.createElement("div", { className: cls("".concat(cssRoot, "-left-right-layout"), props === null || props === void 0 ? void 0 : props.className) }, props === null || props === void 0 ? void 0 : props.children);
};
//# sourceMappingURL=index.js.map