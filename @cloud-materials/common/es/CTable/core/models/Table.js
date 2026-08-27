import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-13 20:58:58
 * @LastEditTime: 2021-12-15 14:56:06
 * @LastEditors: youjingyu
 * @Description:
 */
import { define, observable, action, batch, toJS } from '@formily/reactive';
import { merge, remove, isNumber, isInteger } from 'lodash-es';
import { Column, CanBeStringColumnConfig } from './Column';
import { Row } from './Row';
import { Toolbar } from './Toolbar';
import { runEffects, runFetcher, getAutoWidth } from '../shared';
import { TableMode, FetchTypes, LifeCycleTypes, StatusChangeReason } from '../types';
import { Plugin } from '../plugin';
import { mitt } from './mitt';
import { setCellData, getCellData, genRowKey, isStr } from '../../shared';
import { isPromiseDiscardedError } from '@byted-c/storage.utils.safe-race';
export var DefaultStartPageNumber = 1;
// type TableConfigWithDataIndex<DataItemType extends Record<string, any> = any> = Omit<
//   TableConfig<DataItemType>,
//   'columns'
// > & {
//   columns: ColumnConfigWithDataIndex[] | undefined;
// };
// Todo table 生命周期、事件、钩子
var Table = /** @class */ (function () {
    function Table(config) {
        var _this = this;
        var _a, _b;
        this.status = {
            initialized: false,
            loading: false,
            loadMoreLoading: false,
            noMore: false,
        };
        // initTotalData: 初始化时，传递的所有数据，相当于一个缓存，不会随着表格的操作而变化
        // totalData: 当前表格的所有数据，过滤、排序等操作，会基于 initTotalData 重新计算出 totalData
        // initTotalData、totalData 都不是响应式的，表格 UI 的响应式变化都来自 rows 的变化
        this.initTotalData = [];
        this.totalData = [];
        this.pageSize = 10;
        this.total = 0;
        // globalScope 设置默认值为空对象，保证业务方在 globalScope 赋值前能够访问
        this.globalScope = {};
        this.columns = [];
        // 通过 dataIndex 保存 column。方便通过 dataIndex 查找 column
        this.columnMap = {};
        this.rows = [];
        this.rowMap = {};
        /* 缓存所有出现过的数据，包括初始化时设置的所有数据、loadMore 和分页模式下逐步加载的数据
         * 用于无论哪种情况下（包括没有渲染过的数据），都可以通过 selectedRowKeys 获取到对应的数据
         * 如果没有出现过的数据，则无法获取到，table 不保证能够获取到没有出现过的数据
         */
        this.dataMap = {};
        this.cachedSelectedRowKeys = [];
        this.mitt = mitt();
        // plugin 暂时绑定在 table 实例级别，从而允许在在 plugin 中操作对应的 table
        this.plugin = new Plugin(this);
        this.plugin.init();
        this.runEffects(config);
        this.config = config;
        this.onInitConfig();
        (_b = (_a = this.config.columns) === null || _a === void 0 ? void 0 : _a.forEach) === null || _b === void 0 ? void 0 : _b.call(_a, function (c) {
            // 在 columns 配置列表中，可能会通过表达式过滤某些列
            // 为了方便使用，允许在表达式中返回 false 或者 undefined
            // 这里判断 c 是否存在
            if (c) {
                _this.addColumn(c);
            }
        });
        this.onInitColumn();
        this.initDataFromConfig();
        this.initTableStatus();
        this.makeObservable();
        this.onInit();
    }
    /**处理 columns */
    Table.prototype.fixColumns = function (config) {
        var indexCount = 0;
        // 过滤掉无效 column 并使用空数组兜底
        var validColumns = (config.columns || []).filter(function (c) { return Boolean(c); });
        var fixedColumns = validColumns.map(function (c) {
            var newConfig = __assign({}, c);
            // 如果用户没有传递 dataIndex, 使用自增的 indexCount 作为没有配 dataIndex 的替代
            var fixDataIndex = function (config) {
                if (config.dataIndex === undefined) {
                    config.dataIndex = String(indexCount++);
                }
            };
            // 用户传递 string 类型的配置时，globalColumnConfig 和 ColumnConfig 无法 merge
            // string 会直接把对象覆盖，这里转为 { type: 'xxx' } 的形式
            var fixColumnConfig = function (config) {
                var copiedConfig = __assign({}, config);
                Object.keys(copiedConfig).forEach(function (key) {
                    if (CanBeStringColumnConfig.includes(key) && isStr(copiedConfig[key])) {
                        // 编译时的 ts 版本偏低，这里类型会报错，暂时忽略
                        // @ts-ignore
                        copiedConfig[key] = { type: copiedConfig[key] };
                    }
                });
                return copiedConfig;
            };
            fixDataIndex(newConfig);
            // 暂时不考虑 column 包含 children 的情况
            // if (c.children) {
            //   column.children = [];
            //   c.children.forEach(child => {
            //     if (child) {
            //       fixDataIndex(child);
            //       this.columnMap[child.dataIndex!] = column;
            //       column.children!.push(new Column(this, child));
            //     }
            //   });
            // }
            return merge({}, fixColumnConfig(config.globalColumnConfig), fixColumnConfig(newConfig));
        });
        return fixedColumns;
    };
    Object.defineProperty(Table.prototype, "config", {
        get: function () {
            return this._innerConfig;
        },
        // 把所有 config 的处理收敛在 Table 里，就不在 Column 或其他地方再去自己 format config
        set: function (config) {
            // table config 需要处理 columns
            this._innerConfig = __assign(__assign({}, config), { columns: this.fixColumns(config) });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "loading", {
        get: function () {
            return this.status.loading;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "componentType", {
        // get component() {
        //   return [this.componentType, this.componentProps];
        // }
        // set component(value: ComponentConfig) {
        //   setComputedComponent(this, 'component', value);
        // }
        // get decorator() {
        //   return [this.decoratorType, this.decoratorProps];
        // }
        // set decorator(value: ComponentConfig) {
        //   setComputedComponent(this, 'decorator', value);
        // }
        get: function () {
            return this.config.component;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "componentProps", {
        get: function () {
            return this.config.componentProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "decoratorType", {
        get: function () {
            return this.config.decorator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "decoratorProps", {
        get: function () {
            return this.config.decoratorProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sumRowData", {
        get: function () {
            var _this = this;
            var sumRowData = {};
            var hasSummary = false;
            this.columns.forEach(function (c) {
                var computedFn = _this.plugin.getSummary(c.config.summary).computedFn;
                if (computedFn) {
                    hasSummary = true;
                    setCellData(sumRowData, c.config.dataIndex, computedFn({ rows: _this.rows, column: c, table: _this }));
                }
            });
            return hasSummary ? sumRowData : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columnFilterValues", {
        /** 列的过滤值 */
        get: function () {
            return this.columns.reduce(function (filterValues, column) {
                if (column.filterValue) {
                    filterValues[column.config.dataIndex] = column.filterValue;
                }
                return filterValues;
            }, {});
        },
        set: function (values) {
            var _this = this;
            Object.keys(values).forEach(function (dataIndex) {
                var _a, _b;
                (_b = (_a = _this.getColumnByDataIndex(dataIndex)) === null || _a === void 0 ? void 0 : _a.setFilterValue) === null || _b === void 0 ? void 0 : _b.call(_a, values[dataIndex]);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "filterValues", {
        /** table.columnFilterValues 和 table.toolbar.filterValues 的合并 */
        get: function () {
            var _a;
            return __assign(__assign({}, this.columnFilterValues), (_a = this.toolbar) === null || _a === void 0 ? void 0 : _a.filterValues);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sorterValues", {
        get: function () {
            return this.columns.reduce(function (sorterValues, column) {
                if (column.sorterValue) {
                    sorterValues[column.config.dataIndex] = column.sorterValue;
                }
                return sorterValues;
            }, {});
        },
        set: function (values) {
            var _this = this;
            Object.keys(values).forEach(function (dataIndex) {
                var _a, _b;
                (_b = (_a = _this.getColumnByDataIndex(dataIndex)) === null || _a === void 0 ? void 0 : _a.setSorterValue) === null || _b === void 0 ? void 0 : _b.call(_a, values[dataIndex]);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "selectedRowKeys", {
        get: function () {
            var rowSelection = this.plugin.getRowSelection(this.config.rowSelection);
            /* 本地模式或者明确声明了记住 selectedRowKey 的情况，返回缓存的 cachedSelectedRowKeys
             * 在 table 的数据刷更新后（刷新、过滤、排序、切页等），cachedSelectedRowKeys 中可能包含消失的数据
             * 1. 本地模式：在 table 数据更新后，通过 this.diffCachedRowKeySafe 去除不存在的数据的 key
             * 2. 远程模式 + 分页：无解。用户各种操作后，刷新数据，这时当前页消失了一部分数据，
             *    但当前页内没有的数据，不代表其它页没有，table 无法安全地 diff
             *    因此设置 preserveCrossPageKeys 为 true 时，在远程分页模式下，不保证 selectedRowKeys 返回的数据一定是当前存在的数据
             */
            if (rowSelection.preserveCrossPageKeys === true || this.isLocalMode()) {
                // map 转换一下，使 selectedRowKeys 为非 proxy 的数组，和原来的行为保持一致，避免历史代码报错
                return this.cachedSelectedRowKeys.map(function (key) { return key; });
            }
            // 远程模式、loadMore 模式，通过当前展示的 row 计算出 selectedRowKey
            return this.rows.filter(function (row) { return row.isSelected; }).map(function (item) { return item.key; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "selectedRowData", {
        get: function () {
            var _this = this;
            var data = [];
            this.selectedRowKeys.forEach(function (key) {
                if (_this.dataMap[key] !== undefined) {
                    // 2023-12-01 更新, dataMap 变为 shallow 后，会把里面的数据变为 Proxy
                    data.push(toJS(_this.dataMap[key]));
                }
            });
            return data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columnsAutoWidth", {
        get: function () {
            return getAutoWidth(this);
        },
        enumerable: false,
        configurable: true
    });
    Table.prototype.initDataFromConfig = function () {
        var _a;
        var config = this.config;
        this.startPageNumber = (_a = config.startPageNumber) !== null && _a !== void 0 ? _a : DefaultStartPageNumber;
        this.width = config.width;
        this.currentPage = this.startPageNumber;
        if (config.pageSize !== undefined) {
            this.pageSize = config.pageSize;
        }
        // this.libTableComponentProps = config.libTableComponentProps;
        // this.component = formatComponentConfig(config.component, config.componentProps);
        // this.decorator = formatComponentConfig(config.decorator, config.decoratorProps);
        if (config.data || config.globalScope) {
            this.initData({
                data: config.data,
                globalScope: config.globalScope,
            });
        }
        if (config.toolbar) {
            this.toolbar = new Toolbar(this);
        }
    };
    Table.prototype.initTableStatus = function () {
        var _a, _b;
        if (!this.config.getInitStatus)
            return;
        var tableInitStatus = this.config.getInitStatus({ table: this });
        if (!tableInitStatus)
            return;
        this.initStatus = tableInitStatus;
        // 需要对数据合法性做校验
        if (tableInitStatus.pageSize !== undefined) {
            // pageSize 只要是合法数字就行，兜底值 10
            this.pageSize =
                isInteger(tableInitStatus.pageSize) && tableInitStatus.pageSize > 0 ? tableInitStatus.pageSize : 10;
        }
        if (tableInitStatus.currentPage !== undefined) {
            // currentPage 只要是合法数字就行，兜底值 1
            this.currentPage =
                isInteger(tableInitStatus.currentPage) && tableInitStatus.currentPage > 0
                    ? tableInitStatus.currentPage
                    : this.startPageNumber;
        }
        if (tableInitStatus.columnFilterValues !== undefined) {
            // 错误的 dataIndex 不会有影响，但是没法感知 filterValue 是否是错误的
            this.columnFilterValues = tableInitStatus.columnFilterValues;
        }
        if (tableInitStatus.sorterValues !== undefined) {
            // 不用特殊处理
            // 1. sorterValues 会按照 dataIndex 赋值，所以错误的 dataIndex 不会有影响
            // 2. 错误的 sorterValue 也会被 arco 过滤掉
            this.sorterValues = tableInitStatus.sorterValues;
        }
        if (tableInitStatus.toolbarValues !== undefined) {
            // todo: 如果 toolbar item 因为错误的值而报错，应该怎么展示
            (_b = (_a = this.toolbar) === null || _a === void 0 ? void 0 : _a.setFilterValues) === null || _b === void 0 ? void 0 : _b.call(_a, tableInitStatus.toolbarValues);
        }
    };
    Table.prototype.makeObservable = function () {
        // ts 会认为 this 不存在 private 的属性
        // 因此单独处理 private 的 action
        var privateAction = {
            makeRows: action,
            fetchData: action,
            toggleData: action,
            toggleLoadMoreData: action,
            setComponentConfig: action,
        };
        define(this, __assign(__assign({ 
            // Todo observable 默认代表 observable.deep
            // 验证 columns、rows 的劫持是否重复
            // 查看源码得知：对于非 object 类型，observable.ref 和 observable 没有区别
            status: observable, pageSize: observable, total: observable, width: observable, globalScope: observable, 
            // libTableComponentProps: observable,
            // componentType: observable,
            // componentProps: observable,
            // decoratorType: observable,
            // decoratorProps: observable,
            columns: observable, initTotalData: observable.shallow, rows: observable.shallow, rowMap: observable.shallow, cachedSelectedRowKeys: observable, loading: observable.computed, 
            // component: observable.computed,
            // decorator: observable.computed,
            sumRowData: observable.computed, filterValues: observable.computed, columnFilterValues: observable.computed, sorterValues: observable.computed, selectedRowKeys: observable.computed, selectedRowData: observable.computed, 
            // 2023-11-20 更新，将 dataMap 变为 observable.shallow，修复 dataMap 改变了，但是 selectedRowData 没有重新计算的问题
            dataMap: observable.shallow, columnsAutoWidth: observable.computed }, privateAction), { 
            // setComponent: action,
            // setComponentProps: action,
            // setDecorator: action,
            // setDecoratorProps: action,
            setData: action, toggleLoading: action, setGlobalScope: action, reset: action, initData: action, loadMoreData: action, addColumn: action, refresh: action, changePage: action, sort: action, filter: action, expendRow: action, toggleColumns: action, selectRow: action, selectRowAll: action, dragRow: action, deleteRow: action, addRow: action, addRows: action, setWidth: action, clearSelectedRow: action }));
    };
    // setComponent(component: JSXComponent, props?: ComponentProps) {
    //   this.component = component;
    //   setComponentProps(this, 'component', props);
    // }
    // setComponentProps(props: ComponentProps) {
    //   setComponentProps(this, 'component', props);
    // }
    // setDecorator(component: JSXComponent, props?: ComponentProps) {
    //   this.decorator = component;
    //   setComponentProps(this, 'decorator', props);
    // }
    // setDecoratorProps(props: ComponentProps) {
    //   setComponentProps(this, 'decorator', props);
    // }
    Table.prototype.setWidth = function (width) {
        this.width = width;
    };
    Table.prototype.on = function (type, callback) {
        this.mitt.on(type, callback);
    };
    Table.prototype.removeEventListener = function (type, callback) {
        this.mitt.off(type, callback);
    };
    Table.prototype.notify = function (type, payload) {
        this.mitt.emit(type, payload);
    };
    Table.prototype.runEffects = function (config) {
        var _this = this;
        if (!config.effects) {
            return;
        }
        var effects = runEffects(this, config.effects);
        effects.forEach(function (_a) {
            var type = _a.type, callback = _a.callback;
            _this.on(type, function (payload) {
                callback(_this, payload);
            });
        });
    };
    // Todo 验证事件钩子是否需要定义为 batch/action 动作
    Table.prototype.onInitConfig = function () {
        this.notify(LifeCycleTypes.ON_TABLE_INIT_CONFIG);
    };
    Table.prototype.onInitColumn = function () {
        this.notify(LifeCycleTypes.ON_TABLE_INIT_COLUMN);
    };
    Table.prototype.onInit = function () {
        this.status.initialized = true;
        this.notify(LifeCycleTypes.ON_TABLE_INIT);
    };
    Table.prototype.shouldUseFetcher = function () {
        return this.isRemoteMode() || this.isLoadMoreMode();
    };
    Table.prototype.isRemoteMode = function () {
        var mode = this.config.mode;
        if (this.config.fetcher && !mode) {
            // 如果配置了 fetcher，并且没有配置 mode，默认为 remote 模式
            return true;
        }
        return this.config.mode === TableMode.REMOTE;
    };
    Table.prototype.isLoadMoreMode = function () {
        return this.config.mode === TableMode.LOAD_MORE;
    };
    Table.prototype.isLocalMode = function () {
        return this.config.mode === TableMode.LOCAL;
    };
    Table.prototype.getColumnByDataIndex = function (dataIndex) {
        return this.columnMap[dataIndex];
    };
    Table.prototype.getRowByRowKey = function (rowKey) {
        return this.rowMap[rowKey];
    };
    Table.prototype.makeRows = function (data, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var expandedRowKey = [];
        // 在 load more 的模式下，是向表格中追加数据
        // 否则清空数据，再填充
        if (options.append !== true) {
            // 在刷新 table 的场景下，记录展开的行，用于恢复当前页展开行的展开状态
            expandedRowKey = this.rows.filter(function (item) { return item.isExpanded; }).map(function (item) { return item.key; });
            this.rowMap = {};
            this.rows = [];
        }
        // TODO 如果不复制一遍数组，无法触发更新，验证原因
        this.rows = __spreadArray([], __read(this.rows), false);
        data.forEach(function (item, index) {
            var rowKey = genRowKey(item, _this.getOffsetIndexInAllData(index), _this.config.rowKey);
            var row = new Row({
                table: _this,
                rowData: item,
                rowKey: rowKey,
                expanded: expandedRowKey.includes(rowKey),
                pageNumber: _this.currentPage,
                offsetIndexInAllData: _this.getOffsetIndexInAllData(index),
            });
            if (_this.rowMap[row.key]) {
                console.error("duplicate rowKey '".concat(row.key, "', it may cause some functions to be unavailable"));
            }
            _this.rowMap[row.key] = row;
            _this.rows.push(row);
        });
        this.notify(LifeCycleTypes.ON_TABLE_UPDATE_ROW_END);
    };
    Table.prototype.getOffsetIndexInAllData = function (index, currentPage) {
        var curPage = currentPage === undefined ? this.currentPage : currentPage;
        // 计算在所有数据中的 offset
        return this.pageSize * (curPage - this.startPageNumber) + index;
    };
    Table.prototype.getCurrentPageData = function () {
        var _a, _b;
        var start = (this.currentPage - this.startPageNumber) * this.pageSize;
        return (_b = (_a = this.totalData) === null || _a === void 0 ? void 0 : _a.slice) === null || _b === void 0 ? void 0 : _b.call(_a, start, start + this.pageSize);
    };
    Table.prototype.cacheData = function (data, currentPage) {
        var _this = this;
        data.forEach(function (item, index) {
            var rowKey = genRowKey(item, 
            // 在 toggleData 中，data 是所有数据，因此使用 this.startPageNumber
            // 在 toggleLoadMoreData 中，data 是当前页数据，以 currentPage 为准
            _this.getOffsetIndexInAllData(index, currentPage !== null && currentPage !== void 0 ? currentPage : _this.startPageNumber), _this.config.rowKey);
            _this.dataMap[rowKey] = item;
        });
    };
    Table.prototype.diffCachedRowKeySafe = function () {
        var _this = this;
        if (this.isLocalMode()) {
            // 在本地模式中，数据更新后，从 cachedSelectedRowKeys 中剔除不存在的 key
            var currentRowKeys_1 = this.initTotalData.map(function (item, index) {
                return genRowKey(item, _this.getOffsetIndexInAllData(index, _this.startPageNumber), _this.config.rowKey);
            });
            remove(this.cachedSelectedRowKeys, function (key) { return !currentRowKeys_1.includes(key); });
        }
    };
    Table.prototype.tryClearCachedRowKey = function (action) {
        var rowSelection = this.plugin.getRowSelection(this.config.rowSelection);
        /* 当前，远程模式默认情况下是从当前展示的 row 中获取选中的 key，不会返回跨页的 key
         * 如果用户在跨页操作时，发现 key 是保留的，但是最后又拿不到所有的 key 会觉得奇怪
         * 因此在切换分页时，清空 cachedSelectedRowKeys，不保留跨页的选中状态
         */
        if (this.isRemoteMode() && rowSelection.preserveCrossPageKeys !== true && action === FetchTypes.CHANGE_PAGE) {
            this.cachedSelectedRowKeys = [];
        }
    };
    Table.prototype.toggleData = function (options) {
        var _a, _b, _c;
        this.notify(LifeCycleTypes.ON_TABLE_UPDATE_DATA_START, { isFullUpdate: (_a = options.isFullUpdate) !== null && _a !== void 0 ? _a : true });
        if (options.totalData) {
            this.totalData = options.totalData;
            this.total = (_b = this.totalData) === null || _b === void 0 ? void 0 : _b.length;
        }
        if (options.initTotalData) {
            this.initTotalData = options.initTotalData;
        }
        if (options.total !== undefined) {
            this.total = options.total;
        }
        if (options.currentPage !== undefined) {
            this.currentPage = options.currentPage;
        }
        if (options.globalScope) {
            this.setGlobalScope(options.globalScope);
        }
        var currentData;
        // 在远程模式或者没有的分页的情况，直接替换数据（loadMore 模式会单独用 toggleLoadMoreData，这里不考虑 loadMore）
        if (this.isRemoteMode() || this.config.pagination === false) {
            currentData = this.totalData;
        }
        else {
            currentData = this.getCurrentPageData();
        }
        if (options.initTotalData) {
            // 如果设置了所有数据，缓存到 dataMap 中
            this.cacheData(options.initTotalData, options.currentPage);
            this.diffCachedRowKeySafe();
        }
        if (currentData) {
            // 在生成新的 row 之前尝试清空 cachedRowKey
            // 否则在 onRowInit 事件中选中 row 后，会被清空，导致设置失效
            options.type && this.tryClearCachedRowKey(options.type);
            this.makeRows(currentData);
        }
        // 挪动原因：ON_TABLE_UPDATE_DATA_END钩子里取selectRowData为[]，原因是dataMap还未赋值，cacheData中对dataMap赋值
        this.notify(LifeCycleTypes.ON_TABLE_UPDATE_DATA_END, {
            isFullUpdate: (_c = options.isFullUpdate) !== null && _c !== void 0 ? _c : true,
            type: options.type,
        });
    };
    // 在 load more 模式下的数据更新
    Table.prototype.toggleLoadMoreData = function (options) {
        var _a;
        // 如果回到了第一页（比如在刷新的时候），直接覆盖数据
        var shouldClearData = options.currentPage === this.startPageNumber;
        if (shouldClearData) {
            this.totalData = options.data;
        }
        else {
            // 追加数据
            (_a = this.totalData).push.apply(_a, __spreadArray([], __read(options.data), false));
        }
        this.initTotalData = this.totalData;
        this.currentPage = options.currentPage;
        if (options.globalScope) {
            this.setGlobalScope(options.globalScope);
        }
        this.status.noMore = options.noMore;
        this.notify(LifeCycleTypes.ON_TABLE_UPDATE_DATA_END, { type: FetchTypes.LOAD_MORE });
        this.cacheData(options.data, this.currentPage);
        // loadMore 模式下，不通过分页参数来截取当前页数据，fetcher 返回什么数据，就追加什么数据
        // 因为在滚动加载模式下，后端可能返回的 pageSize 是不定的
        // this.makeRows(this.getCurrentPageData(), { append: !shouldClearData });
        this.makeRows(options.data, { append: !shouldClearData });
    };
    Table.prototype.toggleLoading = function (options) {
        if (options.showLoading === false) {
            return;
        }
        if (options.loading === true) {
            if (this.status.statusChangeReason === StatusChangeReason.LOAD_MORE) {
                this.status.loadMoreLoading = true;
            }
            else {
                this.status.loading = true;
            }
        }
        else {
            this.status.loading = false;
            this.status.loadMoreLoading = false;
        }
    };
    Table.prototype.runBeforeInitHook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var globalScope;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.beforeInit) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.config.beforeInit({ table: this })];
                    case 1:
                        globalScope = _a.sent();
                        this.setGlobalScope(globalScope);
                        return [2 /*return*/];
                }
            });
        });
    };
    Table.prototype.fetchData = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var currentPage, mergedOptions, res, fixedCurrentPage, raceConditionResolve, _a, fetcherResp, pageNumber, _error_1, error;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentPage = options.currentPage === undefined ? this.currentPage : options.currentPage;
                        mergedOptions = __assign(__assign({ table: this, pageSize: this.pageSize, offset: (currentPage - this.startPageNumber) * this.pageSize }, options), { currentPage: currentPage, filterValues: this.filterValues, sorterValues: this.sorterValues });
                        this.status.statusChangeReason = mergedOptions.type;
                        this.toggleLoading({ loading: true, showLoading: options.showLoading });
                        this.status.error = undefined;
                        fixedCurrentPage = currentPage;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!(mergedOptions.type === FetchTypes.INIT)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.runBeforeInitHook()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        this.notify(LifeCycleTypes.ON_FETCH_START, { fetcherOptions: mergedOptions });
                        raceConditionResolve = this.plugin.getRaceConditionResolver();
                        if (this.config.enableRaceCondition && this.config.fetcher) {
                            /**
                             * 2024-2-27：因为 useCreateTable中在每次重新渲染时config都被重新赋值，
                             * 导致轮询的时候fetcher函数也被更新，所以这里每次都重新 setFetcher
                             */
                            raceConditionResolve.setFetcher(this.config.fetcher);
                        }
                        return [4 /*yield*/, runFetcher({
                                fetcher: this.config.enableRaceCondition ? raceConditionResolve.wrapFetcher : this.config.fetcher,
                                // 调用fetchData，除定时任务调用属于低优任务，其他任务处于高优
                                fetcherOptions: mergedOptions,
                                startPageNumber: this.startPageNumber,
                                isLoadMore: this.isLoadMoreMode(),
                            })];
                    case 4:
                        _a = _b.sent(), fetcherResp = _a.fetcherResp, pageNumber = _a.pageNumber;
                        res = fetcherResp;
                        fixedCurrentPage = pageNumber;
                        // 在请求成功后，再次将 error 状态置为空
                        // 在请求频繁发起的场景（如搜索），在前面的请求还没 resolve 时，后面的请求动作已经同步地将 error 置为空了
                        // 如果前面的请求报错了，status.error 就会被置为 error，这个时候没人来将 error 置为空了
                        // 如果后面的请求返回的数据条数为 0，就会导致展示错误界面
                        this.status.error = undefined;
                        return [3 /*break*/, 6];
                    case 5:
                        _error_1 = _b.sent();
                        // 开启竞态有高优任务执行
                        if (isPromiseDiscardedError(_error_1)) {
                            return [2 /*return*/];
                        }
                        /**
                         * 如果是取消请求的 error，直接返回，不让 table 的 loading 消失，否则界面可能会闪一下
                         *
                         * 这里有一个约定：某个请求被取消后，一定还有一个正常请求被发出去了，这个请求完成后会触发 table 的状态变化，否则可能一直处于 loading 状态
                         *
                         * 另外还存在一个问题：虽然 return 后不会隐藏 loading，但是 table 还是会继续 render
                         * 在 table 初始化时，toolbar.bottomLeft 会先于正常数据出现，判断逻辑在 shouldHideBottomButton：CTable/arco/utils/controlPagination.tsx
                         * 初步考虑接受该状态，避免判断逻辑过于复杂
                         */
                        if (_error_1.__CANCEL__) {
                            console.warn('table fetcher cancel error:', _error_1);
                            return [2 /*return*/];
                        }
                        error = _error_1;
                        console.error('table fetcher error: ', error);
                        this.status.error = error;
                        this.notify(LifeCycleTypes.ON_FETCH_ERROR, { fetcherOptions: mergedOptions, error: error });
                        this.toggleLoading({ loading: false });
                        return [2 /*return*/];
                    case 6:
                        this.notify(LifeCycleTypes.ON_FETCH_END, { fetcherOptions: mergedOptions });
                        batch(function () {
                            if (_this.isLoadMoreMode()) {
                                _this.toggleLoadMoreData({
                                    data: res.data || [],
                                    // load more 模式可能也有删除功能，但暂时不考虑删除情况。保持使用  mergedOptions.currentPage作为当前页码
                                    currentPage: mergedOptions.currentPage,
                                    globalScope: res.globalScope,
                                    noMore: res.noMore,
                                });
                            }
                            else if (_this.isLocalMode()) {
                                _this.toggleData({
                                    initTotalData: res.data || [],
                                    // 在本地模式下，每次点击刷新后要依然保持filter和sorter生效。所以要在数据分页前先对totalData做一个过滤和排序
                                    totalData: _this.filterAndSortData(res.data || []),
                                    currentPage: fixedCurrentPage,
                                    globalScope: res.globalScope,
                                    type: mergedOptions.type,
                                });
                            }
                            else {
                                // remote mode
                                _this.toggleData({
                                    totalData: res.data || [],
                                    initTotalData: res.data || [],
                                    total: res.total,
                                    // fixedCurrentPage 可能是 mergedOptions.currentPage 超出页码范围后被修正的。需要使用fixedCurrentPage作为当前页码
                                    currentPage: fixedCurrentPage,
                                    globalScope: res.globalScope,
                                    type: mergedOptions.type,
                                });
                            }
                            _this.toggleLoading({ loading: false });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // 对 column 做的处理包括:
    // 1. 如果没有 dataIndex，则使用
    Table.prototype.addColumn = function (c) {
        // 如果用户没有传递 dataIndex，用 column length 模拟
        // const fixDataIndex = (config: ColumnConfig) => {
        //   if (config.dataIndex === undefined) {
        //     config.dataIndex = this.columns.length.toString();
        //   }
        // };
        // 用户传递 string 类型的配置时，globalColumnConfig 和 ColumnConfig 无法 merge
        // string 会直接把对象覆盖，这里转为 { type: 'xxx' } 的形式
        // const fixColumnConfig = (config: ColumnConfig) => {
        //   const copiedConfig = { ...config };
        //   (Object.keys(copiedConfig) as (keyof ColumnConfig)[]).forEach(key => {
        //     if (CanBeStringColumnConfig.includes(key) && isStr(copiedConfig[key])) {
        //       // 编译时的 ts 版本偏低，这里类型会报错，暂时忽略
        //       // @ts-ignore
        //       copiedConfig[key] = { type: copiedConfig[key] };
        //     }
        //   });
        //   return copiedConfig;
        // };
        // fixDataIndex(c);
        // const column = new Column(
        //   this,
        //   merge({}, fixColumnConfig(this.config.globalColumnConfig as ColumnConfig), fixColumnConfig(c)),
        // );
        var column = new Column(this, c);
        // if (c.children) {
        //   column.children = [];
        //   c.children.forEach(child => {
        //     if (child) {
        //       fixDataIndex(child);
        //       this.columnMap[child.dataIndex!] = column;
        //       column.children!.push(new Column(this, child));
        //     }
        //   });
        // }
        if (this.columnMap[column.dataIndex]) {
            console.error("duplicate dataIndex '".concat(column.dataIndex, "', it may cause some functions to be unavailable"));
        }
        this.columnMap[column.dataIndex] = column;
        this.columns.push(column);
    };
    Table.prototype.initData = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (options && (options.data || options.globalScope)) {
                    this.toggleData({
                        totalData: options.data,
                        initTotalData: options.data,
                        globalScope: options.globalScope,
                    });
                    return [2 /*return*/];
                }
                if (this.config.fetcher) {
                    return [2 /*return*/, this.fetchData({
                            type: FetchTypes.INIT,
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    Table.prototype.setData = function (options) {
        var _this = this;
        // 对 totalData 进行兜底，虽然 ts 类型上限制了必须传 totalData，但是业务也有传入了 undefined 的情况
        var totalData = options.totalData || [];
        batch(function () {
            // 在重新设置数据时，默认重置 table 状态
            if (options.reset !== false) {
                _this.reset();
            }
            _this.toggleData({
                // 重新设置数据后，也要保持数据的过滤效果
                totalData: _this.filterAndSortData(totalData),
                initTotalData: totalData,
                currentPage: options.currentPage,
                total: options.total,
                isFullUpdate: options.isFullUpdate,
            });
        });
    };
    Table.prototype.setGlobalScope = function (globalScope) {
        this.globalScope = Object.assign(this.globalScope || {}, globalScope);
    };
    // 在本地模式下，如展示文件上传列表，可以清空 table 状态，然后重新上传文件
    Table.prototype.reset = function () {
        this.currentPage = this.startPageNumber;
        // 以空数据执行一次排序和过滤
        this.sort({});
        this.filter({});
        // todo：是否清空 row 的状态，现阶段主要是在重新设置数据后
        // 希望清空当前的页码、排序、过滤等
        // column、row、cell 的状态过多，等以后有确定的诉求的时候，再考虑清除
    };
    // 业务在后台定时刷新 table 的时候，希望不出现 loading
    Table.prototype.refresh = function (options) {
        if (options === void 0) { options = {}; }
        // 如果配置了 resetSelectedRows，则刷新前清空已选的行
        if (options.resetSelectedRows) {
            this.clearSelectedRow();
        }
        // 在刷新的场景下，只要配置了 fetcher，就调用 fetcher
        // 本地模式下，也调用 fetcher，重置数据
        if (this.config.fetcher) {
            // 默认情况下，load more 模式、配置了 fetcher 的本地模式，刷新时，回到第一页
            // 远程模式，不回到第一页
            var pageNumber = this.isLocalMode() || this.isLoadMoreMode() ? this.startPageNumber : undefined;
            // 如果强制指定了 resetPageNumber，以参数为准
            if (options.resetPageNumber !== undefined) {
                pageNumber = options.resetPageNumber ? this.startPageNumber : undefined;
            }
            return this.fetchData({
                type: FetchTypes.REFRESH,
                currentPage: pageNumber,
                showLoading: options.showLoading,
                taskPriority: options.taskPriority,
                isPooling: options.isPooling,
            });
        }
        this.toggleData({
            currentPage: this.startPageNumber,
        });
    };
    Table.prototype.loadMoreData = function () {
        this.fetchData({
            type: FetchTypes.LOAD_MORE,
            currentPage: this.currentPage + 1,
        });
    };
    Table.prototype.changePage = function (pageNumber, pageSize) {
        var _this = this;
        this.notify(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_START);
        if (pageSize !== undefined && this.pageSize !== pageSize) {
            this.pageSize = pageSize;
        }
        if (this.shouldUseFetcher()) {
            return this.fetchData({
                type: FetchTypes.CHANGE_PAGE,
                currentPage: pageNumber,
            }).then(function () {
                if (!_this.status.error) {
                    _this.notify(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_END);
                }
            });
        }
        this.toggleData({
            currentPage: pageNumber,
            type: FetchTypes.CHANGE_PAGE,
        });
        this.notify(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_END);
    };
    // getFilterFns 获取的 filterFn 实际上只会在本地模式下会调用
    Table.prototype.getFilterFns = function () {
        var _this = this;
        var filterFns = [];
        // 获取所有过滤函数
        this.columns.forEach(function (c) {
            var _a, _b;
            // 这里取 filterValue 的逻辑和远程模式保持一致，如果 toolbar.filterValues 的 key 如果和 column dataIndex 对得上，优先取 toolbar 中的值
            var filterValue = ((_b = (_a = _this.toolbar) === null || _a === void 0 ? void 0 : _a.filterValues) === null || _b === void 0 ? void 0 : _b[c.config.dataIndex]) || c.filterValue;
            if (filterValue) {
                var filterFn_1 = _this.plugin.getFilter(c.config.filter).filterFn;
                if (filterFn_1) {
                    filterFns.push(function (rowData) {
                        return filterFn_1({
                            filterValue: filterValue,
                            filterValues: _this.filterValues,
                            cellData: getCellData(rowData, c.config.dataIndex),
                            rowData: rowData,
                            column: c,
                            table: _this,
                        });
                    });
                }
            }
        });
        return filterFns;
    };
    Table.prototype.getSorterInfos = function () {
        var _this = this;
        var sorterInfos = [];
        this.columns.forEach(function (c) {
            var _a;
            if (c.sorterValue) {
                var sorterFn = _this.plugin.getSorter((_a = c.config) === null || _a === void 0 ? void 0 : _a.sorter).sorterFn;
                if (sorterFn) {
                    sorterInfos.push({
                        dataIndex: c.config.dataIndex,
                        sorterFn: sorterFn,
                        sorterValue: c.sorterValue,
                    });
                }
            }
        });
        return sorterInfos;
    };
    /** 使用当前的filter和sorter对传入的数据进行处理 */
    Table.prototype.filterAndSortData = function (data) {
        // （这里应该可以优化，从而不用执行重复的过滤和排序动作，但是复杂度比较高）
        var filterFns = this.getFilterFns();
        var sorterInfos = this.getSorterInfos();
        var resultData = __spreadArray([], __read(data), false);
        if (filterFns.length > 0) {
            resultData = resultData.filter(function (rowData) { return filterFns.every(function (fn) { return fn(rowData); }); });
        }
        if (sorterInfos.length > 0) {
            // sort 操作是原地排序，避免影响原始数据
            resultData = __spreadArray([], __read(resultData), false);
            // Todo 处理多列排序的优先级问题（是否可以在每一行执行多列的排序函数，取多个结果的且，从而不用循环多次数据）
            sorterInfos.forEach(function (_a) {
                var dataIndex = _a.dataIndex, sorterFn = _a.sorterFn, sorterValue = _a.sorterValue;
                resultData = resultData.sort(function (a, b) {
                    return sorterFn(sorterValue, getCellData(a, dataIndex), getCellData(b, dataIndex));
                });
            });
        }
        return resultData;
    };
    // 用户可能操作排序、再操作过滤（或反之，或一直反复操作），各种操作的效果应该叠加
    // 远程模式下，用户的排序、过滤操作统一交给 fetcher 处理
    // 在本地模式下，统一交给 handleLocalData 处理
    Table.prototype.handleLocalData = function (options) {
        // 不管用户如何操作，拿到当前的过滤内容和排序内容，执行一遍过滤和排序
        var totalData = this.filterAndSortData(this.initTotalData); // 每次filter和sorter改变都取原始数据作处理
        this.toggleData({
            totalData: totalData,
            // 排序、过滤后，都自动切换到第一页
            currentPage: this.startPageNumber,
            type: options.type,
        });
    };
    Table.prototype.sort = function (sorterValues) {
        // 经验证，这里的操作是 batch 的
        this.columns.forEach(function (c) {
            c.setSorterValue(sorterValues[c.config.dataIndex]);
        });
        // 调用了 setSorterValue 就会改变值，所以调用后触发该 effect
        this.notify(LifeCycleTypes.ON_SORT_VALUE_CHANGE);
        if (this.shouldUseFetcher()) {
            return this.fetchData({
                type: FetchTypes.SORT,
                // 重新排序后，默认切换到第一页
                currentPage: this.startPageNumber,
            });
        }
        this.handleLocalData({ type: FetchTypes.SORT });
    };
    // 由于 arco 的 filter 事件不能拿到 column，只能拿到 dataIndex 对应的 filter value
    // 因此 filter 函数的参数暂时兼容 arco 的情况
    Table.prototype.filter = function (filterValues) {
        if (filterValues === void 0) { filterValues = {}; }
        // 经验证，这里的操作是 batch 的
        this.columns.forEach(function (c) {
            c.setFilterValue(filterValues[c.config.dataIndex]);
        });
        // 调用了 setFilterValue 就会改变值，所以调用后触发该 effect
        this.notify(LifeCycleTypes.ON_COLUMN_FILTER_VALUE_CHANGE);
        if (this.shouldUseFetcher()) {
            return this.fetchData({
                type: FetchTypes.FILTER,
                // 触发搜索时，默认切换到第一页
                currentPage: this.startPageNumber,
            });
        }
        this.handleLocalData({ type: FetchTypes.FILTER });
    };
    Table.prototype.toolbarFilter = function () {
        if (this.shouldUseFetcher()) {
            return this.fetchData({
                type: FetchTypes.FILTER,
                // 触发搜索时，默认切换到第一页
                currentPage: this.startPageNumber,
            });
        }
        this.handleLocalData({ type: FetchTypes.FILTER });
    };
    Table.prototype.expendRow = function (rowKey, isExpand) {
        var _a, _b;
        var collapseOthers = this.plugin.getExpandRow(this.config.expandRow).collapseOthers;
        // collapseOthers 控制是否折叠其它行，默认不折叠
        if (collapseOthers === true) {
            this.rows.forEach(function (row) {
                if (row.isExpanded === true) {
                    row.setExpand(false);
                }
            });
        }
        (_b = (_a = this.getRowByRowKey(rowKey)) === null || _a === void 0 ? void 0 : _a.setExpand) === null || _b === void 0 ? void 0 : _b.call(_a, isExpand);
    };
    Table.prototype.toggleColumns = function (options) {
        this.columns.forEach(function (c) {
            if (options.dataIndex.includes(c.config.dataIndex)) {
                c.setVisible(options.show);
            }
            else if (options.toggleOthers) {
                c.setVisible(!options.show);
            }
        });
    };
    Table.prototype.triggerSelectRowEvent = function (originalSelectedRowKeys) {
        var _this = this;
        this.rows.forEach(function (row) {
            // 如果设置 key 导致了 row 的选中状态的变化
            if (originalSelectedRowKeys.includes(row.key) !== _this.cachedSelectedRowKeys.includes(row.key)) {
                _this.notify(LifeCycleTypes.ON_ROW_SELECT, { row: row });
            }
        });
        this.notify(LifeCycleTypes.ON_TABLE_SELECT_ROW);
    };
    Table.prototype.selectRow = function (rowKeys, options) {
        if (options === void 0) { options = {}; }
        var originalSelectedRowKeys = __spreadArray([], __read(this.cachedSelectedRowKeys), false);
        this.cachedSelectedRowKeys =
            // 默认会覆写选中过的行，相当于清空选中状态，再设置
            options.overwrite !== false ? rowKeys : Array.from(new Set(__spreadArray(__spreadArray([], __read(originalSelectedRowKeys), false), __read(rowKeys), false)));
        if (options.triggerSelectRowEvent === true) {
            this.triggerSelectRowEvent(originalSelectedRowKeys);
        }
    };
    /**
     * 针对行选择，获取所有可操作的 keys
     */
    Table.prototype.getCanControlRowKeys = function (options) {
        var _this = this;
        // 针对行选择的场景，获取所有可操作的 key
        var canControlRowKeys = [];
        // 本地模式下，才支持跨页全选
        if (this.isLocalMode() && (options === null || options === void 0 ? void 0 : options.crossPage) === true) {
            var rowSelection_1 = this.plugin.getRowSelection(this.config.rowSelection);
            /**
             * 本地模式下，如果是跨页全选，需要选中所有数据
             * selectedRowKeys 需要通过 totalData 计算出来的，totalData 是经过用户搜索过滤后的数据，即全选是选中过滤后的全部数据
             * 如果配置了 selectable 来控制禁用状态，需要过滤会禁用的行
             */
            var totalData = rowSelection_1.selectable
                ? this.totalData.filter(function (item) {
                    return rowSelection_1.selectable({ table: _this, rowData: item });
                })
                : this.totalData;
            canControlRowKeys = totalData.map(function (item, index) {
                return genRowKey(item, _this.getOffsetIndexInAllData(index, _this.startPageNumber), _this.config.rowKey);
            });
        }
        else {
            // 如果是非跨页全选，就是根据当前页面的行来得到可操作的 key
            canControlRowKeys = this.rows.filter(function (item) { return item.selectable; }).map(function (item) { return item.key; });
        }
        return canControlRowKeys;
    };
    /**
     * 获取行选中状态
     */
    Table.prototype.getSelectedStatusInfo = function (options) {
        var canControlRowKeys = this.getCanControlRowKeys({ crossPage: options === null || options === void 0 ? void 0 : options.crossPage });
        if (this.isLocalMode() && (options === null || options === void 0 ? void 0 : options.crossPage) === true) {
            // 如果支持跨页全选，选中态需要根据所有可操作的 key 来计算
            // 全选中：选中的行大于等于可以被选中的行数量，用大于等于而不是等于判断，是为了避免意外情况下 selectedRowKeys 长度大于 canControlRowKeys
            // 另外，canControlRowKeys.length 需要大于 0，避免在选中行为空的时候，allSelected 为 true
            var allSelected_1 = this.selectedRowKeys.length >= canControlRowKeys.length && canControlRowKeys.length > 0;
            // 全不选中
            var noSelected_1 = this.selectedRowKeys.length === 0;
            return {
                allSelected: allSelected_1,
                noSelected: noSelected_1,
                partialSelected: !allSelected_1 && !noSelected_1,
                canControlRowKeys: canControlRowKeys,
            };
        }
        // 如果不支持跨页全选，选中态是根据当前页展示的数据来计算的
        // 只检查非禁用选择的行，否则在全选后，checkbox 还是 partialSelected 状态，无法反选了
        var allCheckRows = this.rows.filter(function (item) { return item.selectable; });
        // 全选中，判断 allCheckRows 大于 0，避免在选中行为空的时候，allSelected 为 true
        var allSelected = allCheckRows.every(function (item) { return item.isSelected; }) && allCheckRows.length > 0;
        // 全不选中
        var noSelected = allCheckRows.every(function (item) { return !item.isSelected; });
        return {
            allSelected: allSelected,
            noSelected: noSelected,
            partialSelected: !allSelected && !noSelected,
            canControlRowKeys: canControlRowKeys,
        };
    };
    Table.prototype.selectRowAll = function (selected, options) {
        if (options === void 0) { options = {}; }
        /**
         * canControlRowKeys 是当前能够操作的所有 key
         * 1. 如果是全选，就是将当前可操作的 key 保存到 cachedSelectedRowKeys
         * 2. 如果是取消全选，就是将当前可操作的 key 从 cachedSelectedRowKeys 中删除
         *  */
        var canControlRowKeys = this.getCanControlRowKeys({ crossPage: options.crossPage });
        // 排除禁用选择的行，获取当前能够操作的所有 rowKey
        if (selected === true) {
            // overwrite 配置为 false，是为了避免，禁用的并且是选中的行，不在 canControlRowKeys 中，导致选中状态被取消
            // 在业务方通过 api（setSelected、setSelectable）控制某些行后可能出现这种情况
            this.selectRow(canControlRowKeys, { triggerSelectRowEvent: options.triggerSelectRowEvent, overwrite: false });
            return;
        }
        // remove 会操作 cachedSelectedRowKeys 的索引，因此这里复制一遍
        var originalSelectedRowKeys = __spreadArray([], __read(this.cachedSelectedRowKeys), false);
        remove(this.cachedSelectedRowKeys, function (key) { return canControlRowKeys.includes(key); });
        if (options.triggerSelectRowEvent === true) {
            this.triggerSelectRowEvent(originalSelectedRowKeys);
        }
    };
    Table.prototype.dragRow = function () { };
    // 2023-09-20 更新， addRow, deleteRow 都是用 table.setData，更标准，可以同时设置 total, initTotalData
    // 并且由于受控模式下 totalData 并不是真实数据，所以改为修改 initTotalData
    // 非受控模式下，totalData 和 initTotalData 相同，所以改为修改 initTotalData 也没问题
    Table.prototype.addRow = function (data, option) {
        var _a;
        // TODO 考虑 loadmore 模式
        var position = (_a = option === null || option === void 0 ? void 0 : option.position) !== null && _a !== void 0 ? _a : 'bottom';
        var newInitTotalData = __spreadArray([], __read(this.initTotalData), false);
        if (option && isNumber(option === null || option === void 0 ? void 0 : option.index)) {
            newInitTotalData.splice(option.index, 0, data);
        }
        else {
            position === 'bottom' ? newInitTotalData.push(data) : newInitTotalData.unshift(data);
        }
        this.setData({
            reset: false,
            totalData: newInitTotalData,
            total: this.total + 1,
            isFullUpdate: false,
        });
    };
    Table.prototype.addRows = function (dataList, options) {
        var _a;
        var position = (_a = options === null || options === void 0 ? void 0 : options.position) !== null && _a !== void 0 ? _a : 'bottom';
        var newInitTotalData = __spreadArray([], __read(this.initTotalData), false);
        var _dataList = Array.isArray(dataList) ? dataList : [dataList];
        _dataList.forEach(function (_a) {
            var data = _a.data, option = _a.option;
            if (option && isNumber(option === null || option === void 0 ? void 0 : option.index)) {
                newInitTotalData.splice(option.index, 0, data);
            }
            else {
                // 新增在顶部还是底部
                position === 'bottom' ? newInitTotalData.push(data) : newInitTotalData.unshift(data);
            }
        });
        this.setData({
            reset: false,
            totalData: newInitTotalData,
            total: this.total + _dataList.length,
            isFullUpdate: false,
        });
    };
    Table.prototype.deleteRow = function (rowKey) {
        var _this = this;
        // TODO 考虑本地模式和 loadmore 模式
        // 支持批量删除，不然循环删会重复调用 toggleData，不太合理
        var newInitTotalData = __spreadArray([], __read(this.initTotalData), false);
        var rowKeyList = Array.isArray(rowKey) ? rowKey : [rowKey];
        var removedRows = remove(newInitTotalData, function (item, index) {
            var curRowKey = genRowKey(item, _this.getOffsetIndexInAllData(index), _this.config.rowKey);
            return rowKeyList.includes(curRowKey);
        });
        this.setData({
            reset: false,
            totalData: newInitTotalData,
            total: this.total - removedRows.length,
            isFullUpdate: false,
        });
    };
    // todo edit row、edit cell、edit table
    Table.prototype.clearSelectedRow = function () {
        this.cachedSelectedRowKeys = [];
    };
    /** 当前页码是否在第一页 */
    Table.prototype.isOnFirstPage = function () {
        return this.currentPage === this.startPageNumber;
    };
    Table.prototype.getCurrentStatus = function () {
        var _a;
        // 返回 table 当前的状态，用于切换到其它页面又回来时，恢复其状态
        return {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            columnFilterValues: this.columnFilterValues,
            sorterValues: this.sorterValues,
            toolbarValues: (_a = this.toolbar) === null || _a === void 0 ? void 0 : _a.filterValues,
        };
    };
    return Table;
}());
export { Table };
//# sourceMappingURL=Table.js.map