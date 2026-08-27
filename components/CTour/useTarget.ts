import { useLayoutEffect, useMemo, useState } from 'react';
import { isInViewPort } from './utils';
import type { CTourStepInfo } from './interface';
import { useMemoizedFn } from 'ahooks';

export interface Gap {
  offset?: number | [number, number];
  radius?: number;
}

export interface PosInfo {
  left: number;
  top: number;
  height: number;
  width: number;
  radius?: number;
}
function isValidNumber(val?: number) {
  return typeof val === 'number' && !Number.isNaN(val);
}

interface TargetOptions {
  target: CTourStepInfo['target'];
  open: boolean;
  gap?: Gap;
  scrollIntoView?: false | ScrollIntoViewOptions;
}

export function useTarget({ target, open, gap, scrollIntoView }: TargetOptions): [PosInfo?, PosInfo?, HTMLElement?] {
  // ========================= Target =========================
  // We trade `undefined` as not get target by function yet.
  // `null` as empty target.
  const [targetElement, setTargetElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    const nextElement = typeof target === 'function' ? (target as any)() : target;
    setTargetElement(nextElement || null);
  });

  const [posInfo, setPosInfo] = useState<PosInfo>();

  const updatePos = useMemoizedFn(() => {
    if (targetElement) {
      // Exist target element. We should scroll and get target position
      if (!isInViewPort(targetElement) && open && scrollIntoView !== false) {
        targetElement.scrollIntoView(scrollIntoView);
      }

      const { left, top, width, height } = targetElement.getBoundingClientRect();
      const nextPosInfo: PosInfo = { left, top, width, height, radius: 0 };

      setPosInfo(origin => {
        if (JSON.stringify(origin) !== JSON.stringify(nextPosInfo)) {
          return nextPosInfo;
        }
        return origin;
      });
    } else {
      // Not exist target which means we just show in center
      setPosInfo(void 0);
    }
  });

  const getGapOffset = (index: number) => (Array.isArray(gap?.offset) ? gap?.offset[index] : gap?.offset) ?? 6;

  useLayoutEffect(() => {
    updatePos();
    // update when window resize
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('resize', updatePos);
    };
  }, [targetElement, open, updatePos]);

  // ======================== PosInfo =========================
  const mergedPosInfo = useMemo(() => {
    if (!posInfo) {
      return posInfo;
    }

    const gapOffsetX = getGapOffset(0);
    const gapOffsetY = getGapOffset(1);
    const gapRadius = isValidNumber(gap?.radius) ? gap?.radius : 2;

    return {
      left: posInfo.left - gapOffsetX,
      top: posInfo.top - gapOffsetY,
      width: posInfo.width + gapOffsetX * 2,
      height: posInfo.height + gapOffsetY * 2,
      radius: gapRadius,
    };
  }, [posInfo, gap]);

  return [mergedPosInfo, posInfo, targetElement];
}
