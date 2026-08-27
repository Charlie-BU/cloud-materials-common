import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { useMemo } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { getChildrenString } from '../_utils/reactChildren';
import classNames from 'classnames';
import { useCCopy } from './hooks';
import { IconCopy } from '@arco-design/web-react/icon';
import { Popover } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';
var cssPrefix = classNamePrefixFactory('copy');
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    popover: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["popover"], ["popover"]))),
    icon: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["icon"], ["icon"]))),
};
var CCopy = function (props) {
    var _a;
    var style = props.style, className = props.className, children = props.children, disabled = props.disabled, triggerIcon = props.triggerIcon, triggerEle = props.triggerEle, showCopy = props.showCopy;
    var text = useMemo(function () { return props.text || getChildrenString(children); }, [props.text, children]);
    var _b = __read(useCCopy(__assign(__assign({}, props), { text: text })), 2), arcoPopoverProps = _b[0].arcoPopoverProps, controls = _b[1];
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var cssRoot = getCPrefixCls('copy');
    var iconCls = getCPrefixCls('icon');
    return (React.createElement("div", { style: style, className: classNames(cssRoot, className), "data-cy": testId.container },
        children,
        React.createElement(Popover, __assign({}, arcoPopoverProps, { "data-cy": testId.popover }),
            React.createElement("span", { className: classNames("".concat(cssRoot, "-icon"), (_a = {}, _a["".concat(cssRoot, "-icon-hover")] = showCopy === 'hover', _a)), onClick: controls.handleCopy, "data-cy": testId.icon, "data-testid": testId.icon }, triggerEle ||
                React.cloneElement(triggerIcon || React.createElement(IconCopy, null), {
                    className: classNames(iconCls, disabled && 'disabled'),
                })))));
};
CCopy.displayName = 'CCopy';
export default CCopy;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map