export type TExportDataToCSVOptions = {
    fileName: string;
    data: Record<string, any>[];
    columns: {
        dataIndex: string;
        title: string;
        formatter?: (val: any) => string;
    }[];
};
export declare function exportDataToCSV(options: TExportDataToCSVOptions): void;
