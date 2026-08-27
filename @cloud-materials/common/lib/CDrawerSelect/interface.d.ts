import type { ReactNode } from 'react';
import type { SelectProps } from '@arco-design/web-react';
import type { CDrawerProps } from '../CDrawer/interface';
import type { CTableSelectProps } from '../CForm/react/Components/TableSelect/interface';
import type { R, ToolbarItemGroup } from '../CTable';
export declare enum Type {
    radio = "radio",
    checkbox = "checkbox"
}
/**
 * @title CDrawerSelectProps
 */
export interface CDrawerSelectProps<T extends R = any> extends Omit<CDrawerTableSelectProps<T>, 'type'> {
    /** Arco Select组件属性 */
    arcoSelectProps?: Omit<SelectProps, 'popupVisible' | 'suffixIcon' | 'onClick' | 'mode'>;
    /** Select选择模式 */
    mode?: SelectProps['mode'];
    /** 自定义渲染基础组件 */
    customRender?: ({ close, open }: {
        close: () => void;
        open: () => void;
    }) => ReactNode;
    /**
     * @description 组件值，非受控模式
     */
    value?: T | T[];
    /** 每次选择时(如组件内部TableSelect点击选择时)都会触发 */
    onChange?: (value?: T | T[]) => void;
    /**
     * @description 组件受控值, 配合onValueChange使用; 历史遗留: 把value 用作非受控配置的值，为兼容不同版本的使用，新增加一个controlledValue 配置，作为组件受控值
     */
    controlledValue?: T | T[];
    /**
     * @description 组件值变更时触发
     */
    onValueChange?: (value?: T | T[]) => void;
}
export interface CDrawerTableSelectProps<T extends R = any> extends CDrawerProps, Pick<CTableSelectProps, 'type' | 'columns' | 'fetcher' | 'data' | 'rowKey' | 'value' | 'onChange' | 'afterSelectRow'> {
    /**
     * @default false
     * @description 是否展示刷新按钮
     * */
    showRefreshIcon?: boolean;
    /** 配置搜索 */
    searchConfig?: ToolbarItemGroup<T>;
    /** 信息说明 */
    customTip?: ((value: T | T[]) => ReactNode) | ReactNode;
    /**
     * 单选模式下是否展示默认footer
     * @default false
     */
    showDefaultFooter?: boolean;
    /**
     * @default 0
     * @de 可选择的最小数量
     */
    min?: number;
    /**
     * @default Number.MAX_SAFE_INTEGER
     * @description 可选择的最大数量
     */
    max?: number;
    /**
     * @default 最多选择{max}个/最少选择{min}个
     * @description 自定义展示错误提示信息
     */
    customErrorMessage?: string | ((value: T) => string);
    /** 其他tableSelect属性 */
    tableSelectProps?: Partial<CTableSelectProps<T>>;
    /**
     * @description 组件禁止态
     */
    disabled?: boolean;
}
