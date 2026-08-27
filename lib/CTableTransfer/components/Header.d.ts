import React from 'react';
import type { CTableTransferProps } from '../interface';
interface HeaderProps {
    cTransferProps: CTableTransferProps & {
        onRefresh?: () => void;
    };
    onClear?: () => void;
}
export declare const LeftHeader: React.FC<HeaderProps>;
export declare const RightHeader: React.FC<HeaderProps>;
export {};
