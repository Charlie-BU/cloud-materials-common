"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var CPopoverVerify_1 = tslib_1.__importDefault(require("../CPopoverVerify"));
var icon_1 = require("@arco-design/web-react/icon");
var lodash_es_1 = require("lodash-es");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var hooks_1 = require("../hooks");
var CConfigProvider_1 = require("../CConfigProvider");
var builtInComponent_1 = tslib_1.__importStar(require("../_factory/builtInComponent"));
var TextArea = web_react_1.Input.TextArea;
var builtInMap = {
    Input: web_react_1.Input,
    InputNumber: web_react_1.InputNumber,
    TextArea: TextArea,
    Select: web_react_1.Select,
};
var defaultOptBtnConfig = {
    btnType: 'icon',
    submitText: '',
    cancelText: '',
};
var cssRoot = (0, classNamePrefixFactory_1.default)('inline-edit');
exports.testId = {
    container: cssRoot(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    editIcon: cssRoot(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["editIcon"], ["editIcon"]))),
    submitOpt: cssRoot(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["submitOpt"], ["submitOpt"]))),
    cancelOpt: cssRoot(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["cancelOpt"], ["cancelOpt"]))),
    input: cssRoot(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["input"], ["input"]))),
    textarea: cssRoot(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["textarea"], ["textarea"]))),
    inputnumber: cssRoot(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["inputnumber"], ["inputnumber"]))),
    select: cssRoot(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["select"], ["select"]))),
};
var globalConfig;
function CInlineEdit(props) {
    var _this = this;
    var value = props.value, _a = props.renderFormat, renderFormat = _a === void 0 ? lodash_es_1.identity : _a, _b = props.emptyData, emptyData = _b === void 0 ? '-' : _b, CEllipsisProps = props.CEllipsisProps, _c = props.showEditIcon, showEditIcon = _c === void 0 ? true : _c, bizType = props.bizType, children = props.children, _d = props.operationButton, operationButton = _d === void 0 ? defaultOptBtnConfig : _d, _e = props.initEditable, initEditable = _e === void 0 ? false : _e, _f = props.field, field = _f === void 0 ? {
        component: 'Input',
    } : _f, onSubmit = props.onSubmit, _g = props.onCancel, onCancel = _g === void 0 ? lodash_es_1.noop : _g, _h = props.fieldType, fieldType = _h === void 0 ? 'Input' : _h, options = props.options, arcoInputProps = props.arcoInputProps, arcoSelectProps = props.arcoSelectProps, arcoTextareaProps = props.arcoTextareaProps, arcoInputNumberProps = props.arcoInputNumberProps, arcoPopoverProps = props.arcoPopoverProps, _j = props.disabled, disabled = _j === void 0 ? false : _j, _k = props.disabledTips, disabledTips = _k === void 0 ? '' : _k, asyncValidator = props.asyncValidator, _l = props.enableAsyncValidateWhenBlur, enableAsyncValidateWhenBlur = _l === void 0 ? false : _l, rules = props.rules, style = props.style, className = props.className, suffix = props.suffix, _m = props.editTips, editTips = _m === void 0 ? '' : _m;
    var renderBuiltIn = (0, builtInComponent_1.useBuiltIn)().renderBuiltIn;
    var _o = (0, CConfigProvider_1.useCConfigContext)(), locale = _o.locale, useCssPrefix = _o.useCssPrefix;
    var iconCls = useCssPrefix('')(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["icon"], ["icon"])));
    var cssPrefix = useCssPrefix('inline-edit');
    var config = (0, lodash_es_1.isPlainObject)(globalConfig) && bizType ? globalConfig[bizType] : null;
    var curRules = rules !== null && rules !== void 0 ? rules : config === null || config === void 0 ? void 0 : config.rules;
    var _p = tslib_1.__read((0, hooks_1.useEdit)({
        value: value,
        initEditable: initEditable,
        rules: curRules,
    }), 2), _q = _p[0], editing = _q.editing, editValue = _q.editValue, submitting = _q.submitting, valid = _q.valid, _r = _p[1], startEditing = _r.startEditing, setEditValue = _r.setEditValue, handleSubmit = _r.handleSubmit, handleCancel = _r.handleCancel;
    var fieldRef = (0, react_1.useRef)(null);
    var _s = tslib_1.__read((0, react_1.useState)(false), 2), asyncValidating = _s[0], setAsyncValidating = _s[1];
    var _t = tslib_1.__read((0, react_1.useState)(''), 2), asyncErrMsg = _t[0], setAsyncErrMsg = _t[1];
    var displayContent = renderFormat(value);
    var btnType = operationButton.btnType, submitText = operationButton.submitText, cancelText = operationButton.cancelText;
    var fieldProps = {
        value: editValue,
        onChange: setEditValue,
    };
    (0, react_1.useEffect)(function () {
        var _a;
        editing && ((_a = fieldRef.current) === null || _a === void 0 ? void 0 : _a.focus());
    }, [editing]);
    var onEditIncoClick = function () {
        if (disabled) {
            return;
        }
        startEditing();
    };
    var onBlur = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return tslib_1.__generator(this, function (_a) {
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
    var submit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var result, error_2;
        return tslib_1.__generator(this, function (_a) {
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
        'data-cy': exports.testId.container,
        'data-testid': exports.testId.container,
        className: (0, classnames_1.default)(cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject([""], [""]))), className),
    };
    var renderEditField = function () {
        if ((0, react_1.isValidElement)(children)) {
            return (0, react_1.cloneElement)(children, fieldProps);
        }
        if (typeof children === 'function') {
            return children(fieldProps);
        }
        var status = asyncErrMsg ? 'error' : '';
        if (fieldType === 'InputNumber') {
            return (react_1.default.createElement(web_react_1.InputNumber, tslib_1.__assign({ style: { width: 240 }, "data-testid": exports.testId.inputnumber }, fieldProps, { className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["inputnumber"], ["inputnumber"]))), ref: fieldRef, status: status, onBlur: onBlur }, arcoInputNumberProps)));
        }
        if (fieldType === 'Textarea') {
            return (react_1.default.createElement(web_react_1.Input.TextArea, tslib_1.__assign({ style: { width: 240 }, "data-testid": exports.testId.textarea, autoSize: { maxRows: 3 }, className: cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["textarea"], ["textarea"]))) }, fieldProps, { ref: fieldRef, onPressEnter: submit, status: status, onBlur: onBlur }, arcoTextareaProps)));
        }
        if (fieldType === 'Select') {
            return (react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ options: options, "data-testid": exports.testId.select }, fieldProps, { ref: fieldRef, className: cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["select"], ["select"]))), placeholder: locale.CInlineEdit.placeholder, status: status }, arcoSelectProps)));
        }
        return renderBuiltIn(field, {
            commonProps: tslib_1.__assign({ ref: fieldRef, style: { width: 240 }, placeholder: locale.CInlineEdit.placeholder, status: status, onBlur: onBlur }, fieldProps),
            defaultPropsMap: {
                Input: tslib_1.__assign({ className: cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["input"], ["input"]))), 'data-testid': exports.testId.input, onPressEnter: submit, allowClear: true }, arcoInputProps),
                InputNumber: {
                    className: cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["inputnumber"], ["inputnumber"]))),
                    'data-testid': exports.testId.inputnumber,
                },
                Textarea: {
                    className: cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["textarea"], ["textarea"]))),
                    'data-testid': exports.testId.textarea,
                    autoSize: { maxRows: 3 },
                },
                Select: {
                    className: cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["select"], ["select"]))),
                    'data-testid': exports.testId.select,
                },
            },
        });
    };
    var BtnGroup = function () {
        var _a, _b, _c, _d;
        if (btnType === 'text') {
            return (react_1.default.createElement("div", { className: cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["opt"], ["opt"]))) },
                submitting || asyncValidating ? (react_1.default.createElement(web_react_1.Spin, { size: 16 })) : (react_1.default.createElement("span", { "data-testid": exports.testId.submitOpt, className: (0, classnames_1.default)(cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["opt__text"], ["opt__text"]))), (_a = {},
                        _a[cssPrefix(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["opt__invalid"], ["opt__invalid"])))] = !valid,
                        _a)), onClick: submit, onMouseDown: onMouseDown }, submitText || locale.CInlineEdit.confirm)),
                react_1.default.createElement("span", { "data-testid": exports.testId.cancelOpt, className: (0, classnames_1.default)(cssPrefix(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["opt__text"], ["opt__text"]))), cssPrefix(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["opt__cancel"], ["opt__cancel"]))), (_b = {},
                        _b[cssPrefix(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["opt__submitting"], ["opt__submitting"])))] = submitting || asyncValidating,
                        _b)), onClick: cancel, onMouseDown: onMouseDown }, cancelText || locale.CInlineEdit.cancel)));
        }
        return (react_1.default.createElement("div", { className: cssPrefix(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["opt"], ["opt"]))) },
            submitting || asyncValidating ? (react_1.default.createElement(web_react_1.Spin, { size: 16 })) : (react_1.default.createElement(icon_1.IconCheck, { "data-testid": exports.testId.submitOpt, className: (0, classnames_1.default)(cssPrefix(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["opt__icon"], ["opt__icon"]))), cssPrefix(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["opt__check"], ["opt__check"]))), iconCls, (_c = {},
                    _c[cssPrefix(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["opt__invalid"], ["opt__invalid"])))] = !valid,
                    _c)), onClick: submit, onMouseDown: onMouseDown })),
            react_1.default.createElement(icon_1.IconClose, { "data-testid": exports.testId.cancelOpt, className: (0, classnames_1.default)(cssPrefix(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject(["opt__icon"], ["opt__icon"]))), cssPrefix(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["opt__close"], ["opt__close"]))), iconCls, (_d = {},
                    _d[cssPrefix(templateObject_30 || (templateObject_30 = tslib_1.__makeTemplateObject(["opt__submitting"], ["opt__submitting"])))] = submitting || asyncValidating,
                    _d)), onClick: cancel, onMouseDown: onMouseDown })));
    };
    var FieldWrapper = !(0, lodash_es_1.isEmpty)(curRules) ? CPopoverVerify_1.default : react_1.Fragment;
    var fieldWrapperProps = !(0, lodash_es_1.isEmpty)(curRules)
        ? { value: editValue, rules: curRules, arcoPopoverProps: tslib_1.__assign({ position: 'top' }, arcoPopoverProps) }
        : null;
    if (editing) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", tslib_1.__assign({}, wrapperProps),
                react_1.default.createElement(FieldWrapper, tslib_1.__assign({}, fieldWrapperProps), renderEditField()),
                react_1.default.createElement(BtnGroup, null)),
            asyncErrMsg && react_1.default.createElement("div", { className: cssPrefix(templateObject_31 || (templateObject_31 = tslib_1.__makeTemplateObject(["error-message"], ["error-message"]))) }, asyncErrMsg)));
    }
    return (react_1.default.createElement("div", tslib_1.__assign({}, wrapperProps),
        react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({}, CEllipsisProps, { suffix: react_1.default.createElement(react_1.default.Fragment, null, CEllipsisProps === null || CEllipsisProps === void 0 ? void 0 :
                CEllipsisProps.suffix,
                showEditIcon && (react_1.default.createElement(web_react_1.Popover, { disabled: (!disabled || !disabledTips) && !editTips, content: disabledTips || editTips },
                    react_1.default.createElement(icon_1.IconEdit, { className: (0, classnames_1.default)(cssPrefix(templateObject_32 || (templateObject_32 = tslib_1.__makeTemplateObject(["edit"], ["edit"]))), iconCls, {
                            disabled: disabled,
                        }), onClick: onEditIncoClick, "data-testid": exports.testId.editIcon }))),
                suffix) }), (0, lodash_es_1.isNil)(displayContent) || displayContent === '' ? (config === null || config === void 0 ? void 0 : config.emptyData) || emptyData : displayContent)));
}
var InnerCpn = Object.assign((0, builtInComponent_1.default)(CInlineEdit, builtInMap), {
    config: function (options) {
        globalConfig = tslib_1.__assign({}, options);
    },
    displayName: 'CInlineEdit',
});
exports.default = InnerCpn;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32;
//# sourceMappingURL=index.js.map