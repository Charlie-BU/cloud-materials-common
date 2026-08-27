import { omit, isEqual } from 'lodash-es';
import type { CForm, CFormBaseConfig } from '../../../interface';
import type { Form } from '@formily/core';
import { Modal } from '@arco-design/web-react';
import type { CLocale } from '../../../../locales/default';

export const openSecondCheckModal = (params: {
  onOk?: () => void;
  form: Form;
  unMountCFormSecondCheck: CFormBaseConfig['unMountCFormSecondCheck'];
  locale: CLocale;
}) => {
  const { onOk, form, unMountCFormSecondCheck, locale } = params;

  const isEqualOmited = (initialValues: any, values: any, excludes: string[]) => {
    const initialValuesOmited = omit(initialValues, excludes);
    const valuesOmited = omit(values, excludes);
    return isEqual(initialValuesOmited, valuesOmited);
  };

  const excludes = typeof unMountCFormSecondCheck === 'object' ? unMountCFormSecondCheck.excludes ?? [] : [];
  const customEqual = typeof unMountCFormSecondCheck === 'object' ? unMountCFormSecondCheck.customEqual : undefined;

  if (
    unMountCFormSecondCheck &&
    (customEqual ? !customEqual(form as CForm) : !isEqualOmited(form.initialValues, form.values, excludes))
  ) {
    const title =
      typeof unMountCFormSecondCheck === 'object'
        ? unMountCFormSecondCheck.title ?? locale.CForm.secondCheck.title
        : locale.CForm.secondCheck.title;
    const content =
      typeof unMountCFormSecondCheck === 'object'
        ? unMountCFormSecondCheck.content ?? locale.CForm.secondCheck.content
        : locale.CForm.secondCheck.content;

    Modal.confirm({
      title: title,
      content: content,
      okText: locale.CForm.secondCheck.cancelText,
      cancelText: locale.CForm.secondCheck.confirmText,
      onCancel: () => onOk?.(),
    });
  } else {
    onOk?.();
  }
};
