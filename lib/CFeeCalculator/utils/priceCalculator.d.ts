import type { GetPriceRes } from '../interface';
type GetPriceProps = {
    total?: number | [number, number];
    originTotal?: number | [number, number];
    precision?: number;
    /** 金额千位分隔符，默认不生成金额分隔符 */
    thousandsSeparator?: string;
    discountPrecision?: number;
    hidePriceInfo?: boolean;
};
/**
 * 获取价格
 * 返回 总价、折扣价、是否是退费、价格是否合法 等数据
 * @param options
 * @returns
 */
export declare const getPrice: (options: GetPriceProps) => GetPriceRes;
export {};
