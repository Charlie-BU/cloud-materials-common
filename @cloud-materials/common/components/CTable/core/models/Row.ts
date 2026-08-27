/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-25 19:58:13
 * @LastEditTime: 2021-12-15 14:51:07
 * @LastEditors: youjingyu
 * @Description:
 */
import { define, observable, action } from '@formily/reactive';
import type { Table } from './Table';
import { Cell } from './Cell';
import { LifeCycleTypes } from '../types';
// import { LifeCycleTypes, JSXComponent, ComponentProps, ComponentConfig } from '../types';
// import { setComputedComponent, formatComponentConfig, setComponentProps } from '../shared';

export class Row<T extends Record<string, any> = any> {
  key: string;
  index: number;
  // 标记当前行属于第几页
  pageNumber: number;
  initialized = false;
  isExpanded = false;
  isEditing = false;
  innerState: { selectable?: boolean; expandable?: boolean } = {};
  data: T;

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

  cells: Cell[] = [];
  table: Table;

  constructor(options: {
    table: Table;
    rowData: T;
    rowKey: string;
    pageNumber: number;
    offsetIndexInAllData: number;
    expanded: boolean;
  }) {
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

  get expandRow() {
    return this.table.plugin.getExpandRow(this.table.config.expandRow);
  }
  get rowSelection() {
    return this.table.plugin.getRowSelection(this.table.config.rowSelection);
  }

  get isSelected() {
    return this.table.cachedSelectedRowKeys.includes(this.key);
  }

  get selectable() {
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
  }

  get expandable() {
    if (this.innerState.expandable !== undefined) {
      return this.innerState.expandable;
    }
    if (this.expandRow.expandable) {
      return this.expandRow.expandable({ table: this.table, row: this, rowData: this.data });
    }
    return true;
  }

  get componentType() {
    return this.table.config.rowComponent;
  }

  get componentProps() {
    return this.table.config.rowComponentProps;
  }

  get decoratorType() {
    return this.table.config.rowDecorator;
  }

  get decoratorProps() {
    return this.table.config.rowDecoratorProps;
  }

  get expandRowComponentType() {
    return this.expandRow.component;
  }

  get expandRowComponentProps() {
    return this.expandRow.componentProps;
  }

  get expandRowDecoratorType() {
    return this.expandRow.decorator;
  }

  get expandRowDecoratorProps() {
    return this.expandRow.decoratorProps;
  }

  get rowSelectionComponentType() {
    return this.rowSelection.component;
  }

  get rowSelectionComponentProps() {
    return this.rowSelection.componentProps;
  }

  get rowSelectionDecoratorType() {
    return this.rowSelection.decorator;
  }

  get rowSelectionDecoratorProps() {
    return this.rowSelection.decoratorProps;
  }

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

  private initDataFromConfig() {
    const { table } = this;
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
    this.cells = table.columns.map(column => new Cell(table, column, this));
  }

  private makeObservable() {
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
  }

  private onInit() {
    this.initialized = true;
    this.table.notify(LifeCycleTypes.ON_ROW_INIT, { row: this });
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

  setData(rowData: Partial<T> = {}) {
    // 调用 row.setData 更新 row.data 后，row.data 的数据与 table.totalData（table.initTotalData） 中的数据同步问题：
    // 其实 row.data 和 table.totalData 是同一个对象的引用
    // 因此在修改数据时通过 Object.assign 的方式保证引用不变，从而就保证了数据的同步
    this.data = Object.assign(this.data, rowData);
  }

  setSelect(isSelected: boolean, options: { triggerSelectRowEvent?: boolean; overwrite?: boolean } = {}) {
    if (isSelected === this.isSelected) {
      return;
    }
    const triggerEvent = () => {
      if (options.triggerSelectRowEvent === true) {
        this.table.notify(LifeCycleTypes.ON_ROW_SELECT, { row: this });
        this.table.notify(LifeCycleTypes.ON_TABLE_SELECT_ROW);
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
    } else if (isSelected === false) {
      this.table.cachedSelectedRowKeys.splice(this.table.cachedSelectedRowKeys.indexOf(this.key), 1);
    }
    triggerEvent();
  }

  setSelectable(selectable: boolean) {
    this.innerState.selectable = selectable;
  }

  setExpand(isExpanded: boolean) {
    this.isExpanded = isExpanded;
  }

  setExpandable(expandable: boolean) {
    this.innerState.expandable = expandable;
  }

  getCellByDataIndex(dataIndex: string) {
    // Todo 提高查找效率
    return this.cells.find(cell => cell.column.config.dataIndex === dataIndex);
  }
}
