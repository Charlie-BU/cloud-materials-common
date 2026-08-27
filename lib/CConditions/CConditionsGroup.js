"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../CConfigProvider");
var CRelation_1 = tslib_1.__importDefault(require("./CRelation"));
var CAddButton_1 = tslib_1.__importDefault(require("../CAddButton"));
var utils_1 = require("./utils");
var _1 = tslib_1.__importDefault(require("."));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
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
    var _j = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _j.useCssPrefix, locale = _j.locale;
    var cssPrefix = useCssPrefix('conditions-group');
    if (readonly) {
        return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))), className) },
            react_1.default.createElement(CRelation_1.default, { readonly: true, options: relationOptions, value: value === null || value === void 0 ? void 0 : value.relation }),
            react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["content"], ["content"]))) }, (_a = value === null || value === void 0 ? void 0 : value.groups) === null || _a === void 0 ? void 0 : _a.map(function (group, index) {
                var _a;
                return (react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["wrapper"], ["wrapper"]))), key: (_a = groupKey === null || groupKey === void 0 ? void 0 : groupKey(group)) !== null && _a !== void 0 ? _a : index }, groupRender ? (groupRender(group, undefined, index)) : (react_1.default.createElement(_1.default, { readonly: true, value: group, conditionRender: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return conditionRender.apply(void 0, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(args), false), [index], false));
                    }, key: index }))));
            }))));
    }
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["container"], ["container"]))), className) },
        react_1.default.createElement(CRelation_1.default, { disabled: disabled, options: relationOptions, value: value === null || value === void 0 ? void 0 : value.relation, onChange: function (val) { return onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { relation: val })); } }),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["content"], ["content"]))) }, (_b = value === null || value === void 0 ? void 0 : value.groups) === null || _b === void 0 ? void 0 :
            _b.map(function (group, index) {
                var _a;
                return (react_1.default.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["wrapper"], ["wrapper"]))), key: (_a = groupKey === null || groupKey === void 0 ? void 0 : groupKey(group)) !== null && _a !== void 0 ? _a : index },
                    groupRender ? (groupRender(group, onChange
                        ? function (val) {
                            var groups = tslib_1.__spreadArray([], tslib_1.__read(value.groups), false);
                            groups.splice(index, 1, val);
                            onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { groups: groups }));
                        }
                        : undefined, index)) : (react_1.default.createElement(_1.default, { minNum: minNum, maxNum: maxNum, disabled: disabled, value: group, addText: addText, allowClear: false, onChange: onChange
                            ? function (val) {
                                var groups = tslib_1.__spreadArray([], tslib_1.__read(value.groups), false);
                                groups.splice(index, 1, val);
                                onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { groups: groups }));
                            }
                            : undefined, conditionRender: function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return conditionRender.apply(void 0, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(args), false), [index], false));
                        }, conditionKey: conditionKey, newCondition: newCondition })),
                    value.groups.length > minGroupNum && (react_1.default.createElement(web_react_1.Button, { disabled: disabled, type: "text", className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["delete"], ["delete"]))), onClick: function () {
                            var groups = tslib_1.__spreadArray([], tslib_1.__read(value.groups), false);
                            groups.splice(index, 1);
                            onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { groups: groups }));
                        } }, deleteGroupText || locale.CConditions.deleteGroup))));
            }),
            react_1.default.createElement(CAddButton_1.default, { disabled: disabled || ((_d = (_c = value === null || value === void 0 ? void 0 : value.groups) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > maxGroupNum, className: (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["add"], ["add"]))), disabled && cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["disabled"], ["disabled"])))), type: "primary", onClick: function () {
                    var _a, _b, _c, _d, _e;
                    onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), { groups: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(((_a = value === null || value === void 0 ? void 0 : value.groups) !== null && _a !== void 0 ? _a : [])), false), [
                            (_b = newGroup === null || newGroup === void 0 ? void 0 : newGroup()) !== null && _b !== void 0 ? _b : {
                                relation: (0, utils_1.isStringOrNumber)(relationOptions === null || relationOptions === void 0 ? void 0 : relationOptions[0])
                                    ? relationOptions === null || relationOptions === void 0 ? void 0 : relationOptions[0]
                                    : (_d = (_c = relationOptions === null || relationOptions === void 0 ? void 0 : relationOptions[0]) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 'and',
                                conditions: [(_e = newCondition === null || newCondition === void 0 ? void 0 : newCondition()) !== null && _e !== void 0 ? _e : {}],
                            },
                        ], false) }));
                }, text: addGroupText || locale.CConditions.addGroup }))));
}
exports.default = CConditionsGroup;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=CConditionsGroup.js.map