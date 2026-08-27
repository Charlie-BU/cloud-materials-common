import { __assign, __awaiter, __generator, __makeTemplateObject, __read } from "tslib";
import React, { useState } from 'react';
import { Input, Popconfirm, Popover } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import cs from 'classnames';
import { useMergeProps } from '../hooks/useMergeProps';
import { useCConfigContext } from '../CConfigProvider';
import { cssPrefix } from './util';
import { useEdit } from '../hooks/useEdit';
import CEllipsis from '../CEllipsis';
var TextArea = Input.TextArea;
var cssRoot = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
export var testId = {
    container: "".concat(cssRoot, "-container"),
    input: "".concat(cssRoot, "-input"),
    textArea: "".concat(cssRoot, "-textArea"),
    title: "".concat(cssRoot, "-title"),
    editIcon: "".concat(cssRoot, "-edit-icon"),
    popconfirm: "".concat(cssRoot, "-popconfirm"),
    error: "".concat(cssRoot, "-error"),
};
var getDefaultProps = function (locale) {
    return {
        defaultValue: '',
        type: 'input',
        placeholder: locale.CPopupEdit.placeholder,
        okButtonProps: { size: 'mini' },
        cancelButtonProps: { size: 'mini' },
        width: 240,
        showEdit: true,
        disabled: false,
        cEllipsisProps: {
            showCopy: false,
        },
        arcoPopoverProps: {
            disabled: true,
        },
        emptyNode: '-',
        maxLengthErrorMsg: locale.CPopupEdit.maxLengthErrorMsg,
    };
};
var CPopupEdit = function (props) {
    var _a;
    var _b;
    var _c = useCConfigContext(), locale = _c.locale, useCssPrefix = _c.useCssPrefix, cComponentConfig = _c.cComponentConfig;
    var classPrefix = useCssPrefix('popup-edit');
    var iconCls = useCssPrefix('')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["icon"], ["icon"])));
    var mergeProps = useMergeProps(props, getDefaultProps(locale), (_b = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CPopupEdit) !== null && _b !== void 0 ? _b : {});
    var style = mergeProps.style, rules = mergeProps.rules, className = mergeProps.className, title = mergeProps.title, defaultValue = mergeProps.defaultValue, type = mergeProps.type, trigger = mergeProps.trigger, position = mergeProps.position, width = mergeProps.width, maxLength = mergeProps.maxLength, placeholder = mergeProps.placeholder, okButtonProps = mergeProps.okButtonProps, cancelButtonProps = mergeProps.cancelButtonProps, displayContent = mergeProps.displayContent, displayEditIcon = mergeProps.displayEditIcon, cEllipsisProps = mergeProps.cEllipsisProps, showCopy = mergeProps.showCopy, cCopyProps = mergeProps.cCopyProps, showEdit = mergeProps.showEdit, disabled = mergeProps.disabled, arcoInputProps = mergeProps.arcoInputProps, arcoTextareaProps = mergeProps.arcoTextareaProps, arcoPopconfirmProps = mergeProps.arcoPopconfirmProps, arcoPopoverProps = mergeProps.arcoPopoverProps, suffix = mergeProps.suffix, emptyNode = mergeProps.emptyNode, maxLengthErrorMsg = mergeProps.maxLengthErrorMsg, onOk = mergeProps.onOk, onCancel = mergeProps.onCancel;
    var newRules = rules || [];
    if (maxLength) {
        newRules.push({
            message: maxLengthErrorMsg,
            maxLength: maxLength,
        });
    }
    var cNewEllipsisProps = useMergeProps({ showCopy: showCopy, cCopyProps: cCopyProps }, cEllipsisProps, {});
    var _d = __read(useEdit({
        value: defaultValue,
        rules: newRules,
        stopAtFirstError: true,
    }), 2), _e = _d[0], editValue = _e.editValue, valid = _e.valid, _f = __read(_e.errors, 1), error = _f[0], submitting = _e.submitting, _g = _d[1], setEditValue = _g.setEditValue, handleSubmit = _g.handleSubmit, handleCancel = _g.handleCancel;
    var cNewArcoPopconfirmProps = useMergeProps({
        trigger: trigger,
        position: position,
        cancelButtonProps: cancelButtonProps,
        okButtonProps: __assign(__assign({}, okButtonProps), { disabled: !valid, loading: submitting }),
    }, arcoPopconfirmProps, {});
    var fieldProps = {
        value: editValue,
        onChange: setEditValue,
    };
    var _h = __read(useState(showEdit), 2), visible = _h[0], setVisible = _h[1];
    var _j = __read(useState(false), 2), editIconIsActive = _j[0], setEditIconIsActive = _j[1];
    var _k = __read(useState(arcoPopconfirmProps === null || arcoPopconfirmProps === void 0 ? void 0 : arcoPopconfirmProps.popupVisible), 2), popupVisible = _k[0], setPopupVisible = _k[1];
    var renderErrorMessage = function () {
        return (React.createElement(React.Fragment, null, error && (React.createElement("div", { style: { width: "".concat(width, "px") }, className: classPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["error-message"], ["error-message"]))), "data-testid": testId.error }, error === null || error === void 0 ? void 0 : error.message))));
    };
    var renderEditField = function () {
        if (type === 'input') {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    React.createElement(Input, __assign({ allowClear: true, ref: function (ref) { return ref === null || ref === void 0 ? void 0 : ref.focus(); }, maxLength: maxLength && { length: maxLength, errorOnly: true }, showWordLimit: !!maxLength, placeholder: placeholder, style: { width: "".concat(width, "px") } }, fieldProps, arcoInputProps, { status: !!error ? 'error' : undefined, "data-testid": testId.input, onPressEnter: onPressEnter }))),
                renderErrorMessage()));
        }
        if (type === 'textArea') {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    React.createElement(TextArea, __assign({ style: {
                            minHeight: 75,
                            width: "".concat(width, "px"),
                        }, allowClear: true, autoFocus: true, status: !!error ? 'error' : undefined, maxLength: maxLength && { length: maxLength, errorOnly: true }, showWordLimit: !!maxLength, placeholder: placeholder }, fieldProps, arcoTextareaProps, { "data-testid": testId.textArea, onPressEnter: onPressEnter, onFocus: function (e) { return e.target.setSelectionRange(e.target.value.length, e.target.value.length); } }))),
                renderErrorMessage()));
        }
    };
    var onPressEnter = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!onOk) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, handleSubmit(onOk)];
                case 2:
                    _a.sent();
                    setPopupVisible(false);
                    setEditIconIsActive(false);
                    setVisible(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setPopupVisible(true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var renderEditIcon = function () {
        var _a, _b;
        return (React.createElement(Popover, __assign({}, arcoPopoverProps),
            React.createElement("span", { className: cs(classPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["popconfirm-edit"], ["popconfirm-edit"]))), (_a = {},
                    _a[classPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["popconfirm-edit-icon-hide"], ["popconfirm-edit-icon-hide"])))] = !visible,
                    _a[classPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["popconfirm-edit-icon-show"], ["popconfirm-edit-icon-show"])))] = visible,
                    _a)), style: { marginLeft: (cNewEllipsisProps === null || cNewEllipsisProps === void 0 ? void 0 : cNewEllipsisProps.showCopy) ? '12px' : '4px' }, "data-testid": testId.editIcon }, mergeProps.hasOwnProperty('displayEditIcon') ? (displayEditIcon) : (React.createElement(IconEdit, { className: cs(iconCls, classPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["popconfirm-edit-icon"], ["popconfirm-edit-icon"]))), (_b = {},
                    _b['active'] = editIconIsActive,
                    _b['disabled'] = disabled,
                    _b)) })))));
    };
    var renderPopconfirmElement = function () {
        return (React.createElement(Popconfirm, __assign({ className: cs(classPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["popconfirm"], ["popconfirm"])))), style: { maxWidth: 'none', width: 'auto' }, icon: null, disabled: disabled, onVisibleChange: function (visible) {
                setPopupVisible(visible);
                if (!showEdit) {
                    setVisible(visible);
                }
                setEditIconIsActive(visible);
                setEditValue(defaultValue);
            }, title: React.createElement("div", { "data-testid": testId.popconfirm },
                title && (React.createElement("div", { className: classPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["popconfirm-title"], ["popconfirm-title"]))), "data-testid": testId.title }, title)),
                renderEditField()), cancelButtonProps: cancelButtonProps, okButtonProps: okButtonProps, trigger: trigger, onOk: function () {
                if (onOk) {
                    return handleSubmit(onOk);
                }
            }, onCancel: function () { return handleCancel(onCancel); }, position: position, okText: locale.CPopupEdit.confirm }, cNewArcoPopconfirmProps, { popupVisible: popupVisible }), renderEditIcon()));
    };
    return (React.createElement("span", { className: cs(classPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject([""], [""]))), className, (_a = {},
            _a[classPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["hover-show-icon"], ["hover-show-icon"])))] = !visible,
            _a)), style: __assign({}, style), "data-testid": testId.container },
        React.createElement(CEllipsis, __assign({ className: classPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["value"], ["value"]))), content: React.createElement(React.Fragment, null, mergeProps.hasOwnProperty('displayContent') ? displayContent : defaultValue || emptyNode) }, cNewEllipsisProps, { suffix: React.createElement(React.Fragment, null,
                (cNewEllipsisProps === null || cNewEllipsisProps === void 0 ? void 0 : cNewEllipsisProps.suffix) && cNewEllipsisProps.suffix,
                renderPopconfirmElement(),
                suffix) }))));
};
CPopupEdit.displayName = 'CPopupEdit';
export default CPopupEdit;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=index.js.map