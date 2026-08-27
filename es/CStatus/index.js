import { __assign, __makeTemplateObject, __rest } from "tslib";
import { Popover } from '@arco-design/web-react';
import React from 'react';
import { IconCheckCircleFill, IconCheckCircleBlue, IconCloseCircleFill, IconExclamationCircleFill, IconClockCircleFill, IconLoading, IconMinusCircleFillGrey, IconClockCircleGreyFill, } from '@arco-design/iconbox-react-ve-o-design';
import classNames from 'classnames';
import { getStyle } from './utils';
import { IconType } from './const';
import { setStatusConfig } from './config';
import { useBuildIn } from './useBuildIn';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { omit } from 'lodash-es';
import CEllipsis from '../CEllipsis';
export var IconList = function (waitColor) { return ({
    usable: React.createElement(IconCheckCircleBlue, null),
    error: React.createElement(IconCloseCircleFill, null),
    warning: React.createElement(IconExclamationCircleFill, null),
    running: React.createElement(IconCheckCircleFill, null),
    wait: waitColor === 'grey' ? React.createElement(IconClockCircleGreyFill, null) : React.createElement(IconClockCircleFill, null),
    disable: React.createElement(IconMinusCircleFillGrey, null),
    loading: React.createElement(IconLoading, { className: "arco-icon-loading" }),
}); };
export var cssPrefix = classNamePrefixFactory('status');
var testId = {
    root: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
};
var renderText = function (props, statusCls) {
    var text = props.text, popoverContent = props.popoverContent, arcoPopoverProps = props.arcoPopoverProps;
    if (!popoverContent && !(arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.content))
        return text;
    return (React.createElement(Popover, __assign({ content: popoverContent }, arcoPopoverProps),
        React.createElement("span", { className: "".concat(statusCls, "-text") }, text)));
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
        return (React.createElement("span", { className: "".concat(statusCls, "-dot"), style: {
                backgroundColor: backgroundColor,
            } }));
    }
    if (icon) {
        return (React.createElement("span", { className: classNames("".concat(statusCls, "-icon"), (_a = {}, _a["".concat(statusCls, "-icon-large")] = size === 'large', _a)) }, icon));
    }
    return (React.createElement("span", { className: classNames("".concat(statusCls, "-icon"), (_b = {},
            _b["".concat(statusCls, "-icon-large")] = size === 'large',
            _b)) }, IconList(waitColor)[status]));
};
var Status = function (props) {
    var _a;
    var _b, _c, _d, _e;
    var _f = useBuildIn(), defaultStatusMap = _f.defaultStatusMap, mergeProps = _f.mergeProps, statusCls = _f.statusCls;
    var _props = mergeProps(props);
    var children = props.children;
    var _g = _props.status, status = _g === void 0 ? 'usable' : _g, _h = _props.type, type = _h === void 0 ? 'normal' : _h, text = _props.text, icon = _props.icon, popoverContent = _props.popoverContent, arcoPopoverProps = _props.arcoPopoverProps, _j = _props.className, className = _j === void 0 ? '' : _j, statusName = _props.statusName, _k = _props.statusMap, statusMap = _k === void 0 ? defaultStatusMap : _k, _l = _props.size, size = _l === void 0 ? 'default' : _l, _m = _props.waitColor, waitColor = _m === void 0 ? 'grey' : _m, _o = _props.maxWidth, maxWidth = _o === void 0 ? 160 : _o, rest = __rest(_props, ["status", "type", "text", "icon", "popoverContent", "arcoPopoverProps", "className", "statusName", "statusMap", "size", "waitColor", "maxWidth"]);
    var _status = statusName ? (_b = statusMap[statusName]) === null || _b === void 0 ? void 0 : _b.status : status;
    var textContent = statusName ? (_c = children !== null && children !== void 0 ? children : text) !== null && _c !== void 0 ? _c : (_d = statusMap[statusName]) === null || _d === void 0 ? void 0 : _d.text : children !== null && children !== void 0 ? children : text;
    var _icon = statusName ? (_e = statusMap[statusName]) === null || _e === void 0 ? void 0 : _e.icon : undefined;
    var haveIcon = IconType.includes(type);
    return (React.createElement("span", __assign({}, omit(rest, 'highlightColor', 'borderColor', 'tagColor'), { "data-cy": testId.root, className: classNames(className, statusCls, (_a = {},
            _a["".concat(statusCls, "-large")] = size === 'large',
            _a["".concat(statusCls, "-normal")] = type === 'normal',
            _a)), style: getStyle(__assign(__assign({}, _props), { statusMap: statusMap, status: _status, waitColor: waitColor })) }),
        haveIcon ? renderIcon({ icon: icon !== null && icon !== void 0 ? icon : _icon, status: _status, type: type, size: size, waitColor: waitColor }, statusCls) : null,
        React.createElement(CEllipsis, { showCopy: false, maxWidth: maxWidth },
            React.createElement("span", { className: "".concat(statusCls, "-textWrapper") }, renderText({
                text: textContent,
                popoverContent: popoverContent,
                arcoPopoverProps: arcoPopoverProps,
            }, statusCls)))));
};
Status.displayName = 'Status';
var ExportedStatusComponent = Status;
ExportedStatusComponent.config = setStatusConfig;
export default ExportedStatusComponent;
var templateObject_1;
//# sourceMappingURL=index.js.map