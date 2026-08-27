/* eslint-disable @typescript-eslint/ban-types */
import React, { useContext } from 'react';
import type {
  ComponentPropsUnion,
  DefineComponentPropsMapType,
  DefineBuiltInHybridListType,
  DefineBuiltInHybridType,
  ToConfigUnionType,
  BuiltInCreator,
  ComponentsMap,
  BuiltInContextType,
} from './interface';
import { mergeSpecialProps } from './utils';

/**
 * 根据内置组件的配置渲染内容
 * @param builtInComponentMap
 * @param builtInConfig
 * @returns
 */
export const renderBuiltInContent = <T extends Record<string, React.ComponentType<any>>>(
  builtInComponentMap: T,
  builtInConfig?: DefineBuiltInHybridListType<T>,
  options: {
    commonProps?: ComponentPropsUnion<T>;
    defaultPropsMap?: DefineComponentPropsMapType<T>;
  } = {},
) => {
  const { commonProps, defaultPropsMap } = options;
  type ComponentConfigType = ToConfigUnionType<T>;

  const renderSingleItem = (item: DefineBuiltInHybridType<T>, key?: number) => {
    if (item.component) {
      const { component, componentProps, ref } = item as ComponentConfigType;
      const Component = builtInComponentMap[component];
      const defaultProps = defaultPropsMap?.[component];
      const props =
        typeof componentProps === 'function' ? (componentProps as Function)(/** TODO 回传参数需求 */) : componentProps;

      if (process.env.NODE_ENV !== 'production') {
        if (!Component) {
          throw new Error(`[${String(component)}] 未找到`);
        }
      }

      return React.createElement(Component, {
        ref,
        ...mergeSpecialProps(commonProps, defaultProps, props),
        key,
      });
    }

    if (React.isValidElement(item) && commonProps) {
      return React.cloneElement(item, mergeSpecialProps(commonProps, item.props));
    }

    return item;
  };

  return (
    builtInConfig &&
    (Array.isArray(builtInConfig)
      ? builtInConfig.filter(Boolean).map(renderSingleItem)
      : renderSingleItem(builtInConfig))
  );
};

const BuiltInProvider = React.createContext<BuiltInContextType>({ componentsMap: {}, renderBuiltIn: v => v });

export const useBuiltIn = <T extends ComponentsMap>() =>
  useContext(BuiltInProvider) as unknown as BuiltInContextType<T>;

const createBuiltInComponent: BuiltInCreator = (Component, componentsMapOuter, options = {}) => {
  const createByComponentsMap = (componentsMapInner: ComponentsMap, defaultPropsMap?: Record<string, any>) => {
    const BuiltInComponent: React.FC<any> = props => (
      <BuiltInProvider.Provider
        value={{
          componentsMap: componentsMapInner,
          renderBuiltIn: (builtInContent, innerOptions = {}) =>
            renderBuiltInContent(componentsMapInner, builtInContent, {
              commonProps: mergeSpecialProps(options.commonProps, innerOptions.commonProps),
              defaultPropsMap: {
                ...defaultPropsMap,
                ...innerOptions.defaultPropsMap,
              },
            }),
        }}
      >
        <Component {...props} />
      </BuiltInProvider.Provider>
    );

    BuiltInComponent.displayName = `${Object.keys(componentsMapInner).join(',')}(BuiltInComponent)`;

    return Object.assign(BuiltInComponent as any, {
      register: (innerComponentsMap: ComponentsMap, innerDefaultProps?: Record<string, any>) =>
        createByComponentsMap(
          { ...componentsMapOuter, ...innerComponentsMap },
          { ...options.defaultProps, ...innerDefaultProps },
        ),
      defineComponentOptions: (component: unknown, componentProps: unknown, ref: unknown) => ({
        component,
        componentProps,
        ref,
      }),
      useBuiltIn,
    });
  };

  return createByComponentsMap(componentsMapOuter, options.defaultProps);
};

export default createBuiltInComponent;

export type {
  DefineBuiltInBasicType,
  DefineBuiltInHybridListType,
  DefineBuiltInHybridType,
  DefineComponentPropsMapType,
  PickReactComponentProps,
  ComponentMapToUnionType,
} from './interface';
