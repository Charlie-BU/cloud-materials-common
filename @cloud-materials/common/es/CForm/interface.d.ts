import type { CSSProperties, ReactNode } from 'react';
import type { Form, IFormProps, IFieldProps, IVoidFieldProps, Field, VoidField, FieldDisplayTypes, FieldPatternTypes, ObjectField, ArrayField, FieldDataSource, FormPathPattern } from '@formily/core';
import type { ValidatorFunctionResponse, IValidatorRules, ValidatorFormats, IRegistryFormats, IRegistryLocales, registerValidateMessageTemplateEngine } from '@formily/validator';
import type { IFormLayoutProps } from '@storage-fe/formily-arco/es/FormLayout';
import type { FormStepDecoratorProps, IFormStep } from '@storage-fe/formily-arco/es/FormStep';
import type { ButtonProps, AlertProps, StepsProps, StepProps } from '@arco-design/web-react';
import type { ComponentMapToUnionType, DefineComponentPropsMapType } from '../_factory/builtInComponent';
import type { Helper } from './helper';
import type { Input, InputNumber, Switch, ArrayTable, Space, Select, Cascader, Checkbox, DatePicker, TreeSelect, TimePicker, Upload, FormItem } from '@storage-fe/formily-arco';
import type { CFormSection } from './react/Components/Decorators/Section';
import type DynamicFieldDecorator from './react/Components/Decorators/DynamicFieldDecorator';
import type CRadio from './react/Components/CRadio';
import type CCheckbox from './react/Components/CCheckbox';
import type ConfigPreview from './react/Components/ConfigPreview';
import type FeeCalculator from './react/Components/FeeCalculator';
import type CAsyncSelect from './react/Components/CAsyncSelect';
import type CAgreement from './react/Components/CAgreement';
import type { JSXTable } from '@storage-fe/formily-arco/es/ArrayTable';
import type { JSXItems } from '@storage-fe/formily-arco/es/ArrayItems';
import type Text from './react/Components/Text';
import type ArrayTableAddition from './react/Components/ArrayButtons/ArrayTableAddition';
import type CArrayRemove from './react/Components/ArrayRemove';
import type ArrayBase from '@storage-fe/formily-arco/es/ArrayBase';
import type ArrayItemsAddition from './react/Components/ArrayButtons/ArrayItemsAddition';
import type CGroup from './react/Components/Decorators/Group';
import type CTableSelect from './react/Components/TableSelect';
import type { ItemProps } from '../CInfoSection/interface';
import type { ColumnConfig, TableConfig } from '../CTable';
import type { CLoadingV2Props } from '../CLoadingV2/interface';
import type PreSelectedTable from './react/Components/PreSelectedTable';
import type { CAgreementProps } from '../CAgreement/interface';
import type { ISchemaFieldProps } from '@formily/react';
import type { CFormDrawerSelect } from './react/Components/CDrawerSelect';
import type CFormTableTransfer from './react/Components/CTableTransfer';
import type CFormAsyncSelectReactive from './react/Components/CFormAsyncSelect/AsyncSelectReactive';
export * from '@storage-fe/formily-arco/es/FormStep/types';
export type CFormStep = Omit<IFormStep, 'form'> & {
    form: CForm;
};
type ExcludeUndefined<T> = Exclude<T, undefined>;
/**
 * 默认的`CForm`内置组件map
 */
export type DefaultBuiltInComponentMapType = {
    Input: typeof Input;
    TextArea: ExcludeUndefined<typeof Input.TextArea>;
    InputSearch: ExcludeUndefined<typeof Input.Search>;
    Password: ExcludeUndefined<typeof Input.Password>;
    FormItem: typeof FormItem;
    InputNumber: typeof InputNumber;
    Section: typeof CFormSection;
    DynamicFieldDecorator: typeof DynamicFieldDecorator;
    CRadio: typeof CRadio;
    CCheckbox: typeof CCheckbox;
    Switch: typeof Switch;
    Space: typeof Space;
    ConfigPreview: typeof ConfigPreview;
    Select: typeof Select;
    Text: typeof Text;
    Cascader: typeof Cascader;
    Checkbox: typeof Checkbox;
    CheckboxGroup: ExcludeUndefined<typeof Checkbox.Group>;
    DatePicker: typeof DatePicker;
    WeekPicker: ExcludeUndefined<typeof DatePicker.WeekPicker>;
    MonthPicker: ExcludeUndefined<typeof DatePicker.MonthPicker>;
    YearPicker: ExcludeUndefined<typeof DatePicker.YearPicker>;
    QuarterPicker: ExcludeUndefined<typeof DatePicker.QuarterPicker>;
    RangePicker: ExcludeUndefined<typeof DatePicker.RangePicker>;
    TreeSelect: typeof TreeSelect;
    FeeCalculator: typeof FeeCalculator;
    Agreement: typeof CAgreement;
    CAgreement: typeof CAgreement;
    CAsyncSelect: typeof CAsyncSelect;
    TimePicker: typeof TimePicker;
    TimeRangePicker: ExcludeUndefined<typeof TimePicker.RangePicker>;
    Upload: typeof Upload;
    ArrayTable: typeof JSXTable;
    ArrayTableColumn: ExcludeUndefined<typeof ArrayTable.Column>;
    ArraySortHandle: ExcludeUndefined<typeof ArrayBase.SortHandle>;
    ArrayTableAddition: typeof ArrayTableAddition;
    ArrayIndex: ExcludeUndefined<typeof ArrayBase.Index>;
    ArrayMoveDown: ExcludeUndefined<typeof ArrayBase.MoveDown>;
    ArrayMoveUp: ExcludeUndefined<typeof ArrayBase.MoveUp>;
    ArrayTableRemove: typeof CArrayRemove;
    ArrayItems: typeof JSXItems;
    ArrayItemsRemove: typeof CArrayRemove;
    ArrayItemsAddition: typeof ArrayItemsAddition;
    Group: typeof CGroup;
    CTableSelect: typeof CTableSelect;
    PreSelectedTable: typeof PreSelectedTable;
    CDrawerSelect: typeof CFormDrawerSelect;
    CTableTransfer: typeof CFormTableTransfer;
    CFormAsyncSelect: typeof CFormAsyncSelectReactive;
};
export type DefaultComponentMapStringUnion = keyof DefaultBuiltInComponentMapType;
/** 工具类型，联合类型转交叉类型 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
/** defineField 函数类型 */
export interface DefineField<C extends PureComponentsMap = DefaultBuiltInComponentMapType> {
    <F extends ObjectType, D extends ObjectType, Field extends CFieldConfig<F, D, C>>(field: Field): Field extends {
        type: 'VoidField';
    } ? VoidFieldType : BasicFieldType;
    <F extends ObjectType, D extends ObjectType, Fields extends Partial<CFieldConfig<F, D, C>[]>, LastField extends Partial<CFieldConfig<F, D, C>>>(field: CFieldConfig, ...restField: [...Fields, (keyof CFieldConfig | (string & {}))[] | LastField]): UnionToIntersection<Fields[number] | LastField>;
}
export interface DefinePartialField<C extends PureComponentsMap = DefaultBuiltInComponentMapType> {
    <F extends ObjectType = ObjectType, D extends ObjectType = ObjectType, Field extends Partial<CFieldConfig<F, D, C>> = Partial<CFieldConfig<F, D, C>>>(field: Field): Partial<Field extends {
        type: 'VoidField';
    } ? VoidFieldType : BasicFieldType>;
}
/**
 * @title
 * CForm表单组件类型定义：FormType
 *
 * @description
 * 无论是普通表单，还是步骤表单，都通过该组件渲染。
 *
 * `CForm`组件类型上定义了多个静态方法，如`CForm.defineComponentOption`方法，通过这些静态方法来配置表单可以获得最大化的类型检查和智能提示。
 */
export interface FormType<C extends PureComponentsMap = DefaultBuiltInComponentMapType, DecoratorType extends React.JSXElementConstructor<FormStepDecoratorProps> = React.JSXElementConstructor<DefaultCFormDecoratorProps>> {
    /**
     * @zh 组件构造器定义
     */
    <FormData extends ObjectType = any, GlobalData extends ObjectType = any>(props: CFormProps<FormData, GlobalData, C, DecoratorType>): React.ReactElement | null;
    /**
     * 对应到 CField 组件
     */
    Field: <FormData extends ObjectType = any, GlobalData extends ObjectType = any>(props: CFieldConfig<FormData, GlobalData, C>) => React.ReactElement | null;
    /**
     * @zh 注册配置。
     * 调用该静态方法后会返回一个新的定制化的CForm组件。
     */
    registerConfig: <M extends PureComponentsMap>(componentsMap: M, options?: CFormRegisterConfigOptions<Omit<C, keyof M> & M>) => FormType<Omit<C, keyof M> & M>;
    /**
     * @zh 声明一个组件的配置。当使用该静态方法来声明组件的配置时，可以获得该组件的props类型检查和智能提示。
     * 该方法的第一个参数表示组件类型，可以是字符串表示的内置组件或用户自定义组件；
     * 该方法的第二个参数接收的是组件的props或一个返回props的函数。
     */
    defineComponentOption: <Component extends keyof C | React.JSXElementConstructor<any>, P extends Component extends keyof C ? C[Component] : Component extends React.JSXElementConstructor<any> ? Component : never>(component: Component, props?: React.ComponentProps<P> | ((form: CForm, parentField: CGeneralField) => React.ComponentProps<P>)) => {
        component: Component;
        props?: typeof props;
    };
    /**
     * @zh 声明一个装饰器的配置。
     * 该静态方法的用法和defineComponentOption方法的用法一致。
     */
    defineDecoratorOptions: FormType<C>['defineComponentOption'];
    /**
     * ```ts
     * // 声明单个字段进行类型校验和提示
     * CForm.defineField({
     *   name: 'foo',
     *   title: 'Foo',
     *   rules: []
     * })
     * // 对多个 field 进行合并
     * CForm.defineField(field, field)
     * // 对部分字段深合并
     * CForm.defineField(field, field, ['componentOptions'])
     * ```
     * @zh 声明一个字段的配置。
     */
    defineField: DefineField<C>;
    /**
     * @zh 无必选内容的Field，
     */
    definePartialField: DefinePartialField<C>;
    /**
     * @zh 声明多个字段的配置。
     */
    defineFields: <F extends ObjectType = ObjectType, D extends ObjectType = ObjectType>(fields: CFieldConfig<F, D, C>[]) => typeof fields;
    /**
     * @zh 声明一个普通表单的配置
     */
    defineConfig: <F extends ObjectType = ObjectType, D extends ObjectType = ObjectType>(config: CFormConfig<F, D, C>) => typeof config;
    /**
     * @zh 声明一个步骤表单的配置
     * */
    defineStepConfig: <F extends ObjectType = ObjectType, D extends ObjectType = ObjectType>(config: CFormStepConfig<F, D, C>) => typeof config;
    /**
     * @zh 注册全局内置的格式校验
     */
    registerValidateFormats: (formats: IRegistryFormats) => void;
    /**
     * 注册全局自定义的校验错误文案
     * @param formats 格式
     * @returns void
     */
    registerValidateLocale: (lang: string, locale: IRegistryLocales) => void;
    /**
     * 注册确认页方法
     * @param confirmConfig 确认页参数
     * @returns CFormStepUnitConfig
     */
    defineConfirmConfig: <T extends ObjectType = any>(confirmConfig: CFormConfirmDetail<T>) => CFormStepUnitConfig;
    /**
     * 注册全局的自定义校验模板
     * @param
     */
    registerValidateMessageTemplateEngine: typeof registerValidateMessageTemplateEngine;
}
/**
 * @title CForm组件props类型定义：CFormProps
 * @description
 * 在配置普通表单时需要传入`config`属性；在配置步骤表单时需要传入`stepConfig`属性。
 */
export interface CFormProps<T extends ObjectType = any, D extends ObjectType = any, ComponentMap extends PureComponentsMap = DefaultBuiltInComponentMapType, DecoratorType extends React.JSXElementConstructor<FormStepDecoratorProps> = React.JSXElementConstructor<FormStepDecoratorProps>> {
    /**
     * @zh 外部传入的 form
     * 当传入 form 后，config 中的 initConfig & effects 将失效
     */
    form?: CForm<T, D>;
    /**
     * @zh 配置普通表单。普通表单的具体配置参考CFormConfig定义
     */
    config?: CFormConfig<T, D, ComponentMap>;
    /**
     * @zh 配置步骤表单。步骤表单的具体配置参考CFormConfig定义
     */
    stepConfig?: CFormStepConfig<T, D, ComponentMap>;
    /**
     * @zh 装饰器，通过该属性可传入自定义装饰器
     */
    decorator?: [DecoratorType, React.ComponentProps<DecoratorType>?];
    /**
     * @zh 默认装饰器支持的属性，如果通过decorator属性自定义了装饰器，该属性无效
     */
    defaultDecoratorProps?: DefaultCFormDecoratorProps;
    style?: CSSProperties;
    className?: string | string[];
    children?: ReactNode;
    /**
     * @zh ref属性
     */
    ref?: React.Ref<CForm<T, D> | void>;
    /**
     * @zh CLoading Props透传
     */
    CLoadingProps?: CLoadingV2Props;
}
export type DefaultCFormProps<T extends ObjectType = any, D extends ObjectType = any> = CFormProps<T, D, DefaultBuiltInComponentMapType>;
export interface CFormBaseConfig<T extends ObjectType = any, D extends ObjectType = any> {
    /**
     * @zh 布局配置
     */
    formLayout?: IFormLayoutProps;
    /**
     * @zh 初始化配置。
     * 通过 initConfig 实现表单初始化前的配置的设置，如表单的全局数据、初始值、编辑态/非编辑态设置等等。
     */
    initConfig?: (() => Promise<CFormInstanceProps<T, D>> | CFormInstanceProps<T, D>) | CFormInstanceProps<T, D>;
    /**
     * @zh 副作用钩子配置。
     * 在副作用钩子可以实现表单的联动。
     */
    effects?: ((helper: Helper<T, D>, form: CForm<T, D>) => void) | ((helper: Helper<T, D>, form: CForm<T, D>) => void)[];
    /**
     * @zh 提交操作的回调。入参是表单收集的数据。
     */
    onSubmit?: (values: T, form: CForm<T, D>) => Promise<void> | void;
    /**
     * @zh 是否开启锚点
     * @default false
     * 默认锚点 1 级
     */
    anchor?: boolean | {
        isOn: boolean;
        exclude?: FormPathPattern[];
        level?: number;
    };
    /**
     * 开启编辑后退出表单二次确认
     * @default false
     * @title 自定义 title
     * @content 自顶替提示文案
     * @excludes 排除的字段
     * @customEqual 自定义的相等判断
     */
    unMountCFormSecondCheck?: boolean | {
        title?: string;
        content?: string;
        excludes?: string[];
        customEqual?: (form: CForm<T, D>) => boolean;
    };
    /**
     * @zh 标识form名称，对应form标签的name属性
     * @default 随机的唯一uid
     * 默认取formily的form实例id属性
     */
    name?: string;
}
/**
 * @title 配置普通表单：CFormConfig - 普通表单配置对象定义
 */
export interface CFormConfig<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> extends CFormBaseConfig<T, D> {
    /**
     * @zh 字段配置
     */
    fields?: CFieldConfig<T, D, ComponentsMap>[];
    /**
     * @zh header配置
     */
    header?: CFormHeader<T, D>;
    /**
     * @zh footer配置
     */
    footer?: CFormFooter<T, D>;
    /**
     * @zh top配置
     */
    top?: CFormTop<T, D>;
    /**
     * @zh residentContent 配置
     */
    residentContent?: CFormResidentContent<T, D>;
}
export type DefaultCFormConfig<T extends ObjectType = any, D extends ObjectType = any> = CFormConfig<T, D, DefaultBuiltInComponentMapType>;
/**
 * @title 配置步骤表单：CFormStepConfig - 步骤表单配置对象定义
 */
export interface CFormStepConfig<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = any> extends CFormBaseConfig<T, D> {
    /**
     * @zh 是否展示步骤条
     */
    showStep?: boolean;
    /**
     * @zh formStep 实例
     */
    formStep?: React.MutableRefObject<IFormStep | undefined>;
    /**
     * @zh 步骤配置
     */
    steps: CFormStepUnitConfig<T, D, ComponentsMap>[];
    /**
     * @zh header配置
     */
    header?: CFormStepHeader;
    /**
     * @zh footer配置
     */
    footer?: CFormStepFooter<T, D>;
    /**
     * @zh top配置
     */
    top?: CFormStepTop<T, D>;
    /**
     * @zh residentContent配置
     */
    residentContent?: CFormStepResidentContent<T, D>;
    /**
     * 步骤修改后的回调
     * @param current 当前的步骤
     * @param formStep fomStep 实例
     * @returns
     */
    onStepChange?: (current: number, formStep: CFormStep) => void;
    /**
     * @zh 跳转时 check，用于跳转步骤时 check 能否跳过去
     * true 可以跳转
     * false 不可跳转
     */
    beforeStepChange?: (formStep: CFormStep, targetStep: number) => Promise<boolean> | boolean;
}
export type DefaultCFormStepConfig<T extends ObjectType = any, D extends ObjectType = any> = CFormStepConfig<T, D, DefaultBuiltInComponentMapType>;
/**
 * @title 配置步骤表单：CFormStepUnitConfig - 步骤表单中的单步配置
 * @description
 * 步骤表单中的`steps`属性可以配置多个步骤，定义为`CFormStepUnitConfig<T, D, ComponentsMap>[]`
 *
 * `CFormStepUnitConfig`的定义如下：
 */
export interface CFormStepUnitConfig<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> {
    /**
     * @zh 步骤名称
     */
    name: string;
    /**
     * @zh 步骤的标题
     */
    title?: string;
    /**
     * @zh 单步骤属性，透传Arco Step的属性
     */
    arcoStepProps?: StepProps;
    /**
     * @zh 步骤中的包含的字段
     */
    fields?: CFieldConfig<T, D, ComponentsMap>[];
    /**
     * @zh 当前步骤是否开启锚点
     * @default false
     * 如果开启了全局的，值默认为全局配置
     * @exclude 排除要锚点的字段 name
     * @level 默认锚点 1 级
     */
    anchor?: boolean | {
        isOn: boolean;
        exclude?: FormPathPattern[];
        level?: number;
    };
}
export type DefaultCFormStepUnitConfig<T extends ObjectType = any, D extends ObjectType = any> = CFormStepUnitConfig<T, D, DefaultBuiltInComponentMapType>;
export type VoidFieldType<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> = {
    type: 'VoidField';
} & CVoidFieldProps<T, D, ComponentsMap>;
export type BasicFieldType<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> = {
    type?: 'Field' | 'ArrayField' | 'ObjectField';
} & CFieldProps<T, D, ComponentsMap>;
export type CFieldConfig<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> = VoidFieldType<T, D, ComponentsMap> | BasicFieldType<T, D, ComponentsMap>;
export type DefaultCFieldConfig<T extends ObjectType = any, D extends ObjectType = any> = CFieldConfig<T, D, DefaultBuiltInComponentMapType>;
/**
 * @title 表单字段配置
 * @description
 * 表单实际上由一个个的字段构成，CFieldProps定义了表单字段的具体属性。
 *
 * 注意！在配置一个字段时，首选需要配置字段的`type`属性。
 *
 * 在表单字段中，有的字段是有值的（需要值来进行交互、联动、提交等操作，称之为数据型字段），有的字段是没有值的（纯展示或者布局组件，称之为虚数据型字段）。
 * 对于有值的字段 `type`属性 可以是 `'Field'`，`'ObjectField'`，`'ArrayField'`。对于没有值的字段 `type`属性 为 `'VoidField'`。
 *
 * 数据型字段和虚数据型字段的属性基本一致，数据型字段多支持了`dataSource`和`rules`属性的配置。
 *
 */
export interface CFieldProps<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> extends Omit<IFieldProps, BaseOmitKey | 'dataSource'>, CBaseFieldProps<T, D, ComponentsMap> {
    /**
     * @zh 字段数据源配置（注意，仅数据型字段支持dataSource属性配置）
     */
    dataSource?: CallableType<FieldDataSource, T, D>;
    /**
     * @zh 字段校验配置（注意，仅数据型字段支持rules属性配置）
     */
    rules?: RulesProps<T, D> | RulesProps<T, D>[];
}
export interface CVoidFieldProps<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> extends Omit<IVoidFieldProps, BaseOmitKey>, CBaseFieldProps<T, D, ComponentsMap> {
}
export interface CBaseFieldProps<ValueType extends ObjectType = any, DataType extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> {
    /**
     * @zh 字段标题
     */
    title?: CallableType<ReactNode, ValueType, DataType>;
    /**
     * @zh 字段描述信息
     */
    description?: CallableType<ReactNode, ValueType, DataType>;
    /**
     * @zh 控制字段的显隐。可选值为 'none' | 'hidden' | 'visible'。
     * display 为 none 代表字段 UI 隐藏，同时不保留字段数据；
     * display 为 hidden 代表字段 UI 隐藏，保留字段数据；
     * display 为 visible 代表字段 UI 显示，同时恢复字段数据。
     * @defaultValue visible
     */
    display?: CallableType<FieldDisplayTypes, ValueType, DataType>;
    /**
     * @zh 是否隐藏当前字段。在 display 的基础上，formily 提供了两个便捷属性 visible 和 hidden。
     * 注意：visible和hidden都可以控制当前字段的显隐，二者的区别简单来说可以理解为字段隐藏时，visible 控制的隐藏在表单提交时不会带上该字段的值，hidden 控制隐藏的字段在提交时会带上该字段的值
     * @defaultValue false
     */
    hidden?: CallableType<boolean, ValueType, DataType>;
    /**
     * @zh 当前字段是否可见。在 display 的基础上，formily 提供了两个便捷属性 visible 和 hidden。
     * 注意：visible和hidden都可以控制当前字段的显隐，二者的区别简单来说可以理解为字段隐藏时，visible 控制的隐藏在表单提交时不会带上该字段的值，hidden 控制隐藏的字段在提交时会带上该字段的值
     * @defaultValue true
     */
    visible?: CallableType<boolean, ValueType, DataType>;
    /**
     * @zh 字段交互模式 可以设置为以下的四种模式。
     * @defaultValue editable
     */
    pattern?: CallableType<FieldPatternTypes, ValueType, DataType>;
    /**
     * @zh 字段是否可编辑
     * @defaultValue true
     */
    editable?: CallableType<boolean, ValueType, DataType>;
    /**
     * @zh 是否只读
     * @defaultValue false
     */
    readOnly?: CallableType<boolean, ValueType, DataType>;
    /**
     * @zh 是否禁用
     * @defaultValue false
     */
    disabled?: CallableType<boolean, ValueType, DataType>;
    /**
     * @zh 是否为阅读态
     * @defaultValue false
     */
    readPretty?: CallableType<boolean, ValueType, DataType>;
    /**
     * @zh 挂载到字段上的数据，支持响应式。
     */
    data?: CallableType<any, ValueType, DataType>;
    /**
     * @zh 配置字段代理的UI组件
     */
    componentOptions?: ComponentOptions<ComponentsMap, ValueType, DataType>;
    /**
     * @zh 配置字段代理的装饰器组件。
     * 装饰器是指字段的包裹组件，负责修饰组件的样式和布局，以及一些通用展示(比如title)
     */
    decoratorOptions?: ComponentOptions<ComponentsMap, ValueType, DataType>;
    /**
     * @zh 当需要配置表单的嵌套时，可以在字段中通过fields配置子字段
     */
    fields?: CFieldConfig<ValueType, DataType, ComponentsMap>[];
    dynamicField?: {
        deps: string[];
        fields: (form: CForm<ValueType, DataType>) => CFieldConfig<ValueType, DataType, ComponentsMap>[];
    };
}
/**
 * Header
 * @description
 * header字段主要配置表单的标题。header支持 1. 预设配置  2. 自定义渲染。
 */
export type CFormHeader<T extends ObjectType = any, D extends ObjectType = any> = CFormHeaderItem[] | ((form: CForm<T, D>) => CFormHeaderItem[]);
export type CFormHeaderItem = CFormHeaderBuiltInHeader | CFormHeaderCustomRender;
export type CFormHeaderCustomRender = () => ReactNode;
export type CFormHeaderBuiltInHeader = {
    title: string;
    onBack: () => void;
};
export type CFormStepHeader = CFormStepHeaderItem[] | ((formStep: CFormStep) => CFormStepHeaderItem[]);
export type CFormStepHeaderItem = CFormStepHeaderBuiltInHeader | CFromStepHeaderCustomRender;
export type CFromStepHeaderCustomRender = (formStep: CFormStep) => ReactNode;
export type CFormStepHeaderBuiltInHeader = {
    title: string;
    onBack: () => void;
};
/**
 * Top
 * @description
 * top配置的内容主要用于Alert信息提示。top支持 1. 预设Arco Alert配置；2. 支持自定义配置 ； 3. Field配置。
 */
export type CFormTop<T extends ObjectType = any, D extends ObjectType = any> = CFormTopItem<T, D>[] | ((form: CForm<T, D>) => CFormTopItem[]);
export type CFormTopItem<T extends ObjectType = any, D extends ObjectType = any> = {
    field: CFieldConfig<T, D>;
} | CFormTopCustomRender | CFormTopBuiltInAlert;
export type CFormTopCustomRender = (form: CForm) => ReactNode;
export type CFormTopBuiltInAlert = {
    alertType: 'info' | 'success' | 'warning' | 'error';
    props?: AlertProps;
};
export type CFormStepTop<T extends ObjectType = any, D extends ObjectType = any> = CFormStepTopItem<T, D>[] | ((formStep: CFormStep) => CFormStepTopItem[]);
export type CFormStepTopItem<T extends ObjectType = any, D extends ObjectType = any> = {
    field: CFieldConfig<T, D>;
} | CFormStepTopCustomRender | CFormStepTopBuiltInAlert;
export type CFormStepTopCustomRender = (formStep: CFormStep) => ReactNode;
export type CFormStepTopBuiltInAlert = {
    alertType: 'info' | 'success' | 'warning' | 'error';
    props?: AlertProps;
};
/**
 *  Footer
 * @description
 * Footer区域用于展示操作按钮、价格预览等内容。Footer区域分为了左右两栏，分别通过left、right属性进行配置。
 * Footer支持  1. 内置了常用按钮； 2. 支持Field配置 ； 3. 用户自定义配置。
 */
export type CFormFooter<T extends ObjectType = any, D extends ObjectType = any> = ((form: CForm<T, D>, onSubmit: (values: T) => void) => CFormFooterConfig<T, D>) | CFormFooterConfig<T, D>;
export type CFormFooterConfig<T extends ObjectType = any, D extends ObjectType = any> = {
    left?: CFormFooterItem<T, D>[];
    right?: CFormFooterItem<T, D>[];
};
export type CFormFooterCustomRender = () => ReactNode;
export type CFormFooterItem<T extends ObjectType = any, D extends ObjectType = any> = {
    field: CFieldConfig<T, D>;
} | CFormFooterCustomRender | CFormFooterBuiltInButton;
export type CFormStepFooter<T extends ObjectType = any, D extends ObjectType = any> = ((formStep: CFormStep, onSubmit: (values: T) => void) => CFormStepFooterConfig<T, D>) | CFormStepFooterConfig<T, D>;
export type CFormStepFooterConfig<T extends ObjectType = any, D extends ObjectType = any> = {
    /**
     * 是否开启自动隐藏上一步/下一步/提交按钮逻辑
     * 第一步默认隐藏上一步和提交按钮
     * 最后一步默认隐藏下一步按钮
     */
    autoHiddenStepButtons?: boolean;
    left?: CFormStepFooterItem<T, D>[];
    right?: CFormStepFooterItem<T, D>[];
};
export type CFormStepFooterCustomRender = (formStep: CFormStep) => ReactNode;
export type CFormFooterBuiltInButton = {
    buttonType: 'confirm' | 'submit' | 'next' | 'back' | 'cancel';
    props?: ButtonProps;
    wrapper?: (buttonNode: React.ReactNode) => React.ReactNode;
    disableAutoHiddenStepButtons?: boolean;
};
export type CFormStepFooterItem<T extends ObjectType = any, D extends ObjectType = any> = {
    field: CFieldConfig<T, D>;
} | CFormStepFooterCustomRender | CFormFooterBuiltInButton;
/**
 *  Resident
 * @description
 */
export type CFormResidentContent<T extends ObjectType = any, D extends ObjectType = any> = CFormResidentContentItem<T, D>[];
export type CFormResidentContentItem<T extends ObjectType = any, D extends ObjectType = any> = {
    field: CFieldConfig<T, D>;
} | CFormResidentContentCustomRender | CFormResidentContentBuiltInButton;
export type CFormResidentContentBuiltInButton = {
    buttonType: 'confirm';
    props?: ButtonProps;
};
export type CFormResidentContentCustomRender = (form: CForm) => ReactNode;
export type CFormStepResidentContent<T extends ObjectType = any, D extends ObjectType = any> = CFormStepResidentContentItem<T, D>[];
export type CFormStepResidentContentItem<T extends ObjectType = any, D extends ObjectType = any> = {
    field: CFieldConfig<T, D>;
} | CFormStepResidentContentCustomRender | CFormResidentContentBuiltInButton;
export type CFormStepResidentContentCustomRender = (formStep: CFormStep) => ReactNode;
/**
 * @title RulesProps
 * @description
 * 底层使用 formily 校验器。
 * 针对 arco 的 api 有一定扩展，详解属性注释
 */
export interface RulesProps<T extends ObjectType = any, D extends ObjectType = any> extends Omit<IValidatorRules, 'triggerType' | 'validator'> {
    /**
     * @zh 触发校验的时机
     * @onChange 修改时触发，对应 formily 属性为 onInput
     */
    validateTrigger?: 'onChange' | 'onFocus' | 'onBlur';
    /**
     * @zh 自定义方法校验，优先级高于其它属性。
     * param.value是当前字段的值；
     * param.form是form实例；
     * param.field 父节点，用于数组情况下获取一行实现互相校验等
     * param.callback 返回的错误。
     * @returns
     */
    validator?: (params: {
        value: any;
        field: CGeneralField<T, D>;
        form: CForm<T, D>;
        callback: (result?: ValidatorFunctionResponse) => void;
    }) => void | Promise<void>;
    /**
     * @zh 是否必填
     */
    required?: boolean;
    /**
     * @zh 最大值大于该值报错
     * @example when then value > 5 error
     */
    maximum?: number;
    /**
     * @zh 最大值大于等于该值报错
     * @example when then value >= 5 error
     */
    exclusiveMaximum?: number;
    /**
     * @zh 最小值小于该值报错
     * @example when then value < 5 error
     */
    minimum?: number;
    /**
     * @zh 最小值小于等于该值报错
     * @example when then value <= 5 error
     */
    exclusiveMinimum?: number;
    /**
     * @zh 长度必须等于该值
     * @example when then value.length !== 5 error
     */
    len?: number;
    /**
     * @zh 长度最大为该值
     * @example when then value.length > 5 error
     */
    maxLength?: number;
    /**
     * @zh 最小长度为该值
     * @example when then value.length < 5 error
     */
    minLength?: number;
    /**
     * @zh 排除空白字符
     * @example 'xxxx xxxxx' error
     */
    whitespace?: boolean;
    /**
     * @zh 枚举匹配
     */
    enum?: any[];
    /**
     * @zh 常量匹配
     */
    const?: any;
    /**
     * @zh 整除匹配
     * @example multipleOf = 2, value % multipleOf !== 0 error
     */
    multipleOf?: number;
    /**
     * @zh 内置校验格式
     */
    format?: ValidatorFormats;
    /**
     * @zh 自定义错误文案
     */
    message?: string;
}
/**
 * @title CForm - 表单核心模型
 * @description
 * 继承自 formily 中的核心表单模型，该模型上挂载了表单的所有模型属性，如果该属性是可写的，我们可直接修改该属性来触发UI的更新。
 *
 * 扩展了`data`属性和`setData`方法。
 *
 * formily表单领域模型的其他属性和方法请参考https://core.formilyjs.org/zh-CN/api/models/form
 */
export interface CForm<T extends ObjectType = any, D extends ObjectType = any> extends Form<T> {
    /**
     * @zh 全局数据
     */
    data: D;
    /**
     * @zh 设置全局数据
     */
    setData: (data: Partial<D>) => void;
    /**
     * @zh 标识form名称，对应form标签的name属性
     * @default 随机的唯一uid
     * 默认取formily的form实例id属性
     */
    name: string;
}
/**
 * @title CForm 实例别名
 */
export type CFormInstance<T extends ObjectType = any, D extends ObjectType = any> = CForm<T, D>;
/**
 * @title 表单默认装饰器组件props
 */
export interface DefaultCFormDecoratorProps extends FormStepDecoratorProps {
    /**
     * @zh 是否是全页面，全页面状态下会预留左右两侧padding，并居中表单
     * @defaultValue true
     */
    isFullPage?: boolean;
    /**
     * @zh 吸顶配置，支持`noSticky`,`headerSticky`,`headerTopSticky`,
     * @defaultValue headerSticky
     */
    stickyType?: 'noSticky' | 'headerSticky' | 'headerTopSticky';
    /**
     * @zh header顶部的分割线是否拉通，在`isFullPage`属性为true时生效
     * @defaultValue false
     */
    isHeaderSeperatorLinkup?: boolean;
    /**
     * @zh 设置header的样式，header区域默认高度为66px，可通过该属性定制高度等样式
     */
    headerStyle?: CSSProperties;
    /**
     * @zh  全局挂载框挂在的父节点
     */
    getPopupContainer?: (node: HTMLElement) => Element;
    /**
     * @zh 步骤条属性，透传Arco Steps组件属性
     */
    arcoStepsProps?: Omit<StepsProps, 'direction'>;
}
/** 一些内置组件的props */
export { ConfigPreviewComponentProps, ConfigPreviewItem, ConfigPreviewItemCustomRender, ConfigPreviewItemBuiltInRender, ConfigPreviewItemFormatterData, } from './react/Components/ConfigPreview/index';
export { FeeCalculatorProps } from './react/Components/FeeCalculator/index';
export { CAsyncSelectDataSource, CAsyncSelectFormProps, CAsyncSelectFetchDataProps, CAsyncSelectInitDataSource, } from './react/Components/CAsyncSelect/index';
export type ObjectType = Record<string, any>;
export type JSXComponent = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
export type ComponentsMap = Record<string, JSXComponent>;
export type PureComponentsMap = Record<string, React.JSXElementConstructor<any>>;
export interface CFormRegisterConfigOptions<CM extends PureComponentsMap, D extends JSXComponent | keyof CM = JSXComponent | keyof CM> {
    defaultComponentProps?: DefineComponentPropsMapType<CM>;
    defaultDecoratorProps?: DefineComponentPropsMapType<CM>;
    /**
     * 如果是 string, 则必须是 componentsMap 中注册的组件
     */
    defaultDecorator?: D;
    formLayout?: IFormLayoutProps;
}
export type CFormRegisterConfig<CM extends PureComponentsMap = any> = CFormRegisterConfigOptions<CM> & {
    componentsMap: CM;
};
export interface CFormInstanceProps<T extends ObjectType = any, D extends ObjectType = any> extends Omit<IFormProps<T>, 'effects'> {
    data?: D;
    /**
     * @zh 步骤表单默认展示第几步
     */
    defaultStep?: number;
}
export type CallableType<ReturnType, ValueType extends ObjectType = any, DataType extends ObjectType = any, ParentType extends CGeneralField<ValueType, DataType> = any> = ReturnType | ((form: CForm<ValueType, DataType>, parentField: ParentType) => ReturnType);
export interface CVoidField<T extends ObjectType = any, D extends ObjectType = any> extends Omit<VoidField, 'form'> {
    form: CForm<T, D>;
}
export interface CField<T extends ObjectType = any, D extends ObjectType = any, V = any> extends Omit<Field<any, any, any, V>, 'form'> {
    form: CForm<T, D>;
}
export interface CArrayField<T extends ObjectType = any, D extends ObjectType = any> extends Omit<ArrayField, 'form'> {
    form: CForm<T, D>;
}
export interface CObjectField<T extends ObjectType = any, D extends ObjectType = any> extends Omit<ObjectField, 'form'> {
    form: CForm<T, D>;
}
export type CGeneralField<T extends ObjectType = any, D extends ObjectType = any> = CVoidField<T, D> | CField<T, D> | CArrayField<T, D> | CObjectField<T, D>;
export type ComponentOptions<T extends PureComponentsMap, ValueType extends ObjectType = any, DataType extends ObjectType = any> = (ComponentMapToUnionType<T, [CForm, CGeneralField<ValueType, DataType>], 'props'> | {
    component: React.JSXElementConstructor<any>;
    props?: ObjectType | unknown | ((form: CForm, parentField: CGeneralField<ValueType, DataType>) => ObjectType);
}) & {
    /**
     * 注意：非必要不要使用 ref !!!!
     * 使用 ref 后会导致 field.setComponentProps 响应式失效，需要通过响应式属性以及属性的全量覆盖，即 field.componentProps = { ...field.componentProps }
     */
    ref?: React.RefObject<unknown>;
};
export type BaseOmitKey = 'hidden' | 'visible' | 'display' | 'pattern' | 'editable' | 'disabled' | 'readOnly' | 'readPretty' | 'data' | 'decorator' | 'decoratorProps' | 'component' | 'componentProps' | 'title' | 'description' | 'validator';
export interface Protocol {
    /**协议名称 */
    title: string;
    /**协议链接 */
    url: string;
}
/**
 * @title CFormConfirmColumn
 */
export interface CFormConfirmColumn<T extends ObjectType = any, D extends ObjectType = any> extends Omit<ItemProps, 'hidden' | 'label' | 'content'> {
    /**详情页展示字段名 */
    name?: string;
    /**默认根据name取值value，如果需要对value进行改写，可使用formatter */
    formatter?: (value: any, values: T, form?: CForm<T, D>) => ReactNode;
    /**当前字段是否渲染*/
    hidden?: (value: any, values: T, form: CForm<T, D>) => boolean;
    /**label */
    label?: ((value: any, values: T, form?: CForm<T, D>) => ReactNode) | string;
}
/**
 * @title ConfirmSection
 */
export interface ConfirmSection<Column extends any = any, T extends ObjectType = any, F = any> {
    /**当前列title */
    title: string;
    /**当前列是否可编辑，默认不可编辑，需要编辑情况请填入section对应的表单字段*/
    editAnchor?: string;
    /**当前列展示字段集合*/
    fields: Column[];
    /**当前列自定义渲染*/
    customRender?: (values: T, col: ItemProps[], form: F) => ReactNode;
    /**当前列是否渲染*/
    hidden?: (values: T, form: F) => boolean;
    /**当前列配置*/
    columnConfig?: Omit<ColumnConfig<any>, 'title' | 'component' | 'dataIndex' | 'render'>;
}
/**
 * @title ConfirmStep
 */
export interface ConfirmStep<T extends ObjectType = any, D extends ObjectType = any> {
    /**确认步骤title */
    title: string;
    /**确认步骤是否可编辑 */
    edit?: boolean;
    /**确认步骤下展示的列集合 */
    section: ConfirmSection<CFormConfirmColumn<T, D> | string, T, CForm<T, D>>[];
    /**CTable Props */
    CTableProps?: TableConfig<any>;
}
/**
 * @title CFormConfirmDetail
 */
export interface CFormConfirmDetail<T extends ObjectType = any, D extends ObjectType = any> {
    /**详情页信息 */
    detail: ConfirmStep<T, D>[];
    /**详情页协议 */
    protocol?: CAgreementProps & {
        protocolLabel?: string;
    };
    /**全局设置label宽度 */
    labelWidth?: number;
    /**确认页title，默认为”确认页“ */
    stepTitle?: string;
}
/**
 * @title ConfirmDetail
 */
export interface ConfirmDetail<T extends ObjectType = any, F = any> {
    /**全局设置label宽度 */
    labelWidth?: number;
    /**详情页信息 */
    detail: (Omit<ConfirmStep, 'section'> & {
        section: ConfirmSection<ItemProps, T, F>[];
    })[];
    /**可编辑操作返回的步骤回调*/
    onEdit: (step: number, section?: string) => void;
    /**表单values集合*/
    values: T;
    /**表单实例*/
    form: F;
}
export interface ICFormSchema {
    schemaField?: ISchemaFieldProps;
    formProps?: IFormProps;
    formLayOutProps?: IFormLayoutProps;
}
