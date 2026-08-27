import { __awaiter, __generator, __read, __spreadArray } from "tslib";
import { useField } from '@formily/react';
import { isArray } from 'lodash-es';
import { useEffect } from 'react';
import { useCConfigContext } from '../../../CConfigProvider';
/**
 * TableEditor 外层 Form validate 时，手动触发 TableEditor 内部 form 的 validate
 * @param tableEditor
 */
export var useFieldValidate = function (tableEditor) {
    // 这个 field 是 TableEditor 作为手控组件时，作为父组件的一个 Field
    // 受控组件不一定是包裹在外层 Form 中，即使外层组件是 Form，也不一定是 formily，可能是其他 Form 组件
    // 所以这个 field 可能是 undefined，要做容错处理
    var field = useField();
    var locale = useCConfigContext().locale;
    useEffect(function () {
        var _a;
        if (!field)
            return;
        var prevValidator = field === null || field === void 0 ? void 0 : field.validator;
        var func = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, ((_b = (_a = tableEditor.form) === null || _a === void 0 ? void 0 : _a.validate()) === null || _b === void 0 ? void 0 : _b.catch(function (e) { return e; }))];
                    case 1:
                        result = _c.sent();
                        if (result && result.length > 0) {
                            return [2 /*return*/, locale.CTableEditor.validateError];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        var validate = {
            // 手动指定 type，此时 onChange 事件时，不会触发校验
            triggerType: 'manual',
            validator: func,
        };
        var validator = [];
        if (isArray(prevValidator)) {
            validator.push.apply(validator, __spreadArray(__spreadArray([], __read(prevValidator), false), [validate], false));
        }
        else {
            validator.push(prevValidator);
            validator.push(validate);
        }
        (_a = field === null || field === void 0 ? void 0 : field.setValidator) === null || _a === void 0 ? void 0 : _a.call(field, validator);
    }, [field]);
};
//# sourceMappingURL=useFieldValidate.js.map