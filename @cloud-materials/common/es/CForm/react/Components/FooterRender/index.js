import { __assign, __awaiter, __generator, __makeTemplateObject } from "tslib";
import React, { Fragment } from 'react';
import { Button, Space } from '@arco-design/web-react';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { has, isFunction } from 'lodash-es';
import CField from '../../CField/CField';
import FormStep from '@storage-fe/formily-arco/es/FormStep';
import { openSecondCheckModal } from '../SecondCheck';
import { useCConfigContext } from '../../../../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('cform-footer-render');
var FooterRender = function (_a) {
    var isStep = _a.isStep, formStep = _a.formStep, callFooter = _a.callFooter, onSubmit = _a.onSubmit, unMountCFormSecondCheck = _a.unMountCFormSecondCheck;
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
    var locale = useCConfigContext().locale;
    var footer = typeof callFooter === 'function' ? callFooter(isStep ? formStep : formStep.form, submit) : callFooter;
    var _b = footer, left = _b.left, right = _b.right, _c = _b.autoHiddenStepButtons, autoHiddenStepButtons = _c === void 0 ? false : _c;
    if (!left && !right)
        return null;
    var renderFooterItems = function (items) {
        return items === null || items === void 0 ? void 0 : items.map(function (item, index) {
            if (typeof item === 'function') {
                return React.createElement(Fragment, { key: index }, item(formStep));
            }
            if (has(item, 'buttonType')) {
                var buildInItem = item;
                var processButtons = function (buildInItem) {
                    var _a, _b;
                    switch (buildInItem.buttonType) {
                        case 'back':
                            if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || formStep.allowBack) {
                                return (React.createElement(FormStep.BackButton, __assign({ key: index, size: "large", children: locale.CForm.buttonText.backText }, buildInItem.props)));
                            }
                            break;
                        case 'next':
                            if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || formStep.allowNext) {
                                return (React.createElement(FormStep.NextButton, __assign({ key: index, size: "large", children: locale.CForm.buttonText.nextText }, buildInItem.props)));
                            }
                            break;
                        case 'confirm':
                            if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || !formStep.allowNext) {
                                return (React.createElement(FormStep.SubmitButton, __assign({ key: index, children: locale.CForm.buttonText.confirmText, size: "large" }, buildInItem.props, { onSubmit: submit })));
                            }
                            break;
                        case 'submit':
                            if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || !formStep.allowNext) {
                                return (React.createElement(FormStep.SubmitButton, __assign({ key: index, size: "large", children: locale.CForm.buttonText.submitText, onSubmit: submit }, buildInItem.props)));
                            }
                            break;
                        case 'cancel': {
                            return (React.createElement(Button, __assign({ key: index, size: "large" }, buildInItem.props, { onClick: function () {
                                    var _a;
                                    openSecondCheckModal({
                                        onOk: (_a = buildInItem.props) === null || _a === void 0 ? void 0 : _a.onClick,
                                        form: formStep.form,
                                        unMountCFormSecondCheck: unMountCFormSecondCheck,
                                        locale: locale,
                                    });
                                } }), (_b = (_a = buildInItem.props) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : locale.CForm.buttonText.cancelText));
                        }
                        default:
                            return null;
                    }
                };
                var buttonNode = processButtons(buildInItem);
                return isFunction(buildInItem.wrapper) ? (React.createElement(Fragment, { key: index }, buildInItem.wrapper(buttonNode))) : (buttonNode);
            }
            if (has(item, 'field')) {
                var field = item.field;
                return React.createElement(CField, __assign({ key: field.name.toString() }, field));
            }
        });
    };
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) },
        React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["left"], ["left"]))) },
            React.createElement(Space, { size: "medium" }, renderFooterItems(left))),
        React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["right"], ["right"]))) },
            React.createElement(Space, { size: 12, align: "end" }, renderFooterItems(right)))));
};
export default FooterRender;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map