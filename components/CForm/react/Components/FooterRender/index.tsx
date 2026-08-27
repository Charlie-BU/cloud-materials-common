import React, { Fragment } from 'react';
import { Button, Space } from '@arco-design/web-react';
import type {
  CFieldConfig,
  CFormBaseConfig,
  CFormFooter,
  CFormFooterBuiltInButton,
  CFormStep,
  CFormStepFooter,
  CFormStepFooterConfig,
  CFormStepFooterItem,
} from '../../../interface';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { has, isFunction } from 'lodash-es';
import CField from '../../CField/CField';
import FormStep from '@storage-fe/formily-arco/es/FormStep';
import { openSecondCheckModal } from '../SecondCheck';
import { useCConfigContext } from '../../../../CConfigProvider';

export const cssPrefix = classNamePrefixFactory('cform-footer-render');

const FooterRender = ({
  isStep,
  formStep,
  callFooter,
  onSubmit,
  unMountCFormSecondCheck,
}: {
  isStep: boolean;
  formStep: CFormStep;
  callFooter: CFormFooter<any, any> | CFormStepFooter<any, any>;
  onSubmit: CFormBaseConfig['onSubmit'];
  unMountCFormSecondCheck: CFormBaseConfig['unMountCFormSecondCheck'];
}) => {
  const submit = async (values: any) => {
    await onSubmit?.(values, formStep.form as any);
  };

  const { locale } = useCConfigContext();

  const footer =
    typeof callFooter === 'function' ? callFooter(isStep ? formStep : (formStep.form as any), submit) : callFooter;

  const { left, right, autoHiddenStepButtons = false } = footer as CFormStepFooterConfig;

  if (!left && !right) return null;

  const renderFooterItems = (items?: CFormStepFooterItem[]) => {
    return items?.map((item, index) => {
      if (typeof item === 'function') {
        return <Fragment key={index}>{item(formStep)}</Fragment>;
      }

      if (has(item, 'buttonType')) {
        const buildInItem = item as CFormFooterBuiltInButton;
        const processButtons = (buildInItem: CFormFooterBuiltInButton) => {
          switch (buildInItem.buttonType) {
            case 'back':
              if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || formStep.allowBack) {
                return (
                  <FormStep.BackButton
                    key={index}
                    size="large"
                    children={locale.CForm.buttonText.backText}
                    {...buildInItem.props}
                  />
                );
              }
              break;
            case 'next':
              if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || formStep.allowNext) {
                return (
                  <FormStep.NextButton
                    key={index}
                    size="large"
                    children={locale.CForm.buttonText.nextText}
                    {...buildInItem.props}
                  />
                );
              }
              break;
            case 'confirm':
              if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || !formStep.allowNext) {
                return (
                  <FormStep.SubmitButton
                    key={index}
                    children={locale.CForm.buttonText.confirmText}
                    size="large"
                    {...buildInItem.props}
                    onSubmit={submit}
                  />
                );
              }
              break;
            case 'submit':
              if (buildInItem.disableAutoHiddenStepButtons || !autoHiddenStepButtons || !formStep.allowNext) {
                return (
                  <FormStep.SubmitButton
                    key={index}
                    size="large"
                    children={locale.CForm.buttonText.submitText}
                    onSubmit={submit}
                    {...buildInItem.props}
                  />
                );
              }
              break;
            case 'cancel': {
              return (
                <Button
                  key={index}
                  size="large"
                  {...buildInItem.props}
                  onClick={() => {
                    openSecondCheckModal({
                      onOk: buildInItem.props?.onClick as any,
                      form: formStep.form,
                      unMountCFormSecondCheck,
                      locale: locale,
                    });
                  }}
                >
                  {buildInItem.props?.children ?? locale.CForm.buttonText.cancelText}
                </Button>
              );
            }
            default:
              return null;
          }
        };
        const buttonNode = processButtons(buildInItem);

        return isFunction(buildInItem.wrapper) ? (
          <Fragment key={index}>{buildInItem.wrapper(buttonNode)}</Fragment>
        ) : (
          buttonNode
        );
      }

      if (has(item, 'field')) {
        const field = (item as any).field as CFieldConfig;
        return <CField key={field.name.toString()} {...field} />;
      }
    });
  };

  return (
    <div className={cssPrefix``}>
      <div className={cssPrefix`left`}>
        <Space size="medium">{renderFooterItems(left)}</Space>
      </div>
      <div className={cssPrefix`right`}>
        <Space size={12} align="end">
          {renderFooterItems(right)}
        </Space>
      </div>
    </div>
  );
};

export default FooterRender;
