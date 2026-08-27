import { __awaiter, __generator, __read } from "tslib";
import { useState } from 'react';
export var useAsyncSubmit = function (props) {
    var setValue = props.setValue, onSubmit = props.onSubmit, isControlledMode = props.isControlledMode;
    var _a = __read(useState(false), 2), loading = _a[0], setLoading = _a[1];
    var handleSubmit = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
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
//# sourceMappingURL=useAsyncSubmit.js.map