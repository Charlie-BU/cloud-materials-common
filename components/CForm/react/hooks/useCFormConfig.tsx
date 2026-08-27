import { useEffect, useMemo } from 'react';
import type { CFieldConfig, CFormProps, CFormStep } from '../../interface';
import { FormStep } from '@storage-fe/formily-arco';
import DefaultCFormDecorator from '../Components/Decorators/DefaultCFormDecorator';
import { HeaderSlot, TopSlot, FooterSlot, ResidentContentSlot } from '@storage-fe/formily-arco/es/FormStep/shared/slot';
import Empty from '../Components/Empty';
import FooterRender from '../Components/FooterRender';
import ResidentContentRender from '../Components/ResidentContentRender';
import HeaderRender from '../Components/HeaderRender';
import TopRender from '../Components/TopRender';
import { CFormPrefixName } from '../../const';

export const useCFormConfig = (props: CFormProps, defaultStep = 0) => {
  const { config: originConfig, stepConfig: originStepConfig } = props;
  const { onSubmit } = originConfig || originStepConfig || {};

  const isStep = !!originStepConfig;

  const formStep = useMemo(() => {
    const formStep = FormStep.createFormStep();
    formStep.data = { anchor: {} };
    if (originStepConfig?.formStep) {
      originStepConfig.formStep.current = formStep;
    }
    return formStep;
  }, []);

  useEffect(() => {
    formStep.setCurrent(defaultStep);
  }, [defaultStep, formStep]);

  let stepConfig: CFieldConfig[] = [];
  if (originStepConfig) {
    stepConfig = originStepConfig.steps.map((item, index) => {
      // 每一步是否开启锚点,
      const anchor = 'anchor' in item ? item.anchor : originStepConfig.anchor;
      formStep.data.anchor = { ...formStep.data.anchor, [index]: anchor };
      const c: CFieldConfig = {
        name: item.name,
        type: 'VoidField',
        decoratorOptions: {
          component: Empty,
        },
        componentOptions: {
          component: FormStep.StepPane,
          props: {
            title: item.title,
            ...item.arcoStepProps,
          },
        },
        fields: item.fields,
        data: { isStep: true, stepIndex: index },
      };
      return c;
    });
  } else {
    formStep.data.anchor = { '0': originConfig?.anchor };
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
        fields: originConfig?.fields,
        data: { isStep: true, stepIndex: 0 },
      },
    ];
  }

  const residentConfig: CFieldConfig[] = [];
  const { residentContent } = originConfig || originStepConfig || {};
  if (residentContent) {
    residentConfig.push({
      name: 'resident',
      type: 'VoidField',
      componentOptions: {
        component: ResidentContentSlot,
        props: {
          children: (formStep: CFormStep) =>
            ResidentContentRender({
              isStep,
              formStep,
              residentContent,
              onSubmit,
            }),
        },
      },
    });
  }

  const footerConfig: CFieldConfig[] = [];
  const { footer } = originConfig || originStepConfig || {};
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
          children: (formStep: CFormStep) =>
            FooterRender({
              isStep,
              formStep,
              callFooter: footer,
              onSubmit,
              unMountCFormSecondCheck:
                originConfig?.unMountCFormSecondCheck || originStepConfig?.unMountCFormSecondCheck,
            }),
        },
      },
    });
  }

  const headerConfig: CFieldConfig[] = [];
  const { header } = originConfig || originStepConfig || {};
  if (header) {
    headerConfig.push({
      name: 'header',
      type: 'VoidField',
      componentOptions: {
        component: HeaderSlot,
        props: {
          children: (formStep: CFormStep) =>
            HeaderRender({
              isStep,
              formStep,
              callHeader: header,
              unMountCFormSecondCheck:
                originConfig?.unMountCFormSecondCheck || originStepConfig?.unMountCFormSecondCheck,
            }),
        },
      },
    });
  }

  const topConfig: CFieldConfig[] = [];
  const { top } = originConfig || originStepConfig || {};
  if (top) {
    topConfig.push({
      name: 'top',
      type: 'VoidField',
      componentOptions: {
        component: TopSlot,
        props: {
          children: (formStep: CFormStep) =>
            TopRender({
              isStep,
              formStep,
              callTop: top,
            }),
        },
      },
    });
  }

  const arcoStepsProps = props.decorator
    ? {}
    : {
        style: { margin: '0 155px' },
        ...props?.defaultDecoratorProps?.arcoStepsProps,
      };

  const config: CFieldConfig = {
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
        formStep,
        decorator: props.decorator ?? [DefaultCFormDecorator, props?.defaultDecoratorProps ?? {}],
        showArcoSteps: !!originConfig ? false : originStepConfig?.showStep,
        beforeStepChange: originStepConfig ? originStepConfig.beforeStepChange : null,
        onStepChange: originStepConfig ? originStepConfig.onStepChange : null,
        arcoStepsProps: arcoStepsProps,
      },
    },
    fields: [...stepConfig, ...residentConfig, ...headerConfig, ...topConfig, ...footerConfig],
  };
  return { config, formStep };
};
