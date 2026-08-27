import React from 'react';
import type { CSearchComponentProps } from '../interface';
export declare const components: {
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
};
export type CSearchComponentEnum = typeof components;
export type CSearchComponentType = keyof CSearchComponentEnum;
declare const SearchComponent: ({ content, commonProps }: CSearchComponentProps) => JSX.Element;
export default SearchComponent;
