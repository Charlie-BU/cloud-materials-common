/// <reference types="react" />
import type { NumberProps, RefreshBtnProps, ColConfigBtnProps, ExportDataBtnProps, FunctionBtnListProps } from '../plugin/components';
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
import type { CellComponentRenderProps as CoreCellComponentRenderProps, ToolbarItemRenderProps as CoreToolbarItemRenderProps } from '../../core';
import type { TableModel } from './index';
import type { CSearchProps, CSimpleSearchProps, CCombineSearchProps, CCascaderSearchProps } from '../../../CSearch/interface';
import type { COperationMenuProps } from '../../../COperationMenu/interface';
type R = Record<string, any>;
type CellComponentRenderProps<DataItemType extends R, GlobalScopeType extends R = any> = Omit<CoreCellComponentRenderProps<DataItemType, GlobalScopeType>, 'table'> & {
    table: TableModel<DataItemType, GlobalScopeType>;
};
type ToolbarItemRenderProps<DataItemType extends R, GlobalScopeType extends R = any> = Omit<CoreToolbarItemRenderProps<DataItemType, GlobalScopeType>, 'table'> & {
    table: TableModel<DataItemType, GlobalScopeType>;
};
export type ToConfigUnionType<ComponentsMap extends Record<string, Record<string, any>>, RenderProps extends Record<string, any>, Type extends keyof ComponentsMap = keyof ComponentsMap> = Type extends keyof ComponentsMap ? {
    component?: Type;
    componentProps?: ComponentsMap[Type] | ((options: RenderProps) => ComponentsMap[Type]);
} : never;
/** cell 内置组件的名字枚举 */
export declare enum CellComponentsEnum {
    Text = "Text",
    Number = "Number",
    CTag = "CTag",
    CStatus = "CStatus",
    CNameInfo = "CNameInfo",
    COperationMenu = "COperationMenu",
    CPopupEdit = "CPopupEdit",
    CInlineEdit = "CInlineEdit",
    CCollapse = "CCollapse",
    CEllipsis = "CEllipsis",
    CAsyncSwitch = "CAsyncSwitch",
    CFeeType = "CFeeType"
}
/** toolbar 内置组件的名字枚举 */
export declare enum ToolbarComponentsEnum {
    CToolbarOperationMenu = "CToolbarOperationMenu",
    RefreshBtn = "RefreshBtn",
    ExportDataBtn = "ExportDataBtn",
    ColConfigBtn = "ColConfigBtn",
    CSearch = "CSearch",
    CSimpleSearch = "CSimpleSearch",
    CCascaderSearch = "CCascaderSearch",
    CCombineSearch = "CCombineSearch",
    FunctionBtnList = "FunctionBtnList",
    CAsyncSelect = "CAsyncSelect"
}
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
export type CellComponentConfig<DataItemType extends R, GlobalScopeType extends R = any> = ToConfigUnionType<CellComponentsMap, CellComponentRenderProps<DataItemType, GlobalScopeType>> | {
    component: (props: CellComponentRenderProps<DataItemType, GlobalScopeType>) => React.ReactElement | string | number | null;
};
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
export type ToolbarItemComponentConfig<DataItemType extends R, GlobalScopeType extends R = any> = ToConfigUnionType<ToolbarComponentsMap, ToolbarItemRenderProps<DataItemType, GlobalScopeType>> | {
    component: React.FC<ToolbarItemRenderProps<DataItemType, GlobalScopeType>>;
};
export {};
