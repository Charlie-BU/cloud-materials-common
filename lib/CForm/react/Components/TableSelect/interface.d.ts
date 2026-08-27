/// <reference types="react" />
import type { RowSelectionProps } from '@arco-design/web-react/es/Table';
import type { R, TableConfig, TableProps, onRowSelect } from '../../../../CTable';
import type { FilterSearch } from './Search';
import type { DefineBuiltInBasicType } from '../../../../_factory/builtInComponent';
import type { SelectProps } from '@arco-design/web-react';
import type { GroupOption } from '../../../../CRadio/interface';
export type DisabledType = boolean | 'row';
export type TableSelectData<T = any> = T & {
    disabled?: DisabledType;
};
export type FilterSearchProps = React.ComponentProps<typeof FilterSearch>;
declare const enhancedComponentsMap: {
    CRadio: (props: import("react").PropsWithChildren<import("../../../../CRadio/interface").CRadioGroupProps>) => JSX.Element;
    Input: (props: import("@arco-design/web-react").InputProps) => JSX.Element;
    InputNumber: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & import("react").RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
    Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
        Option: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & import("react").RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & import("react").RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
    DatePicker: import("@arco-design/web-react/es/DatePicker/interface").DatePickerDecorator;
    RangePicker: import("react").ForwardRefExoticComponent<import("@arco-design/web-react/es/DatePicker/interface").BaseRangePickerProps & import("@arco-design/web-react/es/_util/type").Omit<import("@arco-design/web-react/es/DatePicker/interface").PickerProps, "onChange" | "onSelect" | "onOk" | "defaultPickerValue" | "pickerValue" | "onPickerValueChange" | "inputProps"> & import("react").RefAttributes<import("@arco-design/web-react/es/DatePicker/interface").RangePickerHandle>>;
    AutoComplete: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").AutoCompleteProps & import("react").RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>> & {
        Option: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & import("react").RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & import("react").RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
};
export type TableSelectFilterProps = Omit<FilterSearchProps, 'content'> & DefineBuiltInBasicType<typeof enhancedComponentsMap>;
export type TableSelectFilterOptions = TableSelectFilterProps & {
    name?: string;
    visible?: boolean;
};
export type AllValueOption = boolean | Partial<Required<SelectProps>['options'][number]> | Partial<GroupOption>;
export interface CTableSelectProps<T extends R = any> extends Omit<TableConfig<T>, 'data' | 'rowKey'> {
    /** 指定key */
    rowKey: Required<TableConfig<T>>['rowKey'];
    /** 选择类型 单选/多选 */
    type?: 'radio' | 'checkbox';
    /** 筛选的数据 */
    data?: TableSelectData<T>[];
    /** 筛选的配置 */
    filterOptions?: TableSelectFilterOptions[];
    /** 自定义展示选择框的展示样式 */
    renderSelectCell?: RowSelectionProps['renderCell'];
    /** table除config的其它属性 */
    tableProps?: Omit<TableProps<T>, 'config'>;
    /** 展示【全部】选项，默认值false (只在CRadio和Select组件中支持)*/
    allValueOption?: AllValueOption;
    /** 选择数据后的回调 */
    afterSelectRow?: (options: Parameters<Parameters<typeof onRowSelect>[0]>[0], value: T) => void;
    /** table的loading 态 */
    loading?: boolean;
    /** 全局禁止选择态 */
    disabled?: boolean;
    onChange?: (value: T | T[]) => void;
    value?: T | T[];
}
export {};
