import { useBaseMaskable } from '../_factory/maskableComponent';
import type { CDrawerHooksProps } from './interface';

export const useCDrawer = (props: CDrawerHooksProps) => {
  return useBaseMaskable<CDrawerHooksProps>({ ...props, componentName: 'CDrawer' });
};
