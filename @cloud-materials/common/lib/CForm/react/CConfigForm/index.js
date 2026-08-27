"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/ban-types */
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var context_1 = require("../../shared/context");
var react_2 = require("@formily/react");
var core_1 = require("@formily/core");
var hooks_1 = require("../hooks");
var CLoadingV2_1 = tslib_1.__importDefault(require("../../../CLoadingV2"));
var CField_1 = tslib_1.__importDefault(require("../CField/CField"));
var formily_arco_1 = require("@storage-fe/formily-arco");
var const_1 = require("../../const");
var useCFormConfig_1 = require("../hooks/useCFormConfig");
var CConfirm_1 = tslib_1.__importDefault(require("../CConfirm"));
var CConfigProvider_1 = require("../../../CConfigProvider");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../_utils/classNamePrefixFactory"));
var utils_1 = require("../../shared/utils");
var validator_1 = require("@formily/validator");
var utils_2 = require("./utils");
var prefixCls = (0, classNamePrefixFactory_1.default)('form');
var testId = {
    container: prefixCls(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
};
function CConfigFormComponent(_a, registerConfig) {
    var _this = this;
    var ref = _a.ref, props = tslib_1.__rest(_a, ["ref"]);
    var style = props.style, className = props.className, children = props.children, config = props.config, stepConfig = props.stepConfig, _b = props.CLoadingProps, CLoadingProps = _b === void 0 ? {} : _b;
    var formLayout = (config || stepConfig || {}).formLayout;
    var _c = (0, hooks_1.useCreateForm)(config || stepConfig), loading = _c.loading, error = _c.error, form = _c.form, run = _c.run, defaultStep = _c.defaultStep;
    var layoutConfig = (0, useCFormConfig_1.useCFormConfig)(props, defaultStep).config;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('form');
    (0, react_1.useImperativeHandle)(ref, function () { return form; });
    var _d = (0, CConfigProvider_1.useCConfigContext)(), locale = _d.locale, cComponentConfig = _d.cComponentConfig;
    (0, react_1.useEffect)(function () {
        // TODO: 先修复匹配文案问题，后续做优化引入文件
        (0, core_1.registerValidateLocale)({
            'zh-CN': {
                required: '请输入{label}',
            },
            'en-US': {
                required: 'Input',
            },
        });
    }, []);
    (0, react_1.useEffect)(function () {
        (0, core_1.setValidateLanguage)(locale.locale);
    }, [locale.locale]);
    (0, react_1.useEffect)(function () {
        if (process.env.NODE_ENV !== 'production') {
            (0, utils_2.checkConfigRepeatedPath)(config || stepConfig);
        }
        var customTemplate = (0, validator_1.getValidateMessageTemplateEngine)();
        (0, core_1.registerValidateMessageTemplateEngine)(function (msg, ctx) {
            var _a;
            // 使用CForm.registerValidateMessageTemplateEngine自定义注册时，执行自定义的返回值
            if (customTemplate) {
                return customTemplate(msg, ctx);
            }
            var _b = (ctx || {}).field, field = _b === void 0 ? {} : _b;
            if (typeof msg === 'string') {
                return msg.replace(/\{label\}/g, (_a = field === null || field === void 0 ? void 0 : field.title) !== null && _a !== void 0 ? _a : '');
            }
            return msg;
        });
    }, []);
    if (!config && !stepConfig) {
        console.warn('cform: 续传入 config 或者 stepConfig');
        return null;
    }
    return (react_1.default.createElement(formily_arco_1.FormLayout, tslib_1.__assign({}, const_1.DefaultLayout, cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CForm, registerConfig.formLayout, formLayout),
        react_1.default.createElement(context_1.CFormRegisterConfigContext.Provider, { value: registerConfig },
            react_1.default.createElement(react_2.FormProvider, { form: (form || { onMount: function () { }, onUnmount: function () { } }) },
                react_1.default.createElement("form", { style: style, "data-cy": testId.container, "data-testid": testId.container, className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), className), autoComplete: "off", onSubmit: function (e) {
                        var _a, _b, _c, _d;
                        (_a = e === null || e === void 0 ? void 0 : e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
                        (_b = e === null || e === void 0 ? void 0 : e.preventDefault) === null || _b === void 0 ? void 0 : _b.call(e);
                        var onSubmit = ((_c = props.config) === null || _c === void 0 ? void 0 : _c.onSubmit) || ((_d = props.stepConfig) === null || _d === void 0 ? void 0 : _d.onSubmit);
                        var submit = function (values) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(values, form))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        form === null || form === void 0 ? void 0 : form.submit(submit);
                    } }, loading || error || !form ? (react_1.default.createElement(CLoadingV2_1.default, tslib_1.__assign({ type: "block", loading: loading, hasError: error, onReload: function () { return run(); }, isBlock: true, style: { height: 200 } }, CLoadingProps))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(CField_1.default, tslib_1.__assign({}, layoutConfig)),
                    children)))))));
}
var registerConfig = function (componentsMap, options) {
    var Form = react_1.default.forwardRef(function (props, ref) {
        return CConfigFormComponent(tslib_1.__assign(tslib_1.__assign({}, props), { ref: ref }), tslib_1.__assign({ componentsMap: componentsMap }, options));
    });
    Form.displayName = 'CForm';
    var originReturnFn = function (args) { return args; };
    var staticProps = {
        registerConfig: function (innerComponentsMap, innerOptions) {
            return registerConfig(tslib_1.__assign(tslib_1.__assign({}, componentsMap), innerComponentsMap), tslib_1.__assign(tslib_1.__assign({}, options), innerOptions));
        },
        defineComponentOption: function (component, props) { return ({
            component: component,
            props: props,
        }); },
        defineDecoratorOptions: function (component, props) { return ({
            component: component,
            props: props,
        }); },
        defineConfig: originReturnFn,
        defineStepConfig: originReturnFn,
        defineField: utils_1.mergeFields,
        definePartialField: utils_1.mergeFields,
        defineFields: originReturnFn,
        registerValidateFormats: function (args) {
            (0, core_1.registerValidateFormats)(args);
        },
        registerValidateLocale: function (lang, locale) {
            (0, core_1.setValidateLanguage)(lang);
            (0, core_1.registerValidateLocale)(locale);
        },
        registerValidateMessageTemplateEngine: core_1.registerValidateMessageTemplateEngine,
        Field: CField_1.default,
        defineConfirmConfig: CConfirm_1.default,
    };
    return Object.assign(Form, staticProps);
};
exports.default = registerConfig({});
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map