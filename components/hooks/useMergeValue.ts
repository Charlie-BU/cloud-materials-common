/**
 * 通用hooks：处理defaultValue和value
 * 粘贴自arco源码
 * https://code.byted.org/toutiao-fe-arch/arco/blob/master/components/_util/hooks/useMergeValue.ts
 */
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { isUndefined } from 'lodash-es';

export default function useMergeValue<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
  },
): [T, React.Dispatch<React.SetStateAction<T>>, T] {
  const { defaultValue, value } = props || {};
  const firstRenderRef = useRef(true);

  const [stateValue, setStateValue] = useState<T>(
    !isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : defaultStateValue,
  );

  useEffect(() => {
    // 第一次渲染时候，props.value 已经在useState里赋值给stateValue了，不需要再次赋值。
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    // 外部value等于undefined，也就是一开始有值，后来变成了undefined（
    // 可能是移除了value属性，或者直接传入的undefined），那么就更新下内部的值。
    // 如果value有值，在下一步逻辑中直接返回了value，不需要同步到stateValue
    if (value === undefined) {
      // 修改arco源码 设置为defaultStateValue
      setStateValue(defaultStateValue);
    }
  }, [value]);

  const mergedValue = isUndefined(value) ? stateValue : value;

  return [mergedValue, setStateValue, stateValue];
}
