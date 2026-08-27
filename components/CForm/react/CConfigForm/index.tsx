/* eslint-disable @typescript-eslint/ban-types */
import React, { useContext, useEffect, useImperativeHandle } from 'react';
import type { CFormProps, CFormRegisterConfig, FormType, ObjectType } from '../../interface';
import classNames from 'classnames';
import { CFormRegisterConfigContext } from '../../shared/context';
import { FormProvider } from '@formily/react';
import type { Form } from '@formily/core';
import {
  registerValidateFormats,
  setValidateLanguage,
  registerValidateLocale,
  registerValidateMessageTemplateEngine,
} from '@formily/core';
import { useCreateForm } from '../hooks';
import CLoadingV2 from '../../../CLoadingV2';
import CField from '../CField/CField';
import { FormLayout } from '@storage-fe/formily-arco';
import { DefaultLayout } from '../../const';
import { useCFormConfig } from '../hooks/useCFormConfig';
import defineConfirmConfig from '../CConfirm';
import { CConfigContext, useCConfigContext } from '../../../CConfigProvider';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import { mergeFields } from '../../shared/utils';
import { getValidateMessageTemplateEngine } from '@formily/validator';
import { checkConfigRepeatedPath } from './utils';

const prefixCls = classNamePrefixFactory('form');

const testId = {
  container: prefixCls``,
};

function CConfigFormComponent<T extends ObjectType = any, D extends ObjectType = any>(
  { ref, ...props }: CFormProps<T, D>,
  registerConfig: CFormRegisterConfig,
) {
  const { style, className, children, config, stepConfig, CLoadingProps = {} } = props;

  const { formLayout } = config || stepConfig || {};
  const { loading, error, form, run, defaultStep } = useCreateForm<T, D>(config || stepConfig);
  const { config: layoutConfig } = useCFormConfig(props, defaultStep);
  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('form');

  useImperativeHandle(ref, () => form);

  const { locale, cComponentConfig } = useCConfigContext();

  useEffect(() => {
    // TODO: 先修复匹配文案问题，后续做优化引入文件
    registerValidateLocale({
      'zh-CN': {
        required: '请输入{label}',
      },
      'en-US': {
        required: 'Input',
      },
    });
  }, []);

  useEffect(() => {
    setValidateLanguage(locale.locale);
  }, [locale.locale]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      checkConfigRepeatedPath(config || stepConfig);
    }
    const customTemplate = getValidateMessageTemplateEngine();
    registerValidateMessageTemplateEngine((msg, ctx) => {
      // 使用CForm.registerValidateMessageTemplateEngine自定义注册时，执行自定义的返回值
      if (customTemplate) {
        return customTemplate(msg, ctx);
      }

      const { field = {} } = ctx || {};
      if (typeof msg === 'string') {
        return msg.replace(/\{label\}/g, field?.title ?? '');
      }
      return msg;
    });
  }, []);

  if (!config && !stepConfig) {
    console.warn('cform: 续传入 config 或者 stepConfig');
    return null;
  }

  return (
    <FormLayout {...DefaultLayout} {...cComponentConfig?.CForm} {...registerConfig.formLayout} {...formLayout}>
      <CFormRegisterConfigContext.Provider value={registerConfig}>
        <FormProvider form={(form || { onMount: () => {}, onUnmount: () => {} }) as Form}>
          <form
            style={style}
            data-cy={testId.container}
            data-testid={testId.container}
            className={classNames(cssPrefix``, className)}
            autoComplete="off"
            onSubmit={(e: React.FormEvent) => {
              e?.stopPropagation?.();
              e?.preventDefault?.();
              const onSubmit = props.config?.onSubmit || props.stepConfig?.onSubmit;
              const submit = async (values: any) => {
                await onSubmit?.(values, form!);
              };
              form?.submit(submit);
            }}
          >
            {loading || error || !form ? (
              <CLoadingV2
                type="block"
                loading={loading}
                hasError={error}
                onReload={() => run()}
                isBlock
                style={{ height: 200 }}
                {...CLoadingProps}
              />
            ) : (
              <>
                <CField {...layoutConfig} />
                {children}
              </>
            )}
          </form>
        </FormProvider>
      </CFormRegisterConfigContext.Provider>
    </FormLayout>
  );
}

const registerConfig: FormType<{}>['registerConfig'] = (componentsMap, options) => {
  const Form = React.forwardRef<any, CFormProps>((props: CFormProps, ref) =>
    CConfigFormComponent(
      { ...props, ref },
      {
        componentsMap,
        ...options,
      },
    ),
  );

  Form.displayName = 'CForm';

  const originReturnFn = (args: any) => args;

  const staticProps: { [key in keyof FormType<{}>]: FormType<{}>[key] } = {
    registerConfig: (innerComponentsMap, innerOptions) =>
      registerConfig({ ...componentsMap, ...innerComponentsMap }, { ...options, ...innerOptions }),

    defineComponentOption: (component, props) => ({
      component,
      props,
    }),
    defineDecoratorOptions: (component, props) => ({
      component,
      props,
    }),

    defineConfig: originReturnFn,
    defineStepConfig: originReturnFn,
    defineField: mergeFields as any,
    definePartialField: mergeFields as any,
    defineFields: originReturnFn,
    registerValidateFormats: args => {
      registerValidateFormats(args);
    },
    registerValidateLocale(lang, locale) {
      setValidateLanguage(lang);
      registerValidateLocale(locale);
    },
    registerValidateMessageTemplateEngine,
    Field: CField,
    defineConfirmConfig,
  };

  return Object.assign(Form, staticProps as any);
};

export default registerConfig({});
