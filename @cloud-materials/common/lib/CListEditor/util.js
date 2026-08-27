"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddDefaultValue = exports.disabledItemPopover = exports.getItemValuesWidthOutIndex = exports.needCheck = exports.repeatLabelValidator = exports.changeItemControl = exports.getEmptyItemValues = exports.getInitDisableChange = exports.getInitItemControl = exports.formatInitValue = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
/**
 * 格式化初始值
 * @param initValue 传入组件的初始值
 * @returns 返回符合Form.List的初始值结构
 */
function formatInitValue(initValue) {
    if (!initValue)
        return undefined;
    return initValue.map(function (v) { return (0, lodash_es_1.pick)(v, 'value').value; });
}
exports.formatInitValue = formatInitValue;
/**
 * 生成完整初始值的控制参数
 * @param initValue 传入组件的初始值
 * @param itemsKey 传入组件Item中的label，用于补全初始值
 * @returns 返回除value外完整的初始值结构
 */
function getInitItemControl(initValue, itemsKey) {
    if (!initValue)
        return [];
    return initValue.map(function (item) { return (tslib_1.__assign({ disableDelete: false, disableDeleteTip: '', rowDisabled: false, rowDisabledTip: '', 
        /** 整合初始有disableChange的item和没有disableChange的item的disableChange */
        disableChange: tslib_1.__assign({}, getInitDisableChange(itemsKey, (0, lodash_es_1.isBoolean)(item.rowDisabled) ? item.rowDisabled : false, item.disableChange)) }, (0, lodash_es_1.omit)(item, 'value', 'disableChange'))); });
}
exports.getInitItemControl = getInitItemControl;
/**
 * 描述：生成每行初始的disabledChange
 * @param itemsKey 传入组件Item中的label，用于补全初始值
 * @param rowDisable 整行不可用限制
 * @param initDisableChange 行中具体的限制参数
 * 用途：1、给初始值中不存在disableChange填充
 *      2、点击add时，给初始item填充
 *      3、编辑时返回disableIndex,填充item
 * */
function getInitDisableChange(itemsKey, rowDisable, initDisableChange) {
    var e_1, _a;
    var _b, _c, _d;
    var disableChange = {};
    try {
        for (var itemsKey_1 = tslib_1.__values(itemsKey), itemsKey_1_1 = itemsKey_1.next(); !itemsKey_1_1.done; itemsKey_1_1 = itemsKey_1.next()) {
            var val = itemsKey_1_1.value;
            if (initDisableChange) {
                disableChange[val] = {
                    disabled: rowDisable || ((_b = initDisableChange === null || initDisableChange === void 0 ? void 0 : initDisableChange[val]) === null || _b === void 0 ? void 0 : _b.disabled) || false,
                    tip: ((_c = initDisableChange === null || initDisableChange === void 0 ? void 0 : initDisableChange[val]) === null || _c === void 0 ? void 0 : _c.tip) || '',
                    disableRules: ((_d = initDisableChange === null || initDisableChange === void 0 ? void 0 : initDisableChange[val]) === null || _d === void 0 ? void 0 : _d.disableRules) || false,
                };
            }
            else {
                disableChange[val] = {
                    disabled: rowDisable || false,
                    tip: '',
                    disableRules: false,
                };
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (itemsKey_1_1 && !itemsKey_1_1.done && (_a = itemsKey_1.return)) _a.call(itemsKey_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return disableChange;
}
exports.getInitDisableChange = getInitDisableChange;
/** add时创建空一行空itemValue的数据占位 */
function getEmptyItemValues(items) {
    var e_2, _a;
    var val = {};
    try {
        for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var it_1 = items_1_1.value;
            val[it_1.label] = '';
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return [val];
}
exports.getEmptyItemValues = getEmptyItemValues;
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
function changeItemControl(old, editingDisableVerify, itemsKey) {
    var e_3, _a;
    var disableDelete = editingDisableVerify.disableDelete, disableDeleteTip = editingDisableVerify.disableDeleteTip, disableItemsIndex = editingDisableVerify.disableItemsIndex, disableItemsIndexTip = editingDisableVerify.disableItemsIndexTip;
    // disableDelete disableDeleteTip控制所有item的删除功能，和 disableItemsIndex disableItemsIndexTip需要做融合，优先级是disableItemsIndex， 但是如果没有设置disableItemsIndex，当前所有的删除功能应该以disableDelete为先
    var newControl = old.map(function (item) {
        item.disableDelete = disableDelete !== null && disableDelete !== void 0 ? disableDelete : item.disableDelete; // false ?? true  => false
        item.disableDeleteTip = item.disableDelete ? disableDeleteTip || item.disableDeleteTip : '';
        return item;
    });
    if (disableItemsIndex) {
        try {
            for (var disableItemsIndex_1 = tslib_1.__values(disableItemsIndex), disableItemsIndex_1_1 = disableItemsIndex_1.next(); !disableItemsIndex_1_1.done; disableItemsIndex_1_1 = disableItemsIndex_1.next()) {
                var item = disableItemsIndex_1_1.value;
                if (typeof item === 'number' && item < newControl.length) {
                    newControl[item].disableDelete = true;
                    newControl[item].disableDeleteTip = disableItemsIndexTip !== null && disableItemsIndexTip !== void 0 ? disableItemsIndexTip : newControl[item].disableDeleteTip;
                    newControl[item].disableChange = getInitDisableChange(itemsKey, true);
                    newControl[item].rowDisabled = true;
                    newControl[item].rowDisabledTip = disableItemsIndexTip !== null && disableItemsIndexTip !== void 0 ? disableItemsIndexTip : newControl[item].rowDisabledTip;
                }
                else if (typeof item === 'object') {
                    var index = item.index, disableDelete_1 = item.disableDelete, disableDeleteTip_1 = item.disableDeleteTip, disableChange = item.disableChange;
                    if (index < newControl.length) {
                        newControl[index].rowDisabled = false;
                        newControl[index].disableDelete = disableDelete_1 || newControl[index].disableDelete;
                        newControl[index].disableDeleteTip = disableDeleteTip_1 !== null && disableDeleteTip_1 !== void 0 ? disableDeleteTip_1 : newControl[index].disableDeleteTip;
                        newControl[index].disableChange = tslib_1.__assign(tslib_1.__assign({}, newControl[index].disableChange), disableChange);
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (disableItemsIndex_1_1 && !disableItemsIndex_1_1.done && (_a = disableItemsIndex_1.return)) _a.call(disableItemsIndex_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    return newControl;
}
exports.changeItemControl = changeItemControl;
/**
 * 检查某一列的值是否重复
 * @param v 当前Form.Item值
 * @param cb 校验失败调用
 * @param needCheck 是否需要检查
 * @param itemValues 该列的所有值
 * @param message 提示信息，默认为'该值禁止重复添加'
 */
function repeatLabelValidator(v, cb, needCheck, itemValues, message) {
    var e_4, _a;
    if (!v || !itemValues || !needCheck)
        return;
    try {
        for (var itemValues_1 = tslib_1.__values(itemValues), itemValues_1_1 = itemValues_1.next(); !itemValues_1_1.done; itemValues_1_1 = itemValues_1.next()) {
            var value = itemValues_1_1.value;
            if (Array.isArray(value) && Array.isArray(v)) {
                if ((0, lodash_es_1.isEqual)(value, v) && value.length && v.length)
                    cb(message);
            }
            else {
                if (value === v)
                    cb(message);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (itemValues_1_1 && !itemValues_1_1.done && (_a = itemValues_1.return)) _a.call(itemValues_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
exports.repeatLabelValidator = repeatLabelValidator;
function needCheck(repeatValidator, label) {
    if (Array.isArray(repeatValidator)) {
        return repeatValidator.includes(label);
    }
    return repeatValidator === label;
}
exports.needCheck = needCheck;
/**
 * 获取除指定行之外，label所有行的值
 * @param listValues list中所有值
 * @param label 指定label
 * @param index 指定行
 * @returns 除指定行之外，label所有行的值
 */
function getItemValuesWidthOutIndex(listValues, label, index) {
    if (listValues === void 0) { listValues = []; }
    return listValues.map(function (values) { return values[label]; }).filter(function (_, idx) { return idx !== index; });
}
exports.getItemValuesWidthOutIndex = getItemValuesWidthOutIndex;
/**
 * 决定整行的popover是否可用
 *
 * 使用PopoverVerify时不能使用
 * 这一行不能删除编辑时，不能使用popover
 * 没有错误提示，没有用户传入的popoverContent时，不能使用popover
 *
 */
function disabledItemPopover(usePopoverVerify, disableRow, content) {
    return usePopoverVerify || disableRow || !content;
}
exports.disabledItemPopover = disabledItemPopover;
/**
 * add 设置默认值
 * items: 配置
 *
 */
function getAddDefaultValue(items) {
    var defaultValue = {};
    items.forEach(function (_a) {
        var addDefaultValue = _a.addDefaultValue, label = _a.label;
        if (addDefaultValue) {
            defaultValue[label] = addDefaultValue;
        }
    });
    return defaultValue;
}
exports.getAddDefaultValue = getAddDefaultValue;
//# sourceMappingURL=util.js.map