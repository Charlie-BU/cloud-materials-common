import type { RefObject } from 'react';
export type TargetType = HTMLElement;
export type BasicTarget<T extends TargetType = HTMLElement> = T | RefObject<T>;
export declare function getTargetElement<T extends TargetType>(target: BasicTarget<T>): T | null;
