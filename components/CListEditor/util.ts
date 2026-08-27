import type { InitValue, Item, Value, ItemControl, EditingDisableVerify, InitValueDisableChange } from './interface';
import { pick, omit, isEqual, isBoolean } from 'lodash-es';
/**
 * 格式化初始值
 * @param initValue 传入组件的初始值
 * @returns 返回符合Form.List的初始值结构
 */
export function formatInitValue(initValue: InitValue[] | undefined) {
  if (!initValue) return undefined;
  return initValue.map(v => pick(v, 'value').value);
}

/**
 * 生成完整初始值的控制参数
 * @param initValue 传入组件的初始值
 * @param itemsKey 传入组件Item中的label，用于补全初始值
 * @returns 返回除value外完整的初始值结构
 */
export function getInitItemControl(initValue: InitValue[] | Value[] | undefined, itemsKey: string[]): ItemControl[] {
  if (!initValue) return [];

  return initValue.map(item => ({
    disableDelete: false,
    disableDeleteTip: '',
    rowDisabled: false,
    rowDisabledTip: '',
    /** 整合初始有disableChange的item和没有disableChange的item的disableChange */
    disableChange: {
      ...getInitDisableChange(
        itemsKey,
        isBoolean(item.rowDisabled) ? item.rowDisabled : false,
        item.disableChange as unknown as {
          [label: string]: {
            disabled?: boolean;
            tip?: string;
            disableRules?: boolean;
          };
        },
      ),
    },
    ...omit(item, 'value', 'disableChange'),
  })) as unknown as ItemControl[];
}

/**
 * 描述：生成每行初始的disabledChange
 * @param itemsKey 传入组件Item中的label，用于补全初始值
 * @param rowDisable 整行不可用限制
 * @param initDisableChange 行中具体的限制参数
 * 用途：1、给初始值中不存在disableChange填充
 *      2、点击add时，给初始item填充
 *      3、编辑时返回disableIndex,填充item
 * */
export function getInitDisableChange(
  itemsKey: string[],
  rowDisable?: boolean,
  initDisableChange?: {
    [label: string]: {
      disabled?: boolean;
      tip?: string;
      disableRules?: boolean;
    };
  },
) {
  const disableChange: InitValueDisableChange = {};
  for (const val of itemsKey) {
    if (initDisableChange) {
      disableChange[val] = {
        disabled: rowDisable || initDisableChange?.[val]?.disabled || false,
        tip: initDisableChange?.[val]?.tip || '',
        disableRules: initDisableChange?.[val]?.disableRules || false,
      };
    } else {
      disableChange[val] = {
        disabled: rowDisable || false,
        tip: '',
        disableRules: false,
      };
    }
  }
  return disableChange;
}

/** add时创建空一行空itemValue的数据占位 */
export function getEmptyItemValues(items: Item[]): Value[] {
  const val: Value = {};
  for (const it of items) {
    val[it.label] = '';
  }
  return [val];
}

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
export function changeItemControl(
  old: ItemControl[],
  editingDisableVerify: Omit<EditingDisableVerify, 'disableAdd' | 'disableAddTip'>,
  itemsKey: string[],
): ItemControl[] {
  const { disableDelete, disableDeleteTip, disableItemsIndex, disableItemsIndexTip } = editingDisableVerify;
  // disableDelete disableDeleteTip控制所有item的删除功能，和 disableItemsIndex disableItemsIndexTip需要做融合，优先级是disableItemsIndex， 但是如果没有设置disableItemsIndex，当前所有的删除功能应该以disableDelete为先
  const newControl = old.map(item => {
    item.disableDelete = disableDelete ?? item.disableDelete; // false ?? true  => false
    item.disableDeleteTip = item.disableDelete ? disableDeleteTip || item.disableDeleteTip : '';
    return item;
  });
  if (disableItemsIndex) {
    for (const item of disableItemsIndex) {
      if (typeof item === 'number' && item < newControl.length) {
        newControl[item].disableDelete = true;
        newControl[item].disableDeleteTip = disableItemsIndexTip ?? newControl[item].disableDeleteTip;
        newControl[item].disableChange = getInitDisableChange(itemsKey, true);
        newControl[item].rowDisabled = true;
        newControl[item].rowDisabledTip = disableItemsIndexTip ?? newControl[item].rowDisabledTip;
      } else if (typeof item === 'object') {
        const { index, disableDelete, disableDeleteTip, disableChange } = item;
        if (index < newControl.length) {
          newControl[index].rowDisabled = false;
          newControl[index].disableDelete = disableDelete || newControl[index].disableDelete;
          newControl[index].disableDeleteTip = disableDeleteTip ?? newControl[index].disableDeleteTip;
          newControl[index].disableChange = {
            ...newControl[index].disableChange,
            ...disableChange,
          };
        }
      }
    }
  }
  return newControl;
}

/**
 * 检查某一列的值是否重复
 * @param v 当前Form.Item值
 * @param cb 校验失败调用
 * @param needCheck 是否需要检查
 * @param itemValues 该列的所有值
 * @param message 提示信息，默认为'该值禁止重复添加'
 */
export function repeatLabelValidator(
  v: string | string[] | boolean | number,
  cb: (error?: React.ReactNode) => void,
  needCheck: boolean,
  itemValues: (string | string[] | boolean | number)[],
  message: string,
) {
  if (!v || !itemValues || !needCheck) return;
  for (const value of itemValues) {
    if (Array.isArray(value) && Array.isArray(v)) {
      if (isEqual(value, v) && value.length && v.length) cb(message);
    } else {
      if (value === v) cb(message);
    }
  }
}

export function needCheck(repeatValidator: string[] | string, label: string): boolean {
  if (Array.isArray(repeatValidator)) {
    return repeatValidator.includes(label);
  }
  return repeatValidator === label;
}

/**
 * 获取除指定行之外，label所有行的值
 * @param listValues list中所有值
 * @param label 指定label
 * @param index 指定行
 * @returns 除指定行之外，label所有行的值
 */
export function getItemValuesWidthOutIndex(
  listValues: Value[] = [],
  label: string,
  index: number,
): (string | string[] | boolean | number)[] {
  return listValues.map(values => values[label]).filter((_, idx) => idx !== index);
}

/**
 * 决定整行的popover是否可用
 *
 * 使用PopoverVerify时不能使用
 * 这一行不能删除编辑时，不能使用popover
 * 没有错误提示，没有用户传入的popoverContent时，不能使用popover
 *
 */
export function disabledItemPopover(usePopoverVerify: boolean, disableRow: boolean, content: React.ReactNode): boolean {
  return usePopoverVerify || disableRow || !content;
}

/**
 * add 设置默认值
 * items: 配置
 *
 */
export function getAddDefaultValue(items: Item[]) {
  const defaultValue: Record<string, any> = {};
  items.forEach(({ addDefaultValue, label }) => {
    if (addDefaultValue) {
      defaultValue[label] = addDefaultValue;
    }
  });
  return defaultValue;
}
