import type { TargetType, BasicTarget } from '../_utils/getTargetElement';
export declare function useCEllipsis<T extends TargetType>(target: BasicTarget<T>): readonly [{
    readonly isTextOverflow: boolean;
}];
