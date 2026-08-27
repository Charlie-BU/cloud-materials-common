import { __assign, __awaiter, __generator, __makeTemplateObject, __rest } from "tslib";
/* eslint-disable @typescript-eslint/ban-types */
import React, { useContext, useEffect, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { CFormRegisterConfigContext } from '../../shared/context';
import { FormProvider } from '@formily/react';
import { registerValidateFormats, setValidateLanguage, registerValidateLocale, registerValidateMessageTemplateEngine, } from '@formily/core';
import { useCreateForm } from '../hooks';
import CLoadingV2 from '../../../CLoadingV2';
import CField from '../CField/CField';
import { FormLayout } from '@storage-fe/formily-arco';
import { DefaultLayout } from '../../const';
import { useCFormConfig } from '../hooks/useCFormConfig';
import defineConfirmConfig from '../CConfirm';
import { CConfigContext, useCConfigContext } from '../../../CConfigProvider';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import { mergeFields } from '../../shared/utils';
import { getValidateMessageTemplateEngine } from '@formily/validator';
import { checkConfigRepeatedPath } from './utils';
var prefixCls = classNamePrefixFactory('form');
var testId = {
    container: prefixCls(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
};
function CConfigFormComponent(_a, registerConfig) {
    var _this = this;
    var ref = _a.ref, props = __rest(_a, ["ref"]);
    var style = props.style, className = props.className, children = props.children, config = props.config, stepConfig = props.stepConfig, _b = props.CLoadingProps, CLoadingProps = _b === void 0 ? {} : _b;
    var formLayout = (config || stepConfig || {}).formLayout;
    var _c = useCreateForm(config || stepConfig), loading = _c.loading, error = _c.error, form = _c.form, run = _c.run, defaultStep = _c.defaultStep;
    var layoutConfig = useCFormConfig(props, defaultStep).config;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('form');
    useImperativeHandle(ref, function () { return form; });
    var _d = useCConfigContext(), locale = _d.locale, cComponentConfig = _d.cComponentConfig;
    useEffect(function () {
        // TODO: 先修复匹配文案问题，后续做优化引入文件
        registerValidateLocale({
            'zh-CN': {
                required: '请输入{label}',
            },
            'en-US': {
                required: 'Input',
            },
        });
    }, []);
    useEffect(function () {
        setValidateLanguage(locale.locale);
    }, [locale.locale]);
    useEffect(function () {
        if (process.env.NODE_ENV !== 'production') {
            checkConfigRepeatedPath(config || stepConfig);
        }
        var customTemplate = getValidateMessageTemplateEngine();
        registerValidateMessageTemplateEngine(function (msg, ctx) {
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
    return (React.createElement(FormLayout, __assign({}, DefaultLayout, cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CForm, registerConfig.formLayout, formLayout),
        React.createElement(CFormRegisterConfigContext.Provider, { value: registerConfig },
            React.createElement(FormProvider, { form: (form || { onMount: function () { }, onUnmount: function () { } }) },
                React.createElement("form", { style: style, "data-cy": testId.container, "data-testid": testId.container, className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), className), autoComplete: "off", onSubmit: function (e) {
                        var _a, _b, _c, _d;
                        (_a = e === null || e === void 0 ? void 0 : e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
                        (_b = e === null || e === void 0 ? void 0 : e.preventDefault) === null || _b === void 0 ? void 0 : _b.call(e);
                        var onSubmit = ((_c = props.config) === null || _c === void 0 ? void 0 : _c.onSubmit) || ((_d = props.stepConfig) === null || _d === void 0 ? void 0 : _d.onSubmit);
                        var submit = function (values) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(values, form))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        form === null || form === void 0 ? void 0 : form.submit(submit);
                    } }, loading || error || !form ? (React.createElement(CLoadingV2, __assign({ type: "block", loading: loading, hasError: error, onReload: function () { return run(); }, isBlock: true, style: { height: 200 } }, CLoadingProps))) : (React.createElement(React.Fragment, null,
                    React.createElement(CField, __assign({}, layoutConfig)),
                    children)))))));
}
var registerConfig = function (componentsMap, options) {
    var Form = React.forwardRef(function (props, ref) {
        return CConfigFormComponent(__assign(__assign({}, props), { ref: ref }), __assign({ componentsMap: componentsMap }, options));
    });
    Form.displayName = 'CForm';
    var originReturnFn = function (args) { return args; };
    var staticProps = {
        registerConfig: function (innerComponentsMap, innerOptions) {
            return registerConfig(__assign(__assign({}, componentsMap), innerComponentsMap), __assign(__assign({}, options), innerOptions));
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
        defineField: mergeFields,
        definePartialField: mergeFields,
        defineFields: originReturnFn,
        registerValidateFormats: function (args) {
            registerValidateFormats(args);
        },
        registerValidateLocale: function (lang, locale) {
            setValidateLanguage(lang);
            registerValidateLocale(locale);
        },
        registerValidateMessageTemplateEngine: registerValidateMessageTemplateEngine,
        Field: CField,
        defineConfirmConfig: defineConfirmConfig,
    };
    return Object.assign(Form, staticProps);
};
export default registerConfig({});
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map