import { useEffect, useState } from 'react';
import type { CForm, CFormBaseConfig, CFormInstanceProps, ObjectType } from '../../interface';
import type { IFormProps } from '@formily/core';
import { createForm, onFormUnmount, onFormValidateFailed } from '@formily/core';
import { autorun, observable, toJS } from '@formily/reactive';
import { FormEventSource, getFormFieldId, notifyFormCustomEvent } from '../../shared/utils';
import createHelper from '../../helper';
import { isArray } from 'lodash-es';
import { useCConfigContext } from '../../../CConfigProvider';

export function useCreateForm<T extends ObjectType = any, D extends ObjectType = any>(
  config?: CFormBaseConfig<T, D>,
  outerForm?: CForm,
) {
  const { initConfig, effects, name } = config || {};
  const [loading, setLoading] = useState(typeof initConfig === 'function' && !outerForm);
  const [error, setError] = useState(false);
  const [form, setForm] = useState<CForm<T, D>>();
  const [defaultStep, setDefaultStep] = useState(0);
  const { cComponentConfig } = useCConfigContext();

  const run = () => {
    const create = (formProps?: CFormInstanceProps) => {
      const formEffect: IFormProps['effects'] = (form: CForm<T, D>) => {
        const helper = createHelper({ enableRaceCondition: cComponentConfig?.CForm?.enableRaceCondition });

        // * 自定义事件，用于外部消费
        notifyFormCustomEvent({
          source: FormEventSource.HelperInit,
          payload: {
            helper,
            form,
          },
        });

        form.data = observable<D>({} as any);

        form.setData = data => {
          Object.assign(form.data, data);
        };
        form.setData(formProps?.data);

        if (effects) {
          const effectsArray = isArray(effects) ? effects : [effects];
          effectsArray.forEach(effect => {
            effect?.(helper, form);
          });
        }
        onFormValidateFailed(form => {
          // 筛掉所有非ValidateError类型的异常
          const validateErrors = form.errors.filter(
            item => item.code === 'ValidateError' || item.code === 'EffectError',
          );
          const firstErrorAddress = validateErrors?.[0]?.address?.toString();
          // 如果有校验报错，则移动至第一个报错的表单字段处
          // 但需要注意的是，若该表单字段处于隐藏字段，此时处于隐藏状态，那么这个操作是无效的
          if (firstErrorAddress) {
            const dom = document.getElementById(getFormFieldId(firstErrorAddress));
            dom?.scrollIntoView({
              behavior: 'smooth',
              // 页面顶部和底部都容易被覆盖，所以将第一个报错表单移动至页面中间
              block: 'center',
            });
          }
        });

        const dispose = autorun(() => {
          const data = toJS(form.data);
          // 初始化时，heart 还未初始化完成
          if (form.heart) {
            form.notify('onCFormDataChange', data);
          }
        });

        onFormUnmount(() => {
          dispose();
        });
      };

      setDefaultStep(formProps?.defaultStep || 0);
      if (!outerForm) {
        const form = createForm({
          ...formProps,
          effects: formEffect,
        }) as unknown as CForm<T, D>;

        form.name = name || form.id;

        // * 自定义事件，用于外部消费
        notifyFormCustomEvent({
          source: FormEventSource.FormInit,
          payload: {
            form,
          },
        });

        setForm(form);
      } else {
        outerForm.addEffects('c-m-form-effects', formEffect);
        setForm(outerForm);
      }
    };

    const runInitConfig = async () => {
      if (!initConfig) {
        create();
        setLoading(false);
        return;
      }

      if (typeof initConfig === 'function') {
        try {
          setLoading(true);
          setError(false);
          const formProps = await initConfig();
          create(formProps);
        } catch (error) {
          setError(true);
          console.error('init config error info ===', error);
        } finally {
          setLoading(false);
        }
      } else {
        create(initConfig);
      }
    };
    runInitConfig();
  };

  useEffect(run, []);

  return { loading, error, form, run, defaultStep };
}
