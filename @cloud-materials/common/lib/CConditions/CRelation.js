"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = exports.CRelation = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var utils_1 = require("./utils");
var CConfigProvider_1 = require("../CConfigProvider");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CTag_1 = tslib_1.__importDefault(require("../CTag"));
/**
 * 逻辑关系选择
 */
function CRelation(props) {
    var _a, _b;
    var _c = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _c.useCssPrefix, locale = _c.locale;
    var cssPrefix = useCssPrefix('conditions-relation');
    var defaultOptions = [
        { label: locale.CConditions.and, value: 'and' },
        { label: locale.CConditions.or, value: 'or' },
    ];
    var _d = props.readonly, readonly = _d === void 0 ? false : _d, _e = props.disabled, disabled = _e === void 0 ? false : _e, _f = props.size, size = _f === void 0 ? readonly ? 'small' : 'default' : _f, value = props.value, onChange = props.onChange, style = props.style, className = props.className, children = props.children, _g = props.options, options = _g === void 0 ? children ? undefined : defaultOptions : _g;
    var getSelectedDisplayValue = function () {
        var selected = options.find(function (item) { return ((0, utils_1.isStringOrNumber)(item) ? item : item.value) === value; });
        return (react_1.default.createElement("span", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["card"], ["card"]))), size === 'small' && cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["small"], ["small"])))) }, (0, utils_1.isStringOrNumber)(selected) ? selected : selected === null || selected === void 0 ? void 0 : selected.label));
    };
    var isAnd = (0, utils_1.isStringOrNumber)(options === null || options === void 0 ? void 0 : options[0]) ? (options === null || options === void 0 ? void 0 : options[0]) === 'and' : ((_a = options === null || options === void 0 ? void 0 : options[0]) === null || _a === void 0 ? void 0 : _a.value) === 'and';
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""]))), className), style: style },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["upper-line"], ["upper-line"]))), readonly && cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["view"], ["view"])))) }),
        options ? (readonly ? (getSelectedDisplayValue()) : options.length === 1 ? (react_1.default.createElement(CTag_1.default, { size: "large", type: "bordered", className: (0, classnames_1.default)(cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["card"], ["card"]))), size === 'small' && cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["small"], ["small"]))), isAnd ? cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["first-color"], ["first-color"]))) : cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["second-color"], ["second-color"]))), cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["one-option"], ["one-option"])))) }, (0, utils_1.isStringOrNumber)(options[0]) ? options[0] : (_b = options[0]) === null || _b === void 0 ? void 0 : _b.label)) : options.length === 2 ? (react_1.default.createElement(exports.Toggle, { size: size, disabled: disabled, options: options, value: value, onChange: onChange })) : (react_1.default.createElement(web_react_1.Select, { className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["select"], ["select"]))), disabled: disabled, options: options, value: value, onChange: onChange }))) : (children),
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["lower-line"], ["lower-line"]))), readonly && cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["view"], ["view"])))) })));
}
exports.CRelation = CRelation;
/** 逻辑关系切换卡片 */
var Toggle = function (props) {
    var _a, _b, _c, _d;
    var _e = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _e.useCssPrefix, locale = _e.locale;
    var cssPrefix = useCssPrefix('conditions-relation');
    var _f = props.size, size = _f === void 0 ? 'default' : _f, _g = props.disabled, disabled = _g === void 0 ? false : _g, options = props.options, value = props.value, onChange = props.onChange;
    var values = options.map(function (item) { return ((0, utils_1.isStringOrNumber)(item) ? item : item.value); });
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["toggle"], ["toggle"]))), value === values[1] && cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["flipped"], ["flipped"])))), onClick: function () { return !disabled && (onChange === null || onChange === void 0 ? void 0 : onChange(value !== values[0] ? values[0] : values[1])); } },
        react_1.default.createElement(CTag_1.default, { cEllipsisProps: {
                showPopover: true,
                popoverContent: "".concat(locale.CConditions.clickSwitch, "\u201C").concat((0, utils_1.isStringOrNumber)(options[1]) ? options[1] : (_a = options[1]) === null || _a === void 0 ? void 0 : _a.label, "\u201D"),
            }, size: "large", type: "bordered", className: (0, classnames_1.default)(cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["card"], ["card"]))), size === 'small' && cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["small"], ["small"]))), cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["first"], ["first"])))) }, (0, utils_1.isStringOrNumber)(options[0]) ? options[0] : (_b = options[0]) === null || _b === void 0 ? void 0 : _b.label),
        react_1.default.createElement(CTag_1.default, { cEllipsisProps: {
                showPopover: true,
                popoverContent: "".concat(locale.CConditions.clickSwitch, "\u201C").concat((0, utils_1.isStringOrNumber)(options[0]) ? options[0] : (_c = options[0]) === null || _c === void 0 ? void 0 : _c.label, "\u201D"),
            }, size: "large", type: "bordered", className: (0, classnames_1.default)(cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["card"], ["card"]))), size === 'small' && cssPrefix(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["small"], ["small"]))), cssPrefix(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["second"], ["second"])))) }, (0, utils_1.isStringOrNumber)(options[1]) ? options[1] : (_d = options[1]) === null || _d === void 0 ? void 0 : _d.label)));
};
exports.Toggle = Toggle;
CRelation.displayName = 'CRelation';
exports.default = CRelation;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21;
//# sourceMappingURL=CRelation.js.map