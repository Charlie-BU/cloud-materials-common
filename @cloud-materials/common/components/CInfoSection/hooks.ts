import { useMemo } from 'react';
import { isPlainObject, merge, get } from 'lodash-es';
import type { CInfoSectionProps, CInfoSectionLayoutNormalized } from './interface';
import { BreakpointEnum, useBreakpoint } from '../hooks/useBreakpoint';

export const DefaultInfoSectionLayoutConfig: Record<BreakpointEnum, CInfoSectionLayoutNormalized> = {
  // 0
  [BreakpointEnum.xs]: {
    layout: 'vertical',
    colNumber: 1,
    direction: 'row',
  },
  // 576
  [BreakpointEnum.sm]: {
    layout: 'horizon',
    colNumber: 1,
    direction: 'row',
  },
  // 768
  [BreakpointEnum.md]: {
    layout: 'horizon',
    colNumber: 1,
    direction: 'row',
  },
  // 992
  [BreakpointEnum.lg]: {
    layout: 'vertical',
    colNumber: 2,
    direction: 'row',
  },
  // 1290
  [BreakpointEnum.xl]: {
    layout: 'horizon',
    colNumber: 2,
    direction: 'row',
  },
  // 1600
  [BreakpointEnum.xxl]: {
    layout: 'horizon',
    colNumber: 2,
    direction: 'row',
  },
  // 2000
  [BreakpointEnum.xxxl]: {
    layout: 'horizon',
    colNumber: 2,
    direction: 'row',
  },
};

/**
 * CInfoSection 组件布局
 * - colNumber - 1 | 2 | 3 | 4
 * - layout -  horizon | vertical
 * @description 布局配置以传入的优先
 */
export function useCInfoSectionLayout(
  opts?: Partial<Pick<CInfoSectionProps, 'colNumber' | 'direction' | 'layout' | 'responsive'>>,
) {
  const { responsive = true } = opts || {};
  const { breakpoint } = useBreakpoint();
  const mergedConfig = useMemo(() => {
    if (!responsive) {
      return {
        layout: opts?.layout,
        colNumber: opts?.colNumber,
        direction: opts?.direction,
      };
    }

    const defaultBrkCfg = get(DefaultInfoSectionLayoutConfig, breakpoint);
    const layout = isPlainObject(opts?.layout) ? get(opts?.layout, breakpoint) : opts?.layout;
    const colNumber = isPlainObject(opts?.colNumber) ? get(opts?.colNumber, breakpoint) : opts?.colNumber;
    const direction = isPlainObject(opts?.direction) ? get(opts?.direction, breakpoint) : opts?.direction;

    return merge(
      {
        ...defaultBrkCfg,
      },
      {
        layout,
        colNumber,
        direction,
      },
    );
  }, [breakpoint, opts?.colNumber, opts?.direction, opts?.layout]);

  return mergedConfig;
}
