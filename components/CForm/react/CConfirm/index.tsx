import React from 'react';
import type { CFormConfirmDetail, CFormStepUnitConfig, ObjectType } from '../../interface';
import CFormDetail, { useFormDetail } from './components/CFormDetail';
import { getGlobalContextConfig } from '../../../CConfigProvider';
import CAgreement from '../Components/CAgreement';

export default <T extends ObjectType = any, D extends ObjectType = any>(
  confirmConfig: CFormConfirmDetail<T, D>,
): CFormStepUnitConfig => {
  const { locale } = getGlobalContextConfig();
  const { detail, protocol, stepTitle = locale.CFormConfirm.confirm, labelWidth } = confirmConfig;
  return {
    name: 'confirm',
    title: stepTitle,
    fields: [
      {
        name: 'confirmDetail',
        type: 'VoidField',
        componentOptions: {
          component: () => <CFormDetail detail={detail} labelWidth={labelWidth} />,
        },
      },
      {
        name: 'confirmProtocol',
        type: 'VoidField',
        visible: !!protocol,
        fields: [
          {
            name: 'protocol',
            title: protocol?.protocolLabel ?? '',
            componentOptions: {
              component: CAgreement,
              props: {
                ...(protocol || {}),
              },
            },
          },
        ],
      },
    ],
  };
};
export { useFormDetail };
