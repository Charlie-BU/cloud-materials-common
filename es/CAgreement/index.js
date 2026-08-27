import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { useContext, useEffect, useState } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { CConfigContext } from '../CConfigProvider';
import { Checkbox, Link, Popover, Tooltip } from '@arco-design/web-react';
import useMergeValue from '../hooks/useMergeValue';
import { isUndefined } from 'lodash-es';
var cssPrefix = classNamePrefixFactory('agreement');
var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
};
var CAgreement = function (props) {
    var _a;
    var _b = useContext(CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('agreement');
    var _c = props.link, link = _c === void 0 ? [] : _c, _d = props.prefix, prefix = _d === void 0 ? locale.CAgreement.defaultPrefix : _d, _e = props.scene, scene = _e === void 0 ? 'normal' : _e, _f = props.errorToolTip, errorToolTip = _f === void 0 ? locale.CAgreement.defaultErrorToolTip : _f, className = props.className, style = props.style, value = props.value, validateStatusError = props.validateStatusError;
    // 是否展示错误信息
    var _g = __read(useState(false), 2), showErrorPopover = _g[0], setShowErrorPopover = _g[1];
    // 维护当前checkbox的状态
    var _h = __read(useMergeValue(false, {
        value: value,
    }), 2), current = _h[0], setCurrent = _h[1];
    // 是否是受控模式
    var isControlled = !isUndefined(value);
    var linkArr = Array.isArray(link) ? link : [link];
    var _j = __read(useState(function () { return "".concat(Date.now(), "c-agreement-wrapper"); }), 1), ContentID = _j[0];
    // 未选中协议，展示报错提示
    var showError = function (value) {
        if (!value && validateStatusError)
            setShowErrorPopover(true);
        else
            setShowErrorPopover(false);
    };
    var onChange = function (v) {
        var _a;
        // 非受控模式 管理当前状态
        if (!isControlled)
            setCurrent(v);
        // 受控模式&非受控模式
        (_a = props === null || props === void 0 ? void 0 : props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v);
    };
    // 组件外部的校验状态发生变化 或者 组件状态发生变化时 判断是否展示错误信息
    useEffect(function () {
        showError(current);
    }, [current, validateStatusError]);
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), (_a = {},
            _a[cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["card"], ["card"])))] = scene === 'card',
            _a), className), "data-cy": testId.container, "data-testid": testId.container, id: ContentID, style: style },
        React.createElement(Tooltip, { content: errorToolTip, popupVisible: showErrorPopover, position: 'tl', color: "#fff", getPopupContainer: function () { return document.getElementById(ContentID) || document.body; } },
            React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["checkbox-container"], ["checkbox-container"]))) },
                React.createElement(Checkbox, { onChange: onChange, className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["checkbox"], ["checkbox"]))), checked: current }))),
        React.createElement("span", { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["link"], ["link"]))) },
            React.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["link-prefix"], ["link-prefix"]))), onClick: function () {
                    // 扩容协议的可点击范围
                    var changedValue = !current;
                    onChange(changedValue);
                } }, prefix),
            linkArr.map(function (linkItem, index) {
                var _a;
                return (React.createElement("span", { key: "".concat(index, "-").concat(linkItem.linkUrl) },
                    linkItem.linkUrl ? (React.createElement(Link, { target: "_blank", href: linkItem.linkUrl }, linkItem.linkDesc)) : (React.createElement(Popover, __assign({ disabled: !linkItem.linkToolTip, content: linkItem.linkToolTip, getPopupContainer: function () { return document.getElementById(ContentID) || document.body; } }, ((_a = linkItem === null || linkItem === void 0 ? void 0 : linkItem.arcoPopoverProps) !== null && _a !== void 0 ? _a : {})),
                        React.createElement("span", { className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["link-desc"], ["link-desc"]))) }, linkItem.linkDesc))),
                    index !== linkArr.length - 1 ? React.createElement("span", null, locale.CAgreement.defaultSeparator) : null));
            }),
            locale.CAgreement.defaultEndSeparator)));
};
CAgreement.displayName = 'CAgreement';
export default CAgreement;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=index.js.map