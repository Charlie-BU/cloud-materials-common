/*
 * @Author: youjingyu
 * @Date: 2021-10-12 17:15:35
 * @LastEditTime: 2021-10-12 17:17:51
 * @LastEditors: youjingyu
 * @Description:
 */
import { isArr } from './checkers';

export const fixComponentConfig = (componentConfig: any, componentProps: any) => {
  if (isArr(componentConfig)) {
    return componentConfig;
  }
  return [componentConfig, componentProps];
};
