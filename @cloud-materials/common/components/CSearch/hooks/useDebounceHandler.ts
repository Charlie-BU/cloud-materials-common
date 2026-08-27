import { debounce, noop } from 'lodash-es';
import { useEffect, useMemo, useRef } from 'react';
import type { PropsWithDebounce } from '../interface';

export interface UseDebounceHandlerProps extends PropsWithDebounce {
  onChange?: (...args: any[]) => void;
}

const defaultDebounceOptions: PropsWithDebounce['debounceOptions'] = { wait: 500 };

export const useDebounceHandler = (props: UseDebounceHandlerProps) => {
  const { onChange = noop, debounceOptions } = props;
  const refChange = useRef(onChange);
  refChange.current = onChange;

  const debounceHandleChange = useMemo(() => {
    if (debounceOptions === null) {
      return refChange.current;
    }
    const { wait, ...restOptions } = { ...defaultDebounceOptions, ...debounceOptions };
    return debounce(refChange.current, wait, restOptions);
  }, [debounceOptions]);

  useEffect(() => {
    if ('cancel' in debounceHandleChange && typeof debounceHandleChange.cancel === 'function') {
      debounceHandleChange.cancel();
    }
  }, [debounceHandleChange]);

  return { handleChange: onChange, debounceHandleChange };
};
