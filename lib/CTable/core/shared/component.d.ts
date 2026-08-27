import type { ComponentConfig, ComponentConfigArr, ComponentProps } from '../types';
export declare const formatComponentConfig: (componentConfig?: ComponentConfig, componentProps?: any) => ComponentConfigArr<any>;
export declare const setComputedComponent: (target: Record<string, any>, keyPrefix: string, componentConf: ComponentConfig) => void;
export declare const setComponentProps: (target: Record<string, any>, keyPrefix: string, props?: ComponentProps) => void;
export declare const getFnComponentProps: <T extends Record<string, any>>(props: ComponentProps | undefined, options: T) => any;
