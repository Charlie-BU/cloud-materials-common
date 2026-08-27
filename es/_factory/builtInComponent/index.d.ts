import React from 'react';
import type { ComponentPropsUnion, DefineComponentPropsMapType, DefineBuiltInHybridListType, BuiltInCreator, ComponentsMap, BuiltInContextType } from './interface';
/**
 * 根据内置组件的配置渲染内容
 * @param builtInComponentMap
 * @param builtInConfig
 * @returns
 */
export declare const renderBuiltInContent: <T extends Record<string, React.ComponentType<any>>>(builtInComponentMap: T, builtInConfig?: DefineBuiltInHybridListType<T> | undefined, options?: {
    commonProps?: import("./interface").PickReactComponentProps<T[keyof T]> | undefined;
    defaultPropsMap?: DefineComponentPropsMapType<T> | undefined;
}) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | (string & {
    component?: "_" | undefined;
}) | (number & {
    component?: "_" | undefined;
}) | (false & {
    component?: "_" | undefined;
}) | (true & {
    component?: "_" | undefined;
}) | import("./interface").DefineBuiltInBasicType<T> | (React.ReactElement<any, string | React.JSXElementConstructor<any>> | (string & {
    component?: "_" | undefined;
}) | (number & {
    component?: "_" | undefined;
}) | (false & {
    component?: "_" | undefined;
}) | (true & {
    component?: "_" | undefined;
}) | import("./interface").DefineBuiltInBasicType<T>)[] | undefined;
export declare const useBuiltIn: <T extends ComponentsMap>() => BuiltInContextType<T>;
declare const createBuiltInComponent: BuiltInCreator;
export default createBuiltInComponent;
export type { DefineBuiltInBasicType, DefineBuiltInHybridListType, DefineBuiltInHybridType, DefineComponentPropsMapType, PickReactComponentProps, ComponentMapToUnionType, } from './interface';
