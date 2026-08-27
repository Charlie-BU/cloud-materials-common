"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderOptions = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CEllipsis_1 = tslib_1.__importDefault(require("../../../../CEllipsis"));
var const_1 = require("./const");
var renderOptions = function (_a) {
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
        var popContent = (react_1.default.createElement("div", { className: "".concat(cssPrefix, "-option-pop") },
            react_1.default.createElement("span", { className: "".concat(cssPrefix, "-option-pop-label") }, item.label),
            item.description && react_1.default.createElement("span", { className: "".concat(cssPrefix, "-option-pop-des") }, item.description),
            showDisableReason && (react_1.default.createElement("span", { className: "".concat(cssPrefix, "-option-pop-tip") }, typeof item.disabledTooltipContent === 'string'
                ? "".concat(locale.CForm.text.disabledReason).concat(item.disabledTooltipContent)
                : item.disabledTooltipContent))));
        var content = (react_1.default.createElement("span", { className: (0, classnames_1.default)((_a = {},
                _a["".concat(cssPrefix, "-option")] = true,
                _a["".concat(cssPrefix, "-option-double")] = isDouble,
                _a)) },
            react_1.default.createElement("span", { className: (0, classnames_1.default)((_b = {},
                    _b["".concat(cssPrefix, "-option-label")] = true,
                    _b["".concat(cssPrefix, "-option-label-empty")] = item.label === '',
                    _b["".concat(cssPrefix, "-option-label-double")] = isDouble && !!item.description,
                    _b["".concat(cssPrefix, "-option-disabled")] = item.disabled,
                    _b)) }, item.label),
            item.description && (react_1.default.createElement("span", { className: (0, classnames_1.default)((_c = {},
                    _c["".concat(cssPrefix, "-option-des")] = true,
                    _c["".concat(cssPrefix, "-option-des-nodouble")] = !isDouble,
                    _c["".concat(cssPrefix, "-option-des-nodisabled")] = !item.disabled,
                    _c["".concat(cssPrefix, "-option-disabled")] = item.disabled,
                    _c)) }, item.description))));
        return tslib_1.__assign(tslib_1.__assign({}, item), { extra: tslib_1.__assign(tslib_1.__assign({}, item.extra), (_d = {}, _d[const_1.LabelAlias] = item.label, _d)), label: typeof item.label === 'string' || typeof item.label === 'number' ? (showDisableReason ? (react_1.default.createElement(web_react_1.Popover, { position: "right", getPopupContainer: getPopupContainer, content: popContent },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(CEllipsis_1.default, { content: content, arcoPopoverProps: { popupVisible: false } })))) : (react_1.default.createElement(CEllipsis_1.default, { arcoPopoverProps: {
                    position: 'right',
                    getPopupContainer: getPopupContainer,
                }, content: content, popoverContent: popContent }))) : (item.label) });
    });
    return options;
};
exports.renderOptions = renderOptions;
//# sourceMappingURL=viewUtils.js.map