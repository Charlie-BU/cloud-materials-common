import type { ChargeStatusConfigType, ChargeType } from './interface';
export declare const setChargeStatusConfig: (config: ChargeStatusConfigType) => void;
/** 获取statusMap */
export declare const useChargeLocalConfig: (options: {
    chargeType?: ChargeType | undefined;
    isClosed?: boolean | undefined;
    isReclaim?: boolean | undefined;
}) => {
    ChargeTypeLabel: Record<ChargeType, string>;
    defaultStatusMap: Partial<Record<import("./interface").ChargeStatusType, import("./interface").ChargeStatusConfig>>;
};
/** 获取未匹配到计费方式的默认的兜底文案 */
export declare const getChargeTypeLabel: () => {};
