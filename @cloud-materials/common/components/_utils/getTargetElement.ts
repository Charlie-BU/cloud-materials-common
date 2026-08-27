import type { RefObject } from 'react';

export type TargetType = HTMLElement;

export type BasicTarget<T extends TargetType = HTMLElement> = T | RefObject<T>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>) {
  return 'current' in target ? target.current : target;
}
