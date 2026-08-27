import { useLayoutEffect, useState } from 'react';
import { updateCSS, removeCSS } from 'rc-util/es/Dom/dynamicCSS';
import { getTargetScrollBarSize } from 'rc-util/es/getScrollBarSize';

const isBodyOverflowing = () =>
  document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
  window.innerWidth > document.body.offsetWidth;

const UNIQUE_ID = `scroll-locker-${Date.now()}`;

let uuid = 0;

export default function useScrollLocker(lock?: boolean) {
  const mergedLock = !!lock;
  const [id] = useState(() => `${UNIQUE_ID}_${(uuid += 1)}`);

  useLayoutEffect(() => {
    if (mergedLock) {
      const scrollbarSize = getTargetScrollBarSize(document.body).width;
      const isOverflow = isBodyOverflowing();

      updateCSS(`html body {overflow-y: hidden;${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ''}}`, id);
    } else {
      removeCSS(id);
    }

    return () => {
      removeCSS(id);
    };
  }, [mergedLock, id]);
}
