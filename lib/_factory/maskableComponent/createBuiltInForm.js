"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBuiltInForm = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var core_1 = require("@formily/core");
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var hooks_1 = require("../../hooks");
var components_1 = require("./components");
var MaskableFormDecorator_1 = tslib_1.__importDefault(require("./components/MaskableFormDecorator"));
var createStaticMethods_1 = require("./createStaticMethods");
var hooks_2 = require("./hooks");
var lodash_es_1 = require("lodash-es");
var createBuiltInForm = function (MaskableComponent, formType, options) {
    var plugin = options.plugin, defaultProps = options.defaultProps, componentName = options.componentName;
    var create = function (Form) {
        var _a;
        var TypeMaskableComponent = MaskableComponent;
        var FormWrapperComponent = react_1.default.forwardRef(function (originProps, ref) {
            var _a;
            var _b, _c, _d, _e, _f, _g, _h, _j;
            var _k = (0, CConfigProvider_1.useCConfigContext)(), locale = _k.locale, _l = _k.cComponentConfig, cComponentConfig = _l === void 0 ? {} : _l, useCssPrefix = _k.useCssPrefix;
            var props = (0, hooks_1.useMergeProps)(originProps, {}, componentName ? (_b = cComponentConfig[componentName]) !== null && _b !== void 0 ? _b : {} : {});
            var clsPrefix = useCssPrefix('maskable-form');
            var children = props.children, formProps = props.formProps, formConfig = props.formConfig, userFormRef = props.formRef, okButtonProps = props.okButtonProps, okText = props.okText, cancelText = props.cancelText, cancelButtonProps = props.cancelButtonProps, footerFields = props.footerFields, decoratorProps = props.decoratorProps, confirmOnOk = props.confirmOnOk, _m = props.formFooter, formFooter = _m === void 0 ? function () {
                var v = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    v[_i] = arguments[_i];
                }
                return v;
            } : _m, resetModalProps = tslib_1.__rest(props, ["children", "formProps", "formConfig", "formRef", "okButtonProps", "okText", "cancelText", "cancelButtonProps", "footerFields", "decoratorProps", "confirmOnOk", "formFooter"]);
            var shouldOkConfirm = (0, hooks_1.useAutoRef)(Boolean(confirmOnOk && !confirmOnOk.disabled));
            var formRef = (0, react_1.useRef)(null);
            var submitArgsRef = (0, react_1.useRef)([void 0, void 0]);
            var _o = tslib_1.__read((0, react_1.useState)(), 2), form = _o[0], setForm = _o[1];
            var _p = tslib_1.__read((0, hooks_2.useFooter)(tslib_1.__assign(tslib_1.__assign({}, props), { 
                // footer被替换了，所以这里强制不走confirm逻辑，由这边的footer接管了
                confirmOnOk: false, componentName: componentName })), 1), _q = _p[0], _ = _q.footer, footerState = tslib_1.__rest(_q, ["footer"]);
            var footerStateRef = (0, hooks_1.useAutoRef)(footerState);
            var _r = tslib_1.__read((0, react_1.useState)(function () { return plugin && new plugin(); }), 1), maskablePlugin = _r[0];
            var _s = tslib_1.__read((0, react_1.useState)(false), 2), popconfirmVisible = _s[0], setPopconfirmVisible = _s[1];
            var footerRef = (0, react_1.useRef)(null);
            var topRef = (0, react_1.useRef)(null);
            (0, react_1.useImperativeHandle)(userFormRef, function () { return form; });
            var renderCancelButton = function () {
                return !resetModalProps.hideCancel && (react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ onClick: function () {
                        var _a;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return (_a = footerStateRef.current).onCancel.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
                    } }, defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.cancelButtonProps, cancelButtonProps), cancelText !== null && cancelText !== void 0 ? cancelText : locale.Modal.cancelText));
            };
            var submitButton = {
                buttonType: 'confirm',
                props: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.okButtonProps), { size: 'default', children: okText !== null && okText !== void 0 ? okText : locale.Modal.okText }), okButtonProps),
                wrapper: function (buttonNode) {
                    return confirmOnOk ? (react_1.default.createElement(web_react_1.Popconfirm, tslib_1.__assign({ popupVisible: popconfirmVisible, onVisibleChange: function (visible) {
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
                            return (_a = confirmOnOk.onCancel) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([confirmOnOk], tslib_1.__read(args), false));
                        } }, confirmOnOk, { onOk: function () {
                            var _a;
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return Promise.resolve((_a = confirmOnOk.onOk) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([confirmOnOk], tslib_1.__read(args), false))).then(function () { return handleSubmit.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(submitArgsRef.current), false)); });
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
                return (_c = (_b = Promise.resolve((_a = config.onSubmit) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([config], tslib_1.__read(args), false)))
                    // 在这里回调onOk，模拟arco modal的行为
                    .then(function () {
                    var _a;
                    return (_a = footerStateRef.current).onOk.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
                })).finally) === null || _c === void 0 ? void 0 : _c.call(_b, function () {
                    setPopconfirmVisible(false);
                });
            };
            var effects = (0, lodash_es_1.isArray)(config.effects) ? config.effects : [config.effects];
            var defaultConfig = tslib_1.__assign(tslib_1.__assign({ footer: defaultFooterConfig }, config), { onSubmit: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (shouldOkConfirm.current) {
                        submitArgsRef.current = args;
                        setPopconfirmVisible(true);
                        return;
                    }
                    return handleSubmit.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false));
                }, effects: tslib_1.__spreadArray([
                    function () {
                        (0, core_1.onFormInit)(function (form) {
                            setForm(form);
                        });
                    }
                ], tslib_1.__read(effects), false), formLayout: tslib_1.__assign(tslib_1.__assign({}, config.formLayout), { style: tslib_1.__assign({}, (_d = config.formLayout) === null || _d === void 0 ? void 0 : _d.style) }) });
            var defaultFormProps = tslib_1.__assign(tslib_1.__assign({ ref: formRef }, tslib_1.__assign(tslib_1.__assign({}, formProps), (_a = {}, _a[formType] = defaultConfig, _a))), { decorator: [
                    MaskableFormDecorator_1.default,
                    tslib_1.__assign({ footerContainer: function () { return footerRef.current; }, topContainer: function () { var _a, _b; return (_b = (_a = topRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) !== null && _b !== void 0 ? _b : null; }, stickyStep: true }, decoratorProps),
                ] });
            var defaultMaskableProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, resetModalProps), { footer: resetModalProps.footer === null
                    ? resetModalProps.footer
                    : (_e = resetModalProps.footer) !== null && _e !== void 0 ? _e : react_1.default.createElement("div", { className: clsPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["footer"], ["footer"]))), ref: footerRef }) }), footerState), { contentTop: Boolean((_g = (_f = defaultFormProps.config) === null || _f === void 0 ? void 0 : _f.top) === null || _g === void 0 ? void 0 : _g.length)
                    ? tslib_1.__assign(tslib_1.__assign({}, ((0, components_1.isMaskableAlertType)(resetModalProps.contentTop) ? resetModalProps.contentTop : null)), { type: 'custom', content: (react_1.default.createElement(react_1.default.Fragment, null,
                            (0, components_1.renderAlert)(resetModalProps.contentTop),
                            react_1.default.createElement("div", { ref: topRef }))) }) : resetModalProps.contentTop });
            return (react_1.default.createElement(TypeMaskableComponent, tslib_1.__assign({}, defaultProps, ((_h = maskablePlugin === null || maskablePlugin === void 0 ? void 0 : maskablePlugin.getExtraMaskableProps(defaultMaskableProps)) !== null && _h !== void 0 ? _h : defaultMaskableProps), { ref: ref }),
                react_1.default.createElement(Form, tslib_1.__assign({}, ((_j = maskablePlugin === null || maskablePlugin === void 0 ? void 0 : maskablePlugin.getFormProps(defaultFormProps)) !== null && _j !== void 0 ? _j : defaultFormProps)), children)));
        });
        FormWrapperComponent.displayName = "CForm(".concat((_a = TypeMaskableComponent.displayName) !== null && _a !== void 0 ? _a : TypeMaskableComponent, ")");
        var FormWrapper = react_1.default.forwardRef(function (props, ref) { return (react_1.default.createElement(components_1.MaskableProvider, null,
            react_1.default.createElement(FormWrapperComponent, tslib_1.__assign({}, props, { ref: ref })))); });
        FormWrapper.displayName = "".concat(TypeMaskableComponent.displayName, ".").concat(formType === 'config' ? 'Form' : 'FormStep');
        // FIXME 返回类型是一个明确的带有泛型的函数，createStaticMethods 返回的是 JSXElementConstructor类型，二者无法兼容但是不影响运行
        return Object.assign((0, createStaticMethods_1.createStaticMethods)(FormWrapper), { create: create });
    };
    return create;
};
exports.createBuiltInForm = createBuiltInForm;
var templateObject_1;
//# sourceMappingURL=createBuiltInForm.js.map