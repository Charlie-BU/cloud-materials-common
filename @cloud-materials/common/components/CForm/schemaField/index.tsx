import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import type { Form } from '@formily/core';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@storage-fe/formily-arco';
import { DefaultLayout } from '../const';
import SchemaField from './register';
import type { ICFormSchema } from '../interface';

const CFormSchema = forwardRef<Form<any>, ICFormSchema>((props, ref) => {
  const { schemaField, formProps, formLayOutProps = DefaultLayout } = props;
  const form = useMemo(
    () =>
      createForm({
        validateFirst: true,
        ...formProps,
      }),
    [],
  );
  //挂ref
  useImperativeHandle(ref, () => form);
  return (
    <FormProvider form={form}>
      <FormLayout {...formLayOutProps}>
        <SchemaField {...schemaField} />
      </FormLayout>
    </FormProvider>
  );
});

CFormSchema.displayName = 'CFormSchema';

export default CFormSchema;
