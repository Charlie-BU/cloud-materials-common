import type { CSSProperties, ReactNode } from 'react';
import type { SelectProps } from '@arco-design/web-react';
/**
 * @zh 单个条件 (因为条件的类型千差万别，这里仅仅是推荐的用法，实际使用组件时都需要用户传入 Condition 定义)
 * @en a condition (because the type of conditions is so diverse, here we only recommend the usage, in fact, when using the component, users need to pass in the Condition definition)
 */
export interface Condition<Value = unknown, Operator = string, Field = string> {
    field: Field;
    operator: Operator;
    value: Value;
    [key: string]: unknown;
}
/**
 * @zh 容器类型定义，适配拖拽功能专用，具体用法参见示例
 * @en container type definition, specifically designed for drag and drop functionality. Please refer to the example for specific usage.
 */
export type ContainerProps<ValueType> = {
    children: ReactNode;
    className: string;
    value?: ValueType;
    onChange?: (value: ValueType) => void;
};
/**
 * @zh 单个Condition容器类型定义，适配拖拽功能专用，具体用法参见示例
 * @en single container type definition, specifically designed for drag and drop functionality. Please refer to the example for specific usage.
 */
export type ConditionWrapperProps = {
    children: ReactNode;
    className: string;
    index: number;
    key: string | number;
};
/**
 * @zh 包含多个条件的条件组
 * @en A group contains conditions
 */
export interface ConditionGroup<Condition = Record<string, any>, Relation extends string | number = string> {
    relation: Relation;
    conditions: Condition[];
}
/**
 * @title CConditions
 */
export interface CConditionsProps<Condition = Record<string, any>, Relation extends string | number = string, ValueType = {
    relation: Relation;
    conditions: Condition[];
}> {
    style?: CSSProperties;
    className?: string;
    /**
     * @zh 是否是展示态（默认为否，可编辑）
     * @en Display mode
     * @defaultValue false
     */
    readonly?: boolean;
    /**
     * @zh 是否禁止修改
     * @en Disable editing
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * @zh 是否展示清空按钮
     * @en Whether to show the clear button
     */
    allowClear?: boolean;
    /**
     * @zh 最小条件数量，用于控制删除按钮的展示
     * @en minimum amount
     */
    minNum?: number;
    /**
     * @zh  最大条件数量，用于控制添加按钮的展示
     * @en greatest amount
     */
    maxNum?: number;
    /**
     * @zh 添加按钮自定义文字
     * @en add button custom text
     */
    addText?: string;
    /**
     * @zh  删除全部按钮自定义文字
     * @en delete all button custom text
     */
    clearText?: string;
    /**
     * @zh 值
     * @en Value
     */
    value?: ValueType;
    /**
     * @zh 值改变时的回调
     * @en Callback when value changes
     */
    onChange?: (value: ValueType) => void;
    /**
     * @zh 单个条件对应的渲染函数，`field` 为当前条件所对应的路径
     * @en Condition render, `field` is the path of the current condition
     */
    conditionRender: (value: Condition, onChange?: (val: Condition) => void, index?: number) => ReactNode;
    /**
     * @zh 如何从单个条件中获取 React 的 key 值，不指定则使用条件对应的 `index` 作为 key
     * @en How to get the React key value from a single condition, if not specified, use the `index` of the condition as the key
     */
    conditionKey?: (val: Condition) => string | number;
    /**
     * @zh 新增一个条件
     * @en Add a new condition
     */
    newCondition?: () => Condition;
    /**
     * @zh 逻辑关系的选项
     * @en Logic relation options
     * @defaultValue ['and', 'or']
     */
    relationOptions?: SelectProps['options'];
    /**
     * @zh 适配拖拽功能专用，具体用法参见示例
     * @en Adapt to drag and drop function, see the example for details
     */
    Container?: React.ComponentType<ContainerProps<ValueType>>;
    /**
     * @zh 适配拖拽功能专用，具体用法参见示例
     * @en Adapt to drag and drop function, see the example for details
     */
    ConditionWrapper?: React.ComponentType<ConditionWrapperProps>;
}
/**
 * @title CConditions.Group
 */
export interface CConditionsGroupProps<Condition = Record<string, any>, Relation extends string | number = string, ValueType extends {
    relation: Relation;
    groups: ConditionGroup<Condition, Relation>[];
} = {
    relation: Relation;
    groups: ConditionGroup<Condition, Relation>[];
}> {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    /**
     * @zh 是否是展示态（默认为否，可编辑）
     * @en Display mode
     * @defaultValue false
     */
    readonly?: boolean;
    /**
     * @zh 是否禁止修改
     * @en Disable editing
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * @zh 最小条件数量，用于控制“删除”按钮的展示
     * @en minimum amount
     */
    minNum?: number;
    /**
     * @zh  最大条件数量，用于控制“添加”按钮的展示
     * @en greatest amount
     */
    maxNum?: number;
    /**
     * @zh 最小条件组的数量，用于控制“删除该组”按钮的展示
     * @en minimum amount
     */
    minGroupNum?: number;
    /**
     * @zh 最大条件组的数量，用于控制“添加分组”按钮的展示
     * @en greatest amount
     */
    maxGroupNum?: number;
    /**
     * @zh 添加按钮自定义文字
     * @en add button custom text
     */
    addText?: string;
    /**
     * @zh 添加分组按钮自定义文字
     * @en add group button custom text
     */
    addGroupText?: string;
    /**
     * @zh  删除该组按钮自定义文字
     * @en delete the group button custom text
     */
    deleteGroupText?: string;
    /**
     * @zh 值
     * @en Value
     */
    value?: ValueType;
    /**
     * @zh 值改变时的回调
     * @en Callback when value changes
     */
    onChange?: (value: ValueType) => void;
    /**
     * @zh 自定义渲染单个条件
     * @en Custom render a condition
     * @param groupIndex  当前条件组的索引
     */
    conditionRender: (value: Condition, onChange?: (val: Condition) => void, index?: number, groupIndex?: number) => ReactNode;
    /**
     * @zh 如何从单个条件中获取 React 的 key 值，不指定则使用条件对应的 `index` 作为 key
     * @en How to get the React key value from a single condition, if not specified, use the `index` of the condition as the key
     */
    conditionKey?: (val: Condition) => string | number;
    /**
     * @zh 新增一个条件
     * @en Add a new condition
     */
    newCondition?: () => Condition;
    /**
     * @zh 自定义渲染单个条件组
     * @en Custom render a condition group
     */
    groupRender?: (value?: ValueType['groups'][number], onChange?: (val: ValueType['groups'][0]) => void, index?: number) => ReactNode;
    /**
     * @zh 如何从单个条件中获取 React 的 key 值，不指定则使用条件组对应的 `index` 作为 key
     * @en How to get the React key value from a single group, if not specified, use the `index` of the group as the key
     */
    groupKey?: (val: ValueType['groups'][0]) => string | number;
    /**
     * @zh 新增一个条件组
     * @en Add a new condition group
     */
    newGroup?: () => ConditionGroup<Condition, Relation>;
    /**
     * @zh 逻辑关系的选项
     * @en Logic relation options
     * @defaultValue ['and', 'or']
     */
    relationOptions?: SelectProps['options'];
}
/**
 * @title CConditions.Relation
 */
export interface CRelationProps {
    /**
     * @zh 尺寸大小
     * @en size
     * @defaultValue 'default'
     */
    size?: 'small' | 'default';
    /**
     * @zh 是否是展示态（默认为否，可编辑）
     * @en Display mode
     * @defaultValue false
     */
    readonly?: boolean;
    /**
     * @zh 是否禁止修改
     * @en Disable editing
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * @zh 值
     * @en Value
     */
    value?: string | number;
    /**
     * @zh 值改变时的回调
     * @en Callback when value changes
     */
    onChange?: (value: string | number) => void;
    /**
     * @zh 逻辑关系的选项
     * @en Logic relation options
     * @defaultValue ['and', 'or']
     */
    options?: SelectProps['options'];
    /**
     * @zh 自定义选择器，`options` 和 `children` 二选一即可，但 `options` 优先级更高
     * @en Custom selector, `options` and `children` can be selected, but `options` has a higher priority
     */
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
}
