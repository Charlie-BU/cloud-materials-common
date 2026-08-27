"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCFormConfig = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var formily_arco_1 = require("@storage-fe/formily-arco");
var DefaultCFormDecorator_1 = tslib_1.__importDefault(require("../Components/Decorators/DefaultCFormDecorator"));
var slot_1 = require("@storage-fe/formily-arco/es/FormStep/shared/slot");
var Empty_1 = tslib_1.__importDefault(require("../Components/Empty"));
var FooterRender_1 = tslib_1.__importDefault(require("../Components/FooterRender"));
var ResidentContentRender_1 = tslib_1.__importDefault(require("../Components/ResidentContentRender"));
var HeaderRender_1 = tslib_1.__importDefault(require("../Components/HeaderRender"));
var TopRender_1 = tslib_1.__importDefault(require("../Components/TopRender"));
var const_1 = require("../../const");
var useCFormConfig = function (props, defaultStep) {
    var _a, _b, _c;
    if (defaultStep === void 0) { defaultStep = 0; }
    var originConfig = props.config, originStepConfig = props.stepConfig;
    var onSubmit = (originConfig || originStepConfig || {}).onSubmit;
    var isStep = !!originStepConfig;
    var formStep = (0, react_1.useMemo)(function () {
        var formStep = formily_arco_1.FormStep.createFormStep();
        formStep.data = { anchor: {} };
        if (originStepConfig === null || originStepConfig === void 0 ? void 0 : originStepConfig.formStep) {
            originStepConfig.formStep.current = formStep;
        }
        return formStep;
    }, []);
    (0, react_1.useEffect)(function () {
        formStep.setCurrent(defaultStep);
    }, [defaultStep, formStep]);
    var stepConfig = [];
    if (originStepConfig) {
        stepConfig = originStepConfig.steps.map(function (item, index) {
            var _a;
            // 每一步是否开启锚点,
            var anchor = 'anchor' in item ? item.anchor : originStepConfig.anchor;
            formStep.data.anchor = tslib_1.__assign(tslib_1.__assign({}, formStep.data.anchor), (_a = {}, _a[index] = anchor, _a));
            var c = {
                name: item.name,
                type: 'VoidField',
                decoratorOptions: {
                    component: Empty_1.default,
                },
                componentOptions: {
                    component: formily_arco_1.FormStep.StepPane,
                    props: tslib_1.__assign({ title: item.title }, item.arcoStepProps),
                },
                fields: item.fields,
                data: { isStep: true, stepIndex: index },
            };
            return c;
        });
    }
    else {
        formStep.data.anchor = { '0': originConfig === null || originConfig === void 0 ? void 0 : originConfig.anchor };
        stepConfig = [
            {
                name: 'step',
                type: 'VoidField',
                decoratorOptions: {
                    component: Empty_1.default,
                },
                componentOptions: {
                    component: formily_arco_1.FormStep.StepPane,
                },
                fields: originConfig === null || originConfig === void 0 ? void 0 : originConfig.fields,
                data: { isStep: true, stepIndex: 0 },
            },
        ];
    }
    var residentConfig = [];
    var residentContent = (originConfig || originStepConfig || {}).residentContent;
    if (residentContent) {
        residentConfig.push({
            name: 'resident',
            type: 'VoidField',
            componentOptions: {
                component: slot_1.ResidentContentSlot,
                props: {
                    children: function (formStep) {
                        return (0, ResidentContentRender_1.default)({
                            isStep: isStep,
                            formStep: formStep,
                            residentContent: residentContent,
                            onSubmit: onSubmit,
                        });
                    },
                },
            },
        });
    }
    var footerConfig = [];
    var footer = (originConfig || originStepConfig || {}).footer;
    if (footer) {
        footerConfig.push({
            name: 'footer',
            type: 'VoidField',
            decoratorOptions: {
                component: Empty_1.default,
            },
            componentOptions: {
                component: slot_1.FooterSlot,
                props: {
                    children: function (formStep) {
                        return (0, FooterRender_1.default)({
                            isStep: isStep,
                            formStep: formStep,
                            callFooter: footer,
                            onSubmit: onSubmit,
                            unMountCFormSecondCheck: (originConfig === null || originConfig === void 0 ? void 0 : originConfig.unMountCFormSecondCheck) || (originStepConfig === null || originStepConfig === void 0 ? void 0 : originStepConfig.unMountCFormSecondCheck),
                        });
                    },
                },
            },
        });
    }
    var headerConfig = [];
    var header = (originConfig || originStepConfig || {}).header;
    if (header) {
        headerConfig.push({
            name: 'header',
            type: 'VoidField',
            componentOptions: {
                component: slot_1.HeaderSlot,
                props: {
                    children: function (formStep) {
                        return (0, HeaderRender_1.default)({
                            isStep: isStep,
                            formStep: formStep,
                            callHeader: header,
                            unMountCFormSecondCheck: (originConfig === null || originConfig === void 0 ? void 0 : originConfig.unMountCFormSecondCheck) || (originStepConfig === null || originStepConfig === void 0 ? void 0 : originStepConfig.unMountCFormSecondCheck),
                        });
                    },
                },
            },
        });
    }
    var topConfig = [];
    var top = (originConfig || originStepConfig || {}).top;
    if (top) {
        topConfig.push({
            name: 'top',
            type: 'VoidField',
            componentOptions: {
                component: slot_1.TopSlot,
                props: {
                    children: function (formStep) {
                        return (0, TopRender_1.default)({
                            isStep: isStep,
                            formStep: formStep,
                            callTop: top,
                        });
                    },
                },
            },
        });
    }
    var arcoStepsProps = props.decorator
        ? {}
        : tslib_1.__assign({ style: { margin: '0 155px' } }, (_a = props === null || props === void 0 ? void 0 : props.defaultDecoratorProps) === null || _a === void 0 ? void 0 : _a.arcoStepsProps);
    var config = {
        name: const_1.CFormPrefixName,
        type: 'VoidField',
        decoratorOptions: {
            // 覆盖默认的 FormItem
            // 因为 FormStep 的 decorator 是通过 props 传入的
            component: Empty_1.default,
        },
        componentOptions: {
            component: formily_arco_1.FormStep,
            props: {
                mode: 'JSX',
                formStep: formStep,
                decorator: (_b = props.decorator) !== null && _b !== void 0 ? _b : [DefaultCFormDecorator_1.default, (_c = props === null || props === void 0 ? void 0 : props.defaultDecoratorProps) !== null && _c !== void 0 ? _c : {}],
                showArcoSteps: !!originConfig ? false : originStepConfig === null || originStepConfig === void 0 ? void 0 : originStepConfig.showStep,
                beforeStepChange: originStepConfig ? originStepConfig.beforeStepChange : null,
                onStepChange: originStepConfig ? originStepConfig.onStepChange : null,
                arcoStepsProps: arcoStepsProps,
            },
        },
        fields: tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(stepConfig), false), tslib_1.__read(residentConfig), false), tslib_1.__read(headerConfig), false), tslib_1.__read(topConfig), false), tslib_1.__read(footerConfig), false),
    };
    return { config: config, formStep: formStep };
};
exports.useCFormConfig = useCFormConfig;
//# sourceMappingURL=useCFormConfig.js.map