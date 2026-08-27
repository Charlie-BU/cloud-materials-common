import React, { Fragment } from 'react';
import type {
  CFormStepHeader,
  CFormStepHeaderItem,
  CFormStepHeaderBuiltInHeader,
  CFormBaseConfig,
  CFormStep,
  CFormHeader,
} from '../../../interface';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { has, isNil } from 'lodash-es';
import { IconLeft } from '@arco-design/iconbox-react-ve-o-design';
import { openSecondCheckModal } from '../SecondCheck';
import { useCConfigContext } from '../../../../CConfigProvider';

export const cssPrefix = classNamePrefixFactory('cform-header-render');

const HeaderRender = ({
  isStep,
  formStep,
  callHeader,
  unMountCFormSecondCheck,
}: {
  isStep: boolean;
  formStep: CFormStep;
  callHeader: CFormStepHeader | CFormHeader<any, any>;
  unMountCFormSecondCheck: CFormBaseConfig['unMountCFormSecondCheck'];
}) => {
  const { locale } = useCConfigContext();
  const header = typeof callHeader === 'function' ? callHeader(isStep ? formStep : (formStep.form as any)) : callHeader;

  const renderHeaderItems = (items?: CFormStepHeaderItem[]) => {
    return items
      ?.map((item, index) => {
        if (typeof item === 'function') {
          const itemNode = item(formStep);
          return !isNil(itemNode) ? <Fragment key={index}>{itemNode}</Fragment> : null;
        }

        if (has(item, 'title')) {
          const { title, onBack } = item as CFormStepHeaderBuiltInHeader;
          return (
            <div key={index} className={cssPrefix`item-title-container`}>
              <IconLeft
                className={cssPrefix`button`}
                onClick={() => {
                  openSecondCheckModal({
                    onOk: onBack,
                    form: formStep.form,
                    unMountCFormSecondCheck,
                    locale,
                  });
                }}
              />
              {title && <div className={cssPrefix`title`}>{title}</div>}
            </div>
          );
        }
      })
      ?.filter(item => {
        return !isNil(item);
      });
  };

  const headerNodes = renderHeaderItems(header);

  return headerNodes?.length ? <div className={cssPrefix``}>{renderHeaderItems(header)}</div> : null;
};

export default HeaderRender;
