/*
 * @Author: youjingyu
 * @Date: 2021-09-14 21:17:09
 * @LastEditTime: 2021-10-07 18:36:56
 * @LastEditors: youjingyu
 * @Description:
 */
import type React from 'react';
import type { CellComponentRenderProps } from '../../../core';

export const Text: React.FC<CellComponentRenderProps> = props => {
  return props.content;
};
