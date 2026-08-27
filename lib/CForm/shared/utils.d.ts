import type { FormPathPattern, GeneralField } from '@formily/core';
import type React from 'react';
import type { CFieldConfig, CForm, CallableType } from '../interface';
export declare const runCallable: <ReturnType_1>(props: CallableType<ReturnType_1, any, any, any> | undefined, form: CForm, parentField: any) => ReturnType_1 | undefined;
export declare const updateFieldProps: <U>(props: string, formilyField: GeneralField, callableFunc: CallableType<any>, value?: U | undefined) => void;
export declare const getFormFieldId: (address: FormPathPattern) => string;
export declare const getPile: (component: React.FunctionComponent, path: FormPathPattern) => {
    'data-cy': string;
    'data-testid': string;
} | {
    'data-cy'?: undefined;
    'data-testid'?: undefined;
} | undefined;
/**
 * 合并多个fields
 */
export declare const mergeFields: (...restField: (CFieldConfig | string[])[]) => CFieldConfig<any, any, import("../interface").DefaultBuiltInComponentMapType>;
export declare enum FormEventSource {
    FormInit = "FormInit",
    HelperInit = "HelperInit"
}
/**
 * * 派发Form事件，提供外部消费
 */
export declare const notifyFormCustomEvent: (options: {
    source: FormEventSource;
    payload: Record<string, any>;
}) => void;
