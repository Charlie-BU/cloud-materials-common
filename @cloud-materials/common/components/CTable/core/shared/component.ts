/*
 * @Author: youjingyu
 * @Date: 2021-10-22 10:07:53
 * @LastEditTime: 2021-10-28 14:58:40
 * @LastEditors: youjingyu
 * @Description:
 */
import { isArr, isFn, shallowCloneObj } from '../../shared';
import type { ComponentConfig, ComponentConfigArr, ComponentProps } from '../types';

export const formatComponentConfig = (componentConfig?: ComponentConfig, componentProps?: any): ComponentConfigArr => {
  let arr: ComponentConfigArr;
  if (isArr(componentConfig)) {
    // @ts-ignore
    arr = componentConfig;
  } else {
    arr = [componentConfig, componentProps] as ComponentConfigArr;
  }
  // 在 row、cell 场景，props 配置来自 table、column，
  // 然后被多个 row、cell  使用，每个 row、cell  应该用独立的 props
  // 因此这里统一把 props 复制一遍
  // Todo 每个 cell 和 row 都有自己独有的 props ，在大数据场景下是否有性能问题
  return [arr[0], shallowCloneObj(arr[1])];
};

export const setComputedComponent = (
  target: Record<string, any>,
  keyPrefix: string,
  componentConf: ComponentConfig,
) => {
  const component = formatComponentConfig(componentConf);
  target[`${keyPrefix}Type`] = component[0];
  target[`${keyPrefix}Props`] = component[1];
};

export const setComponentProps = (target: Record<string, any>, keyPrefix: string, props?: ComponentProps) => {
  if (props) {
    const key = `${keyPrefix}Props`;
    if (isFn(props)) {
      target[key] = props;
    } else {
      target[key] = target[key] || {};
      // 使用 assign，保证引用不变
      Object.assign(target[key], props);
    }
  }
};

export const getFnComponentProps = <T extends Record<string, any>>(props: ComponentProps | undefined, options: T) => {
  if (isFn(props)) {
    return props(options);
  }
  return props;
};
