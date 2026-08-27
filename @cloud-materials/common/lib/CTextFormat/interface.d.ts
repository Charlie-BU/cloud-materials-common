export interface DiscountProps {
    type: 'Discount';
    /** 中文环境下的折扣信息，在 0~10 之间，可以为小数。例如：9、3.5、1 */
    discount: number;
}
/**
 * @title CTextFormatProps
 */
export type CTextFormatProps = DiscountProps;
export type CTextFormatHooksProps = CTextFormatProps;
