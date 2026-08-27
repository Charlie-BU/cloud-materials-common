import { __assign } from "tslib";
import { Popover } from '@arco-design/web-react';
import React from 'react';
import classNames from 'classnames';
import CEllipsis from '../../../../CEllipsis';
import { LabelAlias } from './const';
export var renderOptions = function (_a) {
    var dataSource = _a.dataSource, cssPrefix = _a.cssPrefix, optionMode = _a.optionMode, locale = _a.locale, getPopupContainer = _a.getPopupContainer;
    if (!dataSource)
        return [];
    if (optionMode === 'custom') {
        return dataSource;
    }
    var isDouble = optionMode === 'doubleRow';
    var options = dataSource.map(function (item) {
        var _a, _b, _c, _d;
        var showDisableReason = item.disabled && item.disabledTooltipContent;
        var popContent = (React.createElement("div", { className: "".concat(cssPrefix, "-option-pop") },
            React.createElement("span", { className: "".concat(cssPrefix, "-option-pop-label") }, item.label),
            item.description && React.createElement("span", { className: "".concat(cssPrefix, "-option-pop-des") }, item.description),
            showDisableReason && (React.createElement("span", { className: "".concat(cssPrefix, "-option-pop-tip") }, typeof item.disabledTooltipContent === 'string'
                ? "".concat(locale.CForm.text.disabledReason).concat(item.disabledTooltipContent)
                : item.disabledTooltipContent))));
        var content = (React.createElement("span", { className: classNames((_a = {},
                _a["".concat(cssPrefix, "-option")] = true,
                _a["".concat(cssPrefix, "-option-double")] = isDouble,
                _a)) },
            React.createElement("span", { className: classNames((_b = {},
                    _b["".concat(cssPrefix, "-option-label")] = true,
                    _b["".concat(cssPrefix, "-option-label-empty")] = item.label === '',
                    _b["".concat(cssPrefix, "-option-label-double")] = isDouble && !!item.description,
                    _b["".concat(cssPrefix, "-option-disabled")] = item.disabled,
                    _b)) }, item.label),
            item.description && (React.createElement("span", { className: classNames((_c = {},
                    _c["".concat(cssPrefix, "-option-des")] = true,
                    _c["".concat(cssPrefix, "-option-des-nodouble")] = !isDouble,
                    _c["".concat(cssPrefix, "-option-des-nodisabled")] = !item.disabled,
                    _c["".concat(cssPrefix, "-option-disabled")] = item.disabled,
                    _c)) }, item.description))));
        return __assign(__assign({}, item), { extra: __assign(__assign({}, item.extra), (_d = {}, _d[LabelAlias] = item.label, _d)), label: typeof item.label === 'string' || typeof item.label === 'number' ? (showDisableReason ? (React.createElement(Popover, { position: "right", getPopupContainer: getPopupContainer, content: popContent },
                React.createElement("div", null,
                    React.createElement(CEllipsis, { content: content, arcoPopoverProps: { popupVisible: false } })))) : (React.createElement(CEllipsis, { arcoPopoverProps: {
                    position: 'right',
                    getPopupContainer: getPopupContainer,
                }, content: content, popoverContent: popContent }))) : (item.label) });
    });
    return options;
};
//# sourceMappingURL=viewUtils.js.map