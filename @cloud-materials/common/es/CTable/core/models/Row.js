/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-25 19:58:13
 * @LastEditTime: 2021-12-15 14:51:07
 * @LastEditors: youjingyu
 * @Description:
 */
import { define, observable, action } from '@formily/reactive';
import { Cell } from './Cell';
import { LifeCycleTypes } from '../types';
// import { LifeCycleTypes, JSXComponent, ComponentProps, ComponentConfig } from '../types';
// import { setComputedComponent, formatComponentConfig, setComponentProps } from '../shared';
var Row = /** @class */ (function () {
    function Row(options) {
        this.initialized = false;
        this.isExpanded = false;
        this.isEditing = false;
        this.innerState = {};
        // componentType?: JSXComponent;
        // componentProps?: ComponentProps;
        // decoratorType?: JSXComponent;
        // decoratorProps?: ComponentProps;
        // expandRowComponentType?: JSXComponent;
        // expandRowComponentProps?: ComponentProps;
        // expandRowDecoratorType?: JSXComponent;
        // expandRowDecoratorProps?: ComponentProps;
        // rowSelectionComponentType?: JSXComponent;
        // rowSelectionComponentProps?: ComponentProps;
        // rowSelectionDecoratorType?: JSXComponent;
        // rowSelectionDecoratorProps?: ComponentProps;
        this.cells = [];
        this.key = options.rowKey;
        this.pageNumber = options.pageNumber;
        this.index = options.offsetIndexInAllData;
        this.data = options.rowData;
        this.table = options.table;
        this.isExpanded = options.expanded;
        this.initDataFromConfig();
        this.makeObservable();
        this.onInit();
    }
    Object.defineProperty(Row.prototype, "expandRow", {
        get: function () {
            return this.table.plugin.getExpandRow(this.table.config.expandRow);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "rowSelection", {
        get: function () {
            return this.table.plugin.getRowSelection(this.table.config.rowSelection);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "isSelected", {
        get: function () {
            return this.table.cachedSelectedRowKeys.includes(this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "selectable", {
        get: function () {
            // 如果 innerState 有值，说明通过 setSelectable api 设置过 row 的 selectable
            // 这时以内部状态，即 api 设置过的为准
            if (this.innerState.selectable !== undefined) {
                return this.innerState.selectable;
            }
            /**
             * 只有 selectable、expandable 支持配置为函数，isExpanded、isSelected 不支持配置为函数
             * 理由：行的展开、选中态主要是交给用户操作的，配置为函数，也大概率会用 innerState 的值，因此配置为函数的意义不大
             * 另外行选中逻辑非常复杂，如果加入函数配置，很容易理不清楚
             */
            if (this.rowSelection.selectable) {
                return this.rowSelection.selectable({ table: this.table, row: this, rowData: this.data });
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "expandable", {
        get: function () {
            if (this.innerState.expandable !== undefined) {
                return this.innerState.expandable;
            }
            if (this.expandRow.expandable) {
                return this.expandRow.expandable({ table: this.table, row: this, rowData: this.data });
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "componentType", {
        get: function () {
            return this.table.config.rowComponent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "componentProps", {
        get: function () {
            return this.table.config.rowComponentProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "decoratorType", {
        get: function () {
            return this.table.config.rowDecorator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "decoratorProps", {
        get: function () {
            return this.table.config.rowDecoratorProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "expandRowComponentType", {
        get: function () {
            return this.expandRow.component;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "expandRowComponentProps", {
        get: function () {
            return this.expandRow.componentProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "expandRowDecoratorType", {
        get: function () {
            return this.expandRow.decorator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "expandRowDecoratorProps", {
        get: function () {
            return this.expandRow.decoratorProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "rowSelectionComponentType", {
        get: function () {
            return this.rowSelection.component;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "rowSelectionComponentProps", {
        get: function () {
            return this.rowSelection.componentProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "rowSelectionDecoratorType", {
        get: function () {
            return this.rowSelection.decorator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "rowSelectionDecoratorProps", {
        get: function () {
            return this.rowSelection.decoratorProps;
        },
        enumerable: false,
        configurable: true
    });
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
    // get expandRowComponent() {
    //   return [this.expandRowComponentType, this.expandRowComponentProps];
    // }
    // set expandRowComponent(value: ComponentConfig) {
    //   setComputedComponent(this, 'expandRowComponent', value);
    // }
    // get expandRowDecorator() {
    //   return [this.expandRowDecoratorType, this.expandRowDecoratorProps];
    // }
    // set expandRowDecorator(value: ComponentConfig) {
    //   setComputedComponent(this, 'expandRowDecorator', value);
    // }
    // get rowSelectionComponent() {
    //   return [this.rowSelectionComponentType, this.rowSelectionComponentProps];
    // }
    // set rowSelectionComponent(value: ComponentConfig) {
    //   setComputedComponent(this, 'rowSelectionComponent', value);
    // }
    // get rowSelectionDecorator() {
    //   return [this.rowSelectionDecoratorType, this.rowSelectionDecoratorProps];
    // }
    // set rowSelectionDecorator(value: ComponentConfig) {
    //   setComputedComponent(this, 'rowSelectionDecorator', value);
    // }
    Row.prototype.initDataFromConfig = function () {
        var _this = this;
        var table = this.table;
        // const { config } = table;
        // this.component = formatComponentConfig(config.rowComponent, config.rowComponentProps);
        // this.decorator = formatComponentConfig(config.rowDecorator, config.rowDecoratorProps);
        // if (config.expandRow) {
        //   const expandRow = this.table.plugin.getExpandRow(config.expandRow);
        //   this.expandRowComponent = formatComponentConfig(expandRow.component, expandRow.componentProps);
        //   this.expandRowDecorator = formatComponentConfig(expandRow.decorator, expandRow.decoratorProps);
        // }
        // if (config.rowSelection) {
        //   const rowSelection = this.table.plugin.getRowSelection(config.rowSelection);
        //   this.rowSelectionComponent = formatComponentConfig(rowSelection.component, rowSelection.componentProps);
        //   this.rowSelectionDecorator = formatComponentConfig(rowSelection.decorator, rowSelection.decoratorProps);
        // }
        this.cells = table.columns.map(function (column) { return new Cell(table, column, _this); });
    };
    Row.prototype.makeObservable = function () {
        define(this, {
            innerState: observable,
            selectable: observable.computed,
            isExpanded: observable,
            expandable: observable.computed,
            isEditing: observable,
            data: observable,
            cells: observable,
            // componentType: observable,
            // componentProps: observable,
            // decoratorType: observable,
            // decoratorProps: observable,
            // expandRowComponentType: observable,
            // expandRowComponentProps: observable,
            // expandRowDecoratorType: observable,
            // expandRowDecoratorProps: observable,
            // rowSelectionComponentType: observable,
            // rowSelectionComponentProps: observable,
            // rowSelectionDecoratorType: observable,
            // rowSelectionDecoratorProps: observable,
            // component: observable.computed,
            // decorator: observable.computed,
            // expandRowComponent: observable.computed,
            // expandRowDecorator: observable.computed,
            // rowSelectionComponent: observable.computed,
            // rowSelectionDecorator: observable.computed,
            isSelected: observable.computed,
            // setComponent: action,
            // setComponentProps: action,
            // setDecorator: action,
            // setDecoratorProps: action,
            // setExpandRowComponent: action,
            // setExpandRowComponentProps: action,
            // setExpandRowDecorator: action,
            // setExpandRowDecoratorProps: action,
            // setRowSelectionComponent: action,
            // setRowSelectionComponentProps: action,
            // setRowSelectionDecorator: action,
            // setRowSelectionDecoratorProps: action,
            setData: action,
            setSelect: action,
            setSelectable: action,
            setExpand: action,
            setExpandable: action,
        });
    };
    Row.prototype.onInit = function () {
        this.initialized = true;
        this.table.notify(LifeCycleTypes.ON_ROW_INIT, { row: this });
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
    // setExpandRowComponent(component: JSXComponent, props?: ComponentProps) {
    //   this.expandRowComponent = component;
    //   setComponentProps(this, 'expandRowComponent', props);
    // }
    // setExpandRowComponentProps(props: ComponentProps) {
    //   setComponentProps(this, 'expandRowComponent', props);
    // }
    // setExpandRowDecorator(component: JSXComponent, props?: ComponentProps) {
    //   this.expandRowDecorator = component;
    //   setComponentProps(this, 'expandRowDecorator', props);
    // }
    // setExpandRowDecoratorProps(props: ComponentProps) {
    //   setComponentProps(this, 'expandRowDecorator', props);
    // }
    // setRowSelectionComponent(component: JSXComponent, props?: ComponentProps) {
    //   this.expandRowComponent = component;
    //   setComponentProps(this, 'rowSelectionComponent', props);
    // }
    // setRowSelectionComponentProps(props: ComponentProps) {
    //   setComponentProps(this, 'rowSelectionComponent', props);
    // }
    // setRowSelectionDecorator(component: JSXComponent, props?: ComponentProps) {
    //   this.expandRowDecorator = component;
    //   setComponentProps(this, 'rowSelectionDecorator', props);
    // }
    // setRowSelectionDecoratorProps(props: ComponentProps) {
    //   setComponentProps(this, 'rowSelectionDecorator', props);
    // }
    Row.prototype.setData = function (rowData) {
        if (rowData === void 0) { rowData = {}; }
        // 调用 row.setData 更新 row.data 后，row.data 的数据与 table.totalData（table.initTotalData） 中的数据同步问题：
        // 其实 row.data 和 table.totalData 是同一个对象的引用
        // 因此在修改数据时通过 Object.assign 的方式保证引用不变，从而就保证了数据的同步
        this.data = Object.assign(this.data, rowData);
    };
    Row.prototype.setSelect = function (isSelected, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (isSelected === this.isSelected) {
            return;
        }
        var triggerEvent = function () {
            if (options.triggerSelectRowEvent === true) {
                _this.table.notify(LifeCycleTypes.ON_ROW_SELECT, { row: _this });
                _this.table.notify(LifeCycleTypes.ON_TABLE_SELECT_ROW);
            }
        };
        // 在单选模式下，只能选择一个，直接覆盖缓存的 key
        if (options.overwrite === true) {
            this.table.cachedSelectedRowKeys = isSelected ? [this.key] : [];
            triggerEvent();
            return;
        }
        if (isSelected === true) {
            this.table.cachedSelectedRowKeys.push(this.key);
        }
        else if (isSelected === false) {
            this.table.cachedSelectedRowKeys.splice(this.table.cachedSelectedRowKeys.indexOf(this.key), 1);
        }
        triggerEvent();
    };
    Row.prototype.setSelectable = function (selectable) {
        this.innerState.selectable = selectable;
    };
    Row.prototype.setExpand = function (isExpanded) {
        this.isExpanded = isExpanded;
    };
    Row.prototype.setExpandable = function (expandable) {
        this.innerState.expandable = expandable;
    };
    Row.prototype.getCellByDataIndex = function (dataIndex) {
        // Todo 提高查找效率
        return this.cells.find(function (cell) { return cell.column.config.dataIndex === dataIndex; });
    };
    return Row;
}());
export { Row };
//# sourceMappingURL=Row.js.map