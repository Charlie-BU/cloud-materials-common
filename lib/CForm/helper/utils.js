"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArrayDuplicates = exports.getBrotherField = exports.getParentField = void 0;
var core_1 = require("@formily/core");
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../../CConfigProvider");
var reactive_1 = require("@formily/reactive");
/**
 * 获取父节点
 * @param field 当前节点
 * @returns 父节点 field
 */
var getParentField = function (field) {
    var parentPath = field.path.pop();
    var parentField = field.query(parentPath).take();
    // 通过 Path 找不到父节点，说明 Name 为点语法，直接通过字段的 parentName 获取
    if (!parentField) {
        return field.parent;
    }
    return parentField;
};
exports.getParentField = getParentField;
/**
 * 获取兄弟节点
 * @param currentField 当前节点
 * @param brotherPath 兄弟节点的path
 * @returns 兄弟节点
 */
var getBrotherField = function (currentField, brotherPath) {
    var _a, _b, _c, _d, _e;
    var parentField = (0, exports.getParentField)(currentField);
    var brotherFieldPath = (_a = parentField === null || parentField === void 0 ? void 0 : parentField.path) === null || _a === void 0 ? void 0 : _a.push(brotherPath);
    var brotherField = (_c = (_b = parentField === null || parentField === void 0 ? void 0 : parentField.query(brotherFieldPath)) === null || _b === void 0 ? void 0 : _b.take) === null || _c === void 0 ? void 0 : _c.call(_b);
    // 通过父节点查询不到
    // 说明存在 name 为 点语法的情况，此时直接通过 path 获取
    if (!brotherField) {
        brotherFieldPath = currentField.path.pop().push(brotherPath);
        brotherField = (_e = (_d = parentField === null || parentField === void 0 ? void 0 : parentField.query(brotherFieldPath)) === null || _d === void 0 ? void 0 : _d.take) === null || _e === void 0 ? void 0 : _e.call(_d);
    }
    if (!brotherField) {
        console.warn("\u8BF7\u68C0\u67E5 ".concat(currentField.path.toString(), " \u662F\u5426\u6709\u5144\u5F1F\u8282\u70B9"));
    }
    return brotherField;
};
exports.getBrotherField = getBrotherField;
var findDuplicateIndices = function (array) {
    var map = {};
    var duplicates = [];
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (!value)
            continue;
        if (map[value] !== undefined) {
            if (!duplicates.includes(map[value])) {
                duplicates.push(map[value]);
            }
            duplicates.push(i);
        }
        else {
            map[value] = i;
        }
    }
    return duplicates;
};
var checkArrayDuplicates = function (params) {
    var arrayFieldName = params.arrayFieldName, itemName = params.itemName, message = params.message, _a = params.firstError, firstError = _a === void 0 ? true : _a;
    var _b = (0, CConfigProvider_1.getGlobalContextConfig)(), locale = _b.locale, formatLocale = _b.formatLocale;
    (0, core_1.onFieldReact)(arrayFieldName, function (field, form) {
        var _a, _b;
        if (!(0, core_1.isArrayField)(field)) {
            console.warn("\u8BF7\u68C0\u67E5 ".concat(arrayFieldName, " \u662F\u5426\u4E3A\u6570\u7EC4\u5B57\u6BB5"));
            return false;
        }
        if (!field.value || ((_a = field === null || field === void 0 ? void 0 : field.value) === null || _a === void 0 ? void 0 : _a.length) <= 0)
            return;
        var subNames = (0, lodash_es_1.isArray)(itemName) ? itemName : itemName ? [itemName] : [];
        var subMessage = (0, lodash_es_1.isArray)(message) ? message : message ? [message] : [];
        // 数组值为对象，这时为对象数组
        var isObjectArray = (0, lodash_es_1.isObject)((0, lodash_es_1.first)(field.value));
        var valuesMap = {};
        if (isObjectArray) {
            valuesMap = subNames.reduce(function (previousValue, currentValue) {
                var key = currentValue.toString();
                previousValue[key] = field.value.flatMap(function (item) { return item === null || item === void 0 ? void 0 : item[key]; });
                return previousValue;
            }, {});
        }
        var getDuplicateTag = function (duplicateIndices) {
            var duplicateTag = field.value.reduce(function (pre, _, index) {
                if (duplicateIndices.includes(index)) {
                    pre.push(true);
                }
                else {
                    pre.push(false);
                }
                return pre;
            }, []);
            return duplicateTag;
        };
        var setErrors = function (duplicateTag, errorMessage, name) {
            (0, reactive_1.untracked)(function () {
                duplicateTag.forEach(function (duplicate, index) {
                    var query = form.query("".concat(field.path.toString()).concat(isObjectArray ? ".".concat(index) : '', ".*"));
                    /**
                     * 以下方法模糊匹配在 index > 0 时就匹配不到
                     * 推测是 formily/path 的 bug ，暂时没看源码调试  @xuchang 可以找时间研究一下
                     */
                    // form.query(field.address.concat([index, '*'])).forEach(field => {
                    //   if (isDataField(field)) {
                    //     duplicateField = field;
                    //   }
                    // });
                    var duplicateField;
                    query.forEach(function (item) {
                        if (core_1.FormPath.parse("".concat(arrayFieldName, ".").concat(index).concat(isObjectArray ? '.*' : '')).match(item.path.toString())) {
                            if ((0, core_1.isDataField)(item)) {
                                if (!isObjectArray || item.path.match("".concat(arrayFieldName, ".").concat(index, ".").concat(name))) {
                                    duplicateField = item;
                                }
                            }
                        }
                    });
                    if (!duplicateField)
                        return;
                    if (!duplicate) {
                        duplicateField.setSelfErrors([]);
                        return;
                    }
                    if (firstError || duplicateTag.indexOf(duplicate) !== index) {
                        duplicateField.setSelfErrors([errorMessage]);
                    }
                    else {
                        duplicateField.setSelfErrors([]);
                    }
                });
            });
        };
        if (isObjectArray) {
            Object.keys(valuesMap).forEach(function (name, index) {
                var _a;
                var duplicateIndices = findDuplicateIndices(valuesMap[name]);
                var errorMessage = (_a = subMessage[index]) !== null && _a !== void 0 ? _a : formatLocale(locale.CForm.array.disabledRepeatValueInObjArr, { name: name });
                var duplicateTag = getDuplicateTag(duplicateIndices);
                setErrors(duplicateTag, errorMessage, name);
            });
        }
        else {
            var duplicateIndices = findDuplicateIndices(field.value);
            var errorMessage = (_b = subMessage[0]) !== null && _b !== void 0 ? _b : locale.CForm.array.disabledRepeatValueInArr;
            var duplicateTag = getDuplicateTag(duplicateIndices);
            setErrors(duplicateTag, errorMessage, subNames[0].toString());
        }
    });
};
exports.checkArrayDuplicates = checkArrayDuplicates;
//# sourceMappingURL=utils.js.map