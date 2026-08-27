"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CField_1 = tslib_1.__importDefault(require("../../CField/CField"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
var FormStep_1 = tslib_1.__importDefault(require("@storage-fe/formily-arco/es/FormStep"));
var CConfigProvider_1 = require("../../../../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-resident-render');
var ResidentContentRender = function (_a) {
    var isStep = _a.isStep, formStep = _a.formStep, residentContent = _a.residentContent, onSubmit = _a.onSubmit;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var submit = function (values) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(values, formStep.form))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var renderResidentContentItems = function (items) {
        var _a;
        return (_a = items === null || items === void 0 ? void 0 : items.map(function (item, _) {
            if (typeof item === 'function') {
                return item(isStep ? formStep : formStep.form);
            }
            if ((0, lodash_es_1.has)(item, 'buttonType')) {
                var buildInItem = item;
                switch (buildInItem.buttonType) {
                    case 'confirm':
                        return (react_1.default.createElement(FormStep_1.default.SubmitButton, tslib_1.__assign({ className: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["button"], ["button"]))), size: "large", key: "confirm", children: locale.CForm.buttonText.submitOrder }, buildInItem.props, { onSubmit: submit })));
                    default:
                        return null;
                }
            }
            if ((0, lodash_es_1.has)(item, 'field')) {
                var field = item.field;
                return react_1.default.createElement(CField_1.default, tslib_1.__assign({ key: field.name.toString() }, field));
            }
        })) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
            return !(0, lodash_es_1.isNil)(item);
        });
    };
    var residentNode = renderResidentContentItems(residentContent);
    return (residentNode === null || residentNode === void 0 ? void 0 : residentNode.length) ? react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))) }, residentNode) : null;
};
exports.default = ResidentContentRender;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map