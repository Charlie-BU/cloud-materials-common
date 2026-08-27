import { __assign } from "tslib";
import { isArray } from 'lodash-es';
import { useCConfigContext } from '../../../CConfigProvider';
import { safeRace } from '@byted-c/storage.utils.safe-race';
export var useValidator = function (props) {
    var _a;
    var originRules = props.rules;
    var cComponentConfig = useCConfigContext().cComponentConfig;
    var enableRaceCondition = (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CForm) === null || _a === void 0 ? void 0 : _a.enableRaceCondition;
    var rules = isArray(originRules) ? originRules : [originRules];
    var validators = rules === null || rules === void 0 ? void 0 : rules.map(function (rule) {
        var triggerType = (rule === null || rule === void 0 ? void 0 : rule.validateTrigger) === 'onChange' ? 'onInput' : rule === null || rule === void 0 ? void 0 : rule.validateTrigger;
        var customFunctionValitator = {};
        if (rule === null || rule === void 0 ? void 0 : rule.validator) {
            customFunctionValitator = {
                validator: safeRace(function (value, _, ctx) {
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
        var v = __assign(__assign(__assign({}, rule), { triggerType: triggerType }), customFunctionValitator);
        return v;
    });
    if (!originRules)
        return;
    return validators;
};
//# sourceMappingURL=useValidator.js.map