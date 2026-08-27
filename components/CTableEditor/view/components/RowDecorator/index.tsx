import React from 'react';
import { ObjectField, useForm } from '@formily/react';
import { toJS } from '@formily/reactive';
import { useRow } from '../../../../CTable';
import { useTableEditor } from '../../hooks';
import { isFunction } from 'lodash-es';

export const RowDecorator = (props: any) => {
  const row = useRow();
  const form = useForm();
  const tableEditor = useTableEditor();

  const initialValue = toJS(row.data);

  const _formConfig = tableEditor.config.formConfig;
  const formConfig = isFunction(_formConfig) ? _formConfig(tableEditor) : _formConfig;

  const _rowFieldConfig = formConfig?.rowFieldConfig;
  const rowFieldConfig = isFunction(_rowFieldConfig)
    ? _rowFieldConfig(initialValue, form, tableEditor)
    : _rowFieldConfig;

  return (
    <ObjectField name={row.key} initialValue={toJS(row.data)} {...rowFieldConfig}>
      {props.children}
    </ObjectField>
  );
};
