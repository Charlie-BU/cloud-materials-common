export declare const useScrollLoad: (options: {
    /** 加载函数 */
    cb: () => void;
    /** 是否启用 */
    disabled?: boolean | undefined;
    /** 防抖时间 */
    debounceTime?: number | undefined;
}) => import("lodash-es").DebouncedFunc<(element: Element) => void>;
