import type { InputNumberProps, InputProps } from '@arco-design/web-react';
import type { DebounceSettings } from 'lodash-es';
export type UseDebounceInputType = InputProps | InputNumberProps;
export type UseDebounceInputProps<T extends UseDebounceInputType = InputProps> = T & {
    /**
     * 防抖参数，若为 null 表示不需要防抖
     * @defaultValue `{ wait: 500 }`
     */
    debounceOptions?: ({
        wait?: number;
    } & DebounceSettings) | null;
};
export declare const useDebounceInput: <T extends UseDebounceInputType = InputProps>(props: UseDebounceInputProps<T>) => T;
