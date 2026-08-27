import { useDeepCompareEffect } from 'ahooks';
import { isEqual } from 'lodash-es';
import type { Dispatch } from 'react';
import { useState } from 'react';

export interface UseControlledValueProps<T> {
  defaultValue?: T;
  value?: T;
}

//1. 无论组件的value受控非受控，都由组件内部控制
//2. 默认值优先判断props的，props的value有改变 重新set
//3. ahooks的主要用于在某些组件开发时，我们需要组件的状态既可以自己管理，也可以被外部控制，而在这里我们只需要内部管理。
export const useControlledValue = <T>(
  props: UseControlledValueProps<T>,
  initValue?: T,
): [T | undefined, Dispatch<T>] => {
  const { defaultValue, value } = props;
  const [current, setCurrent] = useState(('value' in props ? value : defaultValue) ?? initValue);

  useDeepCompareEffect(() => {
    if ('value' in props && !isEqual(value, current)) {
      setCurrent(value);
    }
  }, [value]);

  return [current, setCurrent];
};
