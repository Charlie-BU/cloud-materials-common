import React, { useCallback, useContext, useEffect, useRef } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import type { CConfigPreviewProps } from './interface';
import InfoPreview from './components/InfoPreview';
import CFeeCalculator from '../CFeeCalculator';
import CAgreement from '../CAgreement';
import { Button, Divider, Form } from '@arco-design/web-react';
import classNames from 'classnames';
import { CConfigContext } from '../CConfigProvider';
import { comPrefix, listContainerId } from './utils';
import { useSize } from 'ahooks';
import { isUndefined, omitBy } from 'lodash-es';
import type { ValidateFieldsErrors } from '@arco-design/web-react/es/Form/interface';

const FormItem = Form.Item;

const cssPrefix = classNamePrefixFactory(comPrefix);

const testId = {
  container: cssPrefix``,
};

const CConfigPreview: React.FC<CConfigPreviewProps> = props => {
  const { useCssPrefix, locale } = useContext(CConfigContext);
  const containerRef = useRef(null);
  const cssPrefix = useCssPrefix(comPrefix);
  const {
    maxHeight = 600,
    infoPreview,
    agreementConfig,
    feeConfig,
    watchedForm,
    submitButtonConfig,
    onSubmit,
    beforeSubmit,
    style,
    className,
  } = props;
  // 监听container容器高度的变化
  const size = useSize(containerRef);
  // 监听计费组件的依赖变化
  const formValues = Form.useWatch(feeConfig?.deps ?? [], watchedForm);
  // formValues的合并：依赖关联的formValues会覆盖用户传入的
  const mergedFormVaues = Object.assign({}, feeConfig?.formValues ?? {}, formValues);

  const [previewForm] = Form.useForm();
  const fieldPrefix = comPrefix;

  const processMaxHeight = useCallback(() => {
    const container = containerRef?.current as unknown as HTMLElement;
    const listContainer = document.getElementById(listContainerId) as HTMLElement;
    if (!container.offsetHeight || !listContainer.offsetHeight) return;
    // 重新计算配置详情组件的max-height前重置max-height，避免用户自定义的显隐逻辑无法触发高度的重新计算
    listContainer.style.maxHeight = '';
    // 高度小于等于最大高度，不做操作
    if (container.offsetHeight <= maxHeight) return;
    // 高度大于最大高度，限制列表区域的高度
    const redundantHeight = container.offsetHeight - maxHeight;
    listContainer.style.maxHeight = Math.max(listContainer.offsetHeight - redundantHeight, 50) + 'px';
  }, []);

  useEffect(() => {
    processMaxHeight();
  }, [size]);

  return (
    <div
      className={classNames(cssPrefix``, className)}
      style={style}
      ref={containerRef}
      data-cy={testId.container}
      data-testid={testId.container}
    >
      <Form labelCol={{ span: 0 }} form={previewForm} wrapperCol={{ span: 24 }}>
        {infoPreview ? (
          <FormItem label="" field={`${fieldPrefix}-info`}>
            <InfoPreview {...infoPreview!} form={watchedForm} />
            <Divider className={classNames(cssPrefix`divider`)} />
          </FormItem>
        ) : null}
        {feeConfig ? (
          <FormItem label="" field={`${fieldPrefix}-fee`} className={cssPrefix`fee-formitem`}>
            <CFeeCalculator {...feeConfig} formValues={mergedFormVaues} />
          </FormItem>
        ) : null}
        {agreementConfig ? (
          <FormItem
            label=""
            field={`${fieldPrefix}-agree`}
            rules={[
              {
                validator(value, callback) {
                  if (value) callback();
                  else callback(' ');
                },
              },
            ]}
          >
            {(_, form) => {
              // 获取错误状态
              const errorObj = form.getFieldError(`${fieldPrefix}-agree`);
              return (
                <CAgreement
                  validateStatusError={errorObj ? true : false}
                  {...agreementConfig!}
                  className={classNames(agreementConfig?.className, cssPrefix`agree`)}
                />
              );
            }}
          </FormItem>
        ) : null}
        {submitButtonConfig ? (
          <FormItem field={`${fieldPrefix}-submit`}>
            <Button
              type="primary"
              {...submitButtonConfig}
              className={classNames(submitButtonConfig?.className, cssPrefix`submit`)}
              onClick={async () => {
                let watchedFormErrors: ValidateFieldsErrors;
                let previewFormErrors: ValidateFieldsErrors;
                let validateStatus: 'success' | 'failed' = 'success';
                try {
                  await Promise.all([watchedForm.validate(), previewForm.validate()]);
                } catch (e) {
                  console.error(e);
                  validateStatus = 'failed';
                  // 收集具体的错误信息，供beforeSubmit自定义消费
                  watchedFormErrors = watchedForm.getFieldsError();
                  previewFormErrors = previewForm.getFieldsError();
                }
                const goOnSubmit: boolean | undefined = await beforeSubmit?.({ watchedFormErrors, previewFormErrors });
                // 1. 校验失败：终止提交流程
                // 2. 定义了beforeSubmit，但beforeSubmit返回false：终止流程
                if (validateStatus === 'failed' || goOnSubmit === false) return;
                const formValues = watchedForm.getFieldsValue();
                const previewFormValues = previewForm.getFieldsValue();
                const feeConfig = omitBy(
                  {
                    num: previewFormValues?.[`${fieldPrefix}-fee`]?.num,
                    duration: previewFormValues?.[`${fieldPrefix}-fee`]?.duration,
                  },
                  isUndefined,
                );
                onSubmit?.(formValues, feeConfig);
              }}
            >
              {submitButtonConfig?.children ?? locale.CConfigPreview.submitMsg}
            </Button>
          </FormItem>
        ) : null}
      </Form>
    </div>
  );
};

CConfigPreview.displayName = 'CConfigPreview';

export default CConfigPreview;
