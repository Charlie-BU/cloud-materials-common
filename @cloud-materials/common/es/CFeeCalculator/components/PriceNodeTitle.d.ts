import type { ReactNode } from 'react';
import React from 'react';
interface PriceNodeTitleProps {
    title?: Exclude<ReactNode, null>;
    isRefund: boolean;
}
export declare const PriceNodeTitle: React.FC<PriceNodeTitleProps>;
export {};
