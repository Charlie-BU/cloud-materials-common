/*
 * @Author: youjingyu
 * @Date: 2021-09-14 20:39:54
 * @LastEditTime: 2021-12-14 20:52:00
 * @LastEditors: youjingyu
 * @Description:
 */
import type { Table, TablePlugin, ComponentConf } from '../../core';
import CTag from '../../../CTag';
import CStatus from '../../../CStatus';
import CNameInfo from '../../../CNameInfo';
import COperationMenu from '../../../COperationMenu';
import CPopupEdit from '../../../CPopupEdit';
import CInlineEdit from '../../../CInlineEdit';
import CCollapse from '../../../CCollapse';
import CEllipsis from '../../../CEllipsis';
import CAsyncSelect from '../../../CAsyncSelect';
import CAsyncSwitch from '../../../CAsyncSwitch';
import CFeeType from '../../../CFeeType';

// import OperationMenu from '../../../OperationMenu';
// import NameInfo from '../../../NameInfo';
// import EditPopup from '../../../EditPopup';
// import EditBox from '../../../EditBox';
// import AsyncSwitch from '../../../AsyncSwitch';
// import FeeType from '../../../FeeType';
// import Key from '../../../Key';
// import ProjectLink from '../../../ProjectLink';
// import Status from '../../../Status';
import {
  Text,
  Number,
  RefreshBtn,
  ColConfigBtn,
  ExportDataBtn,
  CSearch,
  CSimpleSearch,
  CCascaderSearch,
  CCombineSearch,
  FunctionBtnList,
} from './components';
// import { Text, Number, Tag, RefreshBtn, ColConfigBtn, FunctionBtnList, ExportDataBtn } from './components';
import { select, range, searchInput } from './filters';
import { intFormatter, floatFormatter, money, timestamp, time, utcTime, fallbackText } from './formatter';
import { defaultSorter } from './sorter';
import { sum } from './summary';
import { defaultAutoWidth } from './autoWidth';
import { defaultResize } from './resize';
// import SimpleSearch from './formItem/SimpleSearch';
import {
  defaultCNameInfoProps,
  defaultCellOperationMenuProps,
  defaultOperationMenuProps,
  defaultCAsyncSelectProps,
} from './defaultProps';
import { CellComponentsEnum, ToolbarComponentsEnum } from '../types/BuiltInComponent';
import { RaceConditionResolver } from './raceConditionResolver';
// const AsyncOperationMenu = OperationMenu.Async;

export const globalComponents: ComponentConf[] = [
  { scope: 'cell', name: CellComponentsEnum.Text, component: Text },
  { scope: 'cell', name: CellComponentsEnum.Number, component: Number },
  // { scope: 'cell', name: 'Tag', component: Tag },
  { scope: 'cell', name: CellComponentsEnum.CTag, component: CTag },
  { scope: 'cell', name: CellComponentsEnum.CStatus, component: CStatus },
  {
    scope: 'cell',
    name: CellComponentsEnum.CNameInfo,
    component: CNameInfo,
    defaultComponentProps: defaultCNameInfoProps,
  },
  {
    scope: 'cell',
    name: CellComponentsEnum.COperationMenu,
    component: COperationMenu,
    defaultComponentProps: defaultCellOperationMenuProps,
  },
  { scope: 'cell', name: CellComponentsEnum.CPopupEdit, component: CPopupEdit },
  { scope: 'cell', name: CellComponentsEnum.CInlineEdit, component: CInlineEdit },
  { scope: 'cell', name: CellComponentsEnum.CCollapse, component: CCollapse },
  { scope: 'cell', name: CellComponentsEnum.CEllipsis, component: CEllipsis },
  { scope: 'cell', name: CellComponentsEnum.CAsyncSwitch, component: CAsyncSwitch },
  { scope: 'cell', name: CellComponentsEnum.CFeeType, component: CFeeType },
  // { scope: 'cell', name: 'Key', component: Key },
  // {
  //   scope: 'cell',
  //   name: 'OperationMenu',
  //   component: OperationMenu,
  //   defaultComponentProps: defaultCellOperationMenuProps,
  // },
  // {
  //   scope: 'cell',
  //   name: 'AsyncOperationMenu',
  //   component: AsyncOperationMenu,
  //   defaultComponentProps: defaultCellAsyncOperationMenuProps,
  // },
  // {
  //   scope: 'cell',
  //   name: 'NameInfo',
  //   component: NameInfo,
  //   defaultComponentProps: defaultNameInfoProps,
  // },
  // { scope: 'cell', name: 'Status', component: Status },
  // { scope: 'cell', name: 'EditPopup', component: EditPopup },
  // { scope: 'cell', name: 'EditBox', component: EditBox },
  // { scope: 'cell', name: 'AsyncSwitch', component: AsyncSwitch },
  // { scope: 'cell', name: 'FeeType', component: FeeType },
  // { scope: 'cell', name: 'ProjectLink', component: ProjectLink },
  {
    scope: 'toolbarItem',
    name: ToolbarComponentsEnum.CToolbarOperationMenu,
    component: COperationMenu,
    defaultComponentProps: defaultOperationMenuProps,
  },
  { scope: 'toolbarItem', name: ToolbarComponentsEnum.RefreshBtn, component: RefreshBtn },
  { scope: 'toolbarItem', name: ToolbarComponentsEnum.ExportDataBtn, component: ExportDataBtn },
  { scope: 'toolbarItem', name: ToolbarComponentsEnum.ColConfigBtn, component: ColConfigBtn },
  { scope: 'toolbarItem', name: ToolbarComponentsEnum.CSearch, component: CSearch },
  { scope: 'toolbarItem', name: ToolbarComponentsEnum.CSimpleSearch, component: CSimpleSearch },
  { scope: 'toolbarItem', name: ToolbarComponentsEnum.CCascaderSearch, component: CCascaderSearch },
  { scope: 'toolbarItem', name: ToolbarComponentsEnum.CCombineSearch, component: CCombineSearch },
  { scope: 'toolbarItem', name: ToolbarComponentsEnum.FunctionBtnList, component: FunctionBtnList },
  {
    scope: 'toolbarItem',
    name: ToolbarComponentsEnum.CAsyncSelect,
    component: CAsyncSelect,
    defaultComponentProps: defaultCAsyncSelectProps,
  },
  // { scope: 'formItem', name: 'SimpleSearch', component: SimpleSearch },
];

export class DefaultPlugin implements TablePlugin {
  apply(table: Table) {
    table.plugin.mixin({
      filter: [select, range, searchInput],
      formatter: [intFormatter, floatFormatter, money, timestamp, time, utcTime, fallbackText],
      sorter: [defaultSorter],
      summary: [sum],
      // arco 已经实现了选择的效果，直接桥接到 arco
      rowSelection: [{ type: 'radio' }, { type: 'checkbox', multiple: true }],
      autoWidth: [defaultAutoWidth],
      resize: [defaultResize],
      components: globalComponents,
      raceConditionResolver: new RaceConditionResolver(),
    });
  }
}
