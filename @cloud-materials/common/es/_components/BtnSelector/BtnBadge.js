import { __assign, __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import CTag from '../../CTag';
import { CConfigContext } from '../../CConfigProvider';
import { omit } from 'lodash-es';
// 分段选择器（CRadio和CCheckbox）公共的角标
export var BtnBadge = function (props) {
    var tag = props.tag, CTagProps = props.CTagProps;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    return (React.createElement(React.Fragment, null, !!tag ? (React.createElement("span", { className: btnSelectorCommonPrefixCls(templateObject_1 || (templateObject_1 = __makeTemplateObject(["badge"], ["badge"]))) },
        React.createElement(CTag, __assign({}, omit(CTagProps, 'style'), { shape: "mark", size: "large", style: __assign(__assign({}, CTagProps === null || CTagProps === void 0 ? void 0 : CTagProps.style), { transformOrigin: 'top right' }) }), tag))) : null));
};
var templateObject_1;
//# sourceMappingURL=BtnBadge.js.map