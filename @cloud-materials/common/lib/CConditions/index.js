"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var CConfigProvider_1 = require("../CConfigProvider");
var CRelation_1 = tslib_1.__importDefault(require("./CRelation"));
var CAddButton_1 = tslib_1.__importDefault(require("../CAddButton"));
var CConditionsGroup_1 = tslib_1.__importDefault(require("./CConditionsGroup"));
var DivComp = function (props) { return react_1.default.createElement("div", tslib_1.__assign({}, (0, lodash_es_1.omit)(props, ['value', 'onChange', 'index']))); };
/**
 * 单个条件组 XConditions.Group
 *
 * @example
 * ```js
 * {
 *   relation: 'and',
 *   conditions: [
 *     { field: 'name', operator: 'eq', value: 'test' },
 *     { field: 'age', operator: 'eq', value: 28 },
 *   ],
 * }
 * ```
 */
function CConditions(props) {
    var _a, _b, _c, _d;
    var style = props.style, className = props.className, _e = props.readonly, readonly = _e === void 0 ? false : _e, _f = props.disabled, disabled = _f === void 0 ? false : _f, _g = props.allowClear, allowClear = _g === void 0 ? true : _g, addText = props.addText, clearText = props.clearText, newCondition = props.newCondition, _h = props.value, value = _h === void 0 ? { relation: 'and', conditions: [(_a = newCondition === null || newCondition === void 0 ? void 0 : newCondition()) !== null && _a !== void 0 ? _a : {}] } : _h, onChange = props.onChange, conditionRender = props.conditionRender, conditionKey = props.conditionKey, relationOptions = props.relationOptions, _j = props.Container, Container = _j === void 0 ? DivComp : _j, _k = props.ConditionWrapper, ConditionWrapper = _k === void 0 ? DivComp : _k, _l = props.minNum, minNum = _l === void 0 ? 1 : _l, _m = props.maxNum, maxNum = _m === void 0 ? Infinity : _m;
    var _o = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _o.useCssPrefix, locale = _o.locale;
    var cssPrefix = useCssPrefix('conditions');
    if (readonly) {
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))), className), style: style },
            react_1.default.createElement(CRelation_1.default, { readonly: true, options: relationOptions, value: value.relation }),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["content"], ["content"]))), cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["view"], ["view"])))) }, value.conditions.map(function (item, index) { return (react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["view-item"], ["view-item"]))), key: index }, conditionRender(item))); }))));
    }
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["container"], ["container"]))), className), style: style },
        react_1.default.createElement(CRelation_1.default, { disabled: disabled, options: relationOptions, value: value.relation, onChange: function (val) {
                onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { relation: val }));
            } }),
        react_1.default.createElement(Container, { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["content"], ["content"]))), value: value, onChange: onChange }, (_b = value.conditions) === null || _b === void 0 ? void 0 :
            _b.map(function (item, index) {
                var _a, _b;
                return (react_1.default.createElement(ConditionWrapper, { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["condition-wrapper"], ["condition-wrapper"]))), key: (_a = conditionKey === null || conditionKey === void 0 ? void 0 : conditionKey(item)) !== null && _a !== void 0 ? _a : index, index: index },
                    conditionRender(item, onChange
                        ? function (val) {
                            var conditions = tslib_1.__spreadArray([], tslib_1.__read(value.conditions), false);
                            conditions[index] = val;
                            onChange(tslib_1.__assign(tslib_1.__assign({}, value), { conditions: conditions }));
                        }
                        : undefined, index),
                    ((_b = value.conditions) === null || _b === void 0 ? void 0 : _b.length) > minNum && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["condition-delete"], ["condition-delete"]))), disabled && 'disabled'), onClick: function () {
                            if (!disabled) {
                                var conditions = tslib_1.__spreadArray([], tslib_1.__read(value.conditions), false);
                                conditions.splice(index, 1);
                                onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { conditions: conditions }));
                            }
                        } },
                        react_1.default.createElement(icon_1.IconDelete, { className: (0, classnames_1.default)('c-m-icon', { disabled: disabled }, cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["condition-delete-icon"], ["condition-delete-icon"])))) })))));
            }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(CAddButton_1.default, { disabled: disabled || ((_c = value.conditions) === null || _c === void 0 ? void 0 : _c.length) >= maxNum, className: (0, classnames_1.default)(cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["condition-add"], ["condition-add"]))), disabled && cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["disabled"], ["disabled"])))), type: "primary", onClick: function () {
                        var _a, _b;
                        onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { conditions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(((_a = value.conditions) !== null && _a !== void 0 ? _a : [])), false), [(_b = newCondition === null || newCondition === void 0 ? void 0 : newCondition()) !== null && _b !== void 0 ? _b : {}], false) }));
                    }, text: addText || locale.CConditions.add }),
                allowClear && ((_d = value.conditions) === null || _d === void 0 ? void 0 : _d.length) > minNum && (react_1.default.createElement(web_react_1.Button, { disabled: disabled, type: "text", className: cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["condition-clear"], ["condition-clear"]))), onClick: function () {
                        var _a;
                        onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { conditions: Array(minNum).fill((_a = newCondition === null || newCondition === void 0 ? void 0 : newCondition()) !== null && _a !== void 0 ? _a : {}) }));
                    } }, clearText || locale.CConditions.clear))))));
}
CConditions.Relation = CRelation_1.default;
CConditions.Group = CConditionsGroup_1.default;
CConditions.displayName = 'CConditions';
exports.default = CConditions;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=index.js.map