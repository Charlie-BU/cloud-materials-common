import { useResponsive, configResponsive } from 'ahooks';

/**
 * 断点枚举
 */
export enum BreakpointEnum {
  /**
   * 0 - 576px
   */
  xs = 'xs',
  /**
   * 576px - 768px
   */

  sm = 'sm',
  /**
   * 768px - 992px
   */
  md = 'md',
  /**
   * 992px - 1280px
   */
  lg = 'lg',
  /**
   * 1280px - 1600px
   */
  xl = 'xl',
  /**
   * 1600px - 2000px
   */
  xxl = 'xxl',
  /**
   * 2000px - Infinity
   */
  xxxl = 'xxxl',
}

/**
 * 屏幕宽度断点配置
 * @see https://arco.bytedance.net/react/components/Grid
 * @see https://ahooks.js.org/zh-CN/hooks/use-responsive
 */
export const BreakpointConfig: Record<BreakpointEnum, number> = {
  [BreakpointEnum.xs]: 0,
  [BreakpointEnum.sm]: 576,
  [BreakpointEnum.md]: 768,
  [BreakpointEnum.lg]: 992,
  [BreakpointEnum.xl]: 1280, // 原本是 1200，对齐 设计师的数值
  [BreakpointEnum.xxl]: 1600,
  [BreakpointEnum.xxxl]: 2000,
};

/**
 * 配置断点
 * @description 不要轻易配置！！此处会影响 SiderBar、CInfoSection组件
 * @param config
 */
export function configBreakpoint(config: Partial<Record<BreakpointEnum, number>>) {
  configResponsive(Object.assign({}, BreakpointConfig, config));
}

// 根据尺寸大小排序，object 可能乱序
const breakpointsArr = Object.entries(BreakpointConfig)
  .sort((a, b) => b[1] - a[1]) // 大的排前面
  .map(([key]) => key as BreakpointEnum);

// 全局配置
configBreakpoint(BreakpointConfig);

/**
 * 屏幕断点
 * @returns
 */
export function useBreakpoint() {
  const resInfo = useResponsive();
  const key = breakpointsArr.find(key => resInfo[key] === true) || BreakpointEnum.xs;

  return {
    breakpoint: key,
    breakpointWidth: BreakpointConfig[key],
  };
}
