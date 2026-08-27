import React from 'react';
import type { TableSelectFilterProps } from './interface';
export declare const FilterSearch: import("../../../../_factory/builtInComponent/interface").BuiltInType<{
    (props: import("../../../..").CSimpleSearchProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    displayName: string;
}, Omit<{
    Input: (props: import("@arco-design/web-react").InputProps) => JSX.Element;
    InputNumber: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
    Select: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectProps & React.RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
        Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
    DatePicker: import("@arco-design/web-react/es/DatePicker/interface").DatePickerDecorator;
    RangePicker: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/DatePicker/interface").BaseRangePickerProps & import("@arco-design/web-react/es/_util/type").Omit<import("@arco-design/web-react/es/DatePicker/interface").PickerProps, "onChange" | "onSelect" | "onOk" | "defaultPickerValue" | "pickerValue" | "onPickerValueChange" | "inputProps"> & React.RefAttributes<import("@arco-design/web-react/es/DatePicker/interface").RangePickerHandle>>;
    AutoComplete: React.ForwardRefExoticComponent<import("@arco-design/web-react").AutoCompleteProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>> & {
        Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
}, "CRadio"> & {
    CRadio: (props: React.PropsWithChildren<import("../../../..").CRadioGroupProps>) => JSX.Element;
}>;
declare const TableSelectFilter: {
    (props: TableSelectFilterProps): JSX.Element;
    displayName: string;
};
export default TableSelectFilter;
