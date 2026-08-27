import { useState, useLayoutEffect } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

import type { TargetType, BasicTarget } from '../_utils/getTargetElement';
import { getTargetElement } from '../_utils/getTargetElement';

export function useCEllipsis<T extends TargetType>(target: BasicTarget<T>) {
  const [isTextOverflow, setTextOverflow] = useState(false);

  const checkOverflow = (el: Element) => {
    const { clientWidth, scrollWidth } = el;
    /**
     * FIXME:使用 JS 计算，来解决父元素与文本宽度相近的场景
     */
    return scrollWidth > clientWidth;
    // if (scrollWidth > clientWidth) {
    //   return true;
    // }
    // if (scrollWidth === clientWidth) {
    //   const width = parseFloat(window.getComputedStyle(el).width);
    //   return width !== scrollWidth && width + 1 > scrollWidth;
    // }
    // return false;
  };

  useLayoutEffect(() => {
    const el = getTargetElement(target);
    if (el) {
      setTextOverflow(checkOverflow(el));
    }
  }, [target]);

  useResizeObserver(target, entry => {
    setTextOverflow(checkOverflow(entry.target));
  });

  return [{ isTextOverflow }] as const;
}
