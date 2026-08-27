import type { GeneralField, FormPathPattern, DataField, VoidField } from '@formily/core';
import type { CForm, ObjectType } from '../interface';
import type { IsUnion } from '../../_utils/types';
export type DepValues = Record<string, unknown>;
export type FetchDataHandle<DV extends DepValues = DepValues, T extends ObjectType = any, D extends ObjectType = any> = (params: {
    form: CForm<T, D>;
    fields: GeneralField | GeneralField[];
    depValues?: DV;
}) => Promise<any>;
export type FieldHandleParams<DV extends DepValues = DepValues, T extends ObjectType = any, D extends ObjectType = any> = {
    form: CForm<T, D>;
    currField: DataField;
    depValues?: DV;
    fetchResult?: any;
};
export type FieldHandle<DV extends DepValues = DepValues, T extends ObjectType = any, D extends ObjectType = any> = (params: FieldHandleParams<DV, T, D>) => void;
export type FormPathType = FormPathPattern | FormPathPattern[];
export interface EffectParams<DV extends DepValues = DepValues, T extends ObjectType = any, D extends ObjectType = any> {
    fieldNames: FormPathType;
    fetchData?: FetchDataHandle<DV, T, D>;
    fieldCallback?: FieldHandle<DV, T, D> | FieldHandle<DV, T, D>[];
    voidFieldCallback?: (params: {
        currField: VoidField;
    } & Omit<FieldHandleParams<DV, T, D>, 'currField'>) => void;
    debounceWait?: number;
    /** 可配置此联动的fetchData是否开启竞态处理 */
    enableRaceCondition?: boolean;
}
export interface EffectConfig {
    debounceWait?: number;
    enableRaceCondition?: boolean;
}
export declare const logWarn: (message?: any, ...optionalParams: any[]) => void;
export default class Effect<T extends ObjectType = ObjectType, D extends ObjectType = ObjectType> {
    private data;
    debounceWait: number;
    enableRaceCondition: boolean | undefined;
    constructor(config?: EffectConfig);
    /**
     * (多)字段初始化逻辑，支持单个/批量操作
     * @param {EffectParams} options
     * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
     * @param options.fetchData 可配置拉取数据请求 & 相应格式化，函数返回结果会传递给fieldCallback做入参
     * @param options.fieldCallback 可配置每个字段的处理，如：设置dataSource、visible、value等
     * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
     * @param options.debounceWait 可配置多字段响应防抖时间
     * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
     */
    fieldsInit(options: EffectParams<any, T, D>): void;
    private fieldsReactiveByDeps;
    /**
     * (多)字段联动逻辑，支持单个/批量操作
     * @param options
     * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
     * @param options.deps 被依赖的字段名/路径，支持传入单个 & 数组
     * @param options.watches 可以传入具体要监听的的属性集合，也可以不传，默认是监听每个 dep 的 value 变化
     * @param options.fetchData 可配置拉取数据请求 & 相应格式化，函数返回结果会传递给fieldCallback做入参
     * @param options.fieldCallback 可配置每个要操作字段的处理，如：设置dataSource、visible、value等
     * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
     * @param options.debounceWait 可配置多字段响应防抖时间
     * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
     */
    fieldsReactive<DP extends string, W extends string = 'value'>(options: {
        deps: DP | DP[];
        watches?: W | W[];
    } & EffectParams<{
        [key in DP]?: IsUnion<W> extends true ? {
            [key in W]?: unknown;
        } : T[key];
    }, T, D>): void;
    /**
     * 全局数据的响应逻辑，支持单个/批量字段响应
     * @param options
     * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
     * @param options.fieldCallback 可配置每个要操作字段的处理，如：设置dataSource、visible、value等
     * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
     * @param options.debounceWait 可配置多字段响应防抖时间
     * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
     */
    formDataReactive(options: EffectParams<D>): void;
    /**
     * 判断 ArrayItems/ArrayTable 中是否有重复的行
     * @param params
     * @param params.arrayFieldName 数组字段的 name
     * @param params.itemName 要校验的 item，传入数组可同时校验多列
     * @param params.firstError 重复时第一个重复项是否报错，默认 true
     * @param params.message 自定义错误信息，如果 itemName 传入多个，这里需要和 itemName 按顺序对应
     */
    checkArrayDuplicates(params: {
        arrayFieldName: string;
        itemName: string | string[];
        firstError?: boolean;
        message?: string | string[];
    }): void;
    /**
     * 自动隐藏整个 Section，当子字段全部隐藏或为空时
     * @param {FormPathPattern} pattern
     */
    autoHiddenEmptySection(pattern: FormPathPattern): void;
    /**
     * 字段校验联动逻辑，任意一个改动自动触发其他关联字段校验
     * @param {FormPathPattern[]} patterns 互相触发校验的字段
     */
    validatorReactive(patterns: FormPathPattern[]): void;
    /**
     * 自动收集检测所有子字段是否合法
     * @param {FormPathPattern} pattern
     */
    subFieldValidChecker(pattern: FormPathPattern, options?: {
        alwaysCheckOnGraphChange?: boolean;
    }): void;
}
