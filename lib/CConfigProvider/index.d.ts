import React from 'react';
import type { CConfigContextValue } from './interface';
import { CConfigProviderProps } from './interface';
import type { ComponentConfig } from '@arco-design/web-react/es/ConfigProvider/interface';
import type { OnLog, LoggerType, LoggerInstance } from '../_factory/Logger';
export declare const defaultComponentConfig: Readonly<ComponentConfig>;
export declare const getGlobalContextConfig: () => Readonly<CConfigContextValue>;
export declare const CConfigContext: React.Context<CConfigContextValue>;
export declare const useCConfigContext: () => CConfigContextValue;
declare const CConfigProvider: {
    ({ keepPrevious, ...props }: CConfigProviderProps): React.ReactElement;
    ConfigContext: React.Context<CConfigContextValue>;
    displayName: string;
    /**
     * 设置 CModal 和 CDrawer 等 通过 `openXxxx` 打开的组件的Context
     * Arco 的 Modal 需要单独调用 Modal.config
     */
    config(props: Partial<CConfigProviderProps>): void;
    resetConfig(): void;
    /** 定义英文环境下的配置，内置了一些统一的配置 */
    defineEnCComponentConfig: (config?: Partial<import("./interface").CComponentConfig> | undefined) => Partial<import("./interface").CComponentConfig>;
};
export default CConfigProvider;
export declare const ConfigConsumer: React.Consumer<CConfigContextValue>;
export { CConfigProviderProps, OnLog, LoggerType, LoggerInstance };
