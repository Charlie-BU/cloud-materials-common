import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
import { onFieldInit, isDataField, onFieldValueChange, isObjectField, onFormMount, onFormGraphChange, onFormUnmount, isVoidField, } from '@formily/core';
import { debounce, isArray, noop, intersection, xorWith, isNil, get, values } from 'lodash-es';
import { ReloadPrefixKey, SubFieldValidKey } from '../const';
import { autorun, batch, untracked } from '@formily/reactive';
import { checkArrayDuplicates as innerCheckArrayDuplicates } from './utils';
import { safeRace } from '@byted-c/storage.utils.safe-race';
var wrapArr = function (item) { return (isArray(item) ? item : [item]); };
var reloadKey = function (name) {
    return ReloadPrefixKey + (isArray(name) ? name.map(function (n) { return n.toString(); }).join('_') : name.toString());
};
export var logWarn = function (message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    process.env.NODE_ENV !== 'production' && console.warn.apply(console, __spreadArray([message], __read(optionalParams), false));
};
var batchFieldHandle = function (params) {
    var name = params.name, effectHooks = params.effectHooks, callback = params.callback, debounceWait = params.debounceWait;
    var _callback = debounce(callback, debounceWait);
    if (!isArray(name)) {
        effectHooks(name, _callback);
    }
    else {
        name.forEach(function (pattern) { return effectHooks(pattern, _callback); });
    }
};
var runFieldsCallbacks = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var form, getDepValues, fieldNames, fetchData, fieldCallback, voidFieldCallback, depValues, fields, dataFields, fetchResult, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                form = params.form, getDepValues = params.getDepValues, fieldNames = params.fieldNames, fetchData = params.fetchData, fieldCallback = params.fieldCallback, voidFieldCallback = params.voidFieldCallback;
                depValues = getDepValues === null || getDepValues === void 0 ? void 0 : getDepValues(form);
                fields = [];
                wrapArr(fieldNames).forEach(function (pattern) {
                    form.query(pattern).forEach(function (f) {
                        f && fields.push(f);
                    });
                });
                if (fields.length <= 0)
                    return [2 /*return*/];
                dataFields = fields.filter(isDataField);
                fetchResult = null;
                if (!fetchData) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                dataFields.forEach(function (_field) {
                    _field.loading = true;
                });
                return [4 /*yield*/, fetchData({ depValues: depValues, form: form, fields: isArray(fieldNames) ? fields : fields[0] })];
            case 2:
                fetchResult = _a.sent();
                dataFields.forEach(function (_field) {
                    _field.setData({ failedData: {} });
                    _field.loading = false;
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                dataFields.forEach(function (_field) {
                    // TODO: 手动加入LoadingError组件使用
                    _field.setData({ failedData: { failed: true, notifyKey: reloadKey(fieldNames) } });
                    _field.loading = false;
                });
                console.error("Field - ".concat(wrapArr(fieldNames).join(','), " \u56DE\u8C03\u51FD\u6570fetchData\u8FD0\u884C\u9519\u8BEF"), error_1);
                return [2 /*return*/];
            case 4:
                // 处理同步回调
                if (fieldCallback) {
                    dataFields.forEach(function (currField) {
                        if (isArray(fieldCallback)) {
                            fieldCallback.forEach(function (cb) {
                                cb({ form: form, fetchResult: fetchResult, depValues: depValues, currField: currField });
                            });
                        }
                        else {
                            fieldCallback({ form: form, fetchResult: fetchResult, depValues: depValues, currField: currField });
                        }
                    });
                }
                if (voidFieldCallback) {
                    fields.filter(isVoidField).forEach(function (currField) {
                        voidFieldCallback({ form: form, fetchResult: fetchResult, depValues: depValues, currField: currField });
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
var Effect = /** @class */ (function () {
    function Effect(config) {
        this.data = {};
        this.debounceWait = 200;
        this.enableRaceCondition = undefined;
        var time = config === null || config === void 0 ? void 0 : config.debounceWait;
        if (!isNil(time) && !Number.isNaN(time)) {
            this.debounceWait = time;
        }
        this.enableRaceCondition = config === null || config === void 0 ? void 0 : config.enableRaceCondition;
    }
    /**
     * (多)字段初始化逻辑，支持单个/批量操作
     * @param {EffectParams} options
     * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
     * @param options.fetchData 可配置拉取数据请求 & 相应格式化，函数返回结果会传递给fieldCallback做入参
     * @param options.fieldCallback 可配置每个字段的处理，如：设置dataSource、visible、value等
     * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
     * @param options.debounceWait 可配置多字段响应防抖时间
     * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
     */
    Effect.prototype.fieldsInit = function (options) {
        var fieldNames = options.fieldNames, fetchData = options.fetchData, fieldCallback = options.fieldCallback, voidFieldCallback = options.voidFieldCallback, _a = options.debounceWait, debounceWait = _a === void 0 ? this.debounceWait : _a, _b = options.enableRaceCondition, enableRaceCondition = _b === void 0 ? this.enableRaceCondition : _b;
        var safeRaceFetchData = safeRace(fetchData, { enabled: enableRaceCondition });
        batchFieldHandle({
            name: fieldNames,
            debounceWait: debounceWait,
            effectHooks: onFieldInit,
            callback: function (_, form) {
                runFieldsCallbacks({ form: form, fieldNames: fieldNames, fetchData: safeRaceFetchData, fieldCallback: fieldCallback, voidFieldCallback: voidFieldCallback });
            },
        });
        //TODO: LoadingError组件 重新加载触发钩子
        //onReloadFields(name, callback);
    };
    Effect.prototype.fieldsReactiveByDeps = function (options) {
        var fieldNames = options.fieldNames, fetchData = options.fetchData, fieldCallback = options.fieldCallback, voidFieldCallback = options.voidFieldCallback, _a = options.debounceWait, debounceWait = _a === void 0 ? this.debounceWait : _a, getDepValues = options.getDepValues;
        var dispose = null;
        var _runFieldsCallbacks = debounce(runFieldsCallbacks, debounceWait);
        var callback = function (_, form) {
            if (dispose) {
                // 多个field的初始化分批执行，会多次收集依赖，保留最后一次就行
                dispose();
            }
            dispose = autorun(function () {
                getDepValues(form);
                untracked(function () {
                    _runFieldsCallbacks({ form: form, fieldNames: fieldNames, getDepValues: getDepValues, fetchData: fetchData, fieldCallback: fieldCallback, voidFieldCallback: voidFieldCallback });
                });
            });
        };
        batchFieldHandle({ name: fieldNames, debounceWait: debounceWait, effectHooks: onFieldInit, callback: callback });
        //TODO: LoadingError组件 重新加载触发钩子
        //onReloadFields(name, callback);
    };
    /**
     * (多)字段联动逻辑，支持单个/批量操作
     * @param options
     * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
     * @param options.deps 被依赖的字段名/路径，支持传入单个 & 数组
     * @param options.watches 可以传入具体要监听的的属性集合，也可以不传，默认是监听每个 dep 的 value 变化
     * @param options.fetchData 可配置拉取数据请求 & 相应格式化，函数返回结果会传递给fieldCallback做入参
     * @param options.fieldCallback 可配置每个要操作字段的处理，如：设置dataSource、visible、value等
     * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
     * @param options.debounceWait 可配置多字段响应防抖时间
     * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
     */
    Effect.prototype.fieldsReactive = function (options) {
        var fieldNames = options.fieldNames, deps = options.deps, _a = options.watches, watches = _a === void 0 ? 'value' : _a, fetchData = options.fetchData, fieldCallback = options.fieldCallback, voidFieldCallback = options.voidFieldCallback, debounceWait = options.debounceWait, _b = options.enableRaceCondition, enableRaceCondition = _b === void 0 ? this.enableRaceCondition : _b;
        var safeRaceFetchData = safeRace(fetchData, { enabled: enableRaceCondition });
        this.fieldsReactiveByDeps({
            fieldNames: fieldNames,
            fetchData: safeRaceFetchData,
            fieldCallback: fieldCallback,
            voidFieldCallback: voidFieldCallback,
            debounceWait: debounceWait,
            getDepValues: function (form) {
                var depValues = {};
                wrapArr(deps).forEach(function (dep) {
                    var _field = form.query(dep).take();
                    // 被依赖字段可能在下一步/还未被init，此时field为空
                    depValues[dep] = _field;
                    if (_field) {
                        if (isArray(watches)) {
                            var _values_1 = {};
                            watches.forEach(function (key) {
                                var _a;
                                Object.assign(_values_1, (_a = {}, _a[key] = get(_field, key), _a));
                            });
                            depValues[dep] = _values_1;
                        }
                        else {
                            depValues[dep] = get(_field, watches);
                        }
                    }
                });
                return depValues;
            },
        });
    };
    /**
     * 全局数据的响应逻辑，支持单个/批量字段响应
     * @param options
     * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
     * @param options.fieldCallback 可配置每个要操作字段的处理，如：设置dataSource、visible、value等
     * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
     * @param options.debounceWait 可配置多字段响应防抖时间
     * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
     */
    Effect.prototype.formDataReactive = function (options) {
        var fieldNames = options.fieldNames, fetchData = options.fetchData, fieldCallback = options.fieldCallback, voidFieldCallback = options.voidFieldCallback, debounceWait = options.debounceWait, _a = options.enableRaceCondition, enableRaceCondition = _a === void 0 ? this.enableRaceCondition : _a;
        var safeRaceFetchData = safeRace(fetchData, { enabled: enableRaceCondition });
        this.fieldsReactiveByDeps({
            fieldNames: fieldNames,
            fetchData: safeRaceFetchData,
            fieldCallback: fieldCallback,
            voidFieldCallback: voidFieldCallback,
            debounceWait: debounceWait,
            getDepValues: function (form) { return (__assign({}, form.data)); },
        });
    };
    /**
     * 判断 ArrayItems/ArrayTable 中是否有重复的行
     * @param params
     * @param params.arrayFieldName 数组字段的 name
     * @param params.itemName 要校验的 item，传入数组可同时校验多列
     * @param params.firstError 重复时第一个重复项是否报错，默认 true
     * @param params.message 自定义错误信息，如果 itemName 传入多个，这里需要和 itemName 按顺序对应
     */
    Effect.prototype.checkArrayDuplicates = function (params) {
        innerCheckArrayDuplicates(params);
    };
    /**
     * 自动隐藏整个 Section，当子字段全部隐藏或为空时
     * @param {FormPathPattern} pattern
     */
    Effect.prototype.autoHiddenEmptySection = function (pattern) {
        this.fieldsReactiveByDeps({
            fieldNames: pattern,
            voidFieldCallback: function (_a) {
                var _b;
                var depValues = _a.depValues, currField = _a.currField;
                currField.hidden = !((_b = values(depValues)) === null || _b === void 0 ? void 0 : _b.find(Boolean));
            },
            getDepValues: function (form) {
                var _a;
                var depValues = {};
                var field = form.query(pattern).take();
                (_a = form.query("".concat(field === null || field === void 0 ? void 0 : field.address.entire, ".*"))) === null || _a === void 0 ? void 0 : _a.forEach(function (v) {
                    depValues[String(v.path.entire)] = v.selfDisplay === 'visible' || v.display === 'visible' || v.visible;
                });
                return depValues;
            },
        });
    };
    /**
     * 字段校验联动逻辑，任意一个改动自动触发其他关联字段校验
     * @param {FormPathPattern[]} patterns 互相触发校验的字段
     */
    Effect.prototype.validatorReactive = function (patterns) {
        // 避免同步里执行，因为validate是异步的
        var callback = debounce(function (_, form) {
            patterns
                .flatMap(function (pattern) { return form.query(pattern).map(function (f) { return f; }); })
                .filter(isDataField)
                .forEach(function (field) { return field.validate().catch(noop); });
        }, 10);
        patterns.forEach(function (pattern) {
            onFieldValueChange(pattern, callback);
        });
    };
    /**
     * 自动收集检测所有子字段是否合法
     * @param {FormPathPattern} pattern
     */
    Effect.prototype.subFieldValidChecker = function (pattern, options) {
        var _this = this;
        if (!pattern) {
            return;
        }
        var alwaysCheckOnGraphChange = (options !== null && options !== void 0 ? options : {}).alwaysCheckOnGraphChange;
        var patternKey = pattern.toString();
        if (this.data[patternKey]) {
            logWarn("subFieldValidChecker helper \u5BF9\u4E8E\u540C\u4E00\u5B57\u6BB5".concat(pattern, "\u53EA\u80FD\u8C03\u7528\u4E00\u6B21\u3002"));
            return;
        }
        this.data[patternKey] = true;
        var preSubFieldsPath = [];
        var currentParentField = null;
        var currentSubFields = [];
        var checkHasChanged = function (a, b) {
            if (a.length !== b.length) {
                return true;
            }
            var inter = intersection(a, b);
            return inter.length !== a.length;
        };
        var checkSubValidByWithOutTrack = function (field, subFields) { return __awaiter(_this, void 0, void 0, function () {
            var notModifedFields, errorFields, isInValid, needResetFields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!field || !subFields) {
                            return [2 /*return*/];
                        }
                        notModifedFields = subFields.filter(function (f) { return !f.modified; });
                        errorFields = notModifedFields.filter(function (f) { return f.errors.length > 0; });
                        return [4 /*yield*/, Promise.all(notModifedFields.map(function (f) { return f.validate().catch(function () { }); }))];
                    case 1:
                        _a.sent();
                        isInValid = subFields.map(function (f) { return f.valid; }).some(function (v) { return !v; });
                        field.value[SubFieldValidKey] = !isInValid;
                        needResetFields = xorWith(errorFields, notModifedFields.filter(function (f) { return f.errors.length > 0; }), function (a, b) { return a.address.entire === b.address.entire; });
                        if (needResetFields.length > 0) {
                            batch(function () {
                                needResetFields.forEach(function (f) {
                                    return f.setFeedback({
                                        type: 'error',
                                        messages: [],
                                    });
                                });
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        var handelGraphChange = debounce(function (form) {
            var field = form.query(pattern).take();
            if (field) {
                if (!isObjectField(field)) {
                    logWarn("subFieldValidChecker helper \u53EA\u80FD\u7528\u4E8EObjectField\uFF0C\u800C".concat(field.path.entire, " \u7C7B\u578B\u4E3A").concat(field === null || field === void 0 ? void 0 : field.displayName));
                    return;
                }
                // 取所有的子孙节点
                var subFields = form.query("".concat(field.address.entire, ".*")).map().filter(isDataField);
                var subFieldsPath = subFields.map(function (f) { return f.address.entire; });
                // 排个序 & 对比
                var hasSubChanged = checkHasChanged(preSubFieldsPath, subFieldsPath);
                if (alwaysCheckOnGraphChange || hasSubChanged) {
                    currentParentField = field;
                    currentSubFields = subFields;
                    checkSubValidByWithOutTrack(field, subFields);
                }
                preSubFieldsPath = subFieldsPath;
            }
        }, 100);
        var handleFieldChange = debounce(function (field) {
            // formily升级之后，原先Field的includes方法内部逻辑发生改变
            // 导致即使是两个完全相同的字段，也有可能无法通过includes返回true
            // 因此这里使用专门的逻辑来实现includes的判断
            var ifInclude = currentSubFields === null || currentSubFields === void 0 ? void 0 : currentSubFields.map(function (item) { return item.path.entire; }).includes(field.path.entire);
            if (ifInclude) {
                checkSubValidByWithOutTrack(currentParentField, currentSubFields);
            }
        }, 50);
        onFieldValueChange('*', handleFieldChange);
        onFormMount(handelGraphChange);
        onFormGraphChange(handelGraphChange);
        onFormUnmount(function () {
            handelGraphChange.cancel();
            handleFieldChange === null || handleFieldChange === void 0 ? void 0 : handleFieldChange.cancel();
            delete _this.data[patternKey];
        });
    };
    return Effect;
}());
export default Effect;
//# sourceMappingURL=effect.js.map