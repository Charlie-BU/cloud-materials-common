"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
var CField_1 = tslib_1.__importDefault(require("../../CField/CField"));
var FormStep_1 = tslib_1.__importDefault(require("@storage-fe/formily-arco/es/FormStep"));
var SecondCheck_1 = require("../SecondCheck");
var CConfigProvider_1 = require("../../../../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-footer-render');
var FooterRender = function (_a) {
    var isStep = _a.isStep, formStep = _a.formStep, callFooter = _a.callFooter, onSubmit = _a.onSubmit, unMountCFormSecondCheck = _a.unMountCFormSecondCheck;
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
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var footer = typeof callFooter === 'function' ? callFooter(isStep ? formStep : formStep.form, submit) : callFooter;
    var _b = footer, left = _b.left, right = _b.right, _c = _b.autoHiddenStepButtons, autoHiddenStepButtons = _c === void 0 ? false : _c;
    if (!left && !right)
        return null;
    var renderFooterItems = function (items) {
        return items === null || items === void 0 ? void 0 : items.map(function (item, index) {
            if (typeof item === 'function') {
                return react_1.default.createElement(react_1.Fragment, { key: index }, item(formStep));
            }
            if ((0, lodash_es_1.has)(item, 'buttonType')) {
                var buildInItem = item;
                var processButtons = function (buildInItem) {
                    var _a, _b;
                    switch (buildInItem.buttonType) {
                        case 'back':
                            if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || formStep.allowBack) {
                                return (react_1.default.createElement(FormStep_1.default.BackButton, tslib_1.__assign({ key: index, size: "large", children: locale.CForm.buttonText.backText }, buildInItem.props)));
                            }
                            break;
                        case 'next':
                            if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || formStep.allowNext) {
                                return (react_1.default.createElement(FormStep_1.default.NextButton, tslib_1.__assign({ key: index, size: "large", children: locale.CForm.buttonText.nextText }, buildInItem.props)));
                            }
                            break;
                        case 'confirm':
                            if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || !formStep.allowNext) {
                                return (react_1.default.createElement(FormStep_1.default.SubmitButton, tslib_1.__assign({ key: index, children: locale.CForm.buttonText.confirmText, size: "large" }, buildInItem.props, { onSubmit: submit })));
                            }
                            break;
                        case 'submit':
                            if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || !formStep.allowNext) {
                                return (react_1.default.createElement(FormStep_1.default.SubmitButton, tslib_1.__assign({ key: index, size: "large", children: locale.CForm.buttonText.submitText, onSubmit: submit }, buildInItem.props)));
                            }
                            break;
                        case 'cancel': {
                            return (react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ key: index, size: "large" }, buildInItem.props, { onClick: function () {
                                    var _a;
                                    (0, SecondCheck_1.openSecondCheckModal)({
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
                return (0, lodash_es_1.isFunction)(buildInItem.wrapper) ? (react_1.default.createElement(react_1.Fragment, { key: index }, buildInItem.wrapper(buttonNode))) : (buttonNode);
            }
            if ((0, lodash_es_1.has)(item, 'field')) {
                var field = item.field;
                return react_1.default.createElement(CField_1.default, tslib_1.__assign({ key: field.name.toString() }, field));
            }
        });
    };
    return (react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) },
        react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["left"], ["left"]))) },
            react_1.default.createElement(web_react_1.Space, { size: "medium" }, renderFooterItems(left))),
        react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["right"], ["right"]))) },
            react_1.default.createElement(web_react_1.Space, { size: 12, align: "end" }, renderFooterItems(right)))));
};
exports.default = FooterRender;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map