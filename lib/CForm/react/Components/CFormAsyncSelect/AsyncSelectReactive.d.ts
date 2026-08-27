import React from 'react';
import type { CFormAsyncSelectFetchDataSource, CFormAsyncSelectInitDataSource, CFormAsyncSelectModel, CFormAsyncSelectProps, FetchDataProps } from './interface';
import type { ReactiveHocParams } from '../RectiveWithCForm';
import type { CField, CForm, ObjectType } from '../../../interface';
export type CAsyncSelectFetchDataProps = FetchDataProps & {
    depValues: ObjectType;
    dataDepValues: ObjectType;
    form: CForm;
    field: CField;
};
export interface CFormAsyncSelectReactiveInnerProps extends Omit<CFormAsyncSelectProps, 'enableRemoteLoadWhenDataSourceControlled' | 'value' | 'dataSource' | 'loading'> {
    /**
     * @zh deps改变时，是否禁用value的重置能力
     * @defaultValue false
     */
    disableDepsResetValue?: boolean;
    /**
     * @zh 是否将已选option存储在field.data中
     * @defaultValue true
     * @description 避免切换步骤导致label丢失，如要使用field.data，它将是Record，不要直接覆盖
     */
    enableCacheOption?: boolean;
    /**
     * @zh 远程拉取数据
     */
    fetchData: (options: CAsyncSelectFetchDataProps) => Promise<CFormAsyncSelectFetchDataSource>;
    /**
     * @zh 当初始值不在第一页时调用，以获取value对应的label
     */
    fetchInitData?: (form?: CForm, field?: CField) => Promise<CFormAsyncSelectInitDataSource>;
}
export type CFormAsyncSelectReactiveProps = Parameters<typeof CFormAsyncSelectReactive>[0];
/**
 * @description 注意！！！field.data会用来存储已经选择的选项，针对选择后切换步骤，导致组件卸载，状态丢失，显示value而不是label
 */
declare const CFormAsyncSelectReactive: React.MemoExoticComponent<import("@formily/react").ReactFC<Omit<CFormAsyncSelectReactiveInnerProps & ReactiveHocParams & {
    ref?: React.MutableRefObject<CFormAsyncSelectModel> | undefined;
}, "depValues" | "dataDepValues"> & import("../RectiveWithCForm").ReactiveHocProps & {
    ref?: React.MutableRefObject<CFormAsyncSelectModel> | undefined;
}>>;
declare const CFormAsyncSelectReactiveConnnect: React.ForwardRefExoticComponent<Pick<Partial<Omit<{
    children?: React.ReactNode;
}, "ref" | keyof import("../RectiveWithCForm").ReactiveHocProps | keyof CFormAsyncSelectReactiveInnerProps> & Omit<CFormAsyncSelectReactiveInnerProps & ReactiveHocParams & {
    ref?: React.MutableRefObject<CFormAsyncSelectModel> | undefined;
}, "depValues" | "dataDepValues"> & import("../RectiveWithCForm").ReactiveHocProps & {
    ref?: React.MutableRefObject<CFormAsyncSelectModel> | undefined;
} & {
    children?: React.ReactNode;
}>, keyof import("../RectiveWithCForm").ReactiveHocProps | keyof CFormAsyncSelectReactiveInnerProps> & React.RefAttributes<unknown>>;
export default CFormAsyncSelectReactiveConnnect;
