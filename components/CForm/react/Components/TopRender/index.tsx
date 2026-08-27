import React, { Fragment } from 'react';
import type {
  CFormStepTopItem,
  CFormStepTop,
  CFormStepTopBuiltInAlert,
  CFieldConfig,
  CFormTopItem,
  CFormStep,
  CFormTop,
} from '../../../interface';
import CField from '../../CField/CField';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { Alert, Space } from '@arco-design/web-react';
import { has, isNil } from 'lodash-es';
import {
  IconExclamationCircleFill,
  IconCloseCircleFill,
  IconCheckCircleFill,
  IconInfoCircleFill,
} from '@arco-design/iconbox-react-ve-o-design';

export const cssPrefix = classNamePrefixFactory('cform-top-render');

const TopRender = ({
  isStep,
  formStep,
  callTop,
}: {
  isStep: boolean;
  formStep: CFormStep;
  callTop: CFormStepTop<any, any> | CFormTop<any, any>;
}) => {
  const top = typeof callTop === 'function' ? callTop(isStep ? formStep : (formStep.form as any)) : callTop;

  const renderTopItems = (items?: CFormStepTopItem[] | CFormTopItem[]) => {
    return items
      ?.map((item, index) => {
        if (typeof item === 'function') {
          const itemNode = item(isStep ? formStep : (formStep.form as any));
          return !isNil(itemNode) ? <Fragment key={index}>{itemNode}</Fragment> : null;
        }

        if (has(item, 'alertType')) {
          const buildInItem = item as CFormStepTopBuiltInAlert;
          let icon;
          if (buildInItem.alertType === 'error') {
            icon = <IconCloseCircleFill />;
          } else if (buildInItem.alertType === 'success') {
            icon = <IconCheckCircleFill />;
          } else if (buildInItem.alertType === 'warning') {
            icon = <IconExclamationCircleFill />;
          } else {
            icon = <IconInfoCircleFill />;
          }
          return <Alert key={index} icon={icon} {...buildInItem.props} type={buildInItem.alertType} />;
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

  const topNodes = renderTopItems(top);

  return topNodes?.length ? (
    <div className={cssPrefix``}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {renderTopItems(top)}
      </Space>
    </div>
  ) : null;
};

export default TopRender;
