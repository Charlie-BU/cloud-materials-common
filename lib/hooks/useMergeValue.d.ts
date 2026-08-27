/**
 * 通用hooks：处理defaultValue和value
 * 粘贴自arco源码
 * https://code.byted.org/toutiao-fe-arch/arco/blob/master/components/_util/hooks/useMergeValue.ts
 */
import type React from 'react';
export default function useMergeValue<T>(defaultStateValue: T, props?: {
    defaultValue?: T;
    value?: T;
}): [T, React.Dispatch<React.SetStateAction<T>>, T];
