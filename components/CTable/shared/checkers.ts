/*
 * @Author: youjingyu
 * @Date: 2021-10-08 17:31:50
 * @LastEditTime: 2021-12-02 21:18:46
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';

export const getType = (obj: any) => Object.prototype.toString.call(obj);

const isType =
  <T>(type: string | string[]) =>
  // eslint-disable-next-line no-undef
  (obj: unknown): obj is T =>
    getType(obj) === `[object ${type}]`;

export const isArr = Array.isArray;

export const isStr = isType<string>('String');

export const isNum = isType<number>('Number');

// eslint-disable-next-line no-undef, @typescript-eslint/ban-types
export const isFn = (val: any): val is Function => typeof val === 'function';

export const isValid = (val: any) => val !== undefined && val !== null;

// eslint-disable-next-line @typescript-eslint/ban-types
export const isPlainObj = isType<object>('Object');

export const isReactFragment = (val: any) => React.isValidElement(val) && val.type === React.Fragment;

export const isReactNode = (val: any) => isStr(val) || isNum(val) || React.isValidElement(val) || isReactFragment(val);
