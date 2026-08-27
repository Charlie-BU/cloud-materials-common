"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyFormCustomEvent = exports.FormEventSource = exports.mergeFields = exports.getPile = exports.getFormFieldId = exports.updateFieldProps = exports.runCallable = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var classNamePrefixFactory_1 = require("../../_utils/classNamePrefixFactory");
var runCallable = function (props, form, parentField) {
    if ((0, lodash_es_1.isFunction)(props)) {
        return props(form, parentField);
    }
    return props;
};
exports.runCallable = runCallable;
var updateFieldProps = function (props, formilyField, callableFunc, value) {
    // 只有当在field配置中设置的属性是响应式函数时，才需要用该函数的运行结果去同步更新formily的field实例的值。
    // 也即当使用helper的reactive与在field的config配置中使用响应式函数设置同一属性的值时，以响应式函数的值为准。
    if ((0, lodash_es_1.isFunction)(callableFunc) && formilyField) {
        // @ts-ignore
        formilyField[props] = value;
    }
};
exports.updateFieldProps = updateFieldProps;
// 将field的address转为唯一标识，用于检索表单的dom
var getFormFieldId = function (address) {
    var formatAddress = address.toString().replace(/[[.]/g, '_').replace(/\]/g, '');
    return "___c-form-identifies-".concat(formatAddress);
};
exports.getFormFieldId = getFormFieldId;
var getPile = function (component, path) {
    if (!component || !path)
        return undefined;
    switch (component.displayName) {
        case 'FormItem': {
            var pile = "".concat(classNamePrefixFactory_1.GLOBAL_PREFIX, "-form-item-").concat(path.toString());
            return {
                'data-cy': pile,
                'data-testid': pile,
            };
        }
        default:
            return {};
    }
};
exports.getPile = getPile;
/**
 * 合并多个fields
 */
var mergeFields = function () {
    var restField = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        restField[_i] = arguments[_i];
    }
    if (restField.length <= 1) {
        return restField[0];
    }
    var deepMergeKeys = Array.isArray(restField[restField.length - 1]) ? restField.pop() : null;
    return restField.reduce(function (prev, current) {
        var mergedField = tslib_1.__assign(tslib_1.__assign({}, prev), current);
        if (deepMergeKeys) {
            return deepMergeKeys.reduce(function (prevMergeField, fieldKey) {
                var _a;
                // 下个对象属性存在才继续合并
                return (0, lodash_es_1.has)(current, fieldKey) && (0, lodash_es_1.isPlainObject)(current[fieldKey])
                    ? tslib_1.__assign(tslib_1.__assign({}, prevMergeField), (_a = {}, _a[fieldKey] = (0, lodash_es_1.merge)({}, prev[fieldKey], current[fieldKey]), _a)) : prevMergeField;
            }, mergedField);
        }
        return mergedField;
    }, {});
};
exports.mergeFields = mergeFields;
var FORM_EVENT_NAME = 'CFormCustomEvent';
var FormEventSource;
(function (FormEventSource) {
    FormEventSource["FormInit"] = "FormInit";
    FormEventSource["HelperInit"] = "HelperInit";
})(FormEventSource = exports.FormEventSource || (exports.FormEventSource = {}));
/**
 * * 派发Form事件，提供外部消费
 */
var notifyFormCustomEvent = function (options) {
    var source = options.source, payload = options.payload;
    var customEvent = new CustomEvent(FORM_EVENT_NAME, { detail: { source: source, payload: payload } });
    window.dispatchEvent(customEvent);
};
exports.notifyFormCustomEvent = notifyFormCustomEvent;
//# sourceMappingURL=utils.js.map