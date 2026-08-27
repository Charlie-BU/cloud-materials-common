import type React from 'react';
import type { ObjectType } from '../../../interface';
/**
 * @title 依赖收集高阶组件 Props
 */
export interface ReactiveHocProps {
    /**
     * @zh 依赖的字段路径集合
     */
    deps?: string[];
    /**
     * @zh 依赖的form.data 的key集合
     */
    dataDeps?: string[];
    /**
     * @zh 依赖触发联动的防抖时间
     * @defaultValue 100
     */
    depsReactiveDebounce?: number;
}
/**
 * @title 依赖收集高阶组件 Params
 */
export interface ReactiveHocParams {
    /**
     * @zh 依赖的字段的值
     */
    depValues?: ObjectType;
    /**
     * @zh 依赖的form.data的值
     */
    dataDepValues?: ObjectType;
}
declare function reactiveWithCForm<P extends ReactiveHocParams>(component: React.FC<P>): React.MemoExoticComponent<import("@formily/react").ReactFC<Omit<P, "depValues" | "dataDepValues"> & ReactiveHocProps & {
    ref?: ("ref" extends Exclude<keyof P, "depValues" | "dataDepValues"> | keyof ReactiveHocProps ? (Omit<P, "depValues" | "dataDepValues"> & ReactiveHocProps)[Exclude<keyof P, "depValues" | "dataDepValues"> & "ref"] : React.RefAttributes<any>) | undefined;
}>>;
export default reactiveWithCForm;
