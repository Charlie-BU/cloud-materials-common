import type React from 'react';
interface AsyncSubmitProps<T> {
    /** 数据提交回调，当变更状态失败时要抛错才能阻止setValue */
    onSubmit?: (value?: T) => Promise<void>;
    /** 在 submit 后更新值；触发钱前提：onSubmit 不出错 + 有传参 */
    setValue?: React.Dispatch<T>;
    isControlledMode?: boolean;
}
export declare const useAsyncSubmit: <T>(props: AsyncSubmitProps<T>) => {
    loading: boolean;
    handleSubmit: (value: T) => Promise<void>;
};
export {};
