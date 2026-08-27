import { __assign, __awaiter, __generator, __makeTemplateObject, __read } from "tslib";
import React, { cloneElement, Fragment, isValidElement, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Input, InputNumber, Popover, Select, Spin } from '@arco-design/web-react';
import CEllipsis from '../CEllipsis';
import CPopoverVerify from '../CPopoverVerify';
import { IconCheck, IconClose, IconEdit } from '@arco-design/web-react/icon';
import { identity, isEmpty, isNil, isPlainObject, noop } from 'lodash-es';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { useEdit } from '../hooks';
import { useCConfigContext } from '../CConfigProvider';
import createBuiltInComponent, { useBuiltIn } from '../_factory/builtInComponent';
var TextArea = Input.TextArea;
var builtInMap = {
    Input: Input,
    InputNumber: InputNumber,
    TextArea: TextArea,
    Select: Select,
};
var defaultOptBtnConfig = {
    btnType: 'icon',
    submitText: '',
    cancelText: '',
};
var cssRoot = classNamePrefixFactory('inline-edit');
export var testId = {
    container: cssRoot(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    editIcon: cssRoot(templateObject_2 || (templateObject_2 = __makeTemplateObject(["editIcon"], ["editIcon"]))),
    submitOpt: cssRoot(templateObject_3 || (templateObject_3 = __makeTemplateObject(["submitOpt"], ["submitOpt"]))),
    cancelOpt: cssRoot(templateObject_4 || (templateObject_4 = __makeTemplateObject(["cancelOpt"], ["cancelOpt"]))),
    input: cssRoot(templateObject_5 || (templateObject_5 = __makeTemplateObject(["input"], ["input"]))),
    textarea: cssRoot(templateObject_6 || (templateObject_6 = __makeTemplateObject(["textarea"], ["textarea"]))),
    inputnumber: cssRoot(templateObject_7 || (templateObject_7 = __makeTemplateObject(["inputnumber"], ["inputnumber"]))),
    select: cssRoot(templateObject_8 || (templateObject_8 = __makeTemplateObject(["select"], ["select"]))),
};
var globalConfig;
function CInlineEdit(props) {
    var _this = this;
    var value = props.value, _a = props.renderFormat, renderFormat = _a === void 0 ? identity : _a, _b = props.emptyData, emptyData = _b === void 0 ? '-' : _b, CEllipsisProps = props.CEllipsisProps, _c = props.showEditIcon, showEditIcon = _c === void 0 ? true : _c, bizType = props.bizType, children = props.children, _d = props.operationButton, operationButton = _d === void 0 ? defaultOptBtnConfig : _d, _e = props.initEditable, initEditable = _e === void 0 ? false : _e, _f = props.field, field = _f === void 0 ? {
        component: 'Input',
    } : _f, onSubmit = props.onSubmit, _g = props.onCancel, onCancel = _g === void 0 ? noop : _g, _h = props.fieldType, fieldType = _h === void 0 ? 'Input' : _h, options = props.options, arcoInputProps = props.arcoInputProps, arcoSelectProps = props.arcoSelectProps, arcoTextareaProps = props.arcoTextareaProps, arcoInputNumberProps = props.arcoInputNumberProps, arcoPopoverProps = props.arcoPopoverProps, _j = props.disabled, disabled = _j === void 0 ? false : _j, _k = props.disabledTips, disabledTips = _k === void 0 ? '' : _k, asyncValidator = props.asyncValidator, _l = props.enableAsyncValidateWhenBlur, enableAsyncValidateWhenBlur = _l === void 0 ? false : _l, rules = props.rules, style = props.style, className = props.className, suffix = props.suffix, _m = props.editTips, editTips = _m === void 0 ? '' : _m;
    var renderBuiltIn = useBuiltIn().renderBuiltIn;
    var _o = useCConfigContext(), locale = _o.locale, useCssPrefix = _o.useCssPrefix;
    var iconCls = useCssPrefix('')(templateObject_9 || (templateObject_9 = __makeTemplateObject(["icon"], ["icon"])));
    var cssPrefix = useCssPrefix('inline-edit');
    var config = isPlainObject(globalConfig) && bizType ? globalConfig[bizType] : null;
    var curRules = rules !== null && rules !== void 0 ? rules : config === null || config === void 0 ? void 0 : config.rules;
    var _p = __read(useEdit({
        value: value,
        initEditable: initEditable,
        rules: curRules,
    }), 2), _q = _p[0], editing = _q.editing, editValue = _q.editValue, submitting = _q.submitting, valid = _q.valid, _r = _p[1], startEditing = _r.startEditing, setEditValue = _r.setEditValue, handleSubmit = _r.handleSubmit, handleCancel = _r.handleCancel;
    var fieldRef = useRef(null);
    var _s = __read(useState(false), 2), asyncValidating = _s[0], setAsyncValidating = _s[1];
    var _t = __read(useState(''), 2), asyncErrMsg = _t[0], setAsyncErrMsg = _t[1];
    var displayContent = renderFormat(value);
    var btnType = operationButton.btnType, submitText = operationButton.submitText, cancelText = operationButton.cancelText;
    var fieldProps = {
        value: editValue,
        onChange: setEditValue,
    };
    useEffect(function () {
        var _a;
        editing && ((_a = fieldRef.current) === null || _a === void 0 ? void 0 : _a.focus());
    }, [editing]);
    var onEditIncoClick = function () {
        if (disabled) {
            return;
        }
        startEditing();
    };
    var onBlur = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /**
                     * 只有通过本地校验，才触发异步校验
                     */
                    if (!valid || !enableAsyncValidateWhenBlur || typeof asyncValidator !== 'function') {
                        return [2 /*return*/];
                    }
                    setAsyncValidating(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, asyncValidator(editValue)];
                case 2:
                    result = _a.sent();
                    setAsyncValidating(false);
                    setAsyncErrMsg(result || '');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setAsyncValidating(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var onMouseDown = function (event) {
        event.preventDefault();
    };
    var submit = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof asyncValidator === 'function')) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setAsyncValidating(true);
                    return [4 /*yield*/, asyncValidator(editValue)];
                case 2:
                    result = _a.sent();
                    setAsyncValidating(false);
                    setAsyncErrMsg(result || '');
                    if (result) {
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    setAsyncValidating(false);
                    return [3 /*break*/, 4];
                case 4:
                    handleSubmit(onSubmit);
                    return [2 /*return*/];
            }
        });
    }); };
    var cancel = function () {
        if (submitting || asyncValidating) {
            return;
        }
        // 重置异步校验状态
        setAsyncErrMsg('');
        handleCancel(onCancel);
    };
    var wrapperProps = {
        style: style,
        'data-cy': testId.container,
        'data-testid': testId.container,
        className: cx(cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject([""], [""]))), className),
    };
    var renderEditField = function () {
        if (isValidElement(children)) {
            return cloneElement(children, fieldProps);
        }
        if (typeof children === 'function') {
            return children(fieldProps);
        }
        var status = asyncErrMsg ? 'error' : '';
        if (fieldType === 'InputNumber') {
            return (React.createElement(InputNumber, __assign({ style: { width: 240 }, "data-testid": testId.inputnumber }, fieldProps, { className: cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["inputnumber"], ["inputnumber"]))), ref: fieldRef, status: status, onBlur: onBlur }, arcoInputNumberProps)));
        }
        if (fieldType === 'Textarea') {
            return (React.createElement(Input.TextArea, __assign({ style: { width: 240 }, "data-testid": testId.textarea, autoSize: { maxRows: 3 }, className: cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["textarea"], ["textarea"]))) }, fieldProps, { ref: fieldRef, onPressEnter: submit, status: status, onBlur: onBlur }, arcoTextareaProps)));
        }
        if (fieldType === 'Select') {
            return (React.createElement(Select, __assign({ options: options, "data-testid": testId.select }, fieldProps, { ref: fieldRef, className: cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["select"], ["select"]))), placeholder: locale.CInlineEdit.placeholder, status: status }, arcoSelectProps)));
        }
        return renderBuiltIn(field, {
            commonProps: __assign({ ref: fieldRef, style: { width: 240 }, placeholder: locale.CInlineEdit.placeholder, status: status, onBlur: onBlur }, fieldProps),
            defaultPropsMap: {
                Input: __assign({ className: cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["input"], ["input"]))), 'data-testid': testId.input, onPressEnter: submit, allowClear: true }, arcoInputProps),
                InputNumber: {
                    className: cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["inputnumber"], ["inputnumber"]))),
                    'data-testid': testId.inputnumber,
                },
                Textarea: {
                    className: cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["textarea"], ["textarea"]))),
                    'data-testid': testId.textarea,
                    autoSize: { maxRows: 3 },
                },
                Select: {
                    className: cssPrefix(templateObject_17 || (templateObject_17 = __makeTemplateObject(["select"], ["select"]))),
                    'data-testid': testId.select,
                },
            },
        });
    };
    var BtnGroup = function () {
        var _a, _b, _c, _d;
        if (btnType === 'text') {
            return (React.createElement("div", { className: cssPrefix(templateObject_18 || (templateObject_18 = __makeTemplateObject(["opt"], ["opt"]))) },
                submitting || asyncValidating ? (React.createElement(Spin, { size: 16 })) : (React.createElement("span", { "data-testid": testId.submitOpt, className: cx(cssPrefix(templateObject_19 || (templateObject_19 = __makeTemplateObject(["opt__text"], ["opt__text"]))), (_a = {},
                        _a[cssPrefix(templateObject_20 || (templateObject_20 = __makeTemplateObject(["opt__invalid"], ["opt__invalid"])))] = !valid,
                        _a)), onClick: submit, onMouseDown: onMouseDown }, submitText || locale.CInlineEdit.confirm)),
                React.createElement("span", { "data-testid": testId.cancelOpt, className: cx(cssPrefix(templateObject_21 || (templateObject_21 = __makeTemplateObject(["opt__text"], ["opt__text"]))), cssPrefix(templateObject_22 || (templateObject_22 = __makeTemplateObject(["opt__cancel"], ["opt__cancel"]))), (_b = {},
                        _b[cssPrefix(templateObject_23 || (templateObject_23 = __makeTemplateObject(["opt__submitting"], ["opt__submitting"])))] = submitting || asyncValidating,
                        _b)), onClick: cancel, onMouseDown: onMouseDown }, cancelText || locale.CInlineEdit.cancel)));
        }
        return (React.createElement("div", { className: cssPrefix(templateObject_24 || (templateObject_24 = __makeTemplateObject(["opt"], ["opt"]))) },
            submitting || asyncValidating ? (React.createElement(Spin, { size: 16 })) : (React.createElement(IconCheck, { "data-testid": testId.submitOpt, className: cx(cssPrefix(templateObject_25 || (templateObject_25 = __makeTemplateObject(["opt__icon"], ["opt__icon"]))), cssPrefix(templateObject_26 || (templateObject_26 = __makeTemplateObject(["opt__check"], ["opt__check"]))), iconCls, (_c = {},
                    _c[cssPrefix(templateObject_27 || (templateObject_27 = __makeTemplateObject(["opt__invalid"], ["opt__invalid"])))] = !valid,
                    _c)), onClick: submit, onMouseDown: onMouseDown })),
            React.createElement(IconClose, { "data-testid": testId.cancelOpt, className: cx(cssPrefix(templateObject_28 || (templateObject_28 = __makeTemplateObject(["opt__icon"], ["opt__icon"]))), cssPrefix(templateObject_29 || (templateObject_29 = __makeTemplateObject(["opt__close"], ["opt__close"]))), iconCls, (_d = {},
                    _d[cssPrefix(templateObject_30 || (templateObject_30 = __makeTemplateObject(["opt__submitting"], ["opt__submitting"])))] = submitting || asyncValidating,
                    _d)), onClick: cancel, onMouseDown: onMouseDown })));
    };
    var FieldWrapper = !isEmpty(curRules) ? CPopoverVerify : Fragment;
    var fieldWrapperProps = !isEmpty(curRules)
        ? { value: editValue, rules: curRules, arcoPopoverProps: __assign({ position: 'top' }, arcoPopoverProps) }
        : null;
    if (editing) {
        return (React.createElement("div", null,
            React.createElement("div", __assign({}, wrapperProps),
                React.createElement(FieldWrapper, __assign({}, fieldWrapperProps), renderEditField()),
                React.createElement(BtnGroup, null)),
            asyncErrMsg && React.createElement("div", { className: cssPrefix(templateObject_31 || (templateObject_31 = __makeTemplateObject(["error-message"], ["error-message"]))) }, asyncErrMsg)));
    }
    return (React.createElement("div", __assign({}, wrapperProps),
        React.createElement(CEllipsis, __assign({}, CEllipsisProps, { suffix: React.createElement(React.Fragment, null, CEllipsisProps === null || CEllipsisProps === void 0 ? void 0 :
                CEllipsisProps.suffix,
                showEditIcon && (React.createElement(Popover, { disabled: (!disabled || !disabledTips) && !editTips, content: disabledTips || editTips },
                    React.createElement(IconEdit, { className: cx(cssPrefix(templateObject_32 || (templateObject_32 = __makeTemplateObject(["edit"], ["edit"]))), iconCls, {
                            disabled: disabled,
                        }), onClick: onEditIncoClick, "data-testid": testId.editIcon }))),
                suffix) }), isNil(displayContent) || displayContent === '' ? (config === null || config === void 0 ? void 0 : config.emptyData) || emptyData : displayContent)));
}
var InnerCpn = Object.assign(createBuiltInComponent(CInlineEdit, builtInMap), {
    config: function (options) {
        globalConfig = __assign({}, options);
    },
    displayName: 'CInlineEdit',
});
export default InnerCpn;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32;
//# sourceMappingURL=index.js.map