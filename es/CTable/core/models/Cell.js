// import { CellComponentConfig } from './../types/component';
/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-14 16:55:28
 * @LastEditTime: 2021-11-28 11:29:46
 * @LastEditors: youjingyu
 * @Description:
 */
import { define, observable, action } from '@formily/reactive';
import { getCellData, setCellData } from '../../shared';
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
            return getCellData(this.row.data, this.column.config.dataIndex);
        },
        set: function (value) {
            // 对 cell 的数据的修改，直接反应到 row 中，row 中的数据和 table.totalData 中的数据是同一个引用
            // 因此保证了 cell 数据与 table.totalData 中的数据同步
            setCellData(this.row.data, this.column.config.dataIndex, value);
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
        define(this, {
            loading: observable,
            isEditing: observable,
            // componentType: observable,
            // componentProps: observable,
            // decoratorType: observable,
            // decoratorProps: observable,
            data: observable.computed,
            // component: observable.computed,
            // decorator: observable.computed,
            setData: action,
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
export { Cell };
//# sourceMappingURL=Cell.js.map