"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../CConfigProvider");
var web_react_1 = require("@arco-design/web-react");
var utils_1 = require("./utils");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('link');
exports.testId = {
    popover: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["popover"], ["popover"]))),
    link: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))),
    suffixicon: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["link-suffixicon"], ["link-suffixicon"]))),
};
var CLink = function (_a) {
    var style = _a.style, className = _a.className, popoverContent = _a.popoverContent, prefixIcon = _a.prefixIcon, suffixIcon = _a.suffixIcon, _b = _a.size, size = _b === void 0 ? 'default' : _b, _c = _a.type, type = _c === void 0 ? 'default' : _c, children = _a.children, arcoPopoverProps = _a.arcoPopoverProps, restProps = tslib_1.__rest(_a, ["style", "className", "popoverContent", "prefixIcon", "suffixIcon", "size", "type", "children", "arcoPopoverProps"]);
    var _d = (0, CConfigProvider_1.useCConfigContext)(), getCPrefixCls = _d.getCPrefixCls, locale = _d.locale;
    var innerLinkSetting = (0, utils_1.getInnerLinkSetting)(locale)[type];
    var pureLink = (react_1.default.createElement(web_react_1.Link, tslib_1.__assign({ style: (0, utils_1.getCLinkStyle)(size, style), className: (0, classnames_1.default)(getCPrefixCls('link'), className), icon: prefixIcon !== null && prefixIcon !== void 0 ? prefixIcon : innerLinkSetting === null || innerLinkSetting === void 0 ? void 0 : innerLinkSetting.icon }, restProps, { "data-cy": exports.testId.link, "data-testid": exports.testId.link }), children !== null && children !== void 0 ? children : innerLinkSetting === null || innerLinkSetting === void 0 ? void 0 : innerLinkSetting.label,
        suffixIcon ? (react_1.default.createElement("span", { className: getCPrefixCls('link-suffixicon'), "data-cy": exports.testId.suffixicon, "data-testid": exports.testId.suffixicon }, suffixIcon === true ? react_1.default.createElement(iconbox_react_ve_o_design_1.IconIconNewWindow, null) : suffixIcon)) : null));
    return popoverContent || arcoPopoverProps ? (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ position: "bottom", content: popoverContent }, arcoPopoverProps, { "data-cy": exports.testId.popover }), pureLink)) : (pureLink);
};
CLink.displayName = 'CLink';
exports.default = CLink;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map