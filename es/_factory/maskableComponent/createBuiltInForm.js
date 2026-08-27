import { __assign, __makeTemplateObject, __read, __rest, __spreadArray } from "tslib";
import { Button, Popconfirm } from '@arco-design/web-react';
import { onFormInit } from '@formily/core';
import React, { useImperativeHandle, useRef, useState } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { useAutoRef, useMergeProps } from '../../hooks';
import { MaskableProvider, isMaskableAlertType, renderAlert } from './components';
import MaskableFormDecorator from './components/MaskableFormDecorator';
import { createStaticMethods } from './createStaticMethods';
import { useFooter } from './hooks';
import { isArray } from 'lodash-es';
export var createBuiltInForm = function (MaskableComponent, formType, options) {
    var plugin = options.plugin, defaultProps = options.defaultProps, componentName = options.componentName;
    var create = function (Form) {
        var _a;
        var TypeMaskableComponent = MaskableComponent;
        var FormWrapperComponent = React.forwardRef(function (originProps, ref) {
            var _a;
            var _b, _c, _d, _e, _f, _g, _h, _j;
            var _k = useCConfigContext(), locale = _k.locale, _l = _k.cComponentConfig, cComponentConfig = _l === void 0 ? {} : _l, useCssPrefix = _k.useCssPrefix;
            var props = useMergeProps(originProps, {}, componentName ? (_b = cComponentConfig[componentName]) !== null && _b !== void 0 ? _b : {} : {});
            var clsPrefix = useCssPrefix('maskable-form');
            var children = props.children, formProps = props.formProps, formConfig = props.formConfig, userFormRef = props.formRef, okButtonProps = props.okButtonProps, okText = props.okText, cancelText = props.cancelText, cancelButtonProps = props.cancelButtonProps, footerFields = props.footerFields, decoratorProps = props.decoratorProps, confirmOnOk = props.confirmOnOk, _m = props.formFooter, formFooter = _m === void 0 ? function () {
                var v = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    v[_i] = arguments[_i];
                }
                return v;
            } : _m, resetModalProps = __rest(props, ["children", "formProps", "formConfig", "formRef", "okButtonProps", "okText", "cancelText", "cancelButtonProps", "footerFields", "decoratorProps", "confirmOnOk", "formFooter"]);
            var shouldOkConfirm = useAutoRef(Boolean(confirmOnOk && !confirmOnOk.disabled));
            var formRef = useRef(null);
            var submitArgsRef = useRef([void 0, void 0]);
            var _o = __read(useState(), 2), form = _o[0], setForm = _o[1];
            var _p = __read(useFooter(__assign(__assign({}, props), { 
                // footer被替换了，所以这里强制不走confirm逻辑，由这边的footer接管了
                confirmOnOk: false, componentName: componentName })), 1), _q = _p[0], _ = _q.footer, footerState = __rest(_q, ["footer"]);
            var footerStateRef = useAutoRef(footerState);
            var _r = __read(useState(function () { return plugin && new plugin(); }), 1), maskablePlugin = _r[0];
            var _s = __read(useState(false), 2), popconfirmVisible = _s[0], setPopconfirmVisible = _s[1];
            var footerRef = useRef(null);
            var topRef = useRef(null);
            useImperativeHandle(userFormRef, function () { return form; });
            var renderCancelButton = function () {
                return !resetModalProps.hideCancel && (React.createElement(Button, __assign({ onClick: function () {
                        var _a;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return (_a = footerStateRef.current).onCancel.apply(_a, __spreadArray([], __read(args), false));
                    } }, defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.cancelButtonProps, cancelButtonProps), cancelText !== null && cancelText !== void 0 ? cancelText : locale.Modal.cancelText));
            };
            var submitButton = {
                buttonType: 'confirm',
                props: __assign(__assign(__assign({}, defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.okButtonProps), { size: 'default', children: okText !== null && okText !== void 0 ? okText : locale.Modal.okText }), okButtonProps),
                wrapper: function (buttonNode) {
                    return confirmOnOk ? (React.createElement(Popconfirm, __assign({ popupVisible: popconfirmVisible, onVisibleChange: function (visible) {
                            if (!visible) {
                                setPopconfirmVisible(visible);
                            }
                        }, onCancel: function () {
                            var _a;
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            setPopconfirmVisible(false);
                            return (_a = confirmOnOk.onCancel) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([confirmOnOk], __read(args), false));
                        } }, confirmOnOk, { onOk: function () {
                            var _a;
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return Promise.resolve((_a = confirmOnOk.onOk) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([confirmOnOk], __read(args), false))).then(function () { return handleSubmit.apply(void 0, __spreadArray([], __read(submitArgsRef.current), false)); });
                        } }), buttonNode)) : (buttonNode);
                },
            };
            var defaultFooterConfig = formType === 'config'
                ? (function (form) { return ({
                    left: footerFields,
                    // @ts-expect-error 这里按预期给定类型
                    right: formFooter(renderCancelButton, submitButton, form),
                }); })
                : (function (formStep) { return ({
                    left: footerFields,
                    right: formFooter(
                    // @ts-expect-error 这里按预期给定类型
                    renderCancelButton, {
                        buttonType: 'back',
                        props: { size: 'default' },
                    }, {
                        buttonType: 'next',
                        props: { size: 'default' },
                    }, submitButton, formStep),
                }); });
            var config = (_c = formProps === null || formProps === void 0 ? void 0 : formProps[formType]) !== null && _c !== void 0 ? _c : formConfig;
            var handleSubmit = function () {
                var _a, _b, _c;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_c = (_b = Promise.resolve((_a = config.onSubmit) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([config], __read(args), false)))
                    // 在这里回调onOk，模拟arco modal的行为
                    .then(function () {
                    var _a;
                    return (_a = footerStateRef.current).onOk.apply(_a, __spreadArray([], __read(args), false));
                })).finally) === null || _c === void 0 ? void 0 : _c.call(_b, function () {
                    setPopconfirmVisible(false);
                });
            };
            var effects = isArray(config.effects) ? config.effects : [config.effects];
            var defaultConfig = __assign(__assign({ footer: defaultFooterConfig }, config), { onSubmit: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (shouldOkConfirm.current) {
                        submitArgsRef.current = args;
                        setPopconfirmVisible(true);
                        return;
                    }
                    return handleSubmit.apply(void 0, __spreadArray([], __read(args), false));
                }, effects: __spreadArray([
                    function () {
                        onFormInit(function (form) {
                            setForm(form);
                        });
                    }
                ], __read(effects), false), formLayout: __assign(__assign({}, config.formLayout), { style: __assign({}, (_d = config.formLayout) === null || _d === void 0 ? void 0 : _d.style) }) });
            var defaultFormProps = __assign(__assign({ ref: formRef }, __assign(__assign({}, formProps), (_a = {}, _a[formType] = defaultConfig, _a))), { decorator: [
                    MaskableFormDecorator,
                    __assign({ footerContainer: function () { return footerRef.current; }, topContainer: function () { var _a, _b; return (_b = (_a = topRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) !== null && _b !== void 0 ? _b : null; }, stickyStep: true }, decoratorProps),
                ] });
            var defaultMaskableProps = __assign(__assign(__assign(__assign({}, resetModalProps), { footer: resetModalProps.footer === null
                    ? resetModalProps.footer
                    : (_e = resetModalProps.footer) !== null && _e !== void 0 ? _e : React.createElement("div", { className: clsPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["footer"], ["footer"]))), ref: footerRef }) }), footerState), { contentTop: Boolean((_g = (_f = defaultFormProps.config) === null || _f === void 0 ? void 0 : _f.top) === null || _g === void 0 ? void 0 : _g.length)
                    ? __assign(__assign({}, (isMaskableAlertType(resetModalProps.contentTop) ? resetModalProps.contentTop : null)), { type: 'custom', content: (React.createElement(React.Fragment, null,
                            renderAlert(resetModalProps.contentTop),
                            React.createElement("div", { ref: topRef }))) }) : resetModalProps.contentTop });
            return (React.createElement(TypeMaskableComponent, __assign({}, defaultProps, ((_h = maskablePlugin === null || maskablePlugin === void 0 ? void 0 : maskablePlugin.getExtraMaskableProps(defaultMaskableProps)) !== null && _h !== void 0 ? _h : defaultMaskableProps), { ref: ref }),
                React.createElement(Form, __assign({}, ((_j = maskablePlugin === null || maskablePlugin === void 0 ? void 0 : maskablePlugin.getFormProps(defaultFormProps)) !== null && _j !== void 0 ? _j : defaultFormProps)), children)));
        });
        FormWrapperComponent.displayName = "CForm(".concat((_a = TypeMaskableComponent.displayName) !== null && _a !== void 0 ? _a : TypeMaskableComponent, ")");
        var FormWrapper = React.forwardRef(function (props, ref) { return (React.createElement(MaskableProvider, null,
            React.createElement(FormWrapperComponent, __assign({}, props, { ref: ref })))); });
        FormWrapper.displayName = "".concat(TypeMaskableComponent.displayName, ".").concat(formType === 'config' ? 'Form' : 'FormStep');
        // FIXME 返回类型是一个明确的带有泛型的函数，createStaticMethods 返回的是 JSXElementConstructor类型，二者无法兼容但是不影响运行
        return Object.assign(createStaticMethods(FormWrapper), { create: create });
    };
    return create;
};
var templateObject_1;
//# sourceMappingURL=createBuiltInForm.js.map