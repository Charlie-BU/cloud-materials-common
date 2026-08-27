import type { CTourStepInfo } from './interface';
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
interface TargetOptions {
    target: CTourStepInfo['target'];
    open: boolean;
    gap?: Gap;
    scrollIntoView?: false | ScrollIntoViewOptions;
}
export declare function useTarget({ target, open, gap, scrollIntoView }: TargetOptions): [PosInfo?, PosInfo?, HTMLElement?];
export {};
