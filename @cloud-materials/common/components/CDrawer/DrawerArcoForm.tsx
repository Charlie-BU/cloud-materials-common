import React from 'react';
import type { FormInstance, FormProps } from '@arco-design/web-react';
import { Form } from '@arco-design/web-react';
import type { CDrawerProps } from './interface';
import BaseCDrawer from './Base';
import type { StaticMethodsExtraProps, StaticMethodsReturn } from '../_factory/maskableComponent';
import { createStaticMethods } from '../_factory/maskableComponent';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';

export interface CDrawerArcoFormProps<D = unknown, OnOkReturn = unknown>
  extends Omit<CDrawerProps, 'onOk' | 'children'> {
  arcoFormProps?: FormProps<D>;
  onOk?: (values: D, form: FormInstance<D>, e?: MouseEvent) => Promise<OnOkReturn> | OnOkReturn;
  children?: any;
}

const DrawerArcoFormComponent = React.forwardRef<HTMLDivElement, CDrawerArcoFormProps<any>>((props, ref) => {
  const { cComponentConfig: { 'CDrawer.ArcoForm': CDrawerArcoForm = {} } = {} } = useCConfigContext();
  const { arcoFormProps, children, onOk, ...restProps } = useMergeProps(props, {}, CDrawerArcoForm);
  const [form] = Form.useForm<any>();
  const realForm = arcoFormProps?.form ?? form;

  return (
    <BaseCDrawer
      maskClosable={false}
      {...restProps}
      onOk={(e: MouseEvent) => realForm.validate().then(v => onOk?.(v, form, e))}
      ref={ref}
    >
      <Form form={realForm} {...arcoFormProps}>
        {children}
      </Form>
    </BaseCDrawer>
  );
});

const TypedDrawerArcoFormComponent = DrawerArcoFormComponent as <T extends any>(
  props: CDrawerArcoFormProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

const { open, ...restStatics } = createStaticMethods(TypedDrawerArcoFormComponent);

const DrawerArcoForm = Object.assign(TypedDrawerArcoFormComponent, restStatics, {
  open: <T extends Record<string, any>, OnOkReturn = unknown>(
    props: StaticMethodsExtraProps<CDrawerArcoFormProps<T, OnOkReturn>>,
  ): StaticMethodsReturn<CDrawerArcoFormProps<T, OnOkReturn>, OnOkReturn> => open(props as any) as any,
});

export default DrawerArcoForm;
