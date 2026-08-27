import React from 'react';
import type { CLoadingProps, CSpinProps, CResultProps } from './interface';
/**
 * 请使用 CLoadingV2 来替代，最多可以减少 490+KiB 的包体积
 * @deprecated
 */
declare const CLoading: React.FC<CLoadingProps> & {
    Spin: React.FC<CSpinProps>;
    Result: React.FC<CResultProps>;
};
export default CLoading;
