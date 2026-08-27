"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.CanBeStringColumnConfig = void 0;
var tslib_1 = require("tslib");
/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-13 21:14:57
 * @LastEditTime: 2021-12-14 20:34:23
 * @LastEditors: youjingyu
 * @Description:
 */
var reactive_1 = require("@formily/reactive");
var types_1 = require("../types");
// import { setComputedComponent, setComponentProps, formatComponentConfig } from '../shared';
var shared_1 = require("../../shared");
// 可以配置为 string 的 Column 配置，在 merge globalColumnConfig 时，需要特殊处理，否则配置为 string 时，string 会把对象直接覆盖
exports.CanBeStringColumnConfig = ['formatter', 'sorter', 'filter', 'summary', 'autoWidth'];
var Column = /** @class */ (function () {
    function Column(table, config) {
        this.initialized = false;
        this.visible = true;
        this.hidden = false;
        // libColumnComponentProps?: ComponentProps;
        // filterComponentType?: JSXComponent;
        // filterComponentProps?: ComponentProps;
        // filterDecoratorType?: JSXComponent;
        // filterDecoratorProps?: ComponentProps;
        // filterIconComponentType?: JSXComponent;
        // filterIconComponentProps?: ComponentProps;
        this.filterVisible = false;
        this.table = table;
        this.dataIndex = config.dataIndex;
        this.initDataFromConfig();
        this.makeObservable();
        this.onInit();
    }
    Object.defineProperty(Column.prototype, "config", {
        // column 的 config 改为读取最新的 table.config
        get: function () {
            var _this = this;
            var _a;
            // 1. 在 column 没有配 dataIndex 的时候的补全方式: 使用该 column 在 columns 数组中的索引
            // 2. 暂时不支持 columns 数组的顺序、元素个数受控，即如果 columns 中的元素或元素顺序改变，不会生效。
            //    所以一定能根据 dataIndex 在 table.config.columns 中找到当前 column 实例的最新配置
            // const rawColumnConfig = this.table.config.columns?.find((c, index) => {
            //   if (c) {
            //     this.fixDataIndex(c, index);
            //     return c.dataIndex === this.dataIndex;
            //   }
            //   return false;
            // }) as ColumnConfig;
            // // 原来 Table 生成 Column 实例所用的 config 要经过处理，这里同样要处理
            // return this.fixColumnConfig(rawColumnConfig);
            return (_a = this.table.config.columns) === null || _a === void 0 ? void 0 : _a.find(function (c) { return c && c.dataIndex === _this.dataIndex; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "filter", {
        get: function () {
            return this.table.plugin.getFilter(this.config.filter);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "filterComponentType", {
        get: function () {
            return this.filter.component;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "filterComponentProps", {
        get: function () {
            return this.filter.componentProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "filterDecoratorType", {
        get: function () {
            return this.filter.decorator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "filterDecoratorProps", {
        get: function () {
            return this.filter.decoratorProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "filterIconComponentType", {
        get: function () {
            return this.filter.icon;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "filterIconComponentProps", {
        get: function () {
            return this.filter.iconProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "show", {
        get: function () {
            return this.visible && !this.hidden;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "filterDataSource", {
        // 注释: 以下实例属性和 filter 相关，而 filter 暂时不改为受控属性，所以以下写法保留
        // get filterComponent() {
        //   return [this.filterComponentType, this.filterComponentProps];
        // }
        // set filterComponent(value: ComponentConfig) {
        //   setComputedComponent(this, 'filterComponent', value);
        // }
        // get filterDecorator() {
        //   return [this.filterDecoratorType, this.filterDecoratorProps];
        // }
        // set filterDecorator(value: ComponentConfig) {
        //   setComputedComponent(this, 'filterDecorator', value);
        // }
        // get filterIconComponent() {
        //   return [this.filterIconComponentType, this.filterIconComponentProps];
        // }
        // set filterIconComponent(value: ComponentConfig) {
        //   setComputedComponent(this, 'filterIconComponent', value);
        // }
        get: function () {
            var _this = this;
            var dataSource = this.filter.dataSource;
            // 直接不兼容 dataSource 老写法
            // const dataSource = this.filterComponentProps?.dataSource || this.filter.dataSource;
            if (dataSource === 'auto') {
                var uniqueValues = Array.from(new Set(this.table.initTotalData.map(function (item) { return (0, shared_1.getCellData)(item, _this.config.dataIndex); })));
                var _a = this.table.plugin.getFormatter(this.config.formatter), formatterFn_1 = _a.formatterFn, formatterMapping_1 = _a.formatterMapping;
                return uniqueValues.map(function (value) {
                    var text = value;
                    if (formatterMapping_1) {
                        text = formatterMapping_1[text];
                    }
                    if (formatterFn_1) {
                        text = formatterFn_1({
                            cellData: text,
                            column: _this,
                            table: _this.table,
                        });
                    }
                    return {
                        value: value,
                        text: text,
                    };
                });
            }
            else if ((0, shared_1.isFn)(dataSource)) {
                return dataSource({ table: this.table, column: this });
            }
            return dataSource;
        },
        enumerable: false,
        configurable: true
    });
    Column.prototype.initDataFromConfig = function () {
        var config = this.config;
        this.title = config.title;
        this.width = config.width;
        if (config.visible !== undefined) {
            this.visible = config.visible;
        }
        if (config.hidden !== undefined) {
            this.hidden = config.hidden;
        }
        var filter = this.table.plugin.getFilter(this.config.filter);
        if (filter.defaultValue) {
            this.filterValue = filter.defaultValue;
        }
        var defaultSorterValue = this.table.plugin.getSorter(this.config.sorter).defaultValue;
        if (defaultSorterValue) {
            this.sorterValue = defaultSorterValue;
        }
        // this.libColumnComponentProps = config.libColumnComponentProps;
        // this.filterComponent = formatComponentConfig(filter.component, filter.componentProps);
        // this.filterDecorator = formatComponentConfig(filter.decorator, filter.decoratorProps);
        // this.filterIconComponent = formatComponentConfig(filter.icon, filter.iconProps);
    };
    Column.prototype.makeObservable = function () {
        var privateAction = {
            setComponentConfig: reactive_1.action,
        };
        (0, reactive_1.define)(this, tslib_1.__assign({ title: reactive_1.observable, width: reactive_1.observable, visible: reactive_1.observable, hidden: reactive_1.observable, show: reactive_1.observable.computed, 
            // libColumnComponentProps: observable,
            // filterComponentType: observable,
            // filterComponentProps: observable,
            // filterDecoratorType: observable,
            // filterDecoratorProps: observable,
            // filterIconComponentType: observable,
            // filterIconComponentProps: observable,
            filterValue: reactive_1.observable, sorterValue: reactive_1.observable, filterVisible: reactive_1.observable, 
            // filterComponent: observable.computed,
            // filterDecorator: observable.computed,
            // filterIconComponent: observable.computed,
            filterDataSource: reactive_1.observable.computed, setVisible: reactive_1.action, setHidden: reactive_1.action, setFilterValue: reactive_1.action, setSorterValue: reactive_1.action, setFilterVisible: reactive_1.action, setWidth: reactive_1.action, setTitle: reactive_1.action }, privateAction));
    };
    Column.prototype.onInit = function () {
        this.initialized = true;
        this.table.notify(types_1.LifeCycleTypes.ON_COLUMN_INIT, { column: this });
    };
    Column.prototype.setVisible = function (visible) {
        this.visible = visible;
        this.table.notify(types_1.LifeCycleTypes.ON_COLUMN_VISIBLE_CHANGE, { column: this });
    };
    Column.prototype.setHidden = function (hidden) {
        this.hidden = hidden;
    };
    Column.prototype.setFilterValue = function (value) {
        this.filterValue = value;
    };
    Column.prototype.setSorterValue = function (value) {
        this.sorterValue = value;
    };
    Column.prototype.setFilterVisible = function (visible) {
        this.filterVisible = visible;
    };
    Column.prototype.setWidth = function (width) {
        this.width = width;
    };
    Column.prototype.setTitle = function (title) {
        this.title = title;
    };
    return Column;
}());
exports.Column = Column;
//# sourceMappingURL=Column.js.map