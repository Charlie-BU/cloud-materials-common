import type { PropsWithDebounce } from '../interface';
export interface UseDebounceHandlerProps extends PropsWithDebounce {
    onChange?: (...args: any[]) => void;
}
export declare const useDebounceHandler: (props: UseDebounceHandlerProps) => {
    handleChange: (...args: any[]) => void;
    debounceHandleChange: (...args: any[]) => void;
};
