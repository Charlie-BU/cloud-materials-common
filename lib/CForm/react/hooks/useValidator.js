"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidator = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../../../CConfigProvider");
var storage_utils_safe_race_1 = require("@byted-c/storage.utils.safe-race");
var useValidator = function (props) {
    var _a;
    var originRules = props.rules;
    var cComponentConfig = (0, CConfigProvider_1.useCConfigContext)().cComponentConfig;
    var enableRaceCondition = (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CForm) === null || _a === void 0 ? void 0 : _a.enableRaceCondition;
    var rules = (0, lodash_es_1.isArray)(originRules) ? originRules : [originRules];
    var validators = rules === null || rules === void 0 ? void 0 : rules.map(function (rule) {
        var triggerType = (rule === null || rule === void 0 ? void 0 : rule.validateTrigger) === 'onChange' ? 'onInput' : rule === null || rule === void 0 ? void 0 : rule.validateTrigger;
        var customFunctionValitator = {};
        if (rule === null || rule === void 0 ? void 0 : rule.validator) {
            customFunctionValitator = {
                validator: (0, storage_utils_safe_race_1.safeRace)(function (value, _, ctx) {
                    var form = ctx.form, field = ctx.field;
                    return new Promise(function (resolve) {
                        var _a;
                        var cb = function (result) {
                            // 当字段不应该校验而触发了校验，直接resolve掉
                            if (field.pattern !== 'editable' || field.display !== 'visible') {
                                resolve('');
                            }
                            resolve(result);
                        };
                        var validatorResult = (_a = rule === null || rule === void 0 ? void 0 : rule.validator) === null || _a === void 0 ? void 0 : _a.call(rule, { value: value, form: form, field: field, callback: cb });
                        if (validatorResult instanceof Promise) {
                            validatorResult.finally(function () {
                                resolve('');
                            });
                        }
                        else {
                            resolve('');
                        }
                    });
                }, { enabled: enableRaceCondition }),
            };
        }
        var v = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, rule), { triggerType: triggerType }), customFunctionValitator);
        return v;
    });
    if (!originRules)
        return;
    return validators;
};
exports.useValidator = useValidator;
//# sourceMappingURL=useValidator.js.map