import type { BasicTarget } from '../../../_utils/getTargetElement';
/**
 * 滚动时能自动加上阴影效果，滚动到顶部自动去掉阴影效果
 */
export declare const useScrollPosition: (scrollElement: BasicTarget | null) => [shouldTopShadow: boolean, shouldBottomShadow: boolean];
