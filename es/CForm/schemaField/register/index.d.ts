/// <reference types="react" />
declare const SchemaField: {
    <Decorator extends import("@formily/react").JSXComponent, Component extends import("@formily/react").JSXComponent>(props: import("@formily/react").ISchemaFieldProps<Decorator, Component, import("@formily/core").ObjectField<Decorator, Component>>): JSX.Element;
    displayName: string;
    Markup: {
        <Decorator_1 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_1 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaMarkupFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_1, Decorator_1>): JSX.Element;
        displayName: string;
    };
    String: {
        <Decorator_2 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_2 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaTypeFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_2, Decorator_2>): JSX.Element;
        displayName: string;
    };
    Object: {
        <Decorator_3 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_3 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaTypeFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_3, Decorator_3>): JSX.Element;
        displayName: string;
    };
    Array: {
        <Decorator_4 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_4 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaTypeFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_4, Decorator_4>): JSX.Element;
        displayName: string;
    };
    Boolean: {
        <Decorator_5 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_5 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaTypeFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_5, Decorator_5>): JSX.Element;
        displayName: string;
    };
    Date: {
        <Decorator_6 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_6 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaTypeFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_6, Decorator_6>): JSX.Element;
        displayName: string;
    };
    DateTime: {
        <Decorator_7 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_7 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaTypeFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_7, Decorator_7>): JSX.Element;
        displayName: string;
    };
    Void: {
        <Decorator_8 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_8 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaTypeFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_8, Decorator_8>): JSX.Element;
        displayName: string;
    };
    Number: {
        <Decorator_9 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof", Component_9 extends "Select" | "Cascader" | "Checkbox" | "DatePicker" | "Input" | "InputNumber" | "Space" | "Switch" | "TimePicker" | "TreeSelect" | "Upload" | "TextArea" | "InputSearch" | "Password" | "FormItem" | "Section" | "DynamicFieldDecorator" | "CRadio" | "CCheckbox" | "ConfigPreview" | "Text" | "CheckboxGroup" | "WeekPicker" | "MonthPicker" | "YearPicker" | "QuarterPicker" | "RangePicker" | "FeeCalculator" | "Agreement" | "CAgreement" | "CAsyncSelect" | "TimeRangePicker" | "ArrayTable" | "ArrayTableColumn" | "ArraySortHandle" | "ArrayTableAddition" | "ArrayIndex" | "ArrayMoveDown" | "ArrayMoveUp" | "ArrayTableRemove" | "ArrayItems" | "ArrayItemsRemove" | "ArrayItemsAddition" | "Group" | "CTableSelect" | "PreSelectedTable" | "CDrawerSelect" | "CTableTransfer" | "CFormAsyncSelect" | "Input.TextArea" | "TimePicker.RangePicker" | "Select.$$typeof" | "Cascader.$$typeof" | "Checkbox.Group" | "DatePicker.WeekPicker" | "DatePicker.MonthPicker" | "DatePicker.YearPicker" | "DatePicker.QuarterPicker" | "DatePicker.RangePicker" | "Input.Search" | "Input.Password" | "Input.Group" | "InputNumber.$$typeof" | "Switch.$$typeof" | "TreeSelect.$$typeof" | "Upload.$$typeof" | "FormItem.BaseItem" | "Section.$$typeof" | "DynamicFieldDecorator.type" | "DynamicFieldDecorator.$$typeof" | "CCheckbox.$$typeof" | "Text.$$typeof" | "CAsyncSelect.type" | "CAsyncSelect.$$typeof" | "ArrayTable.type" | "ArrayTable.$$typeof" | "ArrayTableRemove.type" | "ArrayTableRemove.$$typeof" | "ArrayItems.type" | "ArrayItems.$$typeof" | "ArrayItemsRemove.type" | "ArrayItemsRemove.$$typeof" | "Group.$$typeof" | "CTableSelect.$$typeof" | "PreSelectedTable.$$typeof" | "CDrawerSelect.$$typeof" | "CTableTransfer.type" | "CTableTransfer.$$typeof" | "CFormAsyncSelect.$$typeof">(props: import("@formily/react").ISchemaTypeFieldProps<{
            ArrayItems: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@storage-fe/formily-arco/es/ArrayItems").IArrayItemsComponentProps>>;
            ArrayTable: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("@arco-design/web-react").TableProps<any>>>;
            Input: import("react").FC<import("@arco-design/web-react").InputProps> & {
                TextArea?: import("react").FC<import("@arco-design/web-react").TextAreaProps> | undefined;
                Group?: import("react").FC<import("@arco-design/web-react/es/Input/interface").InputGroupProps> | undefined;
                Password?: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps> | undefined;
                Search?: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps> | undefined;
            };
            TextArea: import("react").FC<import("@arco-design/web-react").TextAreaProps>;
            InputSearch: import("react").FC<import("@arco-design/web-react/es/Input").InputSearchProps>;
            Password: import("react").FC<import("@arco-design/web-react/es/Input").InputPasswordProps>;
            FormItem: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> & {
                BaseItem?: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/FormItem/interface").IFormItemProps>> | undefined;
            };
            InputNumber: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").InputNumberProps> & import("react").RefAttributes<unknown>>;
            Section: import("react").ForwardRefExoticComponent<Partial<Omit<import("react").HTMLAttributes<HTMLDivElement>, "title"> & import("../../react/Components/Decorators/Section").SectionProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            DynamicFieldDecorator: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../../react/Components/Decorators/DynamicFieldDecorator").DynamicFieldDecoratorProps<import("../..").CFieldConfig<any, any, import("../..").DefaultBuiltInComponentMapType>>, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").RefAttributes<any> | undefined;
            }>>;
            CRadio: import("react").FC<import("../../..").CRadioGroupProps>;
            CCheckbox: import("react").ForwardRefExoticComponent<Partial<import("../../..").CCheckboxGroupProps<import("react").ReactText> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Switch: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>>, "ref"> & import("react").RefAttributes<unknown>>;
            Space: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react").SpaceProps>>;
            ConfigPreview: import("react").FC<import("../..").ConfigPreviewComponentProps>;
            Select: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Text: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLSpanElement> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            Cascader: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").CascaderProps<any> & import("react").RefAttributes<import("@arco-design/web-react/es/_class/select-view").SelectViewHandle>>, "ref"> & import("react").RefAttributes<unknown>>;
            Checkbox: import("react").FC<import("@arco-design/web-react").CheckboxProps<any>> & {
                Group?: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>> | undefined;
            };
            CheckboxGroup: import("react").FC<import("@arco-design/web-react").CheckboxGroupProps<string | number>>;
            DatePicker: import("react").FC<import("@arco-design/web-react").DatePickerProps> & {
                WeekPicker?: import("react").FC<import("@arco-design/web-react").WeekPickerProps> | undefined;
                MonthPicker?: import("react").FC<import("@arco-design/web-react").MonthPickerProps> | undefined;
                YearPicker?: import("react").FC<import("@arco-design/web-react").YearPickerProps> | undefined;
                QuarterPicker?: import("react").FC<import("@arco-design/web-react").QuarterPickerProps> | undefined;
                RangePicker?: import("react").FC<import("@arco-design/web-react").RangePickerProps> | undefined;
            };
            WeekPicker: import("react").FC<import("@arco-design/web-react").WeekPickerProps>;
            MonthPicker: import("react").FC<import("@arco-design/web-react").MonthPickerProps>;
            YearPicker: import("react").FC<import("@arco-design/web-react").YearPickerProps>;
            QuarterPicker: import("react").FC<import("@arco-design/web-react").QuarterPickerProps>;
            RangePicker: import("react").FC<import("@arco-design/web-react").RangePickerProps>;
            TreeSelect: import("react").ForwardRefExoticComponent<Omit<Partial<import("@arco-design/web-react").TreeSelectProps & {
                children?: import("react").ReactNode;
            } & import("react").RefAttributes<import("@arco-design/web-react/es/TreeSelect").RefTreeSelectType>>, "ref"> & import("react").RefAttributes<unknown>>;
            FeeCalculator: import("react").FC<import("../..").FeeCalculatorProps>;
            Agreement: import("react").FC<import("../../..").CAgreementProps>;
            CAgreement: import("react").FC<import("../../..").CAgreementProps>;
            CAsyncSelect: import("react").MemoExoticComponent<import("@formily/react").ReactFC<Omit<import("../..").CAsyncSelectFormProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../../CAsyncSelect/interface").CAsyncSelectModel> | undefined;
            }>>;
            TimePicker: import("react").FC<import("@arco-design/web-react").TimePickerProps> & {
                RangePicker?: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps> | undefined;
            };
            TimeRangePicker: import("react").FC<import("@arco-design/web-react").TimeRangePickerProps>;
            Upload: import("react").ForwardRefExoticComponent<Partial<import("@arco-design/web-react").UploadProps> & import("react").RefAttributes<unknown>>;
            ArrayTableColumn: import("react").FC<import("react").PropsWithChildren<import("@storage-fe/formily-arco/es/ArrayTable/interface").TableColumnProps>>;
            ArraySortHandle: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
                iconNode?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
            }>>;
            ArrayTableAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            ArrayIndex: import("react").FC<{}>;
            ArrayMoveDown: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayMoveUp: import("react").FC<import("react").PropsWithChildren<import("@arco-design/web-react/icon").IconProps & {
                index?: number | undefined;
            }>>;
            ArrayTableRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsRemove: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/ArrayRemove").default>>;
            ArrayItemsAddition: import("react").FC<import("../../react/Components/ArrayButtons/ArrayBaseAddition").CArrayBaseAddition>;
            Group: import("react").ForwardRefExoticComponent<Partial<import("react").HTMLAttributes<HTMLDivElement> & import("../../react/Components/Decorators/Group").GroupProps & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableSelect: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/TableSelect/interface").CTableSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            PreSelectedTable: import("react").ForwardRefExoticComponent<Partial<import("../../react/Components/PreSelectedTable").PreSelectedTableProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CDrawerSelect: import("react").ForwardRefExoticComponent<Partial<import("../../..").CDrawerSelectProps<any> & {
                children?: import("react").ReactNode;
            }> & import("react").RefAttributes<unknown>>;
            CTableTransfer: import("react").MemoExoticComponent<import("@formily/react").ReactFC<import("../../react/Components/CTableTransfer").ICFormTableTransfer>>;
            CFormAsyncSelect: import("react").ForwardRefExoticComponent<Pick<Partial<Omit<{
                children?: import("react").ReactNode;
            }, "ref" | keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & Omit<import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps & import("../../react/Components/RectiveWithCForm").ReactiveHocParams & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            }, "depValues" | "dataDepValues"> & import("../../react/Components/RectiveWithCForm").ReactiveHocProps & {
                ref?: import("react").MutableRefObject<import("../../react/Components/CFormAsyncSelect/interface").CFormAsyncSelectModel> | undefined;
            } & {
                children?: import("react").ReactNode;
            }>, keyof import("../../react/Components/RectiveWithCForm").ReactiveHocProps | keyof import("../../react/Components/CFormAsyncSelect/AsyncSelectReactive").CFormAsyncSelectReactiveInnerProps> & import("react").RefAttributes<unknown>>;
        }, Component_9, Decorator_9>): JSX.Element;
        displayName: string;
    };
};
export default SchemaField;
