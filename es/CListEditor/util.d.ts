/// <reference types="react" />
import type { InitValue, Item, Value, ItemControl, EditingDisableVerify, InitValueDisableChange } from './interface';
/**
 * 格式化初始值
 * @param initValue 传入组件的初始值
 * @returns 返回符合Form.List的初始值结构
 */
export declare function formatInitValue(initValue: InitValue[] | undefined): Value[] | undefined;
/**
 * 生成完整初始值的控制参数
 * @param initValue 传入组件的初始值
 * @param itemsKey 传入组件Item中的label，用于补全初始值
 * @returns 返回除value外完整的初始值结构
 */
export declare function getInitItemControl(initValue: InitValue[] | Value[] | undefined, itemsKey: string[]): ItemControl[];
/**
 * 描述：生成每行初始的disabledChange
 * @param itemsKey 传入组件Item中的label，用于补全初始值
 * @param rowDisable 整行不可用限制
 * @param initDisableChange 行中具体的限制参数
 * 用途：1、给初始值中不存在disableChange填充
 *      2、点击add时，给初始item填充
 *      3、编辑时返回disableIndex,填充item
 * */
export declare function getInitDisableChange(itemsKey: string[], rowDisable?: boolean, initDisableChange?: {
    [label: string]: {
        disabled?: boolean;
        tip?: string;
        disableRules?: boolean;
    };
}): InitValueDisableChange;
/** add时创建空一行空itemValue的数据占位 */
export declare function getEmptyItemValues(items: Item[]): Value[];
/**
 * 根据EditingDisableVerify的返回值，修改itemControl
 * 不可修改的情况存在以下几种：
 *  1、传入disableItemsIndex数组解析元素是number，指定行不可修改、删除。根据indexTip做整行的提示。
 *  2、同时传入disableItemsIndex和disableDelete，则disableDelete和对应tip不生效，被整行的行为覆盖。
 *  3、传入disableItemsIndex是解析元素是对象，根据内部数据，决定指定改行的item是否不可修改，优先级最高。
 *
 * @param old 原ItemControl值
 * @param editingDisableVerify 传入函数onEditingDisableVerify的返回值
 * @param itemsKey 所有item的key值
 * @returns 新temControl值
 */
export declare function changeItemControl(old: ItemControl[], editingDisableVerify: Omit<EditingDisableVerify, 'disableAdd' | 'disableAddTip'>, itemsKey: string[]): ItemControl[];
/**
 * 检查某一列的值是否重复
 * @param v 当前Form.Item值
 * @param cb 校验失败调用
 * @param needCheck 是否需要检查
 * @param itemValues 该列的所有值
 * @param message 提示信息，默认为'该值禁止重复添加'
 */
export declare function repeatLabelValidator(v: string | string[] | boolean | number, cb: (error?: React.ReactNode) => void, needCheck: boolean, itemValues: (string | string[] | boolean | number)[], message: string): void;
export declare function needCheck(repeatValidator: string[] | string, label: string): boolean;
/**
 * 获取除指定行之外，label所有行的值
 * @param listValues list中所有值
 * @param label 指定label
 * @param index 指定行
 * @returns 除指定行之外，label所有行的值
 */
export declare function getItemValuesWidthOutIndex(listValues: Value[] | undefined, label: string, index: number): (string | string[] | boolean | number)[];
/**
 * 决定整行的popover是否可用
 *
 * 使用PopoverVerify时不能使用
 * 这一行不能删除编辑时，不能使用popover
 * 没有错误提示，没有用户传入的popoverContent时，不能使用popover
 *
 */
export declare function disabledItemPopover(usePopoverVerify: boolean, disableRow: boolean, content: React.ReactNode): boolean;
/**
 * add 设置默认值
 * items: 配置
 *
 */
export declare function getAddDefaultValue(items: Item[]): Record<string, any>;
