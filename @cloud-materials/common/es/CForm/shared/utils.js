import { __assign } from "tslib";
import { has, isFunction, isPlainObject, merge } from 'lodash-es';
import { GLOBAL_PREFIX } from '../../_utils/classNamePrefixFactory';
export var runCallable = function (props, form, parentField) {
    if (isFunction(props)) {
        return props(form, parentField);
    }
    return props;
};
export var updateFieldProps = function (props, formilyField, callableFunc, value) {
    // 只有当在field配置中设置的属性是响应式函数时，才需要用该函数的运行结果去同步更新formily的field实例的值。
    // 也即当使用helper的reactive与在field的config配置中使用响应式函数设置同一属性的值时，以响应式函数的值为准。
    if (isFunction(callableFunc) && formilyField) {
        // @ts-ignore
        formilyField[props] = value;
    }
};
// 将field的address转为唯一标识，用于检索表单的dom
export var getFormFieldId = function (address) {
    var formatAddress = address.toString().replace(/[[.]/g, '_').replace(/\]/g, '');
    return "___c-form-identifies-".concat(formatAddress);
};
export var getPile = function (component, path) {
    if (!component || !path)
        return undefined;
    switch (component.displayName) {
        case 'FormItem': {
            var pile = "".concat(GLOBAL_PREFIX, "-form-item-").concat(path.toString());
            return {
                'data-cy': pile,
                'data-testid': pile,
            };
        }
        default:
            return {};
    }
};
/**
 * 合并多个fields
 */
export var mergeFields = function () {
    var restField = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        restField[_i] = arguments[_i];
    }
    if (restField.length <= 1) {
        return restField[0];
    }
    var deepMergeKeys = Array.isArray(restField[restField.length - 1]) ? restField.pop() : null;
    return restField.reduce(function (prev, current) {
        var mergedField = __assign(__assign({}, prev), current);
        if (deepMergeKeys) {
            return deepMergeKeys.reduce(function (prevMergeField, fieldKey) {
                var _a;
                // 下个对象属性存在才继续合并
                return has(current, fieldKey) && isPlainObject(current[fieldKey])
                    ? __assign(__assign({}, prevMergeField), (_a = {}, _a[fieldKey] = merge({}, prev[fieldKey], current[fieldKey]), _a)) : prevMergeField;
            }, mergedField);
        }
        return mergedField;
    }, {});
};
var FORM_EVENT_NAME = 'CFormCustomEvent';
export var FormEventSource;
(function (FormEventSource) {
    FormEventSource["FormInit"] = "FormInit";
    FormEventSource["HelperInit"] = "HelperInit";
})(FormEventSource || (FormEventSource = {}));
/**
 * * 派发Form事件，提供外部消费
 */
export var notifyFormCustomEvent = function (options) {
    var source = options.source, payload = options.payload;
    var customEvent = new CustomEvent(FORM_EVENT_NAME, { detail: { source: source, payload: payload } });
    window.dispatchEvent(customEvent);
};
//# sourceMappingURL=utils.js.map