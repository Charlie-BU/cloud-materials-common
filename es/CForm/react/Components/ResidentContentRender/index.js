import { __assign, __awaiter, __generator, __makeTemplateObject } from "tslib";
import React from 'react';
import CField from '../../CField/CField';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { has, isNil } from 'lodash-es';
import FormStep from '@storage-fe/formily-arco/es/FormStep';
import { useCConfigContext } from '../../../../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('cform-resident-render');
var ResidentContentRender = function (_a) {
    var isStep = _a.isStep, formStep = _a.formStep, residentContent = _a.residentContent, onSubmit = _a.onSubmit;
    var locale = useCConfigContext().locale;
    var submit = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
            if (has(item, 'buttonType')) {
                var buildInItem = item;
                switch (buildInItem.buttonType) {
                    case 'confirm':
                        return (React.createElement(FormStep.SubmitButton, __assign({ className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["button"], ["button"]))), size: "large", key: "confirm", children: locale.CForm.buttonText.submitOrder }, buildInItem.props, { onSubmit: submit })));
                    default:
                        return null;
                }
            }
            if (has(item, 'field')) {
                var field = item.field;
                return React.createElement(CField, __assign({ key: field.name.toString() }, field));
            }
        })) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
            return !isNil(item);
        });
    };
    var residentNode = renderResidentContentItems(residentContent);
    return (residentNode === null || residentNode === void 0 ? void 0 : residentNode.length) ? React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))) }, residentNode) : null;
};
export default ResidentContentRender;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map