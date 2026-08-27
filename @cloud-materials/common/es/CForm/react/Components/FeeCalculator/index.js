import { __assign, __awaiter, __generator, __rest } from "tslib";
import React from 'react';
import { observer, useField, useForm } from '@formily/react';
import CFeeCalculator from '../../../../CFeeCalculator';
import { get } from 'lodash-es';
export var FORM_CALCULATOR_KEY = 'FORM_CALCULATOR_KEY';
export var FeeCalculatorForm = observer(function (props) {
    var form = useForm();
    var field = useField();
    var _a = props.fieldIndex, fieldIndex = _a === void 0 ? [] : _a, rest = __rest(props, ["fieldIndex"]);
    var depValues = {};
    (fieldIndex !== null && fieldIndex !== void 0 ? fieldIndex : []).map(function (indexItem) {
        depValues[indexItem] = get(form.values, indexItem);
    });
    var processedHandleData = props.handleData
        ? function (params) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = props.handleData) === null || _a === void 0 ? void 0 : _a.call(props, params, form))];
                    case 1: return [2 /*return*/, (_b.sent())];
                }
            });
        }); }
        : undefined;
    return (React.createElement(CFeeCalculator, __assign({}, rest, { 
        // 依赖CFeeCalculator提供的formValues和deps触发价格重计算
        formValues: depValues, deps: fieldIndex, onPriceChange: function (priceInfo) {
            var _a;
            if (field) {
                field.data = (_a = field.data) !== null && _a !== void 0 ? _a : {};
                field.data[FORM_CALCULATOR_KEY] = priceInfo;
            }
        }, handleData: processedHandleData })));
});
export default FeeCalculatorForm;
//# sourceMappingURL=index.js.map