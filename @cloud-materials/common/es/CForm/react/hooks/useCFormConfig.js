import { __assign, __read, __spreadArray } from "tslib";
import { useEffect, useMemo } from 'react';
import { FormStep } from '@storage-fe/formily-arco';
import DefaultCFormDecorator from '../Components/Decorators/DefaultCFormDecorator';
import { HeaderSlot, TopSlot, FooterSlot, ResidentContentSlot } from '@storage-fe/formily-arco/es/FormStep/shared/slot';
import Empty from '../Components/Empty';
import FooterRender from '../Components/FooterRender';
import ResidentContentRender from '../Components/ResidentContentRender';
import HeaderRender from '../Components/HeaderRender';
import TopRender from '../Components/TopRender';
import { CFormPrefixName } from '../../const';
export var useCFormConfig = function (props, defaultStep) {
    var _a, _b, _c;
    if (defaultStep === void 0) { defaultStep = 0; }
    var originConfig = props.config, originStepConfig = props.stepConfig;
    var onSubmit = (originConfig || originStepConfig || {}).onSubmit;
    var isStep = !!originStepConfig;
    var formStep = useMemo(function () {
        var formStep = FormStep.createFormStep();
        formStep.data = { anchor: {} };
        if (originStepConfig === null || originStepConfig === void 0 ? void 0 : originStepConfig.formStep) {
            originStepConfig.formStep.current = formStep;
        }
        return formStep;
    }, []);
    useEffect(function () {
        formStep.setCurrent(defaultStep);
    }, [defaultStep, formStep]);
    var stepConfig = [];
    if (originStepConfig) {
        stepConfig = originStepConfig.steps.map(function (item, index) {
            var _a;
            // 每一步是否开启锚点,
            var anchor = 'anchor' in item ? item.anchor : originStepConfig.anchor;
            formStep.data.anchor = __assign(__assign({}, formStep.data.anchor), (_a = {}, _a[index] = anchor, _a));
            var c = {
                name: item.name,
                type: 'VoidField',
                decoratorOptions: {
                    component: Empty,
                },
                componentOptions: {
                    component: FormStep.StepPane,
                    props: __assign({ title: item.title }, item.arcoStepProps),
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
                    component: Empty,
                },
                componentOptions: {
                    component: FormStep.StepPane,
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
                component: ResidentContentSlot,
                props: {
                    children: function (formStep) {
                        return ResidentContentRender({
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
                component: Empty,
            },
            componentOptions: {
                component: FooterSlot,
                props: {
                    children: function (formStep) {
                        return FooterRender({
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
                component: HeaderSlot,
                props: {
                    children: function (formStep) {
                        return HeaderRender({
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
                component: TopSlot,
                props: {
                    children: function (formStep) {
                        return TopRender({
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
        : __assign({ style: { margin: '0 155px' } }, (_a = props === null || props === void 0 ? void 0 : props.defaultDecoratorProps) === null || _a === void 0 ? void 0 : _a.arcoStepsProps);
    var config = {
        name: CFormPrefixName,
        type: 'VoidField',
        decoratorOptions: {
            // 覆盖默认的 FormItem
            // 因为 FormStep 的 decorator 是通过 props 传入的
            component: Empty,
        },
        componentOptions: {
            component: FormStep,
            props: {
                mode: 'JSX',
                formStep: formStep,
                decorator: (_b = props.decorator) !== null && _b !== void 0 ? _b : [DefaultCFormDecorator, (_c = props === null || props === void 0 ? void 0 : props.defaultDecoratorProps) !== null && _c !== void 0 ? _c : {}],
                showArcoSteps: !!originConfig ? false : originStepConfig === null || originStepConfig === void 0 ? void 0 : originStepConfig.showStep,
                beforeStepChange: originStepConfig ? originStepConfig.beforeStepChange : null,
                onStepChange: originStepConfig ? originStepConfig.onStepChange : null,
                arcoStepsProps: arcoStepsProps,
            },
        },
        fields: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(stepConfig), false), __read(residentConfig), false), __read(headerConfig), false), __read(topConfig), false), __read(footerConfig), false),
    };
    return { config: config, formStep: formStep };
};
//# sourceMappingURL=useCFormConfig.js.map