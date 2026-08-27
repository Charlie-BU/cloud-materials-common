"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEdit = void 0;
var tslib_1 = require("tslib");
var ahooks_1 = require("ahooks");
var react_1 = require("react");
var useValidate_1 = tslib_1.__importDefault(require("./useValidate"));
function useEdit(_a) {
    var _this = this;
    var value = _a.value, _b = _a.initEditable, initEditable = _b === void 0 ? false : _b, _c = _a.rules, rules = _c === void 0 ? [] : _c, _d = _a.stopAtFirstError, stopAtFirstError = _d === void 0 ? false : _d;
    var _e = tslib_1.__read((0, ahooks_1.useBoolean)(false), 2), submitting = _e[0], _f = _e[1], startSubmitting = _f.setTrue, endSubmission = _f.setFalse;
    var _g = tslib_1.__read((0, ahooks_1.useBoolean)(initEditable), 2), editing = _g[0], _h = _g[1], startEditing = _h.setTrue, endEditing = _h.setFalse;
    var _j = tslib_1.__read((0, react_1.useState)(value), 2), editValue = _j[0], setEditValue = _j[1];
    var _k = (0, useValidate_1.default)({ value: editValue, rules: rules, stopAtFirstError: stopAtFirstError }), valid = _k.valid, errors = _k.errors;
    var state = (0, react_1.useMemo)(function () { return ({
        submitting: submitting,
        editing: editing,
        editValue: editValue,
        valid: valid,
        errors: errors,
    }); }, [submitting, editing, editValue, valid, errors]);
    var handleSubmit = function (onSubmit) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!valid) {
                        return [2 /*return*/];
                    }
                    startSubmitting();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, onSubmit(editValue)];
                case 2:
                    _a.sent();
                    endEditing();
                    endSubmission();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    endSubmission();
                    return [2 /*return*/, Promise.reject(error_1)];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCancel = function (onCancel) {
        typeof onCancel === 'function' && onCancel();
        endEditing();
    };
    var enterEditing = function () {
        setEditValue(value);
        startEditing();
    };
    var controls = { startEditing: enterEditing, setEditValue: setEditValue, handleSubmit: handleSubmit, handleCancel: handleCancel };
    return [state, controls];
}
exports.useEdit = useEdit;
//# sourceMappingURL=useEdit.js.map