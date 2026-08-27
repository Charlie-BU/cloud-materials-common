import {
  Input,
  InputNumber,
  Switch,
  ArrayTable,
  Space,
  Select,
  Cascader,
  Checkbox,
  DatePicker,
  TreeSelect,
  TimePicker,
  Upload,
  FormItem,
} from '@storage-fe/formily-arco';
import { CFormSection } from './react/Components/Decorators/Section';
import DynamicFieldDecorator from './react/Components/Decorators/DynamicFieldDecorator';
import CRadio from './react/Components/CRadio';
import CCheckbox from './react/Components/CCheckbox';
import ConfigPreview from './react/Components/ConfigPreview';
import FeeCalculator from './react/Components/FeeCalculator';
import CAsyncSelect from './react/Components/CAsyncSelect';
import CAgreement from './react/Components/CAgreement';
import { JSXTable } from '@storage-fe/formily-arco/es/ArrayTable';
import { JSXItems } from '@storage-fe/formily-arco/es/ArrayItems';
import Text from './react/Components/Text';
import ArrayTableAddition from './react/Components/ArrayButtons/ArrayTableAddition';
import CArrayRemove from './react/Components/ArrayRemove';
import ArrayBase from '@storage-fe/formily-arco/es/ArrayBase';
import ArrayItemsAddition from './react/Components/ArrayButtons/ArrayItemsAddition';
import CGroup from './react/Components/Decorators/Group';
import CTableSelect from './react/Components/TableSelect';
import type { IFormLayoutProps } from '@storage-fe/formily-arco/es/FormLayout';
import type { DefaultBuiltInComponentMapType } from './interface';
import type { DefineComponentPropsMapType } from '../_factory/builtInComponent';
import PreSelectedTable from './react/Components/PreSelectedTable';
import { getGlobalContextConfig } from '../CConfigProvider';
import { CFormDrawerSelect } from './react/Components/CDrawerSelect';
import CFormTableTransfer from './react/Components/CTableTransfer';
import { GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
import CFormAsyncSelectReactive from './react/Components/CFormAsyncSelect/AsyncSelectReactive';

export const ReloadPrefixKey = '_c_reload_with_';
export const SubFieldValidKey = '__SubFieldValid';
/**
 * 表单级联数据存储于 GlobalScope 中的 Key
 */
export const FormFieldCascadeConfigKey = '__FormFieldCascadeConfigKey';

export const CFormPrefixName = '___c-m-cform___';

export const DefaultLayout: IFormLayoutProps = {
  layout: 'horizontal',
  // 默认六个字标题
  labelWidth: 110,
  labelAlign: 'left',
  requiredSymbol: true,
  size: 'default',
  colon: true,
  helpLayout: 'normal',
  style: {
    height: '100%',
    overflow: 'hidden',
  },
};

export const DefaultBuiltInComponentMap: DefaultBuiltInComponentMapType = {
  Input,
  TextArea: Input.TextArea!,
  InputSearch: Input.Search!,
  Password: Input.Password!,
  FormItem,
  InputNumber,
  Section: CFormSection,
  DynamicFieldDecorator,
  CRadio,
  CCheckbox,
  Switch,
  Space,
  ConfigPreview,
  Select,
  Text,
  Cascader,
  Checkbox,
  CheckboxGroup: Checkbox.Group!,
  DatePicker,
  WeekPicker: DatePicker.WeekPicker!,
  MonthPicker: DatePicker.MonthPicker!,
  YearPicker: DatePicker.YearPicker!,
  QuarterPicker: DatePicker.QuarterPicker!,
  RangePicker: DatePicker.RangePicker!,
  TreeSelect,
  FeeCalculator,
  Agreement: CAgreement,
  CAgreement: CAgreement,
  CAsyncSelect,
  TimePicker,
  TimeRangePicker: TimePicker.RangePicker!,
  Upload,
  ArrayTable: JSXTable,
  ArrayTableColumn: ArrayTable.Column!,
  ArraySortHandle: ArrayBase.SortHandle!,
  ArrayTableAddition: ArrayTableAddition,
  ArrayIndex: ArrayBase.Index!,
  ArrayMoveDown: ArrayBase.MoveDown!,
  ArrayMoveUp: ArrayBase.MoveUp!,
  ArrayTableRemove: CArrayRemove,
  ArrayItems: JSXItems,
  ArrayItemsRemove: CArrayRemove,
  ArrayItemsAddition: ArrayItemsAddition,
  Group: CGroup,
  CTableSelect: CTableSelect,
  PreSelectedTable: PreSelectedTable,
  CDrawerSelect: CFormDrawerSelect,
  CTableTransfer: CFormTableTransfer,
  CFormAsyncSelect: CFormAsyncSelectReactive,
};

export const CFormDefaultDecoratorProps: DefineComponentPropsMapType<DefaultBuiltInComponentMapType> = {
  FormItem: {
    requiredAlign: true,
    colon: false,
    controlPopover: {
      triggerProps: {
        updateOnScroll: true,
      },
    },
  },
  Space: {
    align: 'start',
  },
};

export const CFormDefaultComponentProps: DefineComponentPropsMapType<DefaultBuiltInComponentMapType> = {
  ArrayTable: {
    className: `${GLOBAL_PREFIX}-form-array-table`,
    additionPosition: 'paginationTop',
    pagination: { pageSize: Number.MAX_SAFE_INTEGER },
  },
  ArrayTableRemove: { type: 'text' },
  ArrayItems: { itemGap: 12 },
  Select: {
    placeholder: getGlobalContextConfig().locale.CForm.placeholder.select,
    triggerProps: {
      updateOnScroll: true,
    },
  },
  CAsyncSelect: {
    triggerProps: {
      updateOnScroll: true,
    },
  },
  Input: {
    placeholder: getGlobalContextConfig().locale.CForm.placeholder.input,
  },
  TextArea: {},
  InputSearch: {},
  Password: {},
  InputNumber: {},
  Cascader: {},
  TreeSelect: {},
};
