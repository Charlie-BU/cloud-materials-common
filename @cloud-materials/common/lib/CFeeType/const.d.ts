import type { ChargeType } from './interface';
export declare const useChargeText: (chargeType?: ChargeType) => {
    ChargeTypeLabel: Record<ChargeType, string>;
    defaultStatusMap: Partial<Record<import("./interface").ChargeStatusType, import("./interface").ChargeStatusConfig>>;
};
