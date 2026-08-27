import { ConfigProvider } from '@arco-design/web-react';
import { isUndefined, omit, omitBy } from 'lodash-es';
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { CConfigContextValue } from './interface';
import { CConfigProviderProps } from './interface';
import { DEFAULT_C_PREFIX_CLS, createClassNamePrefixHooks, defaultProps, formatLocale, getCPrefixClsFn } from './utils';
import type { ComponentConfig } from '@arco-design/web-react/es/ConfigProvider/interface';
import { useMergeProps } from '../hooks';
import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { componentConfig } from '@arco-design/theme-volcengine-ui-v3/config';
import { defineEnCComponentConfig } from './themes';
import { useLatest } from 'ahooks';
import { createLogger } from '../_factory/Logger';
import type { OnLog, LoggerType, LoggerInstance } from '../_factory/Logger';

const defaultValue = Object.freeze<CConfigContextValue>({
  ...defaultProps,
  getCPrefixCls: getCPrefixClsFn(DEFAULT_C_PREFIX_CLS),
  formatLocale,
  useCssPrefix: createClassNamePrefixHooks(DEFAULT_C_PREFIX_CLS),
  // eslint-disable-next-line no-restricted-globals
  storage: { localStorage, sessionStorage },
  createLogger: createLogger(log => {
    const logArgs = [`[cloud-materials]`, `[${log.componentName}]`];
    switch (log.type) {
      case 'info':
      case 'warn':
        console[log.type](...logArgs);
        break;

      case 'error':
        console.error(...logArgs, log.error);
        break;

      default:
        break;
    }
  }),
});

export const defaultComponentConfig = Object.freeze<ComponentConfig>({
  Input: {
    clearIcon: <IconClose />,
  },
  ...componentConfig,
});

let globalContextConfig = defaultValue;

export const getGlobalContextConfig = () => globalContextConfig;

export const CConfigContext = createContext<CConfigContextValue>(defaultValue);

export const useCConfigContext = () => {
  return useContext(CConfigContext);
};

const CConfigProvider = ({ keepPrevious = true, ...props }: CConfigProviderProps): React.ReactElement => {
  const prevArcoConfigContext = useContext(ConfigProvider.ConfigContext);
  const { keepPrevious: _, ...prevCConfigContext } = useCConfigContext();
  const {
    cPrefixCls,
    children,
    storage = defaultValue.storage,
    onLog,
    ...restCConfigProps
  } = {
    ...defaultProps,
    ...(keepPrevious ? { ...prevArcoConfigContext, ...prevCConfigContext } : null),
    ...omitBy(props, isUndefined),
  };
  const onLogRef = useLatest(onLog);
  const [loggerFactory] = useState(() => createLogger((...args) => onLogRef.current?.(...args)));
  const { componentConfig, ...arcoConfigProps } = omit(restCConfigProps, [
    'useCssPrefix',
    'getCPrefixCls',
    'formatLocale',
    'cComponentConfig',
  ] as Array<keyof CConfigContextValue>);
  const getCPrefixCls = useMemo(() => getCPrefixClsFn(cPrefixCls), [cPrefixCls]);
  const useCssPrefix = useMemo(() => createClassNamePrefixHooks(cPrefixCls), [cPrefixCls]);
  // 排除云基础物料的配置
  const arcoComponentConfig = omitBy(restCConfigProps.cComponentConfig, (_, key) => /^C[A-Z]/.test(key));
  // arco 自身不会对 componentConfig 属性进行合并，用户若在 CConfigProvider 内使用了 ConfigProvider，将完全覆盖 CConfigProvider 提供的默认值
  const mergedComponentConfig = useMergeProps(componentConfig, defaultComponentConfig, arcoComponentConfig);

  return (
    <ConfigProvider {...arcoConfigProps} componentConfig={mergedComponentConfig}>
      <CConfigContext.Provider
        value={{
          ...restCConfigProps,
          storage,
          cPrefixCls,
          getCPrefixCls,
          useCssPrefix,
          formatLocale,
          createLogger: loggerFactory,
        }}
      >
        {children}
      </CConfigContext.Provider>
    </ConfigProvider>
  );
};

CConfigProvider.ConfigContext = CConfigContext;
CConfigProvider.displayName = 'CConfigProvider';

/**
 * 设置 CModal 和 CDrawer 等 通过 `openXxxx` 打开的组件的Context
 * Arco 的 Modal 需要单独调用 Modal.config
 */
CConfigProvider.config = (props: Partial<CConfigProviderProps>) => {
  globalContextConfig = {
    ...globalContextConfig,
    ...props,
  };
};

CConfigProvider.resetConfig = () => {
  globalContextConfig = defaultValue;
};

/** 定义英文环境下的配置，内置了一些统一的配置 */
CConfigProvider.defineEnCComponentConfig = defineEnCComponentConfig;

export default CConfigProvider;

export const ConfigConsumer = CConfigContext.Consumer;

export { CConfigProviderProps, OnLog, LoggerType, LoggerInstance };
