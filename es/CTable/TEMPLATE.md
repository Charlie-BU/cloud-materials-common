## TableConfig

后续是 table 的各个配置的详细说明。

| 参数名 |                   描述                   |                                         类型                                         | 默认值 |
| ------ | :--------------------------------------: | :----------------------------------------------------------------------------------: | -----: |
| mode | [Table 的数据处理模式](https://bytedance.feishu.cn/wiki/wikcnWmBJ6BsFlJT9sDLaNOOYie#Xso6dUSUIosUYex4zCjcLo0vnAh) | 'local'\|'remote'\|'loadMore'  | 'remote'  |
| fetcher | 数据请求函数 | (options: [FetcherOptions](#fetcheroptions)) => [FetcherResponse](#fetcheroptions)  | - |
| data | 表格数据 | T[]  | - |
| rowKey | 和 arco 的 rowKey 类似 | string\|((rowData: T) =\> string)  | - |
| pagination | 是否启用分页 | boolean | PaginationProps | true |
| pageSize | 分页大小 | number | 10 |
| startPageNumber | 起始页码 | 0 \| 1 | 1 |
| columns | 列配置 | [ColumnConfig](#columnconfig)[] | - |
| loadMoreContainerHeight | 滚动加载容器的高度 | number | 460 |
| globalColumnConfig | 全局列配置，会与每一列的配置合并 | Partial\<ColumnConfig\> | - |
| globalScope | 挂在 table 上的全局数据，任意位置可用 | Record<string, any> | - |
| beforeInit | table 第一次请求前调用的钩子，返回值会写入 globalScope | ({ table: Table }) => Promise\<Record<string, any\> | - |
| rowComponent | 替换默认的 row 组件 | string\|React.ElementType | - |
| rowComponentProps | row 组件 props  | Record\<string, any\> | - |
| rowDecorator | 包裹 row 的组件 | string\|React.ElementType | - |
| rowDecoratorProps | decorator 组件的 props  | Record\<string, any\> | - |
| rowSelection | 行选择配置 | string\|[RowSelection](#rowselection) | - |
| expandRow | 展开行配置 | string\|[ExpandRow](#expandrow) | - |
| toolbar | 工具栏配置 | [ToolbarConfig](#toolbarconfig) | - |
| effects | 执行 table 事件监听的函数 | (options: { table: Table }): void | - |
| getInitStatus | 获取 table 的初始状态 | (options: { table: Table }) => [TableInitStatus](#tableinitstatus) | - |
| extraConfig | 额外配置 | [ExtraConfig](#extraconfig) | - |
| arcoTableProps | 透传给 arco 的 table props | ArcoTableProps | (table:TableModal, originalProps: ArcoTableProps)=> ArcoTableProps | - |

## ColumnConfig
| 参数名 |                   描述                   |                                         类型                                         | 默认值 |
| ------ | :--------------------------------------: | :----------------------------------------------------------------------------------: | -----: |
| title | 列标题 | ReactNode | - |
| tooltip | 在标题后渲染 icon ，悬浮展示提示信息 | ReactNode  | - |
| dataIndex | 类似 arco 的 dataIndex | string  | - |
| width | 宽度，如果所有列都有数字类型的 width（包括配置了 autoWidth），会自动设置 scroll-x | number\|string  | - |
| alignType | 数字右对齐标题文字（排除 icon） | 'right'  | - |
| visible | 列是否可见，用户可以在自定义列中切换改列的可见性 | boolean  | true |
| hidden | 是否隐藏列，用户可以无法在自定义列中切换改列的可见性 | boolean  | false |
| fixed | 固定列 | 'left' \| 'right'  | - |
| formatter | 在渲染前对原始数据做格式化，必须返回文本 | string\|FormatterFn\|[Formatter](#formatter) | - |
| sorter | 排序配置 | string\|SorterFn\|[Sorter](#sorter)  | - |
| filter | 过滤配置 | string\|[Filter](#filter)  | - |
| autoWidth | 自适应宽度 | string\|[AutoWidth](#autowidth)  | - |
| component | cell 自定义渲染组件，组件的 props 包含完整的 table 领域模型信息 | string\|React.ElementType\<{ table, row, rowData, cell, column, cellData, content }\>  | - |
| render | render 的参数和 arco 的 render 配置相同 | (cellData, rowData, index) => any  | - |
| arcoColumnProps | 透传给 arco 的 column 配置 | ArcoColumnProps  | - |

## ToolbarConfig
| 参数名 |                   描述                   |                                         类型                                         | 默认值 |
| ------ | :--------------------------------------: | :----------------------------------------------------------------------------------: | -----: |
| rows | toolbar 的行配置 | [ToolbarRowConfig](#toolbarrowconfig)[]  | - |
| left | 如果只有一行，直接配置左边部分 | [ToolbarItemConfig](#toolbaritemconfig)[]  | - |
| right | 如果只有一行，直接配置右边部分 | [ToolbarItemConfig](#toolbaritemconfig)[]  | - |
| bottomLeft | 如果只有一行，直接配置左下角部分 | [ToolbarItemConfig](#toolbaritemconfig)[]  | - |
| filterOnChange | 是否在 toolbar 的搜索值改变时触发搜索 | Boolean | true |
| debounceDelay | toolbar 触发搜索的 debounce 延时 | number | 500 |

由于后续的配置具有类型的嵌套和依赖关系，用表格展示不够直观，因此暂时用 interface 来表示

## ToolbarRowConfig
```typescript
interface ToolbarRowConfig {
  left?: ToolbarItemConfig[];
  right?: ToolbarItemConfig[];
}
```

## ToolbarItemConfig
```typescript
interface ToolbarItemConfig {
  // 如果是输入性字段，需要配置的字段的名字，name 会作为 filterValues 里面的 key
  name?: string;
  // toolbar 某一项的组件
  component: string|React.ElementType\<{ table, toolbar, onChange, value }\>;
  // 是否在值改变时，触发搜索，默认为 true
  filterOnChange?: boolean;
  // 是否可见，默认为 true
  visible?: boolean;
}
```

## Toolbar内置组件props

CSearch、CSimpleSearch、CCascaderSearch、CCombineSearch、CToolbarOperationMenu（对应物料库的 COperationMenu 组件），这几个内置组件的属性，参见物料库中对应组件的 props。

内置组件 FunctionBtnList 是放置 table 功能按钮的容器，FunctionBtnList 以字符串的形式内置了 RefreshBtn、ColConfigBtn、ExportDataBtn 几个操作按钮，使用 demo 如下：
```typescript
table.defineConfig({
  toolbar: {
    right: [
      { component: 'ColConfigBtn', componentProps() { return { disabledColsDataIndex: ['name'] } } }
    ]
  }
})
```

FunctionBtnListProps
```typescript
interface FunctionBtnListProps {
  btnList: FunctionBtnConfigItem[];
}

interface FunctionBtnConfigItem {
  visible: boolean;
  component: 'RefreshBtn' | 'ColConfigBtn' | 'ExportDataBtn' | React.FC<{ table, toolbar }>;
  componentProps: Record<string, unknown> | ((options: { table, toolbar }) => Record<string, unknown>)
}
```

当 component 配置为 'RefreshBtn' | 'ColConfigBtn' | 'ExportDataBtn' 时，每个内置组件对应的 props 如下：

RefreshBtn：刷新按钮的 props
```typescript
interface RefreshBtnProps {
  // 点击刷新按钮时，默认会刷新 table，你可以覆写 onClick 事件来做自定义行为
  onClick?: () => void;
}
```

ColConfigBtn：列过滤按钮的 props
```typescript
interface ColConfigBtnProps {
  // 禁用某些列的过滤
  disabledColsDataIndex?: string[];
}
```

ExportDataBtn：导出数据的按钮的 props
```typescript
interface ExportDataBtnProps {
  /**
   * 下载按钮的 tooltip
   * @default '导出数据'
   */
  tooltip?: string;
  /**
   * 下载弹窗的配置
   */
  modalProps?: Partial<CModalProps>;
  /**
   * 默认选中的列
   */
  defaultChecked?: 'all' | string[];
  /**
   * 禁止某些列的选择
   */
  disabledDataIndex?: string[];
  /**
   * 下载的文件名字
   * @default '导出的数据'
   */
  filename?: string;
  /**
   * 下载时调用的数据请求函数，不传时，下载当前表格已经请求的数据
   */
  fetcher?: (options: {
    table: Table;
    checkedDataIndex: string[];
    exportRangeType?: ExportDataRangeType;
  }) => Promise<Record<string, any>[]>;
  /**
   * 数据格式化配置，如果不配置，会尝试调用对应 dataIndex 的 column 的 formatter 类进行格式化
   * 这也是推荐通过 formatter 来进行纯文本列展示的原因之一
   */
  formatter?: Record<string, (dateItem: any) => string>;
  /**
   * 在 table column 的基础上，添加额外的列，额外的列会加在最后，如果 dataIndex 相同，会覆盖 table column 配置
   */
  extraColumns?: { dataIndex: string; title: string; formatter?: (val: any) => string }[];
  /**
   * 导出数据时，忽略的 dataIndex
   */
  ignoreDataIndex?: string[];
  /**
   * 在开始下载前，对下载配置进行 format
   */
  formatConfigBeforeExport?: (options: TExportDataToCSVOptions) => TExportDataToCSVOptions;
  /**
   * 是否展示导出范围的组件
   * @default false
   */
  showExportRange?: boolean;
  /**
   * 支持业务方自己渲染 modal 的 content
   */
  renderContent?: (options: {
    checkDataIndexNode: React.ReactNode;
    exportRangeNode?: React.ReactNode;
  }) => React.ReactNode;
  /**
   * 支持业务方自定义下载函数，不用内置的
   */
  downloadData?: (options: TExportDataToCSVOptions) => any;
}
```

## FetcherOptions
```typescript
// 触发 fetcher 的动作
enum FetchTypes {
  INIT = 'init',
  CHANGE_PAGE = 'changePage',
  REFRESH = 'refresh',
  SORT = 'sort',
  FILTER = 'filter',
}

// fetcher 的参数
type FetcherOptions = {
  table: Table;
  type: FetchTypes;
  pageSize: number;
  currentPage: number;
  // 根据 pageSize、currentPage 计算出的偏移，方便使用
  offset: number;
  // toolbar 和所有列的过滤值的合并
  filterValues?: Record<dataIndex, any>;
  sorterValues?: Record<dataIndex, 'ascend'|'descend'>;
};

// fetcher 返回的数据
type FetcherResponse\<T extends Record\<string, any\>\> = {
  total: number;
  data: T[];
  // 在 fetcher 中返回全局数据，整个 table 可以访问
  globalScope?: any;
  // 在 load more 模式下，返回是否还有更多数据
  noMore?: boolean;
};
```

## TableInitStatus
```typescript
// table 初始化时的默认状态
type TableInitStatus = {
  pageSize?: number;
  currentPage?: number;
  // 列过滤值
  columnFilterValues?: FilterValues;
  // 排序值
  sorterValues?: SorterValues;
  // toolbar 过滤值
  toolbarValues?: Record<string, any>;
  // 高亮的行
  activeRowKey?: string;
};
```

## ExtraConfig
```typescript
type ExtraConfig = {
  // 当数据总数少于多少条时，隐藏分页，默认为 10
  hidePaginationTotal?: number;
  // 横向滚动条固定在 table 底部
  autoFixBottomScroll?: boolean;
}
```

## RowSelection
```typescript
type RowSelection = {  
  type?: 'radio' | 'checkbox';
  // 切换分页后是否保留选中项，默认为 false
  preserveCrossPageKeys?: boolean;
  // 是否禁用某些行选择
  selectable?: (options: { table: Table<T>; row?: Row<T>; rowData: T }) => boolean;
}
```

## ExpandRow
```typescript
export type ExpandRow = {
  // 现在暂时没有内置的展开行组件，因此 type 无可用的值
  type?: never;
  // 展开时，是否收起其它的行，默认为 true
  collapseOthers?: boolean;
  // 展开行渲染的组件
  component?: React.ElementType;
  // 是否禁用某些行展开
  expandable?: (options: { table: Table<T>; row: Row<T>; rowData: T }) => boolean;
};
```

## Formatter
```typescript
type FormatterFn = (
  options: {
    table: Table;
    cellData: any;
    cell?: Cell;
    row?: Row;
    rowData?: T;
    column: Column;
  }
) => string;

type Formatter = {
  type?: 'int' | 'float' | 'money' | 'time' | 'utcTime' | 'fallbackText';  
  /** 
   * 格式化数据用于渲染，只能返回 string，不能返回 ReactNode
   * 如果仅仅是对数据做格式化，建议使用 Formatter，而不是 render 或者 component
   * 也可以格式化后，再通过 component 渲染，格式化的结果是 component 的入参：{ content }
   * */
  formatterFn?: FormatterFn;
  // 通过数据映射做格式化
  formatterMapping?: Record\<string, any\>;
}
```

## Sorter
```typescript
type SorterValue = 'ascend' | 'descend';
type SorterDirections = SorterValue[];
type SorterFn = (sorterValue: SorterValue, a: any, b: any) => number;

type Sorter = {
  type?: 'default';
  // 支持的排序值
  directions?: SorterDirections;
  // 排序函数
  sorterFn?: SorterFn;
  // 默认的排序值
  defaultValue?: SorterValue;
};
```

## Filter
```typescript
type FilterFn = (
  options: {
    table: Table;    
    cellData: any;    
    rowData: T;
    column: Column;
    // 触发搜索的列对应的值
    filterValue: FilterValue;
    // toolbar 和各列的过滤值的合并
    filterValues: FilterValues;
  }
) => boolean;

type FilterDataSourceItem = {
  text: React.ReactNode;
  value: any;
};

type Filter = {
  type?: 'select' | 'searchInput';
  // 默认的过滤值
  defaultValue?: FilterValue;
  // 是否是多选
  multiple?: boolean;
  // 选项数据，如果配置为 auto，会根据当前列的数据，自动计算
  dataSource?:
    | 'auto'
    | FilterDataSourceItem[]
    | ((options: { table: Table<T>; column: Column<T> }) => FilterDataSourceItem[]);
  // 过滤函数
  filterFn?: FilterFn;
  // 主要用于通过 toolbar 联动触发列本身的过滤时，不希望展示列本身的过滤 icon
  hide?: boolean;
  // 过滤 icon
  icon?: React.ElementType;
    // 自定义过滤组件
  component?: React.ElementType;
};
```

## AutoWidth
```typescript
type AutoWidth = {
  type?: 'default';
  // 获取单元格的宽度，默认为 dataIndex 对应的数据的文本宽度
  // 如果有 formatter，默认会根据 formatter 的结果计算宽度
  getCellWidth?: (
    options: {
      table: Table;
      row?: Row;
      rowData?: T;
      column: Column;
      cell?: Cell;      
      cellData: any;
    },
  ) => number;
  // 获取表头单元格的宽度
  getHeaderCellWidth?: ({ table, column }) => number;
  // 最大宽度，默认为 240px
  maxWidth?: number;
  // 最小宽度，默认为 100px
  minWidth?: number;
  // 单元格空白部分的宽度，如 padding，默认为 32px
  blankWidth?: number;
}
```
## 领域模型

table 整体的实现都是基于领域模型的，领域模型上提供了丰富的方法，让你可以控制 table 的行为和状态，如果这些方法无法满足你的诉求，请 oncall，尽量避免通过 react 的 state 来控制 table 的行为和展示！！

通常在 table 的各项支持函数的配置处，都传入了 table、row 等领域模型变量，如可以将 component、componentProps、toolbar 等配置为函数，函数会通过对象的形式传入各个领域模型变量。另外，在 table 的子孙组件里面，也可以通过 [hooks](#hooks) 来访问这些领域模型变量。

### `Table`

#### 属性

| 参数名 |                   描述                   |                                         类型                                         |
| ------ | :--------------------------------------: | :----------------------------------------------------------------------------------: |
| loading | 加载状态 | boolean |
| pageSize | 分页大小 | number |
| total | 数据总条数 | number |
| currentPage | 当前页码 | number |
| initTotalData | 初始化时的所有数据 | T[] |
| totalData | 排序、过滤后的所有数据（即用于渲染的数据） | T[] |
| filterValues | 当前的过滤值 | Record\<dataIndex, any\> |
| sorterValues | 当前的排序值 | Record\<dataIndex, 'ascend'\|'descend'\> |
| selectedRowKeys | 当前被选择的 row key | string[] |
| selectedRowData | 当前被选择的数据 | T[] |
| globalScope | 全局响应式数据 | Record\<string, any\> |
| columns | 列领域模型列表 | Column[] |
| rows | 当前渲染的行的领域模型列表 | Row[] |
| toolbar | 工具栏的领域模型对象 | Toolbar |

#### 方法

```typescript
class Table {
  // status 属性
  status: {
    initialized: boolean;
    loading: boolean;
    loadMoreLoading?: boolean;
    // 在 load 模式下，判断是否还有更多数据
    noMore?: boolean;
    statusChangeReason?: StatusChangeReason;
    error?: Error;
  }
  // 设置数据，reset：是否重置表格状态
  setData(options: { totalData: T[]; currentPage?: number; reset?: boolean; }) {}
  // 设置全局数据
  setGlobalScope(globalScope: any) {}
  // 刷新表格，showLoading：是否展示 loading
  refresh(options?: { showLoading?: boolean }) {}
  // 切换页码
  changePage(pageNumber: number, pageSize?: number) {}
  // 触发 toolbar 的 filter 动作
  toolbarFilter() {}
  // 展开/收起行
  expendRow(rowKey: string, isExpand: boolean) {}
  // 显示/隐藏列
  toggleColumns(options: { dataIndex: string[]; show: boolean; toggleOthers?: boolean }) {}
  // 选择行
  selectRow(rowKeys: string[], options?: { triggerRowSelectEvent?: boolean }) {}
}
```

### `Column`

#### 属性

| 参数名 |                   描述                   |                                         类型                                         |
| ------ | :--------------------------------------: | :----------------------------------------------------------------------------------: |
| title | 标题 | React.ReactNode |
| width | 宽度 | number\|百分数 |
| visible | 是否显示 | Boolean |
| hidden | 是否隐藏 | Boolean |
| filterVisible | 过滤组件是否显示 | Boolean |
| filterValue | 过滤值 | any |
| sorterValue | 排序值 | 'ascend'\|'descend' |
| children | 子列 | Column[] |
| table | table 领域模型 | Table |

#### 方法

```typescript
class Column { 
  // 设置显示
  setVisible(visible: boolean) {}
  // 设置隐藏
  setHidden(visible: boolean) {}
  // 设置过滤值
  setFilterValue(value: FilterValue) {}
  // 设置排序值
  setSorterValue(value: SorterValue) {}
  // 设置宽度
  setWidth(width: number | string) {}
}
```

### `Row`

#### 属性

| 参数名 |                   描述                   |                                         类型                                         |
| ------ | :--------------------------------------: | :----------------------------------------------------------------------------------: |
| key | rowKey | string |
| isSelected | 是否被选择 | Boolean |
| selectable | 是否允许选择 | Boolean |
| isExpanded | 是否展开 | Boolean |
| expandable | 是否允许展开 | Boolean |
| data | 行数据 | T |
| table | table 领域模型 | Table |
| cells | 单元格领域模型列表 | Cell[] |

#### 方法

```typescript
class Row { 
  // 设置行数据
  setData(rowData: Partial\<DateItemType\> = {}) {}
  // 选择行
  setSelect(isSelected: boolean) {}
  // 禁用选择行
  setSelectable(selectable: boolean) {}
  // 禁用选择行展开
  setExpandable(expandable: boolean) {}
  //展开行
  setExpand(isExpanded: boolean) {}  
}
```

### `Cell`

#### 属性

| 参数名 |                   描述                   |                                         类型                                         |
| ------ | :--------------------------------------: | :----------------------------------------------------------------------------------: |
| loading | 加载状态 | Boolean |
| data | cell 数据 | DateItemType['dataIndex'] |
| table | table 领域模型 | Table |
| column | column 领域模型 | Column |
| row | row 领域模型 | Row |

#### 方法

```typescript
class Cell { 
  // 设置 cell 数据
  setData(data: DateItemType['dataIndex'] = {}) {}
}
```

### `Toolbar`

#### 属性

| 参数名 |                   描述                   |                                         类型                                         |
| ------ | :--------------------------------------: | :----------------------------------------------------------------------------------: |
| loading | 加载状态 | Boolean |
| filterValues | 表单值 | Record\<string, any\> |
| table | table 领域模型 | Table |

#### 方法

```typescript
class Toolbar {
  // 设置表单值
  setFilterValues(filerValues: Record\<string, any\>) {}
  // 触发过滤动作
  filter(filerValues?: Record<string, any>) {}
}
```

## hooks

在复杂的 table 开发场景，table 的 cell 组件、toolbar item 组件可能又做了很多子组件拆分，这种情况下，可以在 table 的子、孙组件里面通过 hooks 消费 table 的领域模型对象。如果是简单场景，还是推荐通过，将component、componentProps、toolbar等配置为函数来消费领域模型变量。


- `useTable`：获取 table 领域模型
- `useRow`：获取 row 领域模型，只能在 table 行的子孙组件调用
- `useCell`：获取 cell 领域模型，只能在 table cell 的子孙组件调用
- `useToolbar`：获取 toolbar 领域模型，只能在 toolbar 的子孙组件调用
- `useToolbarRow`：获取 toolbar row 领域模型，只能在 toolbar row 的子孙组件调用
- `useToolbarItem`：获取 toolbar item 领域模型，只能在 toolbar item 的子孙组件调用
- `useCreateTable`：使用 hooks 的形式初始化 table

## 生命周期

注意：生命周期函数只能在 tableConfig.effects 函数调用。

table 的生命周期非常多，我们会按照当前的需求逐步添加，现阶段有的生命周期如下：

table 相关
- `onTableSelectRow`：表格行被选择
- `onTableUpdateDataStart`：开始更新表格数据
- `onTableUpdateDataEnd`：结束更新表格数据（只是更新内存中的数据）
- `onTableUpdateRowEnd`：结束更新 row 实例
- `onTablePageChangeStart`: 开始切换分页

fetcher 相关
- `onFetchStart`：请求开始
- `onFetchEnd`：请求结束
- `onFetchError`：请求错误

row 相关
- `onRowInit`：行初始化完成
- `onRowSelect`：行被选择

toolbar 相关
- `onToolbarValueChange`：工具栏值变化

生命周期函数使用示例：
```tsx
import { CTable } from '@cloud-materia/common';

export default () => {
  const config = Table.defineConfig({
    effects() {
      CTable.effects.onRowSelect<DateItemType>(({ row }) => {
        console.log(row);
      });
      CTable.effects.onFetchError(({ table, fetchOptions, error }) => {
        console.log(error)
      })
    }
  });

  return <Table config={config} autoInit />
}
```