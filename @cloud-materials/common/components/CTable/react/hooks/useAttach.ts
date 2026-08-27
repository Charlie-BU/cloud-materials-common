/*
 * @Author: youjingyu
 * @Date: 2021-10-20 11:12:22
 * @LastEditTime: 2021-10-20 11:25:25
 * @LastEditors: youjingyu
 * @Description:
 */
import { useRef, useEffect } from 'react';

interface IRecycleTarget {
  onMount: () => void;
  onUnmount: () => void;
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  const oldTargetRef = useRef<IRecycleTarget>(null as unknown as IRecycleTarget);
  useEffect(() => {
    if (oldTargetRef.current && target !== oldTargetRef.current) {
      oldTargetRef.current.onUnmount();
    }
    oldTargetRef.current = target;
    target.onMount();
    return () => {
      target.onUnmount();
    };
  }, [target]);
  return target;
};
