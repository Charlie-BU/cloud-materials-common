import React from 'react';
import type {
  CFormStepResidentContentItem,
  CFieldConfig,
  CFormStepResidentContent,
  CFormBaseConfig,
  CFormResidentContentBuiltInButton,
  CFormResidentContentItem,
  CFormStep,
  CFormResidentContent,
} from '../../../interface';
import CField from '../../CField/CField';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { has, isNil } from 'lodash-es';
import FormStep from '@storage-fe/formily-arco/es/FormStep';
import { useCConfigContext } from '../../../../CConfigProvider';

export const cssPrefix = classNamePrefixFactory('cform-resident-render');

const ResidentContentRender = ({
  isStep,
  formStep,
  residentContent,
  onSubmit,
}: {
  isStep: boolean;
  formStep: CFormStep;
  residentContent: CFormStepResidentContent<any, any> | CFormResidentContent<any, any>;
  onSubmit: CFormBaseConfig['onSubmit'];
}) => {
  const { locale } = useCConfigContext();

  const submit = async (values: any) => {
    await onSubmit?.(values, formStep.form as any);
  };

  const renderResidentContentItems = (items?: CFormStepResidentContentItem[] | CFormResidentContentItem[]) => {
    return items
      ?.map((item, _) => {
        if (typeof item === 'function') {
          return item(isStep ? formStep : (formStep.form as any));
        }

        if (has(item, 'buttonType')) {
          const buildInItem = item as CFormResidentContentBuiltInButton;
          switch (buildInItem.buttonType) {
            case 'confirm':
              return (
                <FormStep.SubmitButton
                  className={cssPrefix`button`}
                  size="large"
                  key="confirm"
                  children={locale.CForm.buttonText.submitOrder}
                  {...buildInItem.props}
                  onSubmit={submit}
                />
              );
            default:
              return null;
          }
        }

        if (has(item, 'field')) {
          const field = (item as any).field as CFieldConfig;
          return <CField key={field.name.toString()} {...field} />;
        }
      })
      ?.filter(item => {
        return !isNil(item);
      });
  };

  const residentNode = renderResidentContentItems(residentContent);

  return residentNode?.length ? <div className={cssPrefix``}>{residentNode}</div> : null;
};

export default ResidentContentRender;
