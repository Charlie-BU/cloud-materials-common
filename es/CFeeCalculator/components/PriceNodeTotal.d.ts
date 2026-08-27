import React from 'react';
import type { GetPriceRes, PriceInfo } from '../interface';
import type { PopoverProps } from '@arco-design/web-react';
interface PriceNodeTotalProps {
    popoverProps?: PopoverProps;
    priceConfig: PriceInfo;
    priceDetail: GetPriceRes;
    monetaryUnit: string;
    monetaryCode?: string;
}
export declare const PriceNodeTotal: React.FC<PriceNodeTotalProps>;
export {};
