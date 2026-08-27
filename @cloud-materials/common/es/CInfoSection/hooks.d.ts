import type { CInfoSectionProps, CInfoSectionLayoutNormalized } from './interface';
import { BreakpointEnum } from '../hooks/useBreakpoint';
export declare const DefaultInfoSectionLayoutConfig: Record<BreakpointEnum, CInfoSectionLayoutNormalized>;
/**
 * CInfoSection 组件布局
 * - colNumber - 1 | 2 | 3 | 4
 * - layout -  horizon | vertical
 * @description 布局配置以传入的优先
 */
export declare function useCInfoSectionLayout(opts?: Partial<Pick<CInfoSectionProps, 'colNumber' | 'direction' | 'layout' | 'responsive'>>): {
    layout: ("vertical" | "horizon") | Partial<Record<BreakpointEnum, "vertical" | "horizon">> | undefined;
    colNumber: number | Partial<Record<BreakpointEnum, number>> | undefined;
    direction: "column" | "row" | Record<BreakpointEnum, "column" | "row"> | undefined;
};
