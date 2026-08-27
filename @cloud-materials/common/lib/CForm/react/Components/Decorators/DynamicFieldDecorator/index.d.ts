import React from 'react';
import type { CFieldConfig, CForm, ObjectType } from '../../../../interface';
export interface DynamicFieldDecoratorProps<FieldConfig extends CFieldConfig = CFieldConfig> {
    /** 获取动态字段 */
    getDynamicFields: (params: {
        form: CForm;
        depValues?: ObjectType;
        dataDepValues?: ObjectType;
    }) => FieldConfig[];
    depValues?: ObjectType;
    dataDepValues?: ObjectType;
    children?: React.ReactNode;
    /** 不卸载所有动态字段下子字段，保留相同path的子字段模型 */
    keepFields?: boolean;
}
declare const _default: React.MemoExoticComponent<import("@formily/react").ReactFC<Omit<DynamicFieldDecoratorProps<CFieldConfig<any, any, import("../../../../interface").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../RectiveWithCForm").ReactiveHocProps & {
    ref?: React.RefAttributes<any> | undefined;
}>>;
export default _default;
