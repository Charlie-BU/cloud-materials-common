import React from 'react';
import type { FormInstance, FormProps } from '@arco-design/web-react';
import type { CDrawerProps } from './interface';
import type { StaticMethodsExtraProps, StaticMethodsReturn } from '../_factory/maskableComponent';
export interface CDrawerArcoFormProps<D = unknown, OnOkReturn = unknown> extends Omit<CDrawerProps, 'onOk' | 'children'> {
    arcoFormProps?: FormProps<D>;
    onOk?: (values: D, form: FormInstance<D>, e?: MouseEvent) => Promise<OnOkReturn> | OnOkReturn;
    children?: any;
}
declare const DrawerArcoForm: (<T extends unknown>(props: CDrawerArcoFormProps<T, unknown> & {
    ref?: React.Ref<HTMLDivElement> | undefined;
}) => React.ReactElement) & {
    close: (id?: number | undefined) => void;
} & {
    open: <T_1 extends Record<string, any>, OnOkReturn = unknown>(props: StaticMethodsExtraProps<CDrawerArcoFormProps<T_1, OnOkReturn>>) => StaticMethodsReturn<CDrawerArcoFormProps<T_1, OnOkReturn>, OnOkReturn>;
};
export default DrawerArcoForm;
