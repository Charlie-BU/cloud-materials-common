import type { CSSProperties, ReactNode } from 'react';
/**
 * 计费类型
 * @PostPaid 按量计费（后付费）状态
 * @PrePaid 包年包月 预付费）状态
 * */
export type ChargeType = 'PostPaid' | 'PrePaid' | (string & {});
export declare enum DisplayTypeKey {
    wait = "wait",
    normal = "normal",
    error = "error",
    typechanging = "typechanging",
    changing = "changing",
    none = "none"
}
export type DisplayType = 'wait' | 'normal' | 'error' | 'typechanging' | 'changing' | 'none';
export declare enum ChargeStatusKey {
    WaitingPaid = "WaitingPaid",
    Normal = "Normal",
    Overdue = "Overdue",
    Owing = "Owing",
    ChangingPayType = "ChangingPayType",
    Renewing = "Renewing",
    Unsubscribing = "Unsubscribing"
}
export type ChargeStatusType = 'WaitingPaid' | 'Normal' | 'Overdue' | 'Owing' | 'ChangingPayType' | 'Renewing' | 'Unsubscribing' | (string & {});
/** 传入的时间的类型 */
export type TimeType = Date | number | string | undefined;
export interface StatusChangeDate {
    /** 包年包月的到期时间，displayType: normal状态下展示 */
    overdueTime?: TimeType;
    /** 关停时间，displayType: error状态下展示 */
    closedTime?: TimeType;
    /** 删除/释放/回收时间，error状态下展示 */
    reclaimTime?: TimeType;
}
export type StatusChangeTime = TimeType | {
    /** 包年包月的到期时间，displayType: normal状态下展示 */
    overdueTime?: TimeType;
    /** 关停时间，displayType: error状态下展示 */
    closedTime?: TimeType;
    /** 删除/释放/回收时间，error状态下展示 */
    reclaimTime?: TimeType;
};
export interface NormalProps {
    /** 展示的时间 */
    date: TimeType;
    /** 需要展示的状态名称 */
    name?: string;
    /** 当前状态 */
    chargeStatus: ChargeStatusType;
    /** 计费方式 */
    chargeType?: ChargeType;
    /** 自定义的状态映射map */
    statusMap?: ChargeStatusMap;
}
export interface ChargeErrorProps extends Omit<ChargeStatusConfig, 'displayType'> {
    /** 进入到下一个计费状态的时间 */
    date: TimeType;
}
/** 计费状态在statusMap映射到的配置 */
export interface ChargeStatusConfig {
    /** 当前状态的名称 */
    statusName: string;
    /** 下一个状态的名称：如到期的下一状态是“关停”，该字段会配置在时间样式后面：为「xxx」关停 */
    nextStatusName?: string;
    /** 当前计费状态的展示样式
     *@title 计费状态展示的样式
     *@wait 等待计费，灰色文字样式展示计费状态
     *@normal 正常计费状态：如：【2023-01-01 12:00:00 到期】，该状态下，到期时间在7天内自动展示【即将到期】状态
     *@error 计费的警告状态，如【已欠费：2小时23分后关停】
     *@typechanging 计费方式变更中 不展示计费方式
     *@changing 费用变更中，如退订中、续费中
     *@none 除计费方式外，不再展示详细的计费状态
     *@default 'none';
     */
    displayType?: DisplayType;
}
export type ChargeStatusMap = Partial<Record<ChargeStatusType, ChargeStatusConfig>>;
type ChargeTypeLabelType = Partial<Record<ChargeType, ReactNode>>;
/**
 * @title CFeeTypeProps
 */
export interface CFeeTypeProps {
    /** 计费方式 */
    chargeType: ChargeType;
    /** 内置通用的计费状态
     *@title 内置通用计费状态
     * @WaitingPaid 等待支付
     * @Normal 正常
     * @Overdue 到期 （仅包年包月）
     * @Owing 欠费 （仅按量计费）
     * @ChangingPayType 变更计费中
     * @Renewing 续费中 （仅包年包月）
     * @Unsubscribing 退订中 （仅包年包月）
     * */
    chargeStatus: ChargeStatusType;
    /** 未匹配到任何一种计费方式时的兜底展示 */
    defaultChargeLabel?: React.ReactNode;
    /** 可自定义传入map映射 */
    customStatusMap?: ChargeStatusMap;
    /** 按量计费方式下可选是否展示创建时间 normal状态下展示（仅按量计费） */
    createTime?: TimeType;
    /** 计费状态进入下一个状态的具体时间，可配置一个进入下一个状态的时间，或者一次性配置到期、关停、删除时间*/
    statusChangeTime?: StatusChangeTime;
    /**
     * @description 是否是关停态
     * @default false
     *  */
    isClosed?: boolean;
    /**
     * @description 是否是释放态
     * @default false
     * */
    isReclaim?: boolean;
    /** 自定义的样式传入 */
    style?: CSSProperties;
    /** 自定义组件的类名 */
    className?: string | string[];
    /** 自定义计费类型展示的label */
    customChargeLabel?: ChargeTypeLabelType;
}
/**
 * @title CFeeTypeHooksProps
 */
export interface CFeeTypeHooksProps {
    /** 倒计时的目标时间，计算现在到该时间的倒计时 */
    date: TimeType;
    /** 计费类型：获取计费状态config需要 */
    chargeType?: ChargeType;
    /** 计费状态：获取计费状态config需要 */
    chargeStatus?: ChargeStatusType;
    /** 计费状态的展示方式 */
    displayType?: DisplayType;
    /** 状态映射map，不传入则使用内置map */
    statusMap?: ChargeStatusMap;
    /**
     * @description 是否是关停态
     * @default false
     *  */
    isClosed?: boolean;
    /**
     * @description 是否是释放态
     * @default false
     * */
    isReclaim?: boolean;
}
/**
 * @title ChargeStatusConfigType
 * @description config配置组件的Type
 */
export type ChargeStatusConfigType = Pick<CFeeTypeProps, 'customStatusMap' | 'defaultChargeLabel' | 'customChargeLabel'>;
export {};
