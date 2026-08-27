import type { ReactElement } from 'react';
import React from 'react';
import type { CSimpleSearchProps } from './interface';
import type { AutoCompleteProps, InputProps, SelectProps } from '@arco-design/web-react';
declare const CSimpleSearch: import("../_factory/builtInComponent/interface").BuiltInType<{
    (props: CSimpleSearchProps): ReactElement;
    displayName: string;
}, {
    Input: (props: InputProps) => JSX.Element;
    InputNumber: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
    Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
        Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
    DatePicker: import("@arco-design/web-react/es/DatePicker/interface").DatePickerDecorator;
    RangePicker: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/DatePicker/interface").BaseRangePickerProps & import("@arco-design/web-react/es/_util/type").Omit<import("@arco-design/web-react/es/DatePicker/interface").PickerProps, "onChange" | "onSelect" | "onOk" | "defaultPickerValue" | "pickerValue" | "onPickerValueChange" | "inputProps"> & React.RefAttributes<import("@arco-design/web-react/es/DatePicker/interface").RangePickerHandle>>;
    AutoComplete: React.ForwardRefExoticComponent<AutoCompleteProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>> & {
        Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
}>;
export default CSimpleSearch;
