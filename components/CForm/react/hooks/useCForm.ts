import { useForm } from '@formily/react';
import type { CForm, ObjectType } from '../../interface';

export const useCForm = <T extends ObjectType = any, D extends ObjectType = any>(): CForm<T, D> => {
  return useForm<T>() as CForm<T, D>;
};
