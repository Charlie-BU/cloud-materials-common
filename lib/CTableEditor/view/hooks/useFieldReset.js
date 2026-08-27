"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFieldReset = void 0;
var core_1 = require("@formily/core");
var react_1 = require("@formily/react");
var react_2 = require("react");
/**
 * TableEditor 外层 Form reset 时，重置 TableEditor 内部状态
 * @param tableEditor
 */
var useFieldReset = function (tableEditor, isResetRef) {
    // 同 useFieldValidate 的注释，field, form 可能是 undefined，要做容错处理
    var field = (0, react_1.useField)();
    var form = (0, react_1.useForm)();
    var id = '__tableEditor_reset_effect_id';
    (0, react_2.useEffect)(function () {
        var _a;
        if (!field || !form || !tableEditor)
            return;
        (_a = form === null || form === void 0 ? void 0 : form.addEffects) === null || _a === void 0 ? void 0 : _a.call(form, id, function () {
            var _a;
            (0, core_1.onFieldReset)((_a = field === null || field === void 0 ? void 0 : field.address) === null || _a === void 0 ? void 0 : _a.entire, function () {
                isResetRef.current = true;
                if (tableEditor) {
                    // reset TableEditor 分两步:
                    // 1. 调用 undo 撤销全部操作
                    // 2. 调用内部 form.reset 重置 form 的一些状态
                    // ps: 不能只 form.reset，因为 formily 的 reset 会遍历当前的所有 fields 并 reset 所有 fields，
                    // 但是由于 TableEditor 中可能会新增、删除行，所以这时的 fields 已经和开始不同了
                    tableEditor.undo({ type: 'AllSteps' });
                    tableEditor.form.reset();
                }
            });
        });
        return function () {
            var _a;
            (_a = form === null || form === void 0 ? void 0 : form.removeEffects) === null || _a === void 0 ? void 0 : _a.call(form, id);
        };
    }, [field]);
};
exports.useFieldReset = useFieldReset;
//# sourceMappingURL=useFieldReset.js.map