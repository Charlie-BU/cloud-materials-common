import React from 'react';
import type { CTableSelectProps, TableSelectData } from './interface';
import type { ColumnConfig, ToolbarItemConfig } from '../../../../CTable';
export declare function getColKey(props: CTableSelectProps, data: TableSelectData, index: number): any;
export declare const getRowClassName: (row: any) => string;
/** 获取toolbar配置 */
export declare const getToolbarConfig: (props: Partial<CTableSelectProps>) => {
    left: ToolbarItemConfig<any, any>[];
} | {
    decorator?: React.FC<{
        table: import("../../../../CTable").TableModel<any, any>;
    }> | undefined;
    filterOnChange?: boolean | undefined;
    debounceDelay?: number | undefined;
    bottomLeft?: import("../../../../CTable").ToolbarItemGroup<any, any> | undefined;
    component?: import("../../../../CTable").ToolbarComponentConfig<any, any> | undefined;
    initialValues?: Record<string, any> | undefined;
    rows: import("../../../../CTable").ToolbarRowConfig<any, any>[];
    left?: undefined;
} | {
    decorator?: React.FC<{
        table: import("../../../../CTable").TableModel<any, any>;
    }> | undefined;
    filterOnChange?: boolean | undefined;
    debounceDelay?: number | undefined;
    bottomLeft?: import("../../../../CTable").ToolbarItemGroup<any, any> | undefined;
    component?: import("../../../../CTable").ToolbarComponentConfig<any, any> | undefined;
    initialValues?: Record<string, any> | undefined;
    left: ((false & {
        component?: "-" | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "CAsyncSelect" | undefined;
        componentProps?: import("../../../..").CAsyncSelectProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../..").CAsyncSelectProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "RefreshBtn" | undefined;
        componentProps?: import("../../../../CTable/arco/plugin/components").RefreshBtnProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../../CTable/arco/plugin/components").RefreshBtnProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "ColConfigBtn" | undefined;
        componentProps?: import("../../../../CTable").ColConfigBtnProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../../CTable").ColConfigBtnProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "ExportDataBtn" | undefined;
        componentProps?: import("../../../../CTable").ExportDataBtnProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../../CTable").ExportDataBtnProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "FunctionBtnList" | undefined;
        componentProps?: import("../../../../CTable/arco/plugin/components").FunctionBtnListProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../../CTable/arco/plugin/components").FunctionBtnListProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "CToolbarOperationMenu" | undefined;
        componentProps?: import("../../../..").COperationMenuProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../..").COperationMenuProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "CSearch" | undefined;
        componentProps?: import("../../../..").CSearchProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../..").CSearchProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "CSimpleSearch" | undefined;
        componentProps?: import("../../../..").CSimpleSearchProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../..").CSimpleSearchProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "CCascaderSearch" | undefined;
        componentProps?: import("../../../..").CCascaderSearchProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../..").CCascaderSearchProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component?: "CCombineSearch" | undefined;
        componentProps?: import("../../../..").CCombineSearchProps | ((options: Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }) => import("../../../..").CCombineSearchProps) | undefined;
    }) | ({
        name?: string | undefined;
        filterOnChange?: boolean | undefined;
        visible?: boolean | undefined;
    } & {
        component: React.FC<Omit<import("../../../../CTable").ToolbarItemRenderProps<any, any>, "table"> & {
            table: import("../../../../CTable").TableModel<any, any>;
        }>;
    }))[];
    right: import("../../../../CTable").ToolbarItemGroup<any, any> | undefined;
};
export declare const formatToLowerCase: (val: string | number) => string;
/** 利用table的过滤功能对filterOptions进行过滤 */
export declare const getColumnFilterDefault: (props: Partial<CTableSelectProps>) => import("../../../../CTable/arco/types/common").AllowEmpty<ColumnConfig<any, any>>[];
