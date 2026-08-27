import { __makeTemplateObject } from "tslib";
import React from 'react';
import { Select } from '@arco-design/web-react';
import { isStringOrNumber } from './utils';
import { useCConfigContext } from '../CConfigProvider';
import classNames from 'classnames';
import CTag from '../CTag';
/**
 * 逻辑关系选择
 */
export function CRelation(props) {
    var _a, _b;
    var _c = useCConfigContext(), useCssPrefix = _c.useCssPrefix, locale = _c.locale;
    var cssPrefix = useCssPrefix('conditions-relation');
    var defaultOptions = [
        { label: locale.CConditions.and, value: 'and' },
        { label: locale.CConditions.or, value: 'or' },
    ];
    var _d = props.readonly, readonly = _d === void 0 ? false : _d, _e = props.disabled, disabled = _e === void 0 ? false : _e, _f = props.size, size = _f === void 0 ? readonly ? 'small' : 'default' : _f, value = props.value, onChange = props.onChange, style = props.style, className = props.className, children = props.children, _g = props.options, options = _g === void 0 ? children ? undefined : defaultOptions : _g;
    var getSelectedDisplayValue = function () {
        var selected = options.find(function (item) { return (isStringOrNumber(item) ? item : item.value) === value; });
        return (React.createElement("span", { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["card"], ["card"]))), size === 'small' && cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["small"], ["small"])))) }, isStringOrNumber(selected) ? selected : selected === null || selected === void 0 ? void 0 : selected.label));
    };
    var isAnd = isStringOrNumber(options === null || options === void 0 ? void 0 : options[0]) ? (options === null || options === void 0 ? void 0 : options[0]) === 'and' : ((_a = options === null || options === void 0 ? void 0 : options[0]) === null || _a === void 0 ? void 0 : _a.value) === 'and';
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""]))), className), style: style },
        React.createElement("div", { className: classNames(cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["upper-line"], ["upper-line"]))), readonly && cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["view"], ["view"])))) }),
        options ? (readonly ? (getSelectedDisplayValue()) : options.length === 1 ? (React.createElement(CTag, { size: "large", type: "bordered", className: classNames(cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["card"], ["card"]))), size === 'small' && cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["small"], ["small"]))), isAnd ? cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["first-color"], ["first-color"]))) : cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["second-color"], ["second-color"]))), cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["one-option"], ["one-option"])))) }, isStringOrNumber(options[0]) ? options[0] : (_b = options[0]) === null || _b === void 0 ? void 0 : _b.label)) : options.length === 2 ? (React.createElement(Toggle, { size: size, disabled: disabled, options: options, value: value, onChange: onChange })) : (React.createElement(Select, { className: cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["select"], ["select"]))), disabled: disabled, options: options, value: value, onChange: onChange }))) : (children),
        React.createElement("div", { className: classNames(cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["lower-line"], ["lower-line"]))), readonly && cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["view"], ["view"])))) })));
}
/** 逻辑关系切换卡片 */
export var Toggle = function (props) {
    var _a, _b, _c, _d;
    var _e = useCConfigContext(), useCssPrefix = _e.useCssPrefix, locale = _e.locale;
    var cssPrefix = useCssPrefix('conditions-relation');
    var _f = props.size, size = _f === void 0 ? 'default' : _f, _g = props.disabled, disabled = _g === void 0 ? false : _g, options = props.options, value = props.value, onChange = props.onChange;
    var values = options.map(function (item) { return (isStringOrNumber(item) ? item : item.value); });
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["toggle"], ["toggle"]))), value === values[1] && cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["flipped"], ["flipped"])))), onClick: function () { return !disabled && (onChange === null || onChange === void 0 ? void 0 : onChange(value !== values[0] ? values[0] : values[1])); } },
        React.createElement(CTag, { cEllipsisProps: {
                showPopover: true,
                popoverContent: "".concat(locale.CConditions.clickSwitch, "\u201C").concat(isStringOrNumber(options[1]) ? options[1] : (_a = options[1]) === null || _a === void 0 ? void 0 : _a.label, "\u201D"),
            }, size: "large", type: "bordered", className: classNames(cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["card"], ["card"]))), size === 'small' && cssPrefix(templateObject_17 || (templateObject_17 = __makeTemplateObject(["small"], ["small"]))), cssPrefix(templateObject_18 || (templateObject_18 = __makeTemplateObject(["first"], ["first"])))) }, isStringOrNumber(options[0]) ? options[0] : (_b = options[0]) === null || _b === void 0 ? void 0 : _b.label),
        React.createElement(CTag, { cEllipsisProps: {
                showPopover: true,
                popoverContent: "".concat(locale.CConditions.clickSwitch, "\u201C").concat(isStringOrNumber(options[0]) ? options[0] : (_c = options[0]) === null || _c === void 0 ? void 0 : _c.label, "\u201D"),
            }, size: "large", type: "bordered", className: classNames(cssPrefix(templateObject_19 || (templateObject_19 = __makeTemplateObject(["card"], ["card"]))), size === 'small' && cssPrefix(templateObject_20 || (templateObject_20 = __makeTemplateObject(["small"], ["small"]))), cssPrefix(templateObject_21 || (templateObject_21 = __makeTemplateObject(["second"], ["second"])))) }, isStringOrNumber(options[1]) ? options[1] : (_d = options[1]) === null || _d === void 0 ? void 0 : _d.label)));
};
CRelation.displayName = 'CRelation';
export default CRelation;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21;
//# sourceMappingURL=CRelation.js.map