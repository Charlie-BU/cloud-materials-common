"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssPrefix = exports.IconList = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importDefault(require("react"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var utils_1 = require("./utils");
var const_1 = require("./const");
var config_1 = require("./config");
var useBuildIn_1 = require("./useBuildIn");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var IconList = function (waitColor) { return ({
    usable: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCheckCircleBlue, null),
    error: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCloseCircleFill, null),
    warning: react_1.default.createElement(iconbox_react_ve_o_design_1.IconExclamationCircleFill, null),
    running: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCheckCircleFill, null),
    wait: waitColor === 'grey' ? react_1.default.createElement(iconbox_react_ve_o_design_1.IconClockCircleGreyFill, null) : react_1.default.createElement(iconbox_react_ve_o_design_1.IconClockCircleFill, null),
    disable: react_1.default.createElement(iconbox_react_ve_o_design_1.IconMinusCircleFillGrey, null),
    loading: react_1.default.createElement(iconbox_react_ve_o_design_1.IconLoading, { className: "arco-icon-loading" }),
}); };
exports.IconList = IconList;
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('status');
var testId = {
    root: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
};
var renderText = function (props, statusCls) {
    var text = props.text, popoverContent = props.popoverContent, arcoPopoverProps = props.arcoPopoverProps;
    if (!popoverContent && !(arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.content))
        return text;
    return (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ content: popoverContent }, arcoPopoverProps),
        react_1.default.createElement("span", { className: "".concat(statusCls, "-text") }, text)));
};
var renderIcon = function (props, statusCls) {
    var _a, _b;
    var icon = props.icon, status = props.status, type = props.type, size = props.size, waitColor = props.waitColor;
    if (type === 'dot' && status !== 'loading') {
        var backgroundColor = "var(--".concat(status, "-nbd-color)");
        if (status === 'wait' || status === 'disable') {
            backgroundColor = "var(--".concat(status, "-dot-color)");
            if (waitColor === 'blue' && status === 'wait') {
                backgroundColor = "var(--usable-nbd-color)";
            }
        }
        return (react_1.default.createElement("span", { className: "".concat(statusCls, "-dot"), style: {
                backgroundColor: backgroundColor,
            } }));
    }
    if (icon) {
        return (react_1.default.createElement("span", { className: (0, classnames_1.default)("".concat(statusCls, "-icon"), (_a = {}, _a["".concat(statusCls, "-icon-large")] = size === 'large', _a)) }, icon));
    }
    return (react_1.default.createElement("span", { className: (0, classnames_1.default)("".concat(statusCls, "-icon"), (_b = {},
            _b["".concat(statusCls, "-icon-large")] = size === 'large',
            _b)) }, (0, exports.IconList)(waitColor)[status]));
};
var Status = function (props) {
    var _a;
    var _b, _c, _d, _e;
    var _f = (0, useBuildIn_1.useBuildIn)(), defaultStatusMap = _f.defaultStatusMap, mergeProps = _f.mergeProps, statusCls = _f.statusCls;
    var _props = mergeProps(props);
    var children = props.children;
    var _g = _props.status, status = _g === void 0 ? 'usable' : _g, _h = _props.type, type = _h === void 0 ? 'normal' : _h, text = _props.text, icon = _props.icon, popoverContent = _props.popoverContent, arcoPopoverProps = _props.arcoPopoverProps, _j = _props.className, className = _j === void 0 ? '' : _j, statusName = _props.statusName, _k = _props.statusMap, statusMap = _k === void 0 ? defaultStatusMap : _k, _l = _props.size, size = _l === void 0 ? 'default' : _l, _m = _props.waitColor, waitColor = _m === void 0 ? 'grey' : _m, _o = _props.maxWidth, maxWidth = _o === void 0 ? 160 : _o, rest = tslib_1.__rest(_props, ["status", "type", "text", "icon", "popoverContent", "arcoPopoverProps", "className", "statusName", "statusMap", "size", "waitColor", "maxWidth"]);
    var _status = statusName ? (_b = statusMap[statusName]) === null || _b === void 0 ? void 0 : _b.status : status;
    var textContent = statusName ? (_c = children !== null && children !== void 0 ? children : text) !== null && _c !== void 0 ? _c : (_d = statusMap[statusName]) === null || _d === void 0 ? void 0 : _d.text : children !== null && children !== void 0 ? children : text;
    var _icon = statusName ? (_e = statusMap[statusName]) === null || _e === void 0 ? void 0 : _e.icon : undefined;
    var haveIcon = const_1.IconType.includes(type);
    return (react_1.default.createElement("span", tslib_1.__assign({}, (0, lodash_es_1.omit)(rest, 'highlightColor', 'borderColor', 'tagColor'), { "data-cy": testId.root, className: (0, classnames_1.default)(className, statusCls, (_a = {},
            _a["".concat(statusCls, "-large")] = size === 'large',
            _a["".concat(statusCls, "-normal")] = type === 'normal',
            _a)), style: (0, utils_1.getStyle)(tslib_1.__assign(tslib_1.__assign({}, _props), { statusMap: statusMap, status: _status, waitColor: waitColor })) }),
        haveIcon ? renderIcon({ icon: icon !== null && icon !== void 0 ? icon : _icon, status: _status, type: type, size: size, waitColor: waitColor }, statusCls) : null,
        react_1.default.createElement(CEllipsis_1.default, { showCopy: false, maxWidth: maxWidth },
            react_1.default.createElement("span", { className: "".concat(statusCls, "-textWrapper") }, renderText({
                text: textContent,
                popoverContent: popoverContent,
                arcoPopoverProps: arcoPopoverProps,
            }, statusCls)))));
};
Status.displayName = 'Status';
var ExportedStatusComponent = Status;
ExportedStatusComponent.config = config_1.setStatusConfig;
exports.default = ExportedStatusComponent;
var templateObject_1;
//# sourceMappingURL=index.js.map