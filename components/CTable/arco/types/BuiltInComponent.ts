import type {
  NumberProps,
  RefreshBtnProps,
  ColConfigBtnProps,
  ExportDataBtnProps,
  FunctionBtnListProps,
} from '../plugin/components';
import type { CTagProps } from '../../../CTag/interface';
import type { CStatusProps } from '../../../CStatus/interface';
import type { CNameInfoProps } from '../../../CNameInfo/interface';
import type { CPopupEditProps } from '../../../CPopupEdit/interface';
import type { CInlineEditProps } from '../../../CInlineEdit/interface';
import type { CCollapseProps } from '../../../CCollapse/interface';
import type { CEllipsisProps } from '../../../CEllipsis/interface';
import type { CAsyncSelectProps } from '../../../CAsyncSelect/interface';
import type { CAsyncSwitchProps } from '../../../CAsyncSwitch/interface';
import type { CFeeTypeProps } from '../../../CFeeType/interface';
import type {
  CellComponentRenderProps as CoreCellComponentRenderProps,
  ToolbarItemRenderProps as CoreToolbarItemRenderProps,
} from '../../core';
import type { TableModel } from './index';

import type {
  CSearchProps,
  CSimpleSearchProps,
  CCombineSearchProps,
  CCascaderSearchProps,
} from '../../../CSearch/interface';
import type { COperationMenuProps } from '../../../COperationMenu/interface';

type R = Record<string, any>;

// 保证在 cell 和 toolbar 函数参数里面的 table 类型是 arco 下的 table，而不是 core 里面的 table
type CellComponentRenderProps<DataItemType extends R, GlobalScopeType extends R = any> = Omit<
  CoreCellComponentRenderProps<DataItemType, GlobalScopeType>,
  'table'
> & {
  table: TableModel<DataItemType, GlobalScopeType>;
};
type ToolbarItemRenderProps<DataItemType extends R, GlobalScopeType extends R = any> = Omit<
  CoreToolbarItemRenderProps<DataItemType, GlobalScopeType>,
  'table'
> & {
  table: TableModel<DataItemType, GlobalScopeType>;
};

// 生成组件配置的泛型
export type ToConfigUnionType<
  ComponentsMap extends Record<string, Record<string, any>>,
  RenderProps extends Record<string, any>,
  Type extends keyof ComponentsMap = keyof ComponentsMap,
> = Type extends keyof ComponentsMap
  ? {
      component?: Type;
      componentProps?: ComponentsMap[Type] | ((options: RenderProps) => ComponentsMap[Type]);
    }
  : never;

/** cell 内置组件的名字枚举 */
export enum CellComponentsEnum {
  Text = 'Text',
  Number = 'Number',
  CTag = 'CTag',
  CStatus = 'CStatus',
  CNameInfo = 'CNameInfo',
  COperationMenu = 'COperationMenu',
  CPopupEdit = 'CPopupEdit',
  CInlineEdit = 'CInlineEdit',
  CCollapse = 'CCollapse',
  CEllipsis = 'CEllipsis',
  CAsyncSwitch = 'CAsyncSwitch',
  CFeeType = 'CFeeType',
}

/** toolbar 内置组件的名字枚举 */
export enum ToolbarComponentsEnum {
  CToolbarOperationMenu = 'CToolbarOperationMenu',
  RefreshBtn = 'RefreshBtn',
  ExportDataBtn = 'ExportDataBtn',
  ColConfigBtn = 'ColConfigBtn',
  CSearch = 'CSearch',
  CSimpleSearch = 'CSimpleSearch',
  CCascaderSearch = 'CCascaderSearch',
  CCombineSearch = 'CCombineSearch',
  FunctionBtnList = 'FunctionBtnList',
  CAsyncSelect = 'CAsyncSelect',
}

// cell 组件的 props map
type CellComponentsMap = {
  Number: NumberProps;
  CTag: CTagProps;
  CStatus: CStatusProps;
  CNameInfo: CNameInfoProps;
  COperationMenu: COperationMenuProps;
  CPopupEdit: CPopupEditProps;
  CInlineEdit: CInlineEditProps;
  CCollapse: CCollapseProps<any>;
  CEllipsis: CEllipsisProps;
  CAsyncSwitch: CAsyncSwitchProps;
  CFeeType: CFeeTypeProps;
};

// cell 组件的 component 配置类型
export type CellComponentConfig<DataItemType extends R, GlobalScopeType extends R = any> =
  | ToConfigUnionType<CellComponentsMap, CellComponentRenderProps<DataItemType, GlobalScopeType>>
  | {
      // 这里最理想的类型是 React.FC。但是存储的历史代码中的 cellComponent 很多时候都是返回字符串
      // 因此这里做一定的退步，允许返回 string 和 number，降低迁移成本
      component: (
        props: CellComponentRenderProps<DataItemType, GlobalScopeType>,
      ) => React.ReactElement | string | number | null;
    };

// toolbar 组件的 props map
type ToolbarComponentsMap = {
  RefreshBtn: RefreshBtnProps;
  ColConfigBtn: ColConfigBtnProps;
  ExportDataBtn: ExportDataBtnProps;
  FunctionBtnList: FunctionBtnListProps;
  CToolbarOperationMenu: COperationMenuProps;
  CSearch: CSearchProps;
  CSimpleSearch: CSimpleSearchProps;
  CCascaderSearch: CCascaderSearchProps;
  CCombineSearch: CCombineSearchProps;
  CAsyncSelect: CAsyncSelectProps;
};

// toolbar 组件的 component 配置类型
export type ToolbarItemComponentConfig<DataItemType extends R, GlobalScopeType extends R = any> =
  | ToConfigUnionType<ToolbarComponentsMap, ToolbarItemRenderProps<DataItemType, GlobalScopeType>>
  | {
      component: React.FC<ToolbarItemRenderProps<DataItemType, GlobalScopeType>>;
    };
