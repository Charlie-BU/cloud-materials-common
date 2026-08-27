import type { Dispatch } from 'react';
export interface UseControlledValueProps<T> {
    defaultValue?: T;
    value?: T;
}
export declare const useControlledValue: <T>(props: UseControlledValueProps<T>, initValue?: T | undefined) => [T | undefined, Dispatch<T>];
