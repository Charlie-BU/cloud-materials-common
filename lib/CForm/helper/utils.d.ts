import type { FormPathPattern, GeneralField } from '@formily/core';
/**
 * 获取父节点
 * @param field 当前节点
 * @returns 父节点 field
 */
export declare const getParentField: (field: GeneralField) => GeneralField;
/**
 * 获取兄弟节点
 * @param currentField 当前节点
 * @param brotherPath 兄弟节点的path
 * @returns 兄弟节点
 */
export declare const getBrotherField: (currentField: GeneralField, brotherPath: FormPathPattern) => GeneralField | undefined;
export declare const checkArrayDuplicates: (params: {
    arrayFieldName: FormPathPattern;
    itemName: FormPathPattern | FormPathPattern[];
    firstError?: boolean | undefined;
    message?: string | string[] | undefined;
}) => void;
