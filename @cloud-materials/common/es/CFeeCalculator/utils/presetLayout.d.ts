/// <reference types="react" />
import type { CFeeCalculatorProps, PriceNode } from '../interface';
/**
 * 根据用户配置 实现 总体的布局
 * @param nodeParams
 * @param layoutParams
 * @param disClaimer
 * @param cssPrefix
 * @param className
 * @param style
 * @returns
 */
export declare const presetLayout: (options: {
    nodeParams: {
        numNode: JSX.Element | null;
        durationNode: JSX.Element | null;
        priceNodes: PriceNode[];
    };
    layoutParams: {
        presetLayoutMode: CFeeCalculatorProps['presetLayoutMode'];
        paramsLayout: CFeeCalculatorProps['paramsLayout'];
        discountPosition: CFeeCalculatorProps['discountLayoutPosition'];
    };
    disClaimer: {
        disClaimerContent: string;
        hasDisclaimer: boolean;
    };
    isLoading: boolean;
    cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
    theme: CFeeCalculatorProps['theme'];
    cFeeCalculatorProps: Pick<CFeeCalculatorProps, 'className' | 'style'>;
}) => JSX.Element;
