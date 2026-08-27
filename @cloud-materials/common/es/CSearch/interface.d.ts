import type { ButtonProps, InputProps, PopoverProps, SelectProps, SpaceProps, TriggerProps } from '@arco-design/web-react';
import type { CSSProperties, Key, ReactElement, ReactNode } from 'react';
import type { CSearchComponentEnum, CSearchComponentType } from './components/Component';
import type { DefineBuiltInBasicType } from '../_factory/builtInComponent';
import type { DebounceSettings } from 'lodash-es';
import type { CTagProps } from '../CTag/interface';
import type { COperationMenuProps } from '../COperationMenu/interface';
import type { CEllipsisProps } from '../CEllipsis/interface';
/** 组件样式基类 */
export interface PropsWithBase {
    /** 类名 */
    className?: string | string[];
    /** 样式 */
    style?: CSSProperties;
}
/** 组件值基类 */
export type PropsWithValue<T> = {
    /** 当前值（受控） */
    value?: T;
    /** 默认值（非受控） */
    defaultValue?: T;
    /** 值改变事件 */
    onChange?: (value: T) => void;
};
export interface PropsWithDebounce {
    /**
     * @zh 防抖参数
     * @defaultValue `{wait: 500}`
     */
    debounceOptions?: (DebounceSettings & {
        wait?: number;
    }) | null;
}
/** 组件类型 */
export type { CSearchComponentType };
/** 搜索参数 */
export type CSearchParams = Record<string, any>;
/** 组件内容 */
export type CSearchComponentContent = (ReactElement & {
    component?: undefined;
}) | DefineBuiltInBasicType<CSearchComponentEnum>;
/** 简单搜索组件参数 */
export interface CSearchComponentProps {
    /** 内容 */
    content: CSearchComponentContent;
    /** 组件参数 */
    commonProps?: Record<string, any>;
}
export interface CompactWrapperProps extends PropsWithBase {
    /** 显示名称 */
    label?: ReactNode;
    /** 是否显示标签边框 */
    labelBordered?: boolean;
    /**
     * @zh 标签宽度
     * @defaultValue 100
     */
    labelWidth?: CSSProperties['width'];
}
/**
 * @title CSimpleSearch
 */
export interface CSimpleSearchProps extends PropsWithDebounce, CompactWrapperProps, PropsWithValue<any> {
    /** 组件内容 */
    content: CSearchComponentContent;
    /** 容器类名，仅在存在 label 时生效 */
    wrapperClassName?: string | string[];
    /** 容器样式，仅在存在 label 时生效 */
    wrapperStyle?: CSSProperties;
    /** Input组件格式化用户输入,当传入Input本身的normalize时忽略 */
    normalize?: InputProps['normalize'] | {
        /** 忽略无意义字符 */
        ignoreCharacters?: (string | RegExp)[];
        /** 英文字符大小写转换 */
        letterCase?: 'upperCase' | 'lowerCase';
    };
}
/**
 * @title CCascaderSearchItem
 */
export interface CCascaderSearchItem extends CSearchComponentProps {
    /** 选项名称 */
    label: ReactNode;
    /** 选项字段 */
    fieldName: Key;
    /**
     * @zh 是否可见
     * @defaultValue true
     */
    visible?: boolean;
}
/**
 * @title CCascaderSearch
 */
export interface CCascaderSearchProps extends PropsWithBase, PropsWithDebounce, PropsWithValue<CSearchParams> {
    /** 搜索类型选择项 */
    list?: CCascaderSearchItem[];
    /** 搜索类型选择器参数 */
    arcoSelectProps?: Omit<SelectProps, 'options' | 'value'>;
    /**
     * @zh 标签宽度
     * @defaultValue 100
     */
    labelWidth?: CSSProperties['width'];
    /**
     * @zh 搜索项Select组件是否配置自动宽度，开启后，labelWidth失效
     * @defaultValue false
     */
    prefixAutoWidth?: boolean;
}
/**
 * @title UseCCascaderSearchValue
 */
export interface UseCCascaderSearchValue {
    /** 过滤掉 visible 为 false 的选项 */
    validOptions: CCascaderSearchItem[];
    /** 当前值 */
    state: {
        /** 字段 */
        fieldName: Key;
        /** 值 */
        value?: any;
    };
    /** 组件 */
    searchComponent: CSearchComponentProps;
}
/**
 * @title UseCCascaderSearchControl
 */
export interface UseCCascaderSearchControl {
    /** 更新字段 */
    updateField: (value: Key) => void;
    /** 更新值 */
    updateValue: (value: any) => void;
}
/** 高级筛选搜索项所占栅格数量 */
export type CSearchColspan = Record<CSearchComponentType, number>;
/** 高级筛选搜索项所处位置 */
export type CSearchPosition = 'left' | 'right';
/**
 * @title CSearchItem
 */
export interface CCSearchItem extends CompactWrapperProps, CSearchComponentProps {
    /** 字段 设置后会监管组件的 value 和 onChange 参数 */
    fieldName?: Key;
    /** 高级筛选搜索项所占栅格数量 */
    colspan?: number;
    /** 是否可见 */
    visible?: boolean;
    /** 输入值格式化 */
    valueFormatter?: ((v?: string) => string | undefined) | ((v?: string[]) => string[] | undefined);
}
/**
 * @title UseCSearchValue
 */
export interface UseCSearchValue {
    /** 展示搜索项列表 */
    displayList: CCSearchItem[];
    /** 高级筛选搜索项列表 */
    advanceList: CCSearchItem[];
    /** 高级筛选列表可见性 */
    advanceVisible: boolean;
    /** 是否手动搜索 */
    manual?: boolean | ButtonProps;
    /** 已设置高级筛选数量 */
    activeAdvanceCount: number;
    /** 搜索参数 */
    params: CSearchParams;
}
/**
 * @title UseCSearchControl
 */
export interface UseCSearchControl {
    /** 切换高级筛选列表可见性 */
    toggleAdvanceVisible: () => void;
    /** 搜索 */
    search: (flush?: true) => void;
    /** 更新搜索参数 */
    updateParams: (val: CSearchParams, replace?: boolean) => void;
    /** 重置搜索参数 */
    resetParams: () => void;
    /** 重置高级筛选搜索参数 */
    resetAdvanceParams: () => void;
}
/**
 * @title UseCSearchCustom
 */
export interface UseCSearchCustomProps extends PropsWithValue<CSearchParams>, PropsWithDebounce {
    /**
     * @zh 高级筛选折叠面板默认显隐
     * @defaultValue false
     */
    defaultCollapseVisible?: boolean;
    /** 展示的组件外层 Space 组件参数 */
    displayArcoSpaceProps?: Partial<SpaceProps>;
    /** 折叠的组件外层容器类名 */
    collapsedClassName?: string | string[];
    /** 搜索项列表 */
    list?: CCSearchItem[];
    /** 是否手动搜索，会增加搜索按钮 */
    manual?: boolean | ButtonProps;
    /** 缓存关键字，设置后参数会存储在 localStorage 中 */
    cacheKey?: string;
    /**
     * @zh 显示的搜索项数量，剩下的将作为高级筛选展示
     * @defaultValue 2
     */
    displayCount?: number;
    /**
     * @zh 标签宽度
     * @defaultValue 100
     */
    labelWith?: number | string;
    /**
     * @zh 组件占栅格数量
     * @defaultValue
      {
        InputNumber: 4,
        Select: 4,
        DatePicker: 4,
        Input: 5,
        RangePicker: 7
      }
     */
    colspan?: CSearchColspan;
    /** 显示重置按钮，即使设置手动搜索参数重置后也会立即搜索 */
    showReset?: boolean | ButtonProps;
    /** 显示高级筛选中的重置按钮，即使设置手动搜索参数重置后也会立即搜索 */
    showAdvanceReset?: boolean;
    /**
     * @zh 高级搜索折叠部分显隐切换后回调
     * @param visible
     * @returns
     */
    onCollapseVisibleChange?: (visible: boolean) => void;
}
/**
 * @title CSearch
 */
export interface CSearchProps extends PropsWithBase, UseCSearchCustomProps {
    /**
     * @zh 搜索项展示方向，left表示搜索组件在左侧、right表示搜索组件在右侧
     * @defaultValue right
     */
    position?: CSearchPosition;
    /** 搜索项相反位置内容 */
    reverseNode?: ReactNode;
}
/** 组合搜索组件类型 */
export type CCombineSearchType = 'input' | 'select' | 'custom';
/**
 * 组合搜索组件状态
 * default: 初始状态
 * field: 点击trigger选择搜索字段
 * value: 选择了搜索字段进行值的输入或者模糊匹配搜索时
 */
export type CCombineSearchStatus = 'default' | 'field' | 'value';
export type ViewItemRenderProps = Pick<CTagProps, 'className' | 'closable' | 'onClick' | 'onClose'>;
/** 高级搜索选项基类 */
export interface CCombineSearchItemBase {
    /** 展示名称 */
    label: string;
    /** 字段 */
    fieldName: Key;
    /**
     * @zh 是否禁用该搜索项
     */
    disabled?: boolean;
    /**
     * @zh 是否隐藏该搜索项
     */
    hidden?: boolean;
    /** 组件类型 */
    type?: CCombineSearchType;
    /** 占位符 */
    placeholder?: string;
    /** 自定义渲染结果展示内容 */
    renderViewItem?: (props: ViewItemRenderProps, options: {
        item: Omit<CCombineSearchItem, 'renderViewItem'>;
        value: any;
        prefixClassName: string;
    }) => ReactNode;
    viewItemConfig?: {
        /**
         * @zh 搜索项是否隐藏其label
         */
        hiddenLable?: boolean;
        /**
         * @zh 搜索项是否隐藏其label
         * @defaultValue true
         */
        enableEdit?: boolean;
    };
}
/** 高级搜索 Input 类型 */
export interface CCombineSearchInput extends CCombineSearchItemBase {
    /** 组件类型 */
    type: 'input';
    /** 输入模式 */
    mode?: 'number' | 'tag';
    /** 结果展示分隔符，在 mode=tag 时生效，可配置输出数据是否加入分隔符 */
    separator?: string | {
        symbol: string;
        isOriginalData?: boolean;
    };
}
/** 高级搜索 Select 类型 */
export interface CCombineSearchSelect extends CCombineSearchItemBase {
    /** 组件类型 */
    type: 'select';
    /**
     * @zh 选择模式
     * @en Select mode
     * @defaultValue single
     */
    mode?: 'multiple' | 'single';
    /** 选项 */
    options: Array<{
        /** 展示名称 */
        label: ReactNode;
        /** 值 */
        value: Key;
        /** 是否禁用 */
        disabled?: boolean;
    }>;
    /**
     * @zh 允许选择同一搜索项的候选项，在 mode=single 时生效，设置后则进行合并
     * @defaultValue false
     */
    multiValues?: boolean;
    /** 结果展示分隔符，在 mode=multiple || multiValues=true  时生效，设置后则会以字符串形式输出，可配置输出数据是否加入分隔符 */
    separator?: string | {
        symbol: string;
        isOriginalData?: boolean;
    };
    /**
     * @zh 允许未匹配到的搜索词作为搜索条件
     * @defaultValue false
     */
    allowCreate?: boolean;
    fuzzyConfig?: {
        /**
         * 搜索目标为label(需要传入string或number)-只搜索label、value-只搜索value、both-同时搜索
         * @default label
         */
        target?: 'label' | 'value' | 'both';
        /** 对用户输入字符进行英文字符大小写转换处理，模糊匹配搜索 */
        letterCase?: 'upperCase' | 'lowerCase' | 'ignore';
        /**
         * @zh 是否进行模糊匹配
         * @defaultValue true
         */
        enableSearch?: boolean;
    };
    /**
     * @zh 搜索事件
     */
    onSearch?: (options: {
        searchWord?: string;
        item: CCombineSearchSelect;
        filterOptions: CCombineSearchSelect['options'];
    }) => void;
}
/** 高级搜索 自定义类型 */
export interface CCombineSearchCustom extends CCombineSearchItemBase {
    /** 组件类型 */
    type: 'custom';
    /** 自定义渲染 Popover 内容组件，存在时输入框不可编辑 */
    renderContent: (props: {
        item: CCombineSearchCustom;
        value: any;
        onChange: (value: any) => void;
        onReset: () => void;
        onSave: (value?: any) => void;
        onCancel: () => void;
    }) => ReactNode;
    /** 自定义渲染已输入值临时展示内容 */
    renderTrigger?: (props: {
        item: CCombineSearchCustom;
        value: any;
        onSave: (value?: any) => void;
        /** 回退至选择筛选项 */
        onBack: () => void;
    }) => ReactNode;
    /** 隐藏底部组件 */
    hideFooter?: boolean;
    /** 自定义项时可设置poover的style */
    popoverStyle?: CSSProperties;
}
/** 高级搜索选项类型 */
export type CCombineSearchItem = CCombineSearchInput | CCombineSearchSelect | CCombineSearchCustom;
/**
 * @title UseCCombineSearchValue
 */
export interface UseCCombineSearchValue {
    /** 搜索项列表 */
    list: NonNullable<CCombineSearchProps['list']>;
    /** 输入框值 */
    tempValue: any;
    /** 搜索参数 */
    params: CSearchParams;
    /** 当前状态 */
    status: CCombineSearchStatus;
    /** 当前搜索项 */
    current: CCombineSearchItem | null;
    /** 占位符 */
    placeholder: string;
    /** 默认查询字段 */
    defaultField?: {
        fieldName: string;
        type: 'auto' | 'default';
    };
    /** 单选和多选时字段搜索词 */
    searchWord?: string;
    /** 校验错误信息 */
    errState?: boolean;
    /** 处理用户输入字符，包括大小写转换，忽略无意义字符等 */
    filterUserInput: Required<NonNullable<UseCCombineSearchCustomProps['fuzzyConfig']>>['filterUserInput'];
}
/**
 * @title UseCCombineSearchControl
 */
export interface UseCCombineSearchControl {
    /** 搜索 */
    search: () => void;
    /** 更新组件状态和当前搜索项 */
    updateState: (status: CCombineSearchStatus, current?: UseCCombineSearchValue['current']) => void;
    /** 更新搜索项参数 */
    updateParams: (value: CSearchParams, replace?: boolean) => void;
    /** 重置所有参数 */
    resetParams: () => void;
    /** 更新输入框值 */
    updateTempValue: (value?: any) => void;
    /** 更新当前搜索项 */
    updateSearchField: (field: Key) => void;
    /** 更新当前搜索项参数 */
    updateSearchValue: (value?: any, field?: Key) => void;
    /** 重置当前搜索项 */
    resetCurrent: () => void;
    /** 更新搜索词 */
    updateSearchWord: (value?: string) => void;
}
/**
 * 不同的loading状态
 * - `block`: trigger 整体loading，会阻塞操作
 * - `inline`: trigger 末尾和 popover 内容loading，不阻塞输入
 * - `none`: 不进行loading
 */
export type LoadingType = 'block' | 'inline' | 'none';
/**
 * @title UseCCombineSearchCustom
 */
export interface UseCCombineSearchCustomProps extends PropsWithBase, PropsWithValue<CSearchParams> {
    /**
     * 搜索组件类名
     */
    triggerClassName?: string | string[];
    /**
     * 搜索组件样式
     */
    triggerStyle?: CSSProperties;
    /**
     * @zh 触发方式
     * @en Trigger mode
     * @defaultValue click
     */
    trigger?: PopoverProps['trigger'];
    /**
     * 搜索组件 Popover 中的传递给 Trigger 组件的 props
     */
    popoverTriggerProps?: Partial<TriggerProps>;
    /**
     * 搜索组件Popover类名
     */
    popoverClassName?: string | string[];
    /**
     * 搜索组件Popover样式
     */
    popoverStyle?: CSSProperties;
    /**
     * 键盘操作提示
     * @defaultValue true
     */
    keyboardTip?: boolean;
    /**
     * 搜索结果组件类名
     * alignType为inline时无效
     */
    viewClassName?: string | string[];
    /**
     * 搜索结果组件样式
     * alignType为inline时无效
     */
    viewStyle?: CSSProperties;
    /** 搜索项列表 */
    list?: CCombineSearchItem[];
    /** 搜索项分组配置。配置之后，需要给所有搜索项进行分组，未分组的将不进行展示 */
    listGroup?: {
        label: string;
        fieldNames: CCombineSearchItem['fieldName'][];
    }[];
    /** 缓存关键字，设置后参数会存储在 localStorage 中 */
    cacheKey?: string;
    /** 占位符 */
    placeholder?: string;
    /**
     * 默认选中的字段。
     *  - 配置type，配置fuzzy时有效
     *    - auto: 搜索时如果有匹配的候选项则自动根据第一个匹配类型作为搜索项；如果没有匹配项，则用配置的fieldName(如果有配置)作为搜索类型
     *    - default: 不管是否匹配，直接用配置的fieldName作为搜索项
     *    - default value: default
     */
    defaultField?: string | {
        fieldName: string;
        type?: 'auto' | 'default';
    };
    /** 加载态 */
    loading?: boolean | LoadingType;
    /** 模糊搜索 */
    fuzzy?: boolean;
    /** 模糊搜索list中Select配置的候选项，按照顺序处理输入字符 */
    fuzzyConfig?: {
        /** 对用户输入字符进行自定义处理，模糊匹配搜索 */
        filterUserInput?: (userInputValue?: string) => string | undefined;
        /** 对用户输入字符进行英文字符大小写转换处理，模糊匹配搜索 */
        letterCase?: 'upperCase' | 'lowerCase' | 'ignore';
        /** 对用户输入字符进行忽略指定字符处理，模糊匹配搜索 */
        ignoreCharacters?: (string | RegExp)[];
        /**
         * 搜索目标为label(需要传入string或number)-只搜索label、value-只搜索value、both-同时搜索
         * @default label
         */
        target?: 'label' | 'value' | 'both';
        /**
         * 每个搜索项展示最多条目数量
         */
        displayNum?: number;
        /**
         * 是否开启点击搜索项分组label切换到对应的搜索字段
         */
        enableChangeSearchItem?: boolean;
        /** 模糊搜索，搜索候选项自定义函数 */
        fuzzyOptionsFilter?: (searchWord: string, optionsSet: CCombineSearchSelect[]) => CCombineSearchSelect[];
        /**
         * @zh 模糊搜索时，触发搜索事件
         */
        onSearch?: (options: {
            searchWord?: string;
            list: CCombineSearchItem[];
            values: CSearchParams;
            filterList: CCombineSearchSelect[];
        }) => void;
        /**
         * @zh 模糊搜索时，搜索事件debounce时间
         * @defaultValue 200
         */
        searchHandleDebounce?: number;
    };
    /** 搜索值onChange之前的校验 */
    validator?: <T extends CSearchParams>(params: {
        /** 当前输入的搜索值 */
        value: T;
        /** 已输入的搜索值 */
        prevValues: CSearchParams;
        /** 即将更新的搜索值 */
        newValues: CSearchParams;
    }) => boolean | undefined | void;
    /** 搜索展示参数末尾内容 */
    searchParamExtraLast?: ReactNode;
    /** 搜索展示参数开头内容 */
    searchParamExtraStart?: ReactNode;
    /**
     * @zh 搜索条件和搜索组件之间的位置关系，inline-搜索条件和搜索器在搜索框内，bottom-搜索条件在搜索器下方
     * @defaultValue bottom
     */
    alignType?: 'inline' | 'bottom';
    /**
     * @zh 是否支持对已选搜索选项进行编辑
     * @defaultValue true
     */
    enableEdit?: boolean;
    /**
     * @zh 是否使用 CEllipsis 包裹 select 筛选项的 option.label
     */
    ellipsisProps?: {
        enable: boolean;
        config?: Omit<CEllipsisProps, 'content' | 'children'>;
    };
}
/**
 * @title CCombineSearch
 */
export interface CCombineSearchProps extends UseCCombineSearchCustomProps {
    /** 搜索组件左侧内容，支持ReactNode和COperationMenuProps */
    extraLeft?: ReactNode | COperationMenuProps;
    /** 搜索组件右侧内容，支持ReactNode和COperationMenuProps */
    extraRight?: ReactNode | COperationMenuProps;
    /**
     * @zh 搜索组件内容间隔
     * @defaultValue 12
     */
    triggerSpaceSize?: SpaceProps['size'];
}
