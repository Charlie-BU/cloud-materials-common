import React from 'react';
import ReactDOM from 'react-dom';
import CConfigProvider, { getGlobalContextConfig } from '../../CConfigProvider';
import type {
  CommonComponentTypeProps,
  CreateStaticMethods,
  StaticMethodsExtraProps,
  StaticMethodsReturn,
} from './interface';
import { createDeferred } from '../../_utils/createDeferred';

export const createStaticMethods: CreateStaticMethods = Component => {
  type StaticMethodOption = StaticMethodsExtraProps<CommonComponentTypeProps>;

  const getId = (() => {
    let id = 0;
    return () => (id += 1);
  })();

  /** 存在多drawer共存的情况，这里应该是个数组，防止意外情况 */
  let drawerPool: StaticMethodsReturn[] = [];

  const staticAttributes = {
    /** 通过函数调用打开一个实例 */
    open(initialProps: StaticMethodOption): StaticMethodsReturn {
      const { forceNew, ...props } = initialProps;
      let currentRenderProps = props;
      if (!forceNew && drawerPool.length && props.mask === false) {
        const instance = drawerPool[drawerPool.length - 1];
        instance.update(props);
        return instance;
      }

      const currentInstanceId = getId();

      const [promise, resolve, reject] = createDeferred();
      const TypedComponent = Component as React.JSXElementConstructor<
        CommonComponentTypeProps & { unmountOnExit?: boolean }
      > & { displayName: string };

      const target = document.createElement('div');
      const render = (props: StaticMethodOption) => {
        const configProviderProps = getGlobalContextConfig();
        const {
          content,
          wrapper,
          getMountContainer,
          throwOnOkErrorInPromise = false,
          ...restProps
        } = { ...configProviderProps.cComponentConfig?.[TypedComponent.displayName as 'CModal'], ...props };

        const mergeTarget = getMountContainer?.() ?? target;
        const mainNode = (
          <TypedComponent
            visible={Date.now()}
            // 动画结束后立即卸载，防止极端情况下 mask 闪烁
            unmountOnExit
            {...restProps}
            afterClose={() => {
              restProps.afterClose?.();
              ReactDOM.unmountComponentAtNode(mergeTarget);
              drawerPool = drawerPool.filter(({ id }) => id !== currentInstanceId);
            }}
            onOk={async (...args) => {
              try {
                const result = await restProps.onOk?.(...args);
                resolve(result);
              } catch (error) {
                if (throwOnOkErrorInPromise) {
                  // 能够被外面catch
                  reject(error);
                }
                // 能够阻止modal自动关闭
                throw error;
              }
            }}
            onCancel={(...args) => {
              resolve(restProps.onCancel?.(...args));
            }}
          >
            {content ?? restProps.children}
          </TypedComponent>
        );
        ReactDOM.render(
          <CConfigProvider {...configProviderProps}>
            {wrapper ? React.createElement(wrapper[0], wrapper[1], mainNode) : mainNode}
          </CConfigProvider>,
          mergeTarget,
        );
      };

      render(currentRenderProps as StaticMethodOption);

      const newCaller: StaticMethodsReturn = Object.assign(promise, {
        id: currentInstanceId,
        update: (newProps: any) => {
          if (drawerPool.includes(newCaller)) {
            render((currentRenderProps = { ...currentRenderProps, ...newProps }));
          }
        },

        close: () => {
          if (drawerPool.includes(newCaller)) {
            render({ ...currentRenderProps, visible: false } as StaticMethodOption);
          }
        },
      });

      drawerPool.push(newCaller);

      return newCaller;
    },

    /**
     * 关闭实例
     * @param id 实例id 不传为关闭全部
     */
    close: (id?: number) => {
      if (id) {
        drawerPool.find(drawer => drawer.id === id)?.close();
        drawerPool = drawerPool.filter(drawer => drawer.id !== id);
      } else {
        drawerPool.forEach(drawer => {
          drawer.close();
        });

        drawerPool = [];
      }
    },
  };

  return Object.assign(Component, staticAttributes);
};
