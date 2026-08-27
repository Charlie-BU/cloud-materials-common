import { Button, Popconfirm } from '@arco-design/web-react';
import type { Form } from '@formily/core';
import { onFormInit } from '@formily/core';
import React, { useImperativeHandle, useRef, useState } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import type { CFormFooterBuiltInButton, FormType } from '../../CForm';
import type { CForm, CFormFooter, CFormStepFooter, PureComponentsMap } from '../../CForm/interface';
import { useAutoRef, useMergeProps } from '../../hooks';
import { MaskableProvider, isMaskableAlertType, renderAlert } from './components';
import type { MaskableFormDecoratorProps } from './components/MaskableFormDecorator';
import MaskableFormDecorator from './components/MaskableFormDecorator';
import { createStaticMethods } from './createStaticMethods';
import { useFooter } from './hooks';
import type { BaseProps, BuiltInFormProps, CreateBuiltIn, CreateBuiltInForm } from './interface';
import { isArray } from 'lodash-es';

export const createBuiltInForm: CreateBuiltInForm = (MaskableComponent, formType, options) => {
  const { plugin, defaultProps, componentName } = options;
  const create: CreateBuiltIn<BaseProps, typeof formType> = Form => {
    const TypeMaskableComponent = MaskableComponent as React.ComponentType<
      BaseProps & { ref?: React.Ref<HTMLDivElement> }
    >;
    type Props = BuiltInFormProps<BaseProps, typeof formType, PureComponentsMap>;
    const FormWrapperComponent = React.forwardRef<HTMLDivElement, Props>((originProps, ref) => {
      const { locale, cComponentConfig = {}, useCssPrefix } = useCConfigContext();
      const props: typeof originProps = useMergeProps(
        originProps,
        {} as any,
        componentName ? cComponentConfig[componentName] ?? {} : {},
      );

      const clsPrefix = useCssPrefix('maskable-form');

      const {
        children,
        formProps,
        formConfig,
        formRef: userFormRef,
        okButtonProps,
        okText,
        cancelText,
        cancelButtonProps,
        footerFields,
        decoratorProps,
        confirmOnOk,
        formFooter = (...v) => v,
        ...resetModalProps
      } = props;
      const shouldOkConfirm = useAutoRef(Boolean(confirmOnOk && !confirmOnOk.disabled));
      const formRef = useRef<CForm>(null);
      const submitArgsRef = useRef<[any, any]>([void 0, void 0]);
      const [form, setForm] = useState<Form>();
      const [{ footer: _, ...footerState }] = useFooter({
        ...props,
        // footer被替换了，所以这里强制不走confirm逻辑，由这边的footer接管了
        confirmOnOk: false,
        componentName,
      });
      const footerStateRef = useAutoRef(footerState);
      const [maskablePlugin] = useState(() => plugin && new plugin());
      const [popconfirmVisible, setPopconfirmVisible] = useState(false);

      const footerRef = useRef<HTMLDivElement>(null);
      const topRef = useRef<HTMLDivElement>(null);

      useImperativeHandle(userFormRef, () => form as any);

      const renderCancelButton = () =>
        !resetModalProps.hideCancel && (
          <Button
            onClick={(...args) => footerStateRef.current.onCancel(...args)}
            {...defaultProps?.cancelButtonProps}
            {...cancelButtonProps}
          >
            {cancelText ?? locale.Modal.cancelText}
          </Button>
        );

      const submitButton: CFormFooterBuiltInButton = {
        buttonType: 'confirm',
        props: {
          ...defaultProps?.okButtonProps,
          size: 'default',
          children: okText ?? locale.Modal.okText,
          ...okButtonProps,
        },
        wrapper: buttonNode =>
          confirmOnOk ? (
            <Popconfirm
              popupVisible={popconfirmVisible}
              onVisibleChange={visible => {
                if (!visible) {
                  setPopconfirmVisible(visible);
                }
              }}
              onCancel={(...args) => {
                setPopconfirmVisible(false);
                return confirmOnOk.onCancel?.(...args);
              }}
              {...confirmOnOk}
              onOk={(...args) =>
                Promise.resolve(confirmOnOk.onOk?.(...args)).then(() => handleSubmit(...submitArgsRef.current))
              }
            >
              {buttonNode}
            </Popconfirm>
          ) : (
            buttonNode
          ),
      };

      const defaultFooterConfig =
        formType === 'config'
          ? ((form => ({
              left: footerFields,
              // @ts-expect-error 这里按预期给定类型
              right: formFooter(renderCancelButton, submitButton, form),
            })) as CFormFooter)
          : ((formStep => ({
              left: footerFields,
              right: formFooter(
                // @ts-expect-error 这里按预期给定类型
                renderCancelButton,
                {
                  buttonType: 'back',
                  props: { size: 'default' },
                },
                {
                  buttonType: 'next',
                  props: { size: 'default' },
                },
                submitButton,
                formStep,
              ),
            })) as CFormStepFooter);

      const config = formProps?.[formType] ?? formConfig!;

      const handleSubmit = (...args: [any, any]) =>
        Promise.resolve(config.onSubmit?.(...args))
          // 在这里回调onOk，模拟arco modal的行为
          .then(() => footerStateRef.current.onOk(...args))
          .finally?.(() => {
            setPopconfirmVisible(false);
          });

      const effects = isArray(config.effects) ? config.effects : [config.effects];
      const defaultConfig: typeof config = {
        footer: defaultFooterConfig,
        ...config,
        onSubmit(...args) {
          if (shouldOkConfirm.current) {
            submitArgsRef.current = args;
            setPopconfirmVisible(true);
            return;
          }
          return handleSubmit(...args);
        },
        effects: [
          () => {
            onFormInit(form => {
              setForm(form);
            });
          },
          ...effects,
        ],
        formLayout: {
          ...config.formLayout,
          style: { ...config.formLayout?.style },
        },
      };

      const defaultFormProps: React.ComponentProps<FormType<any, React.FC<MaskableFormDecoratorProps>>> = {
        ref: formRef,
        ...{
          ...formProps,
          [formType]: defaultConfig,
        },
        decorator: [
          MaskableFormDecorator,
          {
            footerContainer: () => footerRef.current,
            topContainer: () => topRef.current?.parentElement ?? null,
            stickyStep: true,
            ...decoratorProps,
          },
        ],
      };

      const defaultMaskableProps: BaseProps = {
        // 接管footer内容，将form的footer传送进去，arco modal的onOk onCancel失效，不再自动回调，需要手动回调
        ...resetModalProps,
        footer:
          resetModalProps.footer === null
            ? resetModalProps.footer
            : resetModalProps.footer ?? <div className={clsPrefix`footer`} ref={footerRef} />,
        ...footerState,
        contentTop: Boolean(defaultFormProps.config?.top?.length)
          ? {
              ...(isMaskableAlertType(resetModalProps.contentTop) ? resetModalProps.contentTop : null),
              type: 'custom',
              content: (
                <>
                  {renderAlert(resetModalProps.contentTop)}
                  <div ref={topRef} />
                </>
              ),
            }
          : resetModalProps.contentTop,
      };

      return (
        <TypeMaskableComponent
          {...defaultProps}
          {...(maskablePlugin?.getExtraMaskableProps(
            defaultMaskableProps as React.ComponentProps<typeof MaskableComponent>,
          ) ?? defaultMaskableProps)}
          ref={ref}
        >
          <Form {...(maskablePlugin?.getFormProps(defaultFormProps) ?? defaultFormProps)}>{children}</Form>
        </TypeMaskableComponent>
      );
    });

    FormWrapperComponent.displayName = `CForm(${TypeMaskableComponent.displayName ?? TypeMaskableComponent})`;

    const FormWrapper = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
      <MaskableProvider>
        <FormWrapperComponent {...props} ref={ref} />
      </MaskableProvider>
    ));
    FormWrapper.displayName = `${TypeMaskableComponent.displayName}.${formType === 'config' ? 'Form' : 'FormStep'}`;
    // FIXME 返回类型是一个明确的带有泛型的函数，createStaticMethods 返回的是 JSXElementConstructor类型，二者无法兼容但是不影响运行
    return Object.assign(createStaticMethods(FormWrapper) as any, { create });
  };

  return create;
};
