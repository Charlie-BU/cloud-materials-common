import { useBaseMaskable } from '../_factory/maskableComponent';
import type { CModalHooksProps } from './interface';

export const useCModal = (props: CModalHooksProps) => {
  return useBaseMaskable({ ...props, componentName: 'CModal' });
};
