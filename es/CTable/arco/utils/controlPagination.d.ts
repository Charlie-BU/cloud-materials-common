import React from 'react';
import type { TableProps as ArcoTableProps, PaginationProps } from '@arco-design/web-react';
import type { TableModel } from '../types';
/**
 * 规范：当数据总数小于某个数值时，隐藏分页
 * @param table
 */
export declare const hidePaginationWhenTotalLessThan: (table: TableModel<any>) => boolean;
export declare const shouldHideBottomButton: (table: TableModel<any>) => boolean | Error | undefined;
/** 处理了 pagination 后的最终传递给 arco table 的 props */
export declare const getArcoPropsFilterPagination: (table: TableModel<any>, tableConfig: ArcoTableProps, mergedArcoProps: ArcoTableProps) => {
    style?: React.CSSProperties | undefined;
    className?: string | string[] | undefined;
    tableLayoutFixed?: boolean | undefined;
    rowKey?: React.Key | ((record: any) => React.Key) | undefined;
    columns?: import("@arco-design/web-react").TableColumnProps<any>[] | undefined;
    components?: import("@arco-design/web-react/es/Table/interface").ComponentsProps | undefined;
    data?: any[] | undefined;
    border?: boolean | {
        wrapper?: boolean | undefined;
        headerCell?: boolean | undefined;
        bodyCell?: boolean | undefined;
        cell?: boolean | undefined;
    } | undefined;
    borderCell?: boolean | undefined;
    hover?: boolean | undefined;
    defaultExpandAllRows?: boolean | undefined;
    expandedRowKeys?: (string | number)[] | undefined;
    defaultExpandedRowKeys?: (string | number)[] | undefined;
    expandedRowRender?: ((record: any, index: number) => React.ReactNode) | undefined;
    expandProps?: import("@arco-design/web-react/es/Table").ExpandProps<any> | undefined;
    onExpand?: ((record: any, expanded: boolean) => void) | undefined;
    onExpandedRowsChange?: ((expandedRows: (string | number)[]) => void) | undefined;
    loading?: boolean | import("@arco-design/web-react").SpinProps | undefined;
    noDataElement?: React.ReactNode;
    showHeader?: boolean | undefined;
    showSorterTooltip?: boolean | import("@arco-design/web-react").TooltipProps | undefined;
    stripe?: boolean | undefined;
    size?: "small" | "default" | "middle" | "mini" | undefined;
    onChange?: ((pagination: PaginationProps, sorter: import("@arco-design/web-react/es/Table/interface").SorterInfo | import("@arco-design/web-react/es/Table/interface").SorterInfo[], filters: Partial<Record<string | number | symbol, string[]>>, extra: {
        currentData: any[];
        currentAllData: any[];
        action: "filter" | "sort" | "paginate";
    }) => void) | undefined;
    pagination?: boolean | PaginationProps | undefined;
    renderPagination?: ((paginationNode?: React.ReactNode) => React.ReactNode) | undefined;
    scroll?: {
        x?: string | number | boolean | undefined;
        y?: string | number | boolean | undefined;
    } | undefined;
    rowClassName?: ((record: any, index: number) => string) | undefined;
    rowSelection?: import("@arco-design/web-react").TableRowSelectionProps<any> | undefined;
    onHeaderRow?: ((columns: import("@arco-design/web-react").TableColumnProps<any>[], index: number) => import("@arco-design/web-react/es/Table/interface").RowCallbackProps) | undefined;
    onRow?: ((record: any, index: number) => import("@arco-design/web-react/es/Table/interface").RowCallbackProps) | undefined;
    prefixCls?: string | undefined;
    placeholder?: React.ReactNode;
    pagePosition?: "br" | "tr" | "bl" | "tl" | "topCenter" | "bottomCenter" | undefined;
    childrenColumnName?: string | undefined;
    indentSize?: number | undefined;
    footer?: ((currentPageDate: any) => React.ReactNode) | undefined;
    virtualized?: boolean | undefined;
    virtualListProps?: import("@arco-design/web-react/es/_class/VirtualList").AvailableVirtualListProps | undefined;
    summary?: ((currentData?: any[] | undefined) => React.ReactNode) | undefined;
};
export declare const controlPagination: (table: TableModel<any>, mergedArcoProps: ArcoTableProps, tablePrefixCls: string, arcoPrefixCls: string) => JSX.Element | null;
