"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncSubmit = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var useAsyncSubmit = function (props) {
    var setValue = props.setValue, onSubmit = props.onSubmit, isControlledMode = props.isControlledMode;
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), loading = _a[0], setLoading = _a[1];
    var handleSubmit = function (value) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(value))];
                case 2:
                    _a.sent();
                    isControlledMode && (setValue === null || setValue === void 0 ? void 0 : setValue(value));
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    console.warn('[CAsyncSwitch - async submit] 数据提交失败', e_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        loading: loading,
        handleSubmit: handleSubmit,
    };
};
exports.useAsyncSubmit = useAsyncSubmit;
//# sourceMappingURL=useAsyncSubmit.js.map