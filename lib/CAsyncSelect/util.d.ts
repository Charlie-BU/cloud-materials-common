import type { ReactNode } from 'react';
import type { DataSource, SelectOption, Option } from './interface';
import type { OptionInfo } from '@arco-design/web-react/es/Select/interface';
import type { CLocale } from '../locales/default';
export declare const loadingSpin: (loading: boolean) => JSX.Element;
export declare const defaultRenderTag: (selectedOptions: OptionInfo | OptionInfo[], tagProps: {
    label: {
        'select-tagLabel': string;
        'select-description'?: string;
    };
    value: string;
    onClose: (event: any) => void;
}, cssPrefix: any, index: number, showMaxTagToolTip: boolean, locale: CLocale, maxTagCount?: number | "responsive" | {
    count: number | 'responsive';
    render?: ((invisibleTagCount: number) => ReactNode) | undefined;
} | undefined, prefixCls?: string) => JSX.Element;
/**
 * 渲染Option的方法
 */
export declare const renderOptions: (data: DataSource | undefined, cssPrefix: any, locale: CLocale, optionMode?: 'singleRow' | 'doubleRow' | 'customize', enableCopy?: boolean) => (string | number | {
    label: ReactNode;
    value: string | number;
    disabled: boolean | undefined;
    extra: {
        'select-tagLabel': ReactNode;
        'select-description': ReactNode;
    };
    disabledTooltipContent?: ReactNode;
    description?: ReactNode;
})[];
/**
 * 获得第一个可选的option，直接返回用户配置的选项
 */
export declare const getAutoLoadFirstValue: (options: Option[], mode?: string) => string | number | SelectOption | Option[] | undefined;
/**
 * 合并两个 option 列表, 重复的 option 保留一个
 */
export declare const mergeOptions: (initial: Option[], cur: Option[]) => Option[];
