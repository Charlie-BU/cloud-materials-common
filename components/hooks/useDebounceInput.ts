import type { InputNumberProps, InputProps } from '@arco-design/web-react';
import type { DebouncedFunc, DebounceSettings } from 'lodash-es';
import { debounce, noop } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

export type UseDebounceInputType = InputProps | InputNumberProps;

export type UseDebounceInputProps<T extends UseDebounceInputType = InputProps> = T & {
  /**
   * 防抖参数，若为 null 表示不需要防抖
   * @defaultValue `{ wait: 500 }`
   */
  debounceOptions?: ({ wait?: number } & DebounceSettings) | null;
};

const defaultDebounceOptions = { wait: 500 };

export const useDebounceInput = <T extends UseDebounceInputType = InputProps>(props: UseDebounceInputProps<T>): T => {
  const { onChange = noop, debounceOptions, value, defaultValue, ...rest } = props;
  const [currentValue, setCurrentValue] = useState('value' in props ? value : defaultValue);

  const changeHandler = useMemo(() => {
    if (debounceOptions === null) {
      return onChange;
    }
    const { wait, ...restOptions } = { ...defaultDebounceOptions, ...debounceOptions };
    return debounce(onChange, wait, restOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceOptions]);

  const cancel = () => {
    if (debounceOptions !== null) {
      (changeHandler as DebouncedFunc<typeof onChange>).cancel();
    }
  };

  const handleChange = (value: T['value']) => {
    setCurrentValue(value);
    changeHandler(value);
  };

  useEffect(() => {
    if ('value' in props && value !== currentValue) {
      cancel();
      handleChange(value);
    }
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { value: currentValue, onChange: handleChange, ...rest } as T;
};
