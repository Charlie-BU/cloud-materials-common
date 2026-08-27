import type { ReactNode, CSSProperties } from 'react';
import type { PopoverProps } from '@arco-design/web-react';
import type { AllowEmpty } from '../CTable/arco/types/common';
import type { ColumnConfig, TableProps } from '../CTable/arco/types';
/**
 * @title CFeeCalculatorProps
 */
export interface CFeeCalculatorProps {
    /**
     * @zh 用以获取价格的接口的参数
     */
    formValues?: Record<string, any>;
    /**
     * @zh 依赖的formValues字段，当formValues中的key存在于deps中时，变化时会触发价格重计算
     */
    deps?: string[];
    /**
     * @zh 是否在计算中。当价格未受控时，由组件内部处理计算中状态，无需额外配置loading变量；当价格受控时，配置loading为true可展示计算中字样。
     */
    loading?: boolean;
    /**
     * @zh 配置数量
     */
    numConfig?: NumConfig;
    /**
     * @zh 配置月份
     */
    durationConfig?: DurationConfig;
    /**
     * @zh 自定义货币符号，默认值为￥。（展示在金额的前方，如 ¥156 中的¥）
     * @en custom monetaryUnit, default Value is $
     */
    monetaryUnit?: string;
    /**
     * @zh 自定义货币代码，默认为 undefined。（展示在金额的后方，如 $156USD 中的USD ）
     * @en custom monetaryCode, default Value is undefined
     */
    monetaryCode?: string;
    /**
     * @zh 金额的千位分隔符，默认为 undefined，没有分隔符
     * @en thousands separator, default Value is undefined
     */
    thousandsSeparator?: string;
    /**
     * @zh 自定义“已省”文案，默认值为“已省”
     * @en custom saved text, default Value is 'Saved'
     */
    savedText?: string;
    /**
     * @zh 免责声明，仅涉及退费场景展示该内容
     */
    disClaimerContent?: string;
    /**
     * @zh 控制handleData函数的调用频率
     * @defaultValue 500
     */
    debounceTime?: number;
    /**
     * @zh 展示价格信息，传了该属性后handleData失效
     */
    priceInfo?: PriceInfo[];
    /**
     * @zh popover属性透传,该属性会透传给全部的价格区块
     */
    popoverProps?: PopoverProps;
    /**
     * @zh 是否开启计费，关闭计费后，将不会展示费用
     * @defaultValue true
     */
    enableCharge?: boolean;
    /**
     * @zh 获取费用信息的函数，一般用于从后端接口获取价格
     */
    handleData?: (params: HandleDataParams) => HandleDataRes | Promise<HandleDataRes>;
    /**
     * @zh 受控模式，数量和时长受控。配置后数量和时长同时受控。
     */
    value?: ValueType;
    /**
     * @zh 数量或月份发生变化时的回调
     */
    onChange?: (config: ValueType) => void;
    /**
     * @zh 计算价格变化时的回调
     */
    onPriceChange?: (priceInfo: PriceInfo[]) => void;
    /**
     * @zh 布局切换，目前提供两种布局，一种横向的用在表单的footer中，一种纵向的用在card中
     * @defaultValue 'footer'
     */
    presetLayoutMode?: 'footer' | 'card';
    /**
     * @zh 折扣数据展示的位置，默认展示在价格的右侧，可设置展示在价格的下方
     * @defaultValue right
     */
    discountLayoutPosition?: 'right' | 'bottom';
    /**
     * @zh 配置项目的展示方式，数量配置和时长配置的展示形式
     * @defaultValue horizontal
     */
    paramsLayout?: 'vertical' | 'horizontal';
    /**
     * @zh 样式
     */
    style?: CSSProperties;
    /**
     * @zh className
     */
    className?: string;
    /**
     * @zh 主题，默认为 zh。配置主题样式，用于区分海外版本和火山版本存在不同样式的情况
     * @en theme，defaultValue is zh
     * @defaultValue zh
     */
    theme?: 'zh' | 'en';
    /**
     * 是否开启 handleData 的竞态处理
     */
    enableRaceCondition?: boolean;
    /**
     * @zh 是否展示 计费 组件
     * @defaultValue true
     *  */
    visible?: boolean;
}
/**
 * @title PriceInfo
 * 价格预览配置
 */
export interface PriceInfo<DataTypeItem extends Record<string, any> = any> {
    /**
     * @zh 当前计费项的标题，未传入title时默认显示“配置费用”，传入null时可以不显示标题
     * @defaultValue 配置费用
     */
    title?: ReactNode;
    /**
     * @zh 跟随在每个价格区块后的描述信息，适用于包年包月转按量计费时，通过描述信息展示退款金额。
     */
    description?: ReactNode;
    /**
     * @zh 折后总价，未返回total或total为NaN时显示-。填入数值类型时展示单一价格，填入数组时展示价格区间。
     * @defaultValue 0
     */
    total?: number | [number, number];
    /**
     * @zh 隐藏价格信息，用于子账户无权限等情况。隐藏后总价将会展示为***
     */
    hidePriceInfo?: boolean;
    /**
     * @zh 原价
     * @defaultValue 0
     */
    originalTotal?: number | [number, number];
    /**
     * @zh 用户自定义价格节点
     */
    customRenderPriceNode?: () => ReactNode;
    /**
     * @zh 单位
     */
    unit?: string;
    /**
     * @zh 精度 总价精度
     * @defaultValue 2
     */
    precision?: number;
    /**
     * @zh 折扣的精度，未配置折扣精度时，折扣精度跟随总价精度
     * @defaultValue 2
     */
    discountPrecision?: number;
    /**
     * @zh 计费明细 用于hover明细后的展示数据
     */
    detailList?: DataTypeItem[];
    /**
     * @zh 计费明细列配置，表格展示计费明细时的column配置
     * */
    columns?: AllowEmpty<ColumnConfig<DataTypeItem>>[];
    /**
     * @zh 表格属性透传
     */
    cTableProps?: TableProps<DataTypeItem>;
    /**
     * @zh 计费明细的标题
     * @defaultValue 费用明细
     */
    detailTitle?: ReactNode;
    /**
     * @zh 计费明细的描述
     * @defaultValue 以下为参考价格，具体收费情况请以账单为准
     */
    detailDesc?: ReactNode;
    /**
     * @zh 是否展示小问号
     * @defaultValue true
     */
    showPopover?: boolean;
    /**
     * @zh popover属性透传
     *
     * title属性可以覆盖明细的标题和描述信息；content属性可以覆盖明细的表格
     */
    popoverProps?: PopoverProps;
}
/**
 * @title NumConfig
 * 数量配置
 */
export interface NumConfig {
    /**
     * @zh 是否展示数量组件
     * @defaultValue false
     */
    showNum?: boolean;
    /**
     * @zh 数量组件的标题
     * @defaultValue 数量
     */
    numLabel?: ReactNode;
    /**
     * @zh 初始数量
     * @defaultValue 1
     */
    initialNum?: number;
    /**
     * @zh 最大值
     * @defaultValue Infinity
     */
    maxNum?: number;
    /**
     * @zh 最小值
     * @defaultValue 1
     */
    minNum?: number;
    /**
     * @zh 单位
     */
    numUnit?: string;
}
export type ValueType = {
    num: number;
    duration: number;
};
export type MergedNumConfig = Required<NumConfig> & {
    /**
     * @zh 当前数量
     * @defaultValue 1
     */
    num: number;
};
/**
 * @title DurationConfig
 * 时长配置
 */
export interface DurationConfig {
    /**
     * @zh 是否展示时长选择
     * @defaultValue false
     */
    showDuration?: boolean;
    /**
     * @zh 初始值
     * @defaultValue 1
     */
    initialDuration?: number;
    /**
     * @zh 时长组件的标题
     * @defaultValue 时长
     */
    durationLabel?: string;
    /**
     * @zh 下拉框可选值
     */
    durationOptions?: {
        label: string;
        value: number;
    }[];
}
export type MergedDurationConfig = Required<DurationConfig> & {
    /**
     * @zh 当前时长
     * @defaultValue 1
     */
    duration: number;
};
/**
 * @zh HandleData函数入参
 */
export interface HandleDataParams {
    numConfig: MergedNumConfig;
    durationConfig: MergedDurationConfig;
    formValues: Record<string, any>;
}
/**
 * @zh HandleData函数返回值
 */
export type HandleDataRes = PriceInfo[];
/**
 * @zh PriceNode
 */
export interface PriceNode {
    /**
     * @zh 标题节点
     */
    title: JSX.Element | null;
    /**
     * @zh 价格节点
     */
    price: JSX.Element;
    /**
     * @zh 折扣节点
     */
    discount: JSX.Element | null;
    /**
     * @zh 描述信息
     */
    description: JSX.Element | null;
    /**
     * @zh 自定义价格节点
     */
    customRenderPriceNode?: PriceInfo['customRenderPriceNode'];
}
/**
 * @title useCFeeCalculator 参数
 * @zh hook参数
 */
export type CFeeCalculatorHooksProps = CFeeCalculatorProps;
export type GetPriceRes = {
    /**
     * @zh 原价
     */
    totalPrice: string;
    /**
     * @zh 折扣
     */
    discountPrice?: string;
    /**
     * @zh 是否是退费
     */
    isRefund: boolean;
    /**
     * @zh 未传入total或价格计算为NaN
     */
    isValid: boolean;
};
