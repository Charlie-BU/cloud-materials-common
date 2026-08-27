import type { FC } from 'react';
import React from 'react';
import type { ToolbarItemRenderProps, Table } from '../../../../core';
import type { TExportDataToCSVOptions } from './exportDataModal/exportData';
import type { CModalProps } from '../../../../../CModal/interface';
export declare enum ExportDataRangeType {
    all = "all",
    selectedRows = "selectedRows",
    searchResult = "searchResult"
}
export interface ExportDataBtnProps {
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
    extraColumns?: {
        dataIndex: string;
        title: string;
        formatter?: (val: any) => string;
    }[];
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
    /**
     * 选中导出范围后的提示文案
     */
    getExportRangeDesc?: (options: {
        curChosenType: ExportDataRangeType;
        table: Table;
    }) => React.ReactNode;
    /**
     * 可选导出范围 Key，传入该参数后以该参数为准
     */
    showExportRangeKeys?: ExportDataRangeType[];
}
export declare const ExportDataBtn: FC<ToolbarItemRenderProps & ExportDataBtnProps>;
