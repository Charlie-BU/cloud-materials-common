import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { IconEye, IconEyeInvisible } from '@arco-design/web-react/icon';
import { Button } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';
var cssPrefix = classNamePrefixFactory('guide');
var CGuideFoldButton = function (props) {
    var _a;
    var style = props.style, className = props.className, isFold = props.isFold, otherProps = __rest(props, ["style", "className", "isFold"]);
    var locale = useCConfigContext().locale;
    var viewMsg = locale.CGuide.viewGuide;
    var hideMsg = locale.CGuide.hideGuide;
    return (React.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["btn-wrapper"], ["btn-wrapper"]))) },
        React.createElement(Button, __assign({ type: "text", style: __assign({ color: '#42464E' }, style) }, otherProps, { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["fold-btn"], ["fold-btn"]))), className, (_a = {}, _a[cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["fold-btn-isFold"], ["fold-btn-isFold"])))] = isFold, _a)), icon: isFold ? React.createElement(IconEye, null) : React.createElement(IconEyeInvisible, null) }),
            React.createElement("span", { style: { marginLeft: 4 } }, isFold ? viewMsg : hideMsg))));
};
export default CGuideFoldButton;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CGuideFoldButton.js.map