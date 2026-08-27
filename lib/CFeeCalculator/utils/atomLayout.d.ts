/// <reference types="react" />
import type { CFeeCalculatorProps, PriceInfo } from '../interface';
/**
 * 原子布局文件
 */
/**
 * 根据 用户配置 实现 总价和折扣价 的排列布局
 * @param options
 * @returns
 */
export declare const priceTotalDiscountNodeLayout: (options: {
    customRenderPriceNode?: PriceInfo['customRenderPriceNode'];
    priceTotalNode: JSX.Element;
    priceDiscountNode?: JSX.Element | null | undefined;
    layoutParams: {
        discountLayoutPosition: CFeeCalculatorProps['discountLayoutPosition'];
    };
    isLoading: boolean;
    cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
    hasDescription: boolean;
}) => JSX.Element;
/**
 * 根据用户配置 实现 价格标题 和 价格 的排列布局
 * @param options
 * @returns
 */
export declare const priceAndTitleLayout: (options: {
    index: number;
    priceTotalNode: JSX.Element;
    priceDiscountNode?: JSX.Element | null | undefined;
    title?: JSX.Element | null | undefined;
    description?: JSX.Element | null | undefined;
    layoutParams: {
        discountLayoutPosition: CFeeCalculatorProps['discountLayoutPosition'];
        presetLayoutMode: CFeeCalculatorProps['presetLayoutMode'];
    };
    isLoading: boolean;
    cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
    hasDescription: boolean;
    customRenderPriceNode?: PriceInfo['customRenderPriceNode'];
}) => JSX.Element;
/**
 * 根据用户配置 实现 时长和数量 的排列布局
 * @param options
 * @returns
 */
export declare const paramLayout: (options: {
    layoutParams: {
        paramsLayout: CFeeCalculatorProps['paramsLayout'];
        presetLayoutMode: CFeeCalculatorProps['presetLayoutMode'];
    };
    numNode?: JSX.Element | null | undefined;
    durationNode?: JSX.Element | null | undefined;
    cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
}) => JSX.Element | null;
