import { useContext } from 'react';
import type { CFormRegisterConfig } from '../../interface';
import { CFormRegisterConfigContext } from '../../shared/context';

export const useRegisterConfigContext = (): CFormRegisterConfig => {
  return useContext(CFormRegisterConfigContext);
};
