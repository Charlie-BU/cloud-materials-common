"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeCalculatorForm = exports.FORM_CALCULATOR_KEY = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var CFeeCalculator_1 = tslib_1.__importDefault(require("../../../../CFeeCalculator"));
var lodash_es_1 = require("lodash-es");
exports.FORM_CALCULATOR_KEY = 'FORM_CALCULATOR_KEY';
exports.FeeCalculatorForm = (0, react_2.observer)(function (props) {
    var form = (0, react_2.useForm)();
    var field = (0, react_2.useField)();
    var _a = props.fieldIndex, fieldIndex = _a === void 0 ? [] : _a, rest = tslib_1.__rest(props, ["fieldIndex"]);
    var depValues = {};
    (fieldIndex !== null && fieldIndex !== void 0 ? fieldIndex : []).map(function (indexItem) {
        depValues[indexItem] = (0, lodash_es_1.get)(form.values, indexItem);
    });
    var processedHandleData = props.handleData
        ? function (params) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = props.handleData) === null || _a === void 0 ? void 0 : _a.call(props, params, form))];
                    case 1: return [2 /*return*/, (_b.sent())];
                }
            });
        }); }
        : undefined;
    return (react_1.default.createElement(CFeeCalculator_1.default, tslib_1.__assign({}, rest, { 
        // 依赖CFeeCalculator提供的formValues和deps触发价格重计算
        formValues: depValues, deps: fieldIndex, onPriceChange: function (priceInfo) {
            var _a;
            if (field) {
                field.data = (_a = field.data) !== null && _a !== void 0 ? _a : {};
                field.data[exports.FORM_CALCULATOR_KEY] = priceInfo;
            }
        }, handleData: processedHandleData })));
});
exports.default = exports.FeeCalculatorForm;
//# sourceMappingURL=index.js.map