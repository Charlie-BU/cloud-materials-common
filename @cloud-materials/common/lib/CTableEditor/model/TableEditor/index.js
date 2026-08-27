"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableEditor = void 0;
var tslib_1 = require("tslib");
var index_1 = require("../../../CTable/core/index");
var effects_1 = require("../../../CTable/core/effects");
var utils_1 = require("../../../CForm/shared/utils");
var core_1 = require("@formily/core");
var Action_1 = require("../Action");
var ActionHistory_1 = require("../ActionHistory");
var lodash_es_1 = require("lodash-es");
var reactive_1 = require("@formily/reactive");
var constants_1 = require("../../constants");
var utils_2 = require("../../utils");
// 先实现 MVP 版，再往里面加东西
// table data -> form values 的数据链路说明
// 有两种情况 table data 全量更新和部分更新
// 1. 全量更新: 包括本地模式第一次装载 data、远程模式每次 fetch 请求、受控模式每次接收到 value。
// table data 全量更新必须同步到 form，所以在 model 层中覆写了 table 的 onTableUpdateDataEnd 钩子，如果数据变化则设置 formValues
// 2. 部分更新: 只有新增行和删除行两种情况
// 部分更新为什么不能也放在同一个钩子里？因为 table 的数据不准确，比如修改了某个单元格，再新增一行，这时 table data 的数据没有包含修改了的单元格
// 所以不能直接拿 table data 设置 formValues，要手动设置
var TableEditor = /** @class */ (function () {
    function TableEditor(options) {
        var _this = this;
        this.originalTableData = [];
        // form value 手动批量设置的 flag
        this.isFormValueBatchChanging = false;
        var _tableConfig = options.tableConfig, _formConfig = options.formConfig, config = options.config;
        var tableConfig = (0, lodash_es_1.isFunction)(_tableConfig) ? _tableConfig(this) : _tableConfig;
        var formConfig = (0, lodash_es_1.isFunction)(_formConfig) ? _formConfig(this) : _formConfig;
        this.config = config;
        this.actionHistory = new ActionHistory_1.ActionHistory();
        this.form = (0, core_1.createForm)(tslib_1.__assign(tslib_1.__assign({}, formConfig), { effects: function (form) {
                var _a;
                (_a = formConfig === null || formConfig === void 0 ? void 0 : formConfig.effects) === null || _a === void 0 ? void 0 : _a.call(formConfig, form);
                // 每次单元格值变化时，做个记录
                // 为什么路径是 *.*？因为只需要匹配 cell(Field) 的变化，而不希望匹配到 Row(ObjectField) 的变化
                // 需要在每次 formValues 全量变化时保存一份，用于对比前后值的差异
                // 因为撤销操作本身也会触发 onFieldValueChange，所以需要加个锁
                var isUndoing = false;
                (0, core_1.onFieldValueChange)('*.*', function (field, form) {
                    // 撤销触发的 onFieldValueChange 不执行 createAction
                    if (isUndoing || !_this.previousFormValues)
                        return;
                    var fieldPath = field.path.entire;
                    var oldValue = (0, lodash_es_1.get)(_this.previousFormValues, fieldPath);
                    _this.createAction({
                        undo: function () {
                            isUndoing = true;
                            field.setValue(oldValue);
                            // 将 previousFormValues 设置为当前值
                            (0, lodash_es_1.set)(_this.previousFormValues, fieldPath, oldValue);
                            isUndoing = false;
                        },
                    });
                    _this.previousFormValues = (0, reactive_1.toJS)(form.values);
                });
                // 2023-06-14 更新
                // 当 tableEditor.form validate 或 submit 时，滚动到第一个报错的字段
                (0, core_1.onFormValidateFailed)(function (form) {
                    var _a, _b;
                    // 筛掉所有非ValidateError类型的异常
                    var validateErrors = form.errors.filter(function (item) { return item.code === 'ValidateError'; });
                    var firstErrorAdrress = (_b = (_a = validateErrors === null || validateErrors === void 0 ? void 0 : validateErrors[0]) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.toString();
                    // 如果有校验报错，则移动至第一个报错的表单字段处
                    // 但需要注意的是，若该表单字段处于隐藏字段，此时处于隐藏状态，那么这个操作是无效的
                    if (firstErrorAdrress) {
                        var dom_1 = document.getElementById((0, utils_1.getFormFieldId)(firstErrorAdrress));
                        // 用 setTimeout 是为了避免和 CForm 的滚动行为冲突，同一时间只能有一个 dom 滚动
                        setTimeout(function () {
                            dom_1 === null || dom_1 === void 0 ? void 0 : dom_1.scrollIntoView({
                                behavior: 'smooth',
                                // 页面顶部和底部都容易被覆盖，所以将第一个报错表单移动至页面中间
                                block: 'center',
                            });
                        }, 0);
                    }
                });
            } }));
        // 在 TableEditor 内部处理 table 和 form 的一些逻辑，看起来也没问题，这里需要处理的逻辑最好都是 Model 层，而不是视图层的
        this.table = (0, index_1.createTable)(tslib_1.__assign(tslib_1.__assign({}, tableConfig), { rowKey: function (record) { return record[constants_1.ROW_KEY]; }, 
            // 给数据加 rowKey
            data: tableConfig.data ? (0, utils_2.addRowKeyToArray)(tableConfig.data) : undefined, fetcher: tableConfig.fetcher
                ? function (options) {
                    return tableConfig.fetcher(options).then(function (res) { return (tslib_1.__assign(tslib_1.__assign({}, res), { data: (0, utils_2.addRowKeyToArray)(res.data) })); });
                }
                : undefined, 
            // 处理 table data -> form values 的数据链路
            effects: function (options) {
                var _a;
                (_a = tableConfig === null || tableConfig === void 0 ? void 0 : tableConfig.effects) === null || _a === void 0 ? void 0 : _a.call(tableConfig, options);
                // 在每次 tableData 全量更新时，设置 form values
                (0, effects_1.onTableUpdateDataEnd)(function (_a) {
                    // 2023-9-12 更新
                    // 受控模式下，以下几种情况会触发 onTableUpdateDataEnd：分页、排序、筛选、value 改变
                    // 其中，分页、筛选、排序只是在展示层对数据做了处理，不应该修改 formValues
                    var table = _a.table, isFullUpdate = _a.isFullUpdate, type = _a.type;
                    // 2023-11-06 更新
                    // 不应该只考虑受控模式，在 Table 本地模式下，分页、筛选、排序都只是修改展示的数据，并没有修改真正的 formValues
                    var isLocalMode = !table.shouldUseFetcher();
                    if ((config.controlled || isLocalMode) &&
                        [index_1.FetchTypes.CHANGE_PAGE, index_1.FetchTypes.SORT, index_1.FetchTypes.FILTER].includes(type)) {
                        return;
                    }
                    if (isFullUpdate) {
                        // 防止在某些「特殊」的时刻、form 实例还没有被生成时报错
                        if (!_this.form)
                            return;
                        var currentValues = (0, reactive_1.toJS)(_this.form.values);
                        // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
                        var newValues = (0, utils_2.transformArrayToFormValues)(table.initTotalData);
                        if (!(0, lodash_es_1.isEqual)(currentValues, newValues)) {
                            // 2022-10-26 全量更新时，内部 form 清除之前存在的字段
                            // 2023-11-16 更新, 不清除全部字段，而是做 diff, 清除掉在 currentValues 而不在 newValues 中的字段
                            var currentRowKeys = Object.keys(currentValues);
                            var newRowKeys = Object.keys(newValues);
                            var rowKeysToRemove = (0, lodash_es_1.difference)(currentRowKeys, newRowKeys);
                            _this.clearFormFields(rowKeysToRemove);
                            _this.setFormValues(newValues);
                        }
                    }
                });
            } }));
        this.makeObservable();
    }
    /**
     * 将部分内部属性变为响应式
     */
    TableEditor.prototype.makeObservable = function () {
        (0, reactive_1.define)(this, {
            originalTableData: reactive_1.observable,
        });
    };
    /**
     * 遍历销毁 form fields 并设置锁，防止多次触发 onFormValuesChange
     */
    TableEditor.prototype.clearFormFields = function (rowKeys) {
        var _this = this;
        var fieldsToClear = [];
        rowKeys.forEach(function (rowKey) {
            var rowField = _this.form.query(rowKey).take();
            var cellField = _this.form.query("".concat(rowKey, ".*")).map();
            if (rowField) {
                fieldsToClear = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(fieldsToClear), false), [rowField], false);
            }
            if (cellField.length) {
                fieldsToClear = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(fieldsToClear), false), tslib_1.__read(cellField), false);
            }
        });
        if (!fieldsToClear.length)
            return;
        // 注意，这里不能直接使用 form.clearFormGraph()，因为这个方法就是循环遍历所有 field 并一一删除，会多次触发 onChange
        // 所以这里手动遍历 fields 并设置锁
        this.isFormValueBatchChanging = true;
        fieldsToClear.forEach(function (field, index) {
            if (index === fieldsToClear.length - 1) {
                _this.isFormValueBatchChanging = false;
            }
            field.destroy(true);
        });
    };
    /**
     * 全量设置 table data
     * @param data
     */
    TableEditor.prototype.setTableData = function (data) {
        this.table.setData({ totalData: data, reset: false, total: this.table.total });
    };
    /**
     * 全量设置 form values，同时保存一份 previousFormValues
     * @param values
     */
    TableEditor.prototype.setFormValues = function (values) {
        this.form.setValues(values, 'overwrite');
        this.previousFormValues = (0, lodash_es_1.cloneDeep)(values);
    };
    /**
     * 创建 Action 并添加到 ActionHistory 中
     * @param options
     */
    TableEditor.prototype.createAction = function (options) {
        var action = new Action_1.Action(options);
        this.actionHistory.push(action);
        if (options.immediately) {
            action.execute();
        }
    };
    /**
     * 给 Table 当前的数据打快照
     */
    TableEditor.prototype.makeTableDataSnapShot = function () {
        // 这里需要融合 table data 和 form values，因为 table data 可能不准确
        // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
        return (0, utils_2.transformFormValuesToArray)((0, reactive_1.toJS)(this.form.values), this.table.initTotalData);
    };
    /**
     * 从 form graph 清除字段，防止内存泄漏
     */
    TableEditor.prototype.clearRowFields = function (rowKeys) {
        var _this = this;
        rowKeys.forEach(function (rowKey) {
            // 删除一行时，从表单中删除该行、并从表单中删掉数据
            _this.form.clearFormGraph(rowKey);
            _this.form.clearFormGraph("".concat(rowKey, ".*"));
        });
    };
    /**
     * 封装的删除行函数-同时从 table 和 form 中删除数据
     */
    TableEditor.prototype.innerDeleteRows = function (rowKeys) {
        var _this = this;
        // 防止批量删除多次触发 onFormValuesChange, 设置 flag, 只在最后一个删除后触发一次
        // 移到最前面，因为 clearFormGraph 也可能会触发 onFormValuesChange
        this.isFormValueBatchChanging = true;
        // 清除 table 内的选中 keys
        this.table.clearSelectedRow();
        // 从 table 中删除掉这一行的结构
        this.table.deleteRow(rowKeys);
        // 重要: 使用 batch，避免被删除的 row 触发 onFieldValueChange
        (0, reactive_1.batch)(function () {
            // 从 form graph 中删除每一行。这个操作要先于 setValues，避免被删除的 row 触发 onFieldValueChange
            _this.clearRowFields(rowKeys);
            // 不能直接 form setValues，这样其他行也会被重渲染，无谓的开销
            rowKeys.forEach(function (key, index) {
                if (index === rowKeys.length - 1) {
                    _this.isFormValueBatchChanging = false;
                }
                _this.form.deleteValuesIn(key);
            });
        });
    };
    /**
     * 封装的批量增加行函数-同时从 table 和 form 中新增数据
     * @param data
     */
    TableEditor.prototype.innerAddRows = function (dataList, options) {
        var _this = this;
        var dataWithRowKey = dataList.map(function (d) { return (tslib_1.__assign(tslib_1.__assign({}, d), { data: (0, utils_2.addRowKey)(d.data) })); });
        // 从 table 中增加这一行的结构
        this.table.addRows(dataWithRowKey, options);
        // 从 form 中批量新增
        this.isFormValueBatchChanging = true;
        // 2022 10-24 更新
        // 响应式的建立是使用对象作为 key 然后建立 Weakmap，如果同一个对象同时被 Table 和 Form 持有，那第二次的建立就会失败
        var cloneDeepData = (0, lodash_es_1.cloneDeep)(dataWithRowKey);
        cloneDeepData.forEach(function (_a, index) {
            var data = _a.data;
            if (index === dataWithRowKey.length - 1) {
                _this.isFormValueBatchChanging = false;
            }
            _this.form.setValuesIn(data[constants_1.ROW_KEY], data);
        });
    };
    Object.defineProperty(TableEditor.prototype, "addedRows", {
        /**获取新增的行 */
        get: function () {
            var _this = this;
            var formValues = (0, reactive_1.toJS)(this.form.values);
            // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
            var tableData = this.table.initTotalData;
            return tableData.reduce(function (acc, curr) {
                var rowKey = curr[constants_1.ROW_KEY];
                // todo: 后续优化为 map，降低复杂度
                if (!_this.originalTableData.find(function (v) { return v[constants_1.ROW_KEY] === rowKey; })) {
                    acc.push({
                        key: rowKey,
                        value: (0, utils_2.removeRowKey)(tslib_1.__assign(tslib_1.__assign({}, curr), formValues[rowKey])),
                    });
                }
                return acc;
            }, []);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableEditor.prototype, "deletedRows", {
        /**获取删除的行 */
        get: function () {
            var formValues = (0, reactive_1.toJS)(this.form.values);
            return this.originalTableData.reduce(function (acc, curr) {
                var rowValue = formValues[curr[constants_1.ROW_KEY]];
                if (!rowValue) {
                    acc.push({
                        key: curr[constants_1.ROW_KEY],
                        value: (0, utils_2.removeRowKey)(curr),
                    });
                }
                return acc;
            }, []);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableEditor.prototype, "updatedRows", {
        /**获取变更的行 */
        get: function () {
            var formValues = (0, reactive_1.toJS)(this.form.values);
            return this.originalTableData.reduce(function (acc, curr) {
                var rowValue = formValues[curr[constants_1.ROW_KEY]];
                if (!rowValue) {
                    return acc;
                }
                var oldValue = (0, utils_2.removeRowKey)(curr);
                var newValue = (0, utils_2.removeRowKey)(tslib_1.__assign(tslib_1.__assign({}, oldValue), rowValue));
                if (!(0, lodash_es_1.isEqual)(oldValue, newValue)) {
                    acc.push({
                        key: curr[constants_1.ROW_KEY],
                        newValue: newValue,
                        oldValue: oldValue,
                    });
                }
                return acc;
            }, []);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableEditor.prototype, "hasChanged", {
        /** TableEditor 当前的值是否和初始值不相同 */
        get: function () {
            var oldValue = this.originalTableData.map(utils_2.removeRowKey);
            var newValue = this.makeTableDataSnapShot().map(utils_2.removeRowKey);
            return !(0, lodash_es_1.isEqual)(oldValue, newValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableEditor.prototype, "hasActionHistory", {
        /** TableEditor 当前历史记录是否为空 */
        get: function () {
            return Boolean(this.actionHistory.count);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableEditor.prototype, "editable", {
        /**获取当前是否为可编辑态 */
        get: function () {
            return this.form.editable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableEditor.prototype, "currentData", {
        /** TableEditor 的当前数据
         *
         * 注意: 每次获取的 data 都是一个新对象，而非同一个引用
         */
        get: function () {
            return this.makeTableDataSnapShot();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 新增一行数据
     * @param data
     * @returns 新增的数据
     */
    TableEditor.prototype.addRow = function (data, options) {
        var _this = this;
        var dataWithRowKey = (0, utils_2.addRowKey)(data);
        var rowKey = dataWithRowKey[constants_1.ROW_KEY];
        this.createAction({
            immediately: true,
            execute: function () {
                _this.innerAddRows([{ data: dataWithRowKey }], options);
            },
            undo: function () {
                // 新增操作的撤回即删除这一行
                _this.innerDeleteRows([rowKey]);
            },
        });
        return dataWithRowKey;
    };
    /**
     * 新增多行数据
     * @param dataList
     * @returns
     */
    TableEditor.prototype.addRows = function (dataList, options) {
        var _this = this;
        var dataListWithRowKey = (0, utils_2.addRowKeyToArray)(dataList);
        var rowKeys = dataListWithRowKey.map(function (d) { return d[constants_1.ROW_KEY]; });
        this.createAction({
            immediately: true,
            execute: function () {
                _this.innerAddRows(dataListWithRowKey.map(function (d) { return ({ data: d }); }), options);
            },
            undo: function () {
                // 新增操作的撤回即删除这一行
                _this.innerDeleteRows(rowKeys);
            },
        });
        return dataListWithRowKey;
    };
    /**
     * 删除一行
     * @param rowKey 要删除的行的 rowKey
     * @returns 删除的数据
     */
    TableEditor.prototype.deleteRow = function (rowKey) {
        var _this = this;
        var row = this.table.getRowByRowKey(rowKey);
        // 需要同时使用 table row 和 form field 的数据
        var rowData = tslib_1.__assign(tslib_1.__assign({}, (0, reactive_1.toJS)(row.data)), (0, reactive_1.toJS)(this.form.values[rowKey]));
        var deletedData = {
            data: rowData,
            option: { index: row.index },
        };
        this.createAction({
            immediately: true,
            execute: function () {
                _this.innerDeleteRows([rowKey]);
            },
            undo: function () {
                // 批量新增，不全量修改 tableData，会有很大的性能开销
                _this.innerAddRows([deletedData]);
            },
        });
        return rowData;
    };
    /**
     * 批量删除行
     * @param rowKeys 要删除的行的 rowKey 数组, 可选, 不传参默认删除选中的行
     * @returns 删除的数据
     */
    TableEditor.prototype.deleteRows = function (rowKeys) {
        var _this = this;
        var _rowKeys = rowKeys !== null && rowKeys !== void 0 ? rowKeys : this.table.selectedRowKeys;
        var deletedData = _rowKeys.map(function (rowKey) {
            var row = _this.table.getRowByRowKey(rowKey);
            // 需要同时使用 table row 和 form field 的数据
            var rowData = tslib_1.__assign(tslib_1.__assign({}, (0, reactive_1.toJS)(row.data)), (0, reactive_1.toJS)(_this.form.values[rowKey]));
            return {
                data: rowData,
                option: { index: row.index },
            };
        });
        this.createAction({
            immediately: true,
            execute: function () {
                _this.innerDeleteRows(_rowKeys);
            },
            undo: function () {
                // 批量新增，不全量修改 tableData，会有很大的性能开销
                _this.innerAddRows(deletedData);
            },
        });
        return deletedData.map(function (d) { return d.data; });
    };
    /**
     * 撤销，可以撤销一步或全部
     * @param options
     */
    TableEditor.prototype.undo = function (options) {
        if (options.type === 'LastStep') {
            var action = this.actionHistory.pop();
            action === null || action === void 0 ? void 0 : action.undo();
        }
        else if (options.type === 'AllSteps') {
            if (this.hasChanged) {
                this.actionHistory.clear();
                // todo: 看看这里有没有性能优化的空间
                this.setTableData(this.originalTableData);
            }
        }
    };
    /**
     * 保存修改，清空 actionHistory，将当前数据作为新的初始值
     */
    TableEditor.prototype.save = function () {
        this.originalTableData = this.makeTableDataSnapShot();
        this.actionHistory.clear();
    };
    /**
     * 切换整体可编辑态
     */
    TableEditor.prototype.switchEditable = function () {
        return (this.form.editable = !this.form.editable);
    };
    /**
     * 清除 TableEditor 操作历史 & originalTableData
     */
    TableEditor.prototype.clearActionHistory = function () {
        this.actionHistory.clear();
    };
    return TableEditor;
}());
exports.TableEditor = TableEditor;
//# sourceMappingURL=index.js.map