import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { useCConfigContext } from '../CConfigProvider';
import { Link, Popover } from '@arco-design/web-react';
import { getCLinkStyle, getInnerLinkSetting } from './utils';
import { IconIconNewWindow } from '@arco-design/iconbox-react-ve-o-design';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
var cssPrefix = classNamePrefixFactory('link');
export var testId = {
    popover: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["popover"], ["popover"]))),
    link: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))),
    suffixicon: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["link-suffixicon"], ["link-suffixicon"]))),
};
var CLink = function (_a) {
    var style = _a.style, className = _a.className, popoverContent = _a.popoverContent, prefixIcon = _a.prefixIcon, suffixIcon = _a.suffixIcon, _b = _a.size, size = _b === void 0 ? 'default' : _b, _c = _a.type, type = _c === void 0 ? 'default' : _c, children = _a.children, arcoPopoverProps = _a.arcoPopoverProps, restProps = __rest(_a, ["style", "className", "popoverContent", "prefixIcon", "suffixIcon", "size", "type", "children", "arcoPopoverProps"]);
    var _d = useCConfigContext(), getCPrefixCls = _d.getCPrefixCls, locale = _d.locale;
    var innerLinkSetting = getInnerLinkSetting(locale)[type];
    var pureLink = (React.createElement(Link, __assign({ style: getCLinkStyle(size, style), className: classNames(getCPrefixCls('link'), className), icon: prefixIcon !== null && prefixIcon !== void 0 ? prefixIcon : innerLinkSetting === null || innerLinkSetting === void 0 ? void 0 : innerLinkSetting.icon }, restProps, { "data-cy": testId.link, "data-testid": testId.link }), children !== null && children !== void 0 ? children : innerLinkSetting === null || innerLinkSetting === void 0 ? void 0 : innerLinkSetting.label,
        suffixIcon ? (React.createElement("span", { className: getCPrefixCls('link-suffixicon'), "data-cy": testId.suffixicon, "data-testid": testId.suffixicon }, suffixIcon === true ? React.createElement(IconIconNewWindow, null) : suffixIcon)) : null));
    return popoverContent || arcoPopoverProps ? (React.createElement(Popover, __assign({ position: "bottom", content: popoverContent }, arcoPopoverProps, { "data-cy": testId.popover }), pureLink)) : (pureLink);
};
CLink.displayName = 'CLink';
export default CLink;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map