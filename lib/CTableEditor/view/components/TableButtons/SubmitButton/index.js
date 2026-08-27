"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitButton = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var BaseButton_1 = require("../BaseButton");
var icon_1 = require("@arco-design/web-react/icon");
var utils_1 = require("../../../../utils");
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var testId_1 = require("../../../../testId");
var SubmitButton = function (props) {
    var onSubmit = props.onSubmit, onValidateError = props.onValidateError, _a = props.icon, icon = _a === void 0 ? react_1.default.createElement(icon_1.IconPlusCircle, null) : _a, _text = props.text, restProps = tslib_1.__rest(props, ["onSubmit", "onValidateError", "icon", "text"]);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var text = _text || locale.CTableEditor.submit;
    var handleClick = function (tableEditor) {
        tableEditor.form
            .submit()
            .then(function (values) {
            // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
            var v = (0, utils_1.transformFormValuesToArray)(values, tableEditor.table.initTotalData);
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(v, tableEditor);
        })
            .catch(function (e) {
            onValidateError === null || onValidateError === void 0 ? void 0 : onValidateError(e);
            console.warn('校验失败, error:', e);
        });
    };
    return (react_1.default.createElement(BaseButton_1.BaseButton, tslib_1.__assign({ icon: icon, text: text, disabled: function (tableEditor) { return !(tableEditor === null || tableEditor === void 0 ? void 0 : tableEditor.hasChanged); } }, restProps, { onClick: handleClick, testId: testId_1.testId.submitButton })));
};
exports.SubmitButton = SubmitButton;
//# sourceMappingURL=index.js.map