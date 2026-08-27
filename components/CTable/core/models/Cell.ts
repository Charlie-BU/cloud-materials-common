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
import type { Table } from './Table';
import type { Column } from './Column';
import type { Row } from './Row';
import { getCellData, setCellData } from '../../shared';

export class Cell {
  loading = false;
  isEditing = false;
  table: Table;
  column: Column;
  row: Row;

  constructor(table: Table, column: Column, row: Row) {
    this.table = table;
    this.column = column;
    this.row = row;
    // this.initDataFromConfig();
    this.makeObservable();
  }

  get component() {
    return this.column.config.component;
  }

  get componentProps() {
    return this.column.config.componentProps;
  }

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

  get decoratorType() {
    return this.column.config.cellDecorator;
  }

  get decoratorProps() {
    return this.column.config.cellDecoratorProps;
  }

  get data() {
    return getCellData(this.row.data, this.column.config.dataIndex);
  }
  set data(value: any) {
    // 对 cell 的数据的修改，直接反应到 row 中，row 中的数据和 table.totalData 中的数据是同一个引用
    // 因此保证了 cell 数据与 table.totalData 中的数据同步
    setCellData(this.row.data, this.column.config.dataIndex, value);
  }

  setData(value: any) {
    this.data = value;
  }

  // private initDataFromConfig() {
  //   const { config } = this.column;
  // }
  private makeObservable() {
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
  }

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

  showDetail() {}
}
