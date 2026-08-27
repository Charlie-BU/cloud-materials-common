import { __assign, __awaiter, __generator, __read } from "tslib";
import { useEffect, useState } from 'react';
import { createForm, onFormUnmount, onFormValidateFailed } from '@formily/core';
import { autorun, observable, toJS } from '@formily/reactive';
import { FormEventSource, getFormFieldId, notifyFormCustomEvent } from '../../shared/utils';
import createHelper from '../../helper';
import { isArray } from 'lodash-es';
import { useCConfigContext } from '../../../CConfigProvider';
export function useCreateForm(config, outerForm) {
    var _this = this;
    var _a = config || {}, initConfig = _a.initConfig, effects = _a.effects, name = _a.name;
    var _b = __read(useState(typeof initConfig === 'function' && !outerForm), 2), loading = _b[0], setLoading = _b[1];
    var _c = __read(useState(false), 2), error = _c[0], setError = _c[1];
    var _d = __read(useState(), 2), form = _d[0], setForm = _d[1];
    var _e = __read(useState(0), 2), defaultStep = _e[0], setDefaultStep = _e[1];
    var cComponentConfig = useCConfigContext().cComponentConfig;
    var run = function () {
        var create = function (formProps) {
            var formEffect = function (form) {
                var _a;
                var helper = createHelper({ enableRaceCondition: (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CForm) === null || _a === void 0 ? void 0 : _a.enableRaceCondition });
                // * 自定义事件，用于外部消费
                notifyFormCustomEvent({
                    source: FormEventSource.HelperInit,
                    payload: {
                        helper: helper,
                        form: form,
                    },
                });
                form.data = observable({});
                form.setData = function (data) {
                    Object.assign(form.data, data);
                };
                form.setData(formProps === null || formProps === void 0 ? void 0 : formProps.data);
                if (effects) {
                    var effectsArray = isArray(effects) ? effects : [effects];
                    effectsArray.forEach(function (effect) {
                        effect === null || effect === void 0 ? void 0 : effect(helper, form);
                    });
                }
                onFormValidateFailed(function (form) {
                    var _a, _b;
                    // 筛掉所有非ValidateError类型的异常
                    var validateErrors = form.errors.filter(function (item) { return item.code === 'ValidateError' || item.code === 'EffectError'; });
                    var firstErrorAddress = (_b = (_a = validateErrors === null || validateErrors === void 0 ? void 0 : validateErrors[0]) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.toString();
                    // 如果有校验报错，则移动至第一个报错的表单字段处
                    // 但需要注意的是，若该表单字段处于隐藏字段，此时处于隐藏状态，那么这个操作是无效的
                    if (firstErrorAddress) {
                        var dom = document.getElementById(getFormFieldId(firstErrorAddress));
                        dom === null || dom === void 0 ? void 0 : dom.scrollIntoView({
                            behavior: 'smooth',
                            // 页面顶部和底部都容易被覆盖，所以将第一个报错表单移动至页面中间
                            block: 'center',
                        });
                    }
                });
                var dispose = autorun(function () {
                    var data = toJS(form.data);
                    // 初始化时，heart 还未初始化完成
                    if (form.heart) {
                        form.notify('onCFormDataChange', data);
                    }
                });
                onFormUnmount(function () {
                    dispose();
                });
            };
            setDefaultStep((formProps === null || formProps === void 0 ? void 0 : formProps.defaultStep) || 0);
            if (!outerForm) {
                var form_1 = createForm(__assign(__assign({}, formProps), { effects: formEffect }));
                form_1.name = name || form_1.id;
                // * 自定义事件，用于外部消费
                notifyFormCustomEvent({
                    source: FormEventSource.FormInit,
                    payload: {
                        form: form_1,
                    },
                });
                setForm(form_1);
            }
            else {
                outerForm.addEffects('c-m-form-effects', formEffect);
                setForm(outerForm);
            }
        };
        var runInitConfig = function () { return __awaiter(_this, void 0, void 0, function () {
            var formProps, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!initConfig) {
                            create();
                            setLoading(false);
                            return [2 /*return*/];
                        }
                        if (!(typeof initConfig === 'function')) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        setLoading(true);
                        setError(false);
                        return [4 /*yield*/, initConfig()];
                    case 2:
                        formProps = _a.sent();
                        create(formProps);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        setError(true);
                        console.error('init config error info ===', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        create(initConfig);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        runInitConfig();
    };
    useEffect(run, []);
    return { loading: loading, error: error, form: form, run: run, defaultStep: defaultStep };
}
//# sourceMappingURL=useCreateForm.js.map