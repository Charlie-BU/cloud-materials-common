"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
// import { CellComponentConfig } from './../types/component';
/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-14 16:55:28
 * @LastEditTime: 2021-11-28 11:29:46
 * @LastEditors: youjingyu
 * @Description:
 */
var reactive_1 = require("@formily/reactive");
var shared_1 = require("../../shared");
var Cell = /** @class */ (function () {
    function Cell(table, column, row) {
        this.loading = false;
        this.isEditing = false;
        this.table = table;
        this.column = column;
        this.row = row;
        // this.initDataFromConfig();
        this.makeObservable();
    }
    Object.defineProperty(Cell.prototype, "component", {
        get: function () {
            return this.column.config.component;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "componentProps", {
        get: function () {
            return this.column.config.componentProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "decoratorType", {
        // /**
        //  * @deprecated
        //  */
        // get componentType() {
        //   return this.column.config.cellComponent;
        // }
        // /**
        //  * @deprecated
        //  */
        // get cellComponentProps() {
        //   return this.column.config.cellComponentProps;
        // }
        get: function () {
            return this.column.config.cellDecorator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "decoratorProps", {
        get: function () {
            return this.column.config.cellDecoratorProps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "data", {
        get: function () {
            return (0, shared_1.getCellData)(this.row.data, this.column.config.dataIndex);
        },
        set: function (value) {
            // 对 cell 的数据的修改，直接反应到 row 中，row 中的数据和 table.totalData 中的数据是同一个引用
            // 因此保证了 cell 数据与 table.totalData 中的数据同步
            (0, shared_1.setCellData)(this.row.data, this.column.config.dataIndex, value);
        },
        enumerable: false,
        configurable: true
    });
    Cell.prototype.setData = function (value) {
        this.data = value;
    };
    // private initDataFromConfig() {
    //   const { config } = this.column;
    // }
    Cell.prototype.makeObservable = function () {
        (0, reactive_1.define)(this, {
            loading: reactive_1.observable,
            isEditing: reactive_1.observable,
            // componentType: observable,
            // componentProps: observable,
            // decoratorType: observable,
            // decoratorProps: observable,
            data: reactive_1.observable.computed,
            // component: observable.computed,
            // decorator: observable.computed,
            setData: reactive_1.action,
            // setComponent: action,
            // setComponentProps: action,
            // setDecorator: action,
            // setDecoratorProps: action,
        });
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
    Cell.prototype.showDetail = function () { };
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map