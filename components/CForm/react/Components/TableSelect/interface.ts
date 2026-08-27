import type { RowSelectionProps } from '@arco-design/web-react/es/Table';
import { components } from '../../../../CSearch/components/Component';
import CRadio from '../../../../CRadio';
import type { R, TableConfig, TableProps, onRowSelect } from '../../../../CTable';
import type { FilterSearch } from './Search';
import type { DefineBuiltInBasicType } from '../../../../_factory/builtInComponent';
import type { SelectProps } from '@arco-design/web-react';
import type { GroupOption } from '../../../../CRadio/interface';

export type DisabledType = boolean | 'row';

export type TableSelectData<T = any> = T & { disabled?: DisabledType };

export type FilterSearchProps = React.ComponentProps<typeof FilterSearch>;

const enhancedComponentsMap = { ...components, CRadio: CRadio.Group };

export type TableSelectFilterProps = Omit<FilterSearchProps, 'content'> &
  DefineBuiltInBasicType<typeof enhancedComponentsMap>;

export type TableSelectFilterOptions = TableSelectFilterProps & {
  name?: string;
  visible?: boolean;
};

export type AllValueOption = boolean | Partial<Required<SelectProps>['options'][number]> | Partial<GroupOption>;
export interface CTableSelectProps<T extends R = any> extends Omit<TableConfig<T>, 'data' | 'rowKey'> {
  /** 指定key */
  rowKey: Required<TableConfig<T>>['rowKey'];
  /** 选择类型 单选/多选 */
  type?: 'radio' | 'checkbox';
  /** 筛选的数据 */
  data?: TableSelectData<T>[];
  /** 筛选的配置 */
  filterOptions?: TableSelectFilterOptions[];
  /** 自定义展示选择框的展示样式 */
  renderSelectCell?: RowSelectionProps['renderCell'];
  /** table除config的其它属性 */
  tableProps?: Omit<TableProps<T>, 'config'>;
  /** 展示【全部】选项，默认值false (只在CRadio和Select组件中支持)*/
  allValueOption?: AllValueOption;
  /** 选择数据后的回调 */
  afterSelectRow?: (options: Parameters<Parameters<typeof onRowSelect>[0]>[0], value: T) => void;
  /** table的loading 态 */
  loading?: boolean;
  /** 全局禁止选择态 */
  disabled?: boolean;
  onChange?: (value: T | T[]) => void;
  value?: T | T[];
}
