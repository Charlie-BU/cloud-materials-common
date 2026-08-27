import type React from 'react';
import { useState } from 'react';

interface AsyncSubmitProps<T> {
  /** 数据提交回调，当变更状态失败时要抛错才能阻止setValue */
  onSubmit?: (value?: T) => Promise<void>;
  /** 在 submit 后更新值；触发钱前提：onSubmit 不出错 + 有传参 */
  setValue?: React.Dispatch<T>;
  isControlledMode?: boolean;
}

export const useAsyncSubmit = <T>(props: AsyncSubmitProps<T>) => {
  const { setValue, onSubmit, isControlledMode } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (value: T) => {
    setLoading(true);
    try {
      await onSubmit?.(value);
      isControlledMode && setValue?.(value);
    } catch (e) {
      console.warn('[CAsyncSwitch - async submit] 数据提交失败', e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};
