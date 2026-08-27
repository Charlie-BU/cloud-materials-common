import { useEventListener, useThrottleFn } from 'ahooks';
import { useEffect, useState } from 'react';
import type { BasicTarget } from '../../../_utils/getTargetElement';
import { getTargetElement } from '../../../_utils/getTargetElement';
import useResizeObserver from '@react-hook/resize-observer';

/**
 * 滚动时能自动加上阴影效果，滚动到顶部自动去掉阴影效果
 */
export const useScrollPosition = (
  scrollElement: BasicTarget | null,
): [shouldTopShadow: boolean, shouldBottomShadow: boolean] => {
  const [shouldTopShadow, setTopShadow] = useState(false);
  const [shouldBottomShadow, setBottomShadow] = useState(false);

  const { run: setShadow, flush } = useThrottleFn(
    (scrollElement: Element) => {
      const scrollElementHeight = scrollElement.clientHeight;
      const scrollElementScrollHeight = scrollElement.scrollHeight;
      // const [topShadow, bottomShadow] = boxShadow;
      if (scrollElementScrollHeight > scrollElementHeight) {
        setTopShadow(scrollElement.scrollTop > 0);
        setBottomShadow(scrollElement.scrollTop < scrollElementScrollHeight - scrollElementHeight);
      } else {
        setTopShadow(false);
        setBottomShadow(false);
      }
    },
    { wait: 200 },
  );

  useEffect(() => {
    const element = scrollElement && getTargetElement(scrollElement);
    if (element) {
      setShadow(element);
    }
  }, [scrollElement]);

  useResizeObserver(scrollElement, ({ target }) => {
    setShadow(target);
    // 立即执行，忽略防抖
    flush();
  });

  useEventListener(
    'scroll',
    (e: Event) => {
      const scrollElement = e.target as HTMLElement;
      setShadow(scrollElement);
    },
    { target: scrollElement },
  );

  return [shouldTopShadow, shouldBottomShadow];
};
