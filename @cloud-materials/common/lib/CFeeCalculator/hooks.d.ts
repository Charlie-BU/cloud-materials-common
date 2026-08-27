import type { CFeeCalculatorHooksProps, GetPriceRes, MergedDurationConfig, MergedNumConfig, PriceInfo, ValueType } from './interface';
/**
 * useCFeeCalculator Hooks
 * @param props
 * @returns
 */
export default function useCFeeCalculator({ onChange, onPriceChange, handleData, loading, priceInfo, formValues, deps, numConfig, durationConfig, debounceTime, enableCharge, thousandsSeparator, value, enableRaceCondition, visible, }: CFeeCalculatorHooksProps): readonly [{
    /** 是否显示“计算中”字样 */
    showLoading: boolean;
    /** 是否展示免责声明 */
    hasDisclaimer: boolean;
    /** 数量相关状态 */
    numConfigState: MergedNumConfig;
    /** 时长相关状态 */
    durationConfigState: MergedDurationConfig;
    /** 价格相关信息 */
    priceArr: {
        priceConfig: PriceInfo;
        priceDetail: GetPriceRes;
    }[];
}, {
    /** 处理 时长和数量的改变 */
    handleOnChange: (newConfig: Partial<ValueType>) => void;
}];
