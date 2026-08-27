import { __assign, __makeTemplateObject, __read, __spreadArray } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { omit } from 'lodash-es';
import { Button } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import { useCConfigContext } from '../CConfigProvider';
import CRelation from './CRelation';
import CAddButton from '../CAddButton';
import CConditionGroup from './CConditionsGroup';
var DivComp = function (props) { return React.createElement("div", __assign({}, omit(props, ['value', 'onChange', 'index']))); };
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
    var _o = useCConfigContext(), useCssPrefix = _o.useCssPrefix, locale = _o.locale;
    var cssPrefix = useCssPrefix('conditions');
    if (readonly) {
        return (React.createElement("div", { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))), className), style: style },
            React.createElement(CRelation, { readonly: true, options: relationOptions, value: value.relation }),
            React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["content"], ["content"]))), cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["view"], ["view"])))) }, value.conditions.map(function (item, index) { return (React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["view-item"], ["view-item"]))), key: index }, conditionRender(item))); }))));
    }
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["container"], ["container"]))), className), style: style },
        React.createElement(CRelation, { disabled: disabled, options: relationOptions, value: value.relation, onChange: function (val) {
                onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { relation: val }));
            } }),
        React.createElement(Container, { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["content"], ["content"]))), value: value, onChange: onChange }, (_b = value.conditions) === null || _b === void 0 ? void 0 :
            _b.map(function (item, index) {
                var _a, _b;
                return (React.createElement(ConditionWrapper, { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["condition-wrapper"], ["condition-wrapper"]))), key: (_a = conditionKey === null || conditionKey === void 0 ? void 0 : conditionKey(item)) !== null && _a !== void 0 ? _a : index, index: index },
                    conditionRender(item, onChange
                        ? function (val) {
                            var conditions = __spreadArray([], __read(value.conditions), false);
                            conditions[index] = val;
                            onChange(__assign(__assign({}, value), { conditions: conditions }));
                        }
                        : undefined, index),
                    ((_b = value.conditions) === null || _b === void 0 ? void 0 : _b.length) > minNum && (React.createElement("div", { className: classNames(cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["condition-delete"], ["condition-delete"]))), disabled && 'disabled'), onClick: function () {
                            if (!disabled) {
                                var conditions = __spreadArray([], __read(value.conditions), false);
                                conditions.splice(index, 1);
                                onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { conditions: conditions }));
                            }
                        } },
                        React.createElement(IconDelete, { className: classNames('c-m-icon', { disabled: disabled }, cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["condition-delete-icon"], ["condition-delete-icon"])))) })))));
            }),
            React.createElement("div", null,
                React.createElement(CAddButton, { disabled: disabled || ((_c = value.conditions) === null || _c === void 0 ? void 0 : _c.length) >= maxNum, className: classNames(cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["condition-add"], ["condition-add"]))), disabled && cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["disabled"], ["disabled"])))), type: "primary", onClick: function () {
                        var _a, _b;
                        onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { conditions: __spreadArray(__spreadArray([], __read(((_a = value.conditions) !== null && _a !== void 0 ? _a : [])), false), [(_b = newCondition === null || newCondition === void 0 ? void 0 : newCondition()) !== null && _b !== void 0 ? _b : {}], false) }));
                    }, text: addText || locale.CConditions.add }),
                allowClear && ((_d = value.conditions) === null || _d === void 0 ? void 0 : _d.length) > minNum && (React.createElement(Button, { disabled: disabled, type: "text", className: cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["condition-clear"], ["condition-clear"]))), onClick: function () {
                        var _a;
                        onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, value), { conditions: Array(minNum).fill((_a = newCondition === null || newCondition === void 0 ? void 0 : newCondition()) !== null && _a !== void 0 ? _a : {}) }));
                    } }, clearText || locale.CConditions.clear))))));
}
CConditions.Relation = CRelation;
CConditions.Group = CConditionGroup;
CConditions.displayName = 'CConditions';
export default CConditions;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=index.js.map