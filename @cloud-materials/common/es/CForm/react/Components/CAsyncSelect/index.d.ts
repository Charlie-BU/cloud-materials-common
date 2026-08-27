import React from 'react';
import type { CAsyncSelectModel, CAsyncSelectProps, DataSource, FetchDataProps, InitDataSource } from '../../../../CAsyncSelect/interface';
import type { Field, Form } from '@formily/core';
import type { ReactiveHocParams } from '../RectiveWithCForm';
import type { ObjectType } from '../../../interface';
export type CAsyncSelectDataSource = DataSource;
export type CAsyncSelectInitDataSource = InitDataSource;
export type CAsyncSelectFetchDataProps = FetchDataProps & {
    depValues: ObjectType;
    dataDepValues: ObjectType;
    form: Form;
    field: Field;
};
export interface CAsyncSelectFormProps extends CAsyncSelectProps {
    /**
     * @zh 依赖改变的防抖时间设置，可以避免依赖改变时频繁调用fetchData函数
     * @defaultValue 100
     */
    depsReactiveDebounce?: number;
    /**
     * @zh deps改变时，是否禁用value的重置能力
     * @defaultValue false
     */
    disableDepsResetValue?: boolean;
    fetchData: (options: CAsyncSelectFetchDataProps) => Promise<CAsyncSelectDataSource>;
    fetchInitData?: (form?: Form, field?: Field) => Promise<CAsyncSelectInitDataSource>;
}
export declare const CAsyncSelectForm: React.MemoExoticComponent<import("@formily/react").ReactFC<Omit<CAsyncSelectFormProps & ReactiveHocParams & {
    ref?: React.MutableRefObject<CAsyncSelectModel> | undefined;
}, "depValues" | "dataDepValues"> & import("../RectiveWithCForm").ReactiveHocProps & {
    ref?: React.MutableRefObject<CAsyncSelectModel> | undefined;
}>>;
export default CAsyncSelectForm;
