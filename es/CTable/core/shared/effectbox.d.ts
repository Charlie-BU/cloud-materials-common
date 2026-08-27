import type { Table } from '../models';
import type { AnyFunction } from '../types';
export declare const createEffectHook: <F extends (payload: any, ...ctxs: any[]) => AnyFunction>(type: string, callback?: F | undefined) => (...args: Parameters<ReturnType<F>>) => void;
export declare const createEffectContext: <T = any>(defaultValue?: T | undefined) => {
    provide(value?: T | undefined): void;
    consume(): T;
};
export declare const useEffectTable: () => Table<any, any>;
export declare const runEffects: <Context>(context: Context, ...args: ((context: {
    table: Context;
}) => void)[]) => {
    type: string;
    callback: (context: Context, payload: any) => any;
}[];
