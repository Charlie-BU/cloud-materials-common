/**
 * TableEditor 的 helper 中提供了若干便捷操作
 */
export declare const helper: {
    getRowObjectField: (options: {
        tableEditor: import("..").TableEditorModel<any, any>;
        rowKey: string;
    }) => import("@formily/core").ObjectField<any, any>;
    getRowFieldByRowKey: (options: {
        tableEditor: import("..").TableEditorModel<any, any>;
        rowKey: string;
    }) => import("@formily/core").ObjectField<any, any>;
    getRowFieldByIndex: (options: {
        tableEditor: import("..").TableEditorModel<any, any>;
        index: number;
    }) => import("@formily/core").ObjectField<any, any> | null;
    getRowFieldByRowData: <DataItem extends import("..").R = any>(options: {
        tableEditor: import("..").TableEditorModel<any, any>;
        rowData: DataItem;
    }) => import("@formily/core").ObjectField<any, any>;
    getRowData: <DataItem_1 extends import("..").R = any, ValueType extends import("..").R = any>(options: {
        tableEditor: import("..").TableEditorModel<DataItem_1, ValueType>;
        rowKey: string;
    }) => (DataItem_1 & import("..").WithRowKey & ValueType) | undefined;
    getRowDataByRowKey: <DataItem_1 extends import("..").R = any, ValueType extends import("..").R = any>(options: {
        tableEditor: import("..").TableEditorModel<DataItem_1, ValueType>;
        rowKey: string;
    }) => (DataItem_1 & import("..").WithRowKey & ValueType) | undefined;
    getRowDataByIndex: <DataItem_2 extends import("..").R = any, ValueType_1 extends import("..").R = any>(options: {
        tableEditor: import("..").TableEditorModel<DataItem_2, ValueType_1>;
        index: number;
    }) => (DataItem_2 & import("..").WithRowKey & ValueType_1) | null;
    setRowEditable: (options: {
        editable: boolean;
        tableEditor: import("..").TableEditorModel<any, any>;
        rowKey: string;
    }) => void;
    toggleRowEditable: (options: {
        tableEditor: import("..").TableEditorModel<any, any>;
        rowKey: string;
    }) => void;
    deleteRow: (options: {
        tableEditor: import("..").TableEditorModel<any, any>;
        rowKey: string;
    }) => void;
    getRowKeyByIndex: <DataItem_3 extends import("..").R = any, ValueType_2 extends import("..").R = any>(options: {
        index: number;
        tableEditor: import("..").TableEditorModel<DataItem_3, ValueType_2>;
    }) => string | undefined;
    getRowKeyByRowData: <DataItem_4 extends import("..").R = any>(rowData: DataItem_4) => any;
};
