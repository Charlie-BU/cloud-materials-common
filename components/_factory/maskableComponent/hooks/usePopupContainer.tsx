import { useSize } from 'ahooks';
import type { BasicTarget } from '../../../_utils/getTargetElement';
import { getTargetElement } from '../../../_utils/getTargetElement';
import { useEffect, useRef } from 'react';

export const usePopupContainer = (target: BasicTarget, refreshFlag = 0) => {
  const size = useSize(target);
  const canScroll = useRef(false);
  const dom = getTargetElement(target);

  useEffect(() => {
    if (dom && size?.height) {
      canScroll.current = dom.scrollHeight > dom.clientHeight;
    }
  }, [size?.height, dom, refreshFlag]);

  return () => (canScroll.current ? dom ?? document.body : document.body);
};
