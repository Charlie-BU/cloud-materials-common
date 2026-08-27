/*
 * @Author: youjingyu
 * @Date: 2021-10-15 17:57:28
 * @LastEditTime: 2021-10-17 10:53:56
 * @LastEditors: youjingyu
 * @Description:
 */
import type { Table } from '../models';
import { isFn, isValid } from '../../shared';
import type { AnyFunction } from '../types';
import { isTable } from './checkers';

const GlobalState = {
  initializing: false,
  lifecycles: [] as { type: string; callback: (ctx: any, payload: any) => void }[],
  context: [] as any[],
  effectStart: false,
  effectEnd: false,
};

export const createEffectHook = <F extends (payload: any, ...ctxs: any[]) => AnyFunction>(
  type: string,
  callback?: F,
) => {
  return (...args: Parameters<ReturnType<F>>) => {
    if (GlobalState.effectStart) {
      GlobalState.lifecycles.push({
        type,
        callback: (ctx, payload) => {
          if (isFn(callback)) {
            callback(ctx, payload, ...GlobalState.context)(...args);
          }
        },
      });
    } else {
      throw new Error('Effect hooks cannot be used in asynchronous function body');
    }
  };
};

export const createEffectContext = <T = any>(defaultValue?: T) => {
  let index: number;
  return {
    provide(value?: T) {
      if (GlobalState.effectStart) {
        index = GlobalState.context.length;
        GlobalState.context[index] = isValid(value) ? value : defaultValue;
      } else {
        throw new Error('Provide method cannot be used in asynchronous function body');
      }
    },
    consume(): T {
      if (!GlobalState.effectStart) {
        throw new Error('Consume method cannot be used in asynchronous function body');
      }
      return GlobalState.context[index];
    },
  };
};

const TableEffectContext = createEffectContext<Table>();

export const useEffectTable = TableEffectContext.consume;

export const runEffects = <Context>(
  context: Context,
  ...args: ((context: { table: Context }) => void)[]
): { type: string; callback: (context: Context, payload: any) => any }[] => {
  GlobalState.lifecycles = [];
  GlobalState.context = [];
  GlobalState.effectStart = true;
  GlobalState.effectEnd = false;
  if (isTable(context)) {
    TableEffectContext.provide(context);
  }
  args.forEach(effects => {
    if (isFn(effects)) {
      effects({ table: context });
    }
  });
  GlobalState.context = [];
  GlobalState.effectStart = false;
  GlobalState.effectEnd = true;
  return GlobalState.lifecycles;
};
