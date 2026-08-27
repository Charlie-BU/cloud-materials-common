"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var useMergeProps_1 = require("../hooks/useMergeProps");
var CConfigProvider_1 = require("../CConfigProvider");
var util_1 = require("./util");
var useEdit_1 = require("../hooks/useEdit");
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var TextArea = web_react_1.Input.TextArea;
var cssRoot = (0, util_1.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
exports.testId = {
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
    var _c = (0, CConfigProvider_1.useCConfigContext)(), locale = _c.locale, useCssPrefix = _c.useCssPrefix, cComponentConfig = _c.cComponentConfig;
    var classPrefix = useCssPrefix('popup-edit');
    var iconCls = useCssPrefix('')(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["icon"], ["icon"])));
    var mergeProps = (0, useMergeProps_1.useMergeProps)(props, getDefaultProps(locale), (_b = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CPopupEdit) !== null && _b !== void 0 ? _b : {});
    var style = mergeProps.style, rules = mergeProps.rules, className = mergeProps.className, title = mergeProps.title, defaultValue = mergeProps.defaultValue, type = mergeProps.type, trigger = mergeProps.trigger, position = mergeProps.position, width = mergeProps.width, maxLength = mergeProps.maxLength, placeholder = mergeProps.placeholder, okButtonProps = mergeProps.okButtonProps, cancelButtonProps = mergeProps.cancelButtonProps, displayContent = mergeProps.displayContent, displayEditIcon = mergeProps.displayEditIcon, cEllipsisProps = mergeProps.cEllipsisProps, showCopy = mergeProps.showCopy, cCopyProps = mergeProps.cCopyProps, showEdit = mergeProps.showEdit, disabled = mergeProps.disabled, arcoInputProps = mergeProps.arcoInputProps, arcoTextareaProps = mergeProps.arcoTextareaProps, arcoPopconfirmProps = mergeProps.arcoPopconfirmProps, arcoPopoverProps = mergeProps.arcoPopoverProps, suffix = mergeProps.suffix, emptyNode = mergeProps.emptyNode, maxLengthErrorMsg = mergeProps.maxLengthErrorMsg, onOk = mergeProps.onOk, onCancel = mergeProps.onCancel;
    var newRules = rules || [];
    if (maxLength) {
        newRules.push({
            message: maxLengthErrorMsg,
            maxLength: maxLength,
        });
    }
    var cNewEllipsisProps = (0, useMergeProps_1.useMergeProps)({ showCopy: showCopy, cCopyProps: cCopyProps }, cEllipsisProps, {});
    var _d = tslib_1.__read((0, useEdit_1.useEdit)({
        value: defaultValue,
        rules: newRules,
        stopAtFirstError: true,
    }), 2), _e = _d[0], editValue = _e.editValue, valid = _e.valid, _f = tslib_1.__read(_e.errors, 1), error = _f[0], submitting = _e.submitting, _g = _d[1], setEditValue = _g.setEditValue, handleSubmit = _g.handleSubmit, handleCancel = _g.handleCancel;
    var cNewArcoPopconfirmProps = (0, useMergeProps_1.useMergeProps)({
        trigger: trigger,
        position: position,
        cancelButtonProps: cancelButtonProps,
        okButtonProps: tslib_1.__assign(tslib_1.__assign({}, okButtonProps), { disabled: !valid, loading: submitting }),
    }, arcoPopconfirmProps, {});
    var fieldProps = {
        value: editValue,
        onChange: setEditValue,
    };
    var _h = tslib_1.__read((0, react_1.useState)(showEdit), 2), visible = _h[0], setVisible = _h[1];
    var _j = tslib_1.__read((0, react_1.useState)(false), 2), editIconIsActive = _j[0], setEditIconIsActive = _j[1];
    var _k = tslib_1.__read((0, react_1.useState)(arcoPopconfirmProps === null || arcoPopconfirmProps === void 0 ? void 0 : arcoPopconfirmProps.popupVisible), 2), popupVisible = _k[0], setPopupVisible = _k[1];
    var renderErrorMessage = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null, error && (react_1.default.createElement("div", { style: { width: "".concat(width, "px") }, className: classPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["error-message"], ["error-message"]))), "data-testid": exports.testId.error }, error === null || error === void 0 ? void 0 : error.message))));
    };
    var renderEditField = function () {
        if (type === 'input') {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement(web_react_1.Input, tslib_1.__assign({ allowClear: true, ref: function (ref) { return ref === null || ref === void 0 ? void 0 : ref.focus(); }, maxLength: maxLength && { length: maxLength, errorOnly: true }, showWordLimit: !!maxLength, placeholder: placeholder, style: { width: "".concat(width, "px") } }, fieldProps, arcoInputProps, { status: !!error ? 'error' : undefined, "data-testid": exports.testId.input, onPressEnter: onPressEnter }))),
                renderErrorMessage()));
        }
        if (type === 'textArea') {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement(TextArea, tslib_1.__assign({ style: {
                            minHeight: 75,
                            width: "".concat(width, "px"),
                        }, allowClear: true, autoFocus: true, status: !!error ? 'error' : undefined, maxLength: maxLength && { length: maxLength, errorOnly: true }, showWordLimit: !!maxLength, placeholder: placeholder }, fieldProps, arcoTextareaProps, { "data-testid": exports.testId.textArea, onPressEnter: onPressEnter, onFocus: function (e) { return e.target.setSelectionRange(e.target.value.length, e.target.value.length); } }))),
                renderErrorMessage()));
        }
    };
    var onPressEnter = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return tslib_1.__generator(this, function (_a) {
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
        return (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({}, arcoPopoverProps),
            react_1.default.createElement("span", { className: (0, classnames_1.default)(classPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["popconfirm-edit"], ["popconfirm-edit"]))), (_a = {},
                    _a[classPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["popconfirm-edit-icon-hide"], ["popconfirm-edit-icon-hide"])))] = !visible,
                    _a[classPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["popconfirm-edit-icon-show"], ["popconfirm-edit-icon-show"])))] = visible,
                    _a)), style: { marginLeft: (cNewEllipsisProps === null || cNewEllipsisProps === void 0 ? void 0 : cNewEllipsisProps.showCopy) ? '12px' : '4px' }, "data-testid": exports.testId.editIcon }, mergeProps.hasOwnProperty('displayEditIcon') ? (displayEditIcon) : (react_1.default.createElement(icon_1.IconEdit, { className: (0, classnames_1.default)(iconCls, classPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["popconfirm-edit-icon"], ["popconfirm-edit-icon"]))), (_b = {},
                    _b['active'] = editIconIsActive,
                    _b['disabled'] = disabled,
                    _b)) })))));
    };
    var renderPopconfirmElement = function () {
        return (react_1.default.createElement(web_react_1.Popconfirm, tslib_1.__assign({ className: (0, classnames_1.default)(classPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["popconfirm"], ["popconfirm"])))), style: { maxWidth: 'none', width: 'auto' }, icon: null, disabled: disabled, onVisibleChange: function (visible) {
                setPopupVisible(visible);
                if (!showEdit) {
                    setVisible(visible);
                }
                setEditIconIsActive(visible);
                setEditValue(defaultValue);
            }, title: react_1.default.createElement("div", { "data-testid": exports.testId.popconfirm },
                title && (react_1.default.createElement("div", { className: classPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["popconfirm-title"], ["popconfirm-title"]))), "data-testid": exports.testId.title }, title)),
                renderEditField()), cancelButtonProps: cancelButtonProps, okButtonProps: okButtonProps, trigger: trigger, onOk: function () {
                if (onOk) {
                    return handleSubmit(onOk);
                }
            }, onCancel: function () { return handleCancel(onCancel); }, position: position, okText: locale.CPopupEdit.confirm }, cNewArcoPopconfirmProps, { popupVisible: popupVisible }), renderEditIcon()));
    };
    return (react_1.default.createElement("span", { className: (0, classnames_1.default)(classPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject([""], [""]))), className, (_a = {},
            _a[classPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["hover-show-icon"], ["hover-show-icon"])))] = !visible,
            _a)), style: tslib_1.__assign({}, style), "data-testid": exports.testId.container },
        react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({ className: classPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["value"], ["value"]))), content: react_1.default.createElement(react_1.default.Fragment, null, mergeProps.hasOwnProperty('displayContent') ? displayContent : defaultValue || emptyNode) }, cNewEllipsisProps, { suffix: react_1.default.createElement(react_1.default.Fragment, null,
                (cNewEllipsisProps === null || cNewEllipsisProps === void 0 ? void 0 : cNewEllipsisProps.suffix) && cNewEllipsisProps.suffix,
                renderPopconfirmElement(),
                suffix) }))));
};
CPopupEdit.displayName = 'CPopupEdit';
exports.default = CPopupEdit;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=index.js.map