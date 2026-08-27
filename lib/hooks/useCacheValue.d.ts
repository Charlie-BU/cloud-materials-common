interface UseCacheValueOption<T> {
    defaultValue?: T;
    value?: T;
    cacheKey?: string;
}
export declare const useCacheValue: <T>(options: UseCacheValueOption<T>, initValue: T) => [T, (value: T) => void];
export {};
