import { __assign, __makeTemplateObject, __read, __spreadArray } from "tslib";
import React from 'react';
import { Button } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';
import CRelation from './CRelation';
import CAddButton from '../CAddButton';
import { isStringOrNumber } from './utils';
import CConditions from '.';
import classNames from 'classnames';
/**
 * 条件组(包含分组)
 *
 * @example
 * ```js
 * {
 *   relation: 'and',
 *   groups: [
 *     {
 *       relation: 'or',
 *       conditions: [
 *         { field: 'name', operator: 'eq', value: 'test' },
 *         { field: 'age', operator: 'eq', value: 28 },
 *       ],
 *     },
 *   ],
 * }
 * ```
 */
function CConditionsGroup(props) {
    var _a, _b, _c, _d;
    var style = props.style, className = props.className, _e = props.readonly, readonly = _e === void 0 ? false : _e, _f = props.disabled, disabled = _f === void 0 ? false : _f, addText = props.addText, addGroupText = props.addGroupText, deleteGroupText = props.deleteGroupText, value = props.value, onChange = props.onChange, conditionRender = props.conditionRender, conditionKey = props.conditionKey, newCondition = props.newCondition, groupRender = props.groupRender, groupKey = props.groupKey, newGroup = props.newGroup, relationOptions = props.relationOptions, minNum = props.minNum, maxNum = props.maxNum, _g = props.minGroupNum, minGroupNum = _g === void 0 ? 1 : _g, _h = props.maxGroupNum, maxGroupNum = _h === void 0 ? Infinity : _h;
    var _j = useCConfigContext(), useCssPrefix = _j.useCssPrefix, locale = _j.locale;
    var cssPrefix = useCssPrefix('conditions-group');
    if (readonly) {
        return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))), className) },
            React.createElement(CRelation, { readonly: true, options: relationOptions, value: value === null || value === void 0 ? void 0 : value.relation }),
            React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["content"], ["content"]))) }, (_a = value === null || value === void 0 ? void 0 : value.groups) === null || _a === void 0 ? void 0 : _a.map(function (group, index) {
                var _a;
                return (React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["wrapper"], ["wrapper"]))), key: (_a = groupKey === null || groupKey === void 0 ? void 0 : groupKey(group)) !== null && _a !== void 0 ? _a : index }, groupRender ? (groupRender(group, undefined, index)) : (React.createElement(CConditions, { readonly: true, value: group, conditionRender: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return conditionRender.apply(void 0, __spreadArray(__spreadArray([], __read(args), false), [index], false));
                    }, key: index }))));
            }))));
    }
    return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["container"], ["container"]))), className) },
        React.createElement(CRelation, { disabled: disabled, options: relationOptions, value: value === null || value === void 0 ? void 0 : value.relation, onChange: function (val) { return onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { relation: val })); } }),
        React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["content"], ["content"]))) }, (_b = value === null || value === void 0 ? void 0 : value.groups) === null || _b === void 0 ? void 0 :
            _b.map(function (group, index) {
                var _a;
                return (React.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["wrapper"], ["wrapper"]))), key: (_a = groupKey === null || groupKey === void 0 ? void 0 : groupKey(group)) !== null && _a !== void 0 ? _a : index },
                    groupRender ? (groupRender(group, onChange
                        ? function (val) {
                            var groups = __spreadArray([], __read(value.groups), false);
                            groups.splice(index, 1, val);
                            onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { groups: groups }));
                        }
                        : undefined, index)) : (React.createElement(CConditions, { minNum: minNum, maxNum: maxNum, disabled: disabled, value: group, addText: addText, allowClear: false, onChange: onChange
                            ? function (val) {
                                var groups = __spreadArray([], __read(value.groups), false);
                                groups.splice(index, 1, val);
                                onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { groups: groups }));
                            }
                            : undefined, conditionRender: function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return conditionRender.apply(void 0, __spreadArray(__spreadArray([], __read(args), false), [index], false));
                        }, conditionKey: conditionKey, newCondition: newCondition })),
                    value.groups.length > minGroupNum && (React.createElement(Button, { disabled: disabled, type: "text", className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["delete"], ["delete"]))), onClick: function () {
                            var groups = __spreadArray([], __read(value.groups), false);
                            groups.splice(index, 1);
                            onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { groups: groups }));
                        } }, deleteGroupText || locale.CConditions.deleteGroup))));
            }),
            React.createElement(CAddButton, { disabled: disabled || ((_d = (_c = value === null || value === void 0 ? void 0 : value.groups) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > maxGroupNum, className: classNames(cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["add"], ["add"]))), disabled && cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["disabled"], ["disabled"])))), type: "primary", onClick: function () {
                    var _a, _b, _c, _d, _e;
                    onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { groups: __spreadArray(__spreadArray([], __read(((_a = value === null || value === void 0 ? void 0 : value.groups) !== null && _a !== void 0 ? _a : [])), false), [
                            (_b = newGroup === null || newGroup === void 0 ? void 0 : newGroup()) !== null && _b !== void 0 ? _b : {
                                relation: isStringOrNumber(relationOptions === null || relationOptions === void 0 ? void 0 : relationOptions[0])
                                    ? relationOptions === null || relationOptions === void 0 ? void 0 : relationOptions[0]
                                    : (_d = (_c = relationOptions === null || relationOptions === void 0 ? void 0 : relationOptions[0]) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 'and',
                                conditions: [(_e = newCondition === null || newCondition === void 0 ? void 0 : newCondition()) !== null && _e !== void 0 ? _e : {}],
                            },
                        ], false) }));
                }, text: addGroupText || locale.CConditions.addGroup }))));
}
export default CConditionsGroup;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=CConditionsGroup.js.map