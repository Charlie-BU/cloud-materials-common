import React from 'react';
import type { FormInstance, FormProps } from '@arco-design/web-react';
import { Form } from '@arco-design/web-react';
import type { CModalProps } from './interface';
import BaseCModal from './Base';
import type { StaticMethodsExtraProps, StaticMethodsReturn } from '../_factory/maskableComponent';
import { createStaticMethods } from '../_factory/maskableComponent';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';

export interface CModalArcoFormProps<D = unknown, OnOkReturn = unknown> extends Omit<CModalProps, 'onOk' | 'children'> {
  arcoFormProps?: FormProps<D>;
  onOk?: (values: D, form: FormInstance<D>, e?: MouseEvent) => OnOkReturn | Promise<OnOkReturn>;
  children?: any;
}

const ModalArcoFormComponent = React.forwardRef<any, CModalArcoFormProps<any, any>>((props, ref) => {
  const { cComponentConfig: { 'CModal.ArcoForm': ModalArcoForm = {} } = {} } = useCConfigContext();
  const [form] = Form.useForm<any>();

  const { arcoFormProps, children, onOk, ...restProps } = useMergeProps(props, {}, ModalArcoForm);
  const realForm = arcoFormProps?.form ?? form;

  return (
    <BaseCModal
      maskClosable={false}
      {...restProps}
      onOk={(e: MouseEvent) => realForm.validate().then(v => onOk?.(v, form, e))}
      ref={ref}
    >
      <Form form={realForm} {...arcoFormProps}>
        {children}
      </Form>
    </BaseCModal>
  );
});

ModalArcoFormComponent.displayName = 'CModal.ArcoForm';

const TypedModalArcoFormComponent = ModalArcoFormComponent as <T extends any, OnOkReturn = unknown>(
  props: CModalArcoFormProps<T, OnOkReturn> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

const { open, ...restStatics } = createStaticMethods(TypedModalArcoFormComponent);

const ModalArcoForm = Object.assign(TypedModalArcoFormComponent, restStatics, {
  open: <T extends Record<string, any>, OnOkReturn = unknown>(
    props: StaticMethodsExtraProps<CModalArcoFormProps<T, OnOkReturn>>,
  ): StaticMethodsReturn<CModalArcoFormProps<T, OnOkReturn>, OnOkReturn> => open(props as any) as any,
});

export default ModalArcoForm;
