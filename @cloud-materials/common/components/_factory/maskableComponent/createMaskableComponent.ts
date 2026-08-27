import { createStaticMethods } from './createStaticMethods';
import type { CreateMaskableComponent, DefineStatic } from './interface';
import { TriggerWrapper } from './TriggerWrapper';

export const createMaskableComponent: CreateMaskableComponent = (Component, attachMap) => {
  const staticProps = Object.keys(attachMap).reduce((prev, current) => {
    const ComponentWithStaticMethods = attachMap[current];
    const { open, close } = ComponentWithStaticMethods;
    return {
      ...prev,
      [current]: ComponentWithStaticMethods,
      [`open${current}`]: open,
      [`close${current}`]: close,
    };
  }, {} as DefineStatic<typeof attachMap>);

  const WithStaticBaseComponent = createStaticMethods(Component);

  const closeAll = () => {
    WithStaticBaseComponent.close();
    Object.keys(attachMap).forEach(key => {
      attachMap[key].close();
    });
  };

  return Object.assign(WithStaticBaseComponent as any, {
    ...staticProps,
    TriggerWrapper,
    closeAll,
  });
};
