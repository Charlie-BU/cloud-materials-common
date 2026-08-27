export declare const omitCellRenderProps: <T extends Record<string, any>>(props: T) => Omit<T, "cellData" | "table" | "column" | "cell" | "rowData" | "row" | "content">;
export declare const omitToolbarItemRenderProps: <T extends Record<string, any>>(props: T) => Omit<T, "table" | "onChange" | "toolbar" | "value" | "toolbarItem">;
export declare const omitCamelProps: <T extends Record<string, any>>(props: T) => Omit<T, "cellData" | "rowData" | "tableEditor">;
