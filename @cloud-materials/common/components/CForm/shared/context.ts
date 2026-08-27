import { createContext } from 'react';
import type { CFormRegisterConfig } from '../interface';

export const CFormRegisterConfigContext = createContext<CFormRegisterConfig>({ componentsMap: {} });
