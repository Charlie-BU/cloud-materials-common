import React from 'react';
import type { FormInstance, FormProps } from '@arco-design/web-react';
import type { CModalProps } from './interface';
import type { StaticMethodsExtraProps, StaticMethodsReturn } from '../_factory/maskableComponent';
export interface CModalArcoFormProps<D = unknown, OnOkReturn = unknown> extends Omit<CModalProps, 'onOk' | 'children'> {
    arcoFormProps?: FormProps<D>;
    onOk?: (values: D, form: FormInstance<D>, e?: MouseEvent) => OnOkReturn | Promise<OnOkReturn>;
    children?: any;
}
declare const ModalArcoForm: (<T extends unknown, OnOkReturn = unknown>(props: CModalArcoFormProps<T, OnOkReturn> & {
    ref?: React.Ref<HTMLDivElement> | undefined;
}) => React.ReactElement) & {
    close: (id?: number | undefined) => void;
} & {
    open: <T_1 extends Record<string, any>, OnOkReturn_1 = unknown>(props: StaticMethodsExtraProps<CModalArcoFormProps<T_1, OnOkReturn_1>>) => StaticMethodsReturn<CModalArcoFormProps<T_1, OnOkReturn_1>, OnOkReturn_1>;
};
export default ModalArcoForm;
