import type { Table } from '../models';
import type { FetcherOptions, R } from '../types';
type FetcherEffectCallback = <DataType extends R = any, GlobalScopeType extends R = any>(cb: (options: {
    table: Table<DataType, GlobalScopeType>;
    fetcherOptions: FetcherOptions<DataType, GlobalScopeType>;
    error: Error;
}) => void) => void;
export declare const onFetchStart: FetcherEffectCallback;
export declare const onFetchEnd: FetcherEffectCallback;
export declare const onFetchError: FetcherEffectCallback;
export {};
