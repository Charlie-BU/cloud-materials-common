import React from 'react';

import { TabComponentMap, TabNoticeComponentMap } from '../types';

/**
 * 根据名字和参数获取组件
 * @param componentName
 * @param componentProps
 * @returns
 */
export const getComponent = (componentName?: string, componentProps?: any): React.ReactNode => {
  if (!componentName) return null;
  const Component = TabComponentMap?.[componentName];
  return <Component {...componentProps} />;
};

/**
 * 根据名字和参数获取组件
 * @param componentName
 * @param componentProps
 * @returns
 */
export const getNoticeComponent = (componentName?: string, componentProps?: any): React.ReactNode => {
  if (!componentName) return null;
  const Component = TabNoticeComponentMap?.[componentName];
  return <Component {...componentProps} />;
};
